import prisma from "../../lib/prisma";
import AppError from "../../lib/AppError";

const createCategory = async (payload: {
  name: string;
  description?: string;
}) => {
  const existing = await prisma.category.findFirst({
    where: { name: payload.name, isDeleted: false },
  });
  if (existing) {
    throw new AppError(409, "A category with this name already exists");
  }

  return prisma.category.create({ data: payload });
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: "desc" },
  });
};

const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category || category.isDeleted) {
    throw new AppError(404, "Category not found");
  }

  return category;
};

const updateCategory = async (
  id: string,
  payload: { name?: string; description?: string },
) => {
  await getCategoryById(id); // reuses the existence + soft-delete check

  return prisma.category.update({
    where: { id },
    data: payload,
  });
};

const deleteCategory = async (id: string) => {
  await getCategoryById(id);

  // Soft delete — we flag it, we don't actually remove the row
  return prisma.category.update({
    where: { id },
    data: { isDeleted: true },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
