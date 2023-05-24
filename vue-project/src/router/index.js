import { createRouter, createWebHistory } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import ErrorView from "@/views/ErrorView.vue";
import SearchCocktailsView from "@/views/SearchCocktailsView.vue";
import ReviewView from "@/views/ReviewView.vue";
import CocktailsView from "@/views/CocktailsView.vue";
// import CartView from "@/views/CartView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexView,
    },
    // {
    //   path: "/cart",
    //   name: "cart",
    //   component: CartView,
    // },
    {
      path: "/searchcocktails",
      name: "searchcocktails",
      component: SearchCocktailsView,
    },
    {
      path: "/review",
      name: "review",
      component: ReviewView,
    },
    {
      path: "/cocktails/:id",
      name: "cocktails",
      component: CocktailsView,
    },

    {
      path: "/:catchAll(.*)",
      name: "error",
      component: ErrorView,
    },
  ],
});

export default router;
