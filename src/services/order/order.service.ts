import prisma from "../../lib/prisma";
import AppError from "../../lib/AppError";

interface OrderItemInput {
  productId: string;
  quantity: number;
}

const createOrder = async (userId: string, items: OrderItemInput[]) => {
  if (!items || items.length === 0) {
    throw new AppError(400, "Order must contain at least one item");
  }

  return prisma.$transaction(async (tx) => {
    let totalPrice = 0;
    const orderItemsData: {
      productId: string;
      quantity: number;
      price: number;
    }[] = [];

    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
      });

      if (!product || product.isDeleted) {
        throw new AppError(404, `Product not found: ${item.productId}`);
      }

      if (product.stock < item.quantity) {
        throw new AppError(
          400,
          `Insufficient stock for product: ${product.title}`,
        );
      }

      totalPrice += product.price * item.quantity;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price, // snapshot the price at time of order
      });

      await tx.product.update({
        where: { id: product.id },
        data: { stock: product.stock - item.quantity },
      });
    }

    const order = await tx.order.create({
      data: {
        userId,
        totalPrice,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: { include: { product: true } },
      },
    });

    return order;
  });
};

const getAllOrders = async () => {
  return prisma.order.findMany({
    where: { isDeleted: false },
    include: {
      user: { select: { id: true, name: true } },
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getOrderById = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      items: { include: { product: true } },
    },
  });

  if (!order || order.isDeleted) {
    throw new AppError(404, "Order not found");
  }

  return order;
};

const updateOrderStatus = async (
  id: string,
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED",
) => {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order || order.isDeleted) {
    throw new AppError(404, "Order not found");
  }

  return prisma.order.update({ where: { id }, data: { status } });
};

const deleteOrder = async (id: string) => {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order || order.isDeleted) {
    throw new AppError(404, "Order not found");
  }

  return prisma.order.update({ where: { id }, data: { isDeleted: true } });
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
