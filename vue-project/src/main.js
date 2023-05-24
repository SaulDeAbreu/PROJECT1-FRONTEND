import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

// details 
// import { createRouter, createWebHistory } from "vue-router";
// import SearchCoaktailsView from "@/views/SearchCocktailsView.vue";
// import CocktailsViews from "@/views/CocktailsView.vue";

// const routes = [
//   { path: "/", component: SearchCoaktailsView },
//   { path: "/cocktails/:id", component: CocktailsViews },
// ];
// const route = createRouter({
//   history: createWebHistory(),
//   routes,
// });
// app.use(route);

