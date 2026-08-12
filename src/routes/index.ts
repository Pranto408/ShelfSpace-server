import { Router } from "express";
import { UserRoutes } from "../services/user/user.routes";
import { CategoryRoutes } from "../services/category/category.routes";
import { ProductRoutes } from "../services/product/product.routes";
import { ReviewRoutes } from "../services/review/review.routes";
import { OrderRoutes } from "../services/order/order.routes";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: UserRoutes },
  { path: "/categories", route: CategoryRoutes },
  { path: "/products", route: ProductRoutes },
  { path: "/reviews", route: ReviewRoutes },
  { path: "/orders", route: OrderRoutes },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
