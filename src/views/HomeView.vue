<template>
  <section class="home-view">
    <!-- Sección para mostrar productos destacados -->
    <h2 class="home-view__title">Productos Destacados</h2>
    <div class="home-view__product-grid">
      <!-- Renderiza una tarjeta para cada producto destacado -->
      <CardProduct v-for="product in featuredProducts" :key="product.id" :product="product" class="home-view__card" />
      
    </div>

    <!-- Sección para mostrar productos en oferta -->
    <h2 class="home-view__title">Productos en Oferta</h2>
    <div class="home-view__product-grid">
      <!-- Renderiza una tarjeta para cada producto en oferta -->
      <CardProduct v-for="product in discountedProducts" :key="product.id" :product="product" class="home-view__card" />
    </div>
  </section>
  <!-- Muestra el componente FooterLink solo si showFooter es verdadero -->
  <FooterLink v-if="showFooter" class="home-view__footer" />
</template>

<script>
import CardProduct from '@/components/CardProduct.vue';
import FooterLink from '@/components/FooterLink.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  components: { CardProduct, FooterLink },
  computed: {
    // Mapea los getters del store de Vuex
    ...mapGetters(['products']),
    /**
     * Obtiene los productos destacados filtrando los productos por la propiedad `destacado`.
     * @returns {Array} Lista de productos destacados.
     */
    featuredProducts() {
      return this.products.filter(p => p.destacado);
    },
    /**
     * Obtiene los productos con descuento filtrando los productos por la propiedad `descuento`.
     * @returns {Array} Lista de productos con descuento.
     */
    discountedProducts() {
      return this.products.filter(p => p.descuento > 0);
    }
  },
  data() {
    return {
      // Controla la visibilidad del pie de página
      showFooter: false
    };
  },
  async mounted() {
    // Llama a fetchProducts para cargar los productos al montar el componente
    await this.fetchProducts();
    // Agrega un listener para el evento de scroll
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    // Elimina el listener de scroll antes de que el componente se desmonte
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // Mapea las acciones del store de Vuex
    ...mapActions(['fetchProducts']),
    /**
     * Maneja el evento de scroll para mostrar u ocultar el pie de página.
     * Muestra el pie de página cuando el usuario ha llegado al final de la página.
     */
    handleScroll() {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      this.showFooter = scrollTop + windowHeight >= documentHeight;
    }
  }
}
</script>

<style scoped>
/* Estilos para la vista principal de la página de inicio */
.home-view {
  padding-bottom: 60px;
  color: #343A40;
}

.home-view__title {
  text-align: center;
  margin: 20px 0;
}

.home-view__product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.home-view__card {
  flex: 1 1 calc(25% - 30px);
  box-sizing: border-box;
  margin-bottom: 4rem;
}

@media (max-width: 768px) {
  .home-view__card {
    flex: 1 1 calc(50% - 1rem);
  }
}

@media (max-width: 576px) {
  .home-view__card {
    flex: 1 1 100%;
  }
}

.home-view__footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  color:  white;
  transition: opacity 0.3s ease-in-out;
}
</style>
