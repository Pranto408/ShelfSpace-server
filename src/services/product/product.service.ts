import prisma from "../../lib/prisma";
import AppError from "../../lib/AppError";

const createProduct = async (payload: {
  title: string;
  description?: string;
  price: number;
  stock?: number;
  categoryId: string;
}) => {
  const category = await prisma.category.findUnique({
    where: { id: payload.categoryId },
  });
  if (!category || category.isDeleted) {
    throw new AppError(404, "Category not found");
  }

  return prisma.product.create({ data: payload });
};

const getAllProducts = async () => {
  return prisma.product.findMany({
    where: { isDeleted: false },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product || product.isDeleted) {
    throw new AppError(404, "Product not found");
  }

  return product;
};

const updateProduct = async (
  id: string,
  payload: {
    title?: string;
    description?: string;
    price?: number;
    stock?: number;
    status?: "AVAILABLE" | "OUT_OF_STOCK" | "DISCONTINUED";
    categoryId?: string;
  },
) => {
  await getProductById(id);

  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: payload.categoryId },
    });
    if (!category || category.isDeleted) {
      throw new AppError(404, "Category not found");
    }
  }

  return prisma.product.update({
    where: { id },
    data: payload,
  });
};

const deleteProduct = async (id: string) => {
  await getProductById(id);

  return prisma.product.update({
    where: { id },
    data: { isDeleted: true },
  });
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
