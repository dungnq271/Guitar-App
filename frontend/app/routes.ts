import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

// index: initial route
export default [
  index("routes/index.tsx"),
  route("orders", "routes/orders.tsx"),
  route("guitars/:guitarId", "routes/$guitarId.tsx"),
] satisfies RouteConfig;
