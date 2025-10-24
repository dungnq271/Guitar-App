import { type RouteConfig, layout, route, index } from '@react-router/dev/routes';

// index: initial route
export default [
  route('/', 'Routes/ProtectedRoute.tsx', [
    layout('Layouts/OuterLayout.tsx', [
      layout('Layouts/InnerLayout.tsx', [
        index('Routes/Home.tsx'),
        route('profile', 'Routes/Profile.tsx'),
        route('orders', 'Routes/Orders.tsx'),
        route('guitars/:guitarId', 'Routes/Guitar.tsx')
      ])
    ])
  ]),
  route('login', 'Routes/Login.tsx'),
  route('register', 'Routes/Register.tsx')
] satisfies RouteConfig;
