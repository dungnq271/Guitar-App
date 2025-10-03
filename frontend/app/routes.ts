import { type RouteConfig, layout, route } from "@react-router/dev/routes";

// index: initial route
export default [
  route("/", "routes/protectedRoute.tsx", [
    layout("layouts/layout.tsx", [
      route("/:userId?", "routes/index.tsx"),
      route("orders", "routes/orders.tsx"),
      route("guitars/:guitarId", "routes/$guitarId.tsx"),
    ]),
  ]),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
] satisfies RouteConfig;
