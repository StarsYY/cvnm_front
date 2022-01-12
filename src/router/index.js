import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import('@/views/login'),
    name: "Login",
  },
  {
    path: "/",
    component: () => import('@/views/index'),
    name: "Index",
  },
  {
    path: "/detail/:id",
    component: () => import('@/views/detail'),
    name: "Detail",
  },
  {
    path: "/create",
    component: () => import('@/views/create'),
    name: "Create",
  },
  {
    path: "/personal/:name",
    component: () => import('@/views/personal'),
    name: "Personal",
  },
  {
    path: "/user",
    component: () => import('@/views/user'),
    name: "User",
  },
  {
    path: "/tags",
    component: () => import('@/views/tags'),
    name: "Tags",
  },
  {
    path: "/tagDetail",
    component: () => import('@/views/tag-detail'),
    name: "TagDetail",
  },
  {
    path: "/verify",
    component: () => import('@/views/verify'),
    name: "Verify",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
