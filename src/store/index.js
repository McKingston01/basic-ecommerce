import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [], // Lista de productos
    authToken: localStorage.getItem('authToken') || null, // Token de autenticación (cargado desde localStorage)
    currentUser: null, // Usuario actual
  },
  getters: {
    // Verifica si el usuario está autenticado (si hay un token)
    isAuthenticated: (state) => !!state.authToken,
    // Verifica si el usuario actual es administrador
    isAdmin: (state) => state.currentUser && state.currentUser.admin,
    // Obtiene la lista de productos
    products: (state) => state.products,
  },
  mutations: {
    // Establece la lista de productos en el estado y calcula el precio con descuento
    SET_PRODUCTS(state, products) {
      state.products = products.map((product) => ({
        ...product,
        discountedPrice:
          product.originalPrice - (product.originalPrice * product.discount) / 100,
      }));
    },
    // Establece el token de autenticación y el usuario actual en el estado
    SET_AUTH_TOKEN(state, { token, user }) {
      state.authToken = token;
      state.currentUser = user;
      localStorage.setItem('authToken', token); // Guarda el token en localStorage
    },
    // Elimina el token de autenticación y el usuario actual del estado
    LOGOUT(state) {
      state.authToken = null;
      state.currentUser = null;
      localStorage.removeItem('authToken'); // Elimina el token de localStorage
    },
  },
  actions: {
    // Acción para obtener la lista de productos desde la API
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('/api/productos.json');
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    // Acción para iniciar sesión
    async login({ commit }, credentials) {
      try {
        const response = await axios.get('/api/usuarios.json');
        const users = response.data;
        const user = users.find(
          (u) =>
            u.correo === credentials.username &&
            u.password === credentials.password
        );

        if (user) {
          const token = 'dummy-token'; // Token de autenticación ficticio (debería ser generado por el backend)
          commit('SET_AUTH_TOKEN', { token, user });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error during login:', error);
        return false;
      }
    },
  },
});
