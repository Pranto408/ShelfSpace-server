import prisma from "../../lib/prisma";
import AppError from "../../lib/AppError";

const createReview = async (payload: {
  userId: string;
  productId: string;
  rating: number;
  comment?: string;
}) => {
  const product = await prisma.product.findUnique({
    where: { id: payload.productId },
  });
  if (!product || product.isDeleted) {
    throw new AppError(404, "Product not found");
  }

  return prisma.review.create({ data: payload });
};

const getAllReviews = async () => {
  return prisma.review.findMany({
    where: { isDeleted: false },
    include: {
      user: { select: { id: true, name: true } },
      product: { select: { id: true, title: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getReviewById = async (id: string) => {
  const review = await prisma.review.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      product: { select: { id: true, title: true } },
    },
  });

  if (!review || review.isDeleted) {
    throw new AppError(404, "Review not found");
  }

  return review;
};

const updateReview = async (
  id: string,
  requesterId: string,
  payload: { rating?: number; comment?: string },
) => {
  const review = await prisma.review.findUnique({ where: { id } });

  if (!review || review.isDeleted) {
    throw new AppError(404, "Review not found");
  }

  if (review.userId !== requesterId) {
    throw new AppError(403, "You can only update your own review");
  }

  return prisma.review.update({ where: { id }, data: payload });
};

const deleteReview = async (
  id: string,
  requesterId: string,
  requesterRole: string,
) => {
  const review = await prisma.review.findUnique({ where: { id } });

  if (!review || review.isDeleted) {
    throw new AppError(404, "Review not found");
  }

  if (review.userId !== requesterId && requesterRole !== "ADMIN") {
    throw new AppError(403, "You can only delete your own review");
  }

  return prisma.review.update({ where: { id }, data: { isDeleted: true } });
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
