import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout('components/layout.tsx', [
    index("routes/home.tsx"),
    ...prefix('/users', [
      index('routes/users/index.tsx'),
      route('add', 'routes/users/add.tsx'),
      route(':id', 'routes/users/show.tsx'),
      route(':id/edit', 'routes/users/edit.tsx'),
      route(':id/delete', 'routes/users/delete.tsx'),
    ])
  ])
] satisfies RouteConfig;
