<template>
  <section class="product-view">
    <div class="product-view__container">
      <!-- Itera sobre los productos y muestra cada uno como un enlace -->
      <div v-for="product in products" :key="product.id" class="product-view__item">
        <!-- Enlace a la vista de detalle del producto utilizando el ID del producto -->
        <router-link :to="{ name: 'DetailProduct', params: { id: product.id } }">
          <!-- Componente personalizado que muestra la tarjeta del producto -->
          <CardProduct :product="product" />
        </router-link>
      </div>
    </div>
    <!-- Muestra el footer si la bandera `showFooter` es verdadera -->
    <FooterLink v-if="showFooter" class="product-view__footer" />
  </section>
</template>

<script>
import CardProduct from '@/components/CardProduct.vue';
import FooterLink from '@/components/FooterLink.vue';
import axios from 'axios';

export default {
  name: 'ProductView',
  components: { CardProduct, FooterLink },
  data() {
    return {
      products: [],  // Array para almacenar los productos obtenidos
      showFooter: false  // Bandera para controlar la visibilidad del footer
    };
  },
  async mounted() {
    try {
      // Realiza una solicitud para obtener los productos desde un archivo JSON
      const response = await axios.get('/api/productos.json');
      this.products = response.data;
    } catch (error) {
      // Manejo de errores en caso de que la solicitud falle
      console.error("Error fetching products:", error);
    }
    // Verifica si debe mostrarse el footer en el montaje del componente
    this.checkFooterVisibility();
    // Añade un event listener para manejar el scroll y actualizar la visibilidad del footer
    window.addEventListener('scroll', this.checkFooterVisibility);
  },
  beforeUnmount() {
    // Remueve el event listener antes de desmontar el componente para evitar fugas de memoria
    window.removeEventListener('scroll', this.checkFooterVisibility);
  },
  methods: {
    /**
     * Verifica si el scroll ha alcanzado la parte inferior de la página.
     * Actualiza la bandera `showFooter` en consecuencia.
     */
    checkFooterVisibility() {
      const scrollHeight = document.documentElement.scrollHeight; // Altura total del documento
      const scrollTop = window.scrollY + window.innerHeight; // Posición actual del scroll + altura de la ventana
      this.showFooter = scrollTop >= scrollHeight; // Actualiza la visibilidad del footer
    }
  }
}
</script>



<style scoped>
/* Estilos generales de la vista del producto */
.product-view {
  padding-bottom: 60px;
}

.product-view__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px; 
}

.product-view__item {
  flex: 1 1 calc(25% - 30px); 
  box-sizing: border-box;
  margin-bottom: 4rem; 
}

.product-view__item > a {
  text-decoration: none;
}

@media (max-width: 768px) {
  .product-view__item {
    flex: 1 1 calc(50% - 1rem); 
  }
}

@media (max-width: 576px) {
  .product-view__item {
    flex: 1 1 100%;
  }
}

.product-view__footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f8f9fa; /* Fondo claro para el footer */
  padding: 10px 0; /* Espaciado interno del footer */
  text-align: center; /* Centrado del contenido del footer */
}
</style>
