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
    path: "/create/edit/:id",
    component: () => import('@/views/create-edit'),
    name: "CreateEdit",
  },
  {
    path: "/personal/:name",
    component: () => import('@/views/personal'),
    name: "Personal",
  },
  {
    path: "/user/:name",
    component: () => import('@/views/user'),
    name: "User",
  },
  {
    path: "/tags",
    component: () => import('@/views/tags'),
    name: "Tags",
  },
  {
    path: "/tagDetail/:id",
    component: () => import('@/views/tag-detail'),
    name: "TagDetail",
  },
  {
    path: "/verify/:uid",
    component: () => import('@/views/verify'),
    name: "Verify",
  },
  {
    path: "/school",
    component: () => import('@/views/school/school'),
    name: "School",
  },
  {
    path: "/school/course",
    component: () => import('@/views/school/course'),
    name: "Course",
  },
  {
    path: "/school/video/:id",
    component: () => import('@/views/school/video'),
    name: "Video",
  },
  {
    path: "/school/my/:name",
    component: () => import('@/views/school/myschool'),
    name: "MySchool",
  },
  {
    path: "/school/purchase/:id",
    component: () => import('@/views/school/purchase'),
    name: "Purchase",
  },
  {
    path: "/school/purchase/confirm/:id",
    component: () => import('@/views/school/confirm'),
    name: "Confirm",
  },
  {
    path: "/school/purchase/confirm/pay/:id",
    component: () => import('@/views/school/pay'),
    name: "Pay",
  },
  {
    path: "/search/:search",
    component: () => import('@/views/search'),
    name: "Search",
  },
  {
    path: "/school/create",
    component: () => import('@/views/school/create'),
    name: "SchoolCreate",
  },
  {
    path: "/school/create/edit/:id",
    component: () => import('@/views/school/create-edit'),
    name: "SchoolCreateEdit",
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
