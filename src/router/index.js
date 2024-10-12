import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ProductView from '../views/ProductView.vue';
import DetailProductView from '../views/DetailProductView.vue';
import AdminView from '../views/AdminView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Conoce nuestros productos' },
  },
  {
    path: '/login',
    name: 'loginView',
    component: LoginView,
    meta: { title: 'Login' },
  },
  {
    path: '/product',
    name: 'ProductView',
    component: ProductView,
    meta: { title: 'Productos' },
  },
  {
    path: '/product/:id',
    name: 'DetailProduct',
    component: DetailProductView,
    props: true,
    meta: {
      title: 'Detalle del Producto', // Título por defecto
    },
    beforeEnter: (to, from, next) => {
      const productId = to.params.id;

      // Simulación de obtención del producto desde Vuex (o puede ser desde una API)
      const product = store.getters.products.find(p => p.id === productId);

      if (product) {
        to.meta.title = product.nombre; // Actualiza el meta title dinámicamente
        document.title = product.nombre; // Actualiza el título del documento
      } else {
        to.meta.title = 'Producto no encontrado';
        document.title = 'Producto no encontrado';
      }

      next();
    },
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: AdminView,
    meta: { title: 'Admin', requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { title: '404' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Si no se ha actualizado el título en beforeEnter, usar el meta.title por defecto o 'Default Title'
  document.title = to.meta.title || 'Default Title';

  // Lógica de autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = store.getters.isAuthenticated;

    if (!isAuthenticated) {
      next({ name: 'loginView' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
