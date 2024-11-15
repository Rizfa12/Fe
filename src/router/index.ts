import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import MainLayout from "@/layouts/MainLayout.vue";
import HomeView from "@/views/homeView.vue";
import SuratMasukView from "@/views/suratMasukView.vue";
import SuratKeluarView from "@/views/suratKeluarView.vue";
import KategoriView from "@/views/KategoriView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import UserManagementView from "@/views/UserManagementView.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/", name: "Home", component: HomeView },
      { path: "surat-masuk", name: "SuratMasuk", component: SuratMasukView },
      { path: "surat-keluar", name: "SuratKeluar", component: SuratKeluarView },
      {
        path: "kategori",
        name: "Kategori",
        component: KategoriView,
      },
      {
        path: "/user-management",
        name: "UserManagement",
        component: UserManagementView,
        meta: { requiresAdmin: true },
      },
    ],
  },
  { path: "/login", name: "Login", component: LoginView },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ["/login", "/register", "/"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !authStore.isLoggedIn) {
    next({ name: "Login" });
  } else if (to.meta.requiresAdmin && authStore.user?.role !== "admin") {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
