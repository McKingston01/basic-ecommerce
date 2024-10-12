<template>
  <!-- Sección visible cuando el producto está disponible -->
  <section v-if="product" class="product-detail">
    <div class="container">
      <!-- Contenedor para la imagen del producto -->
      <div class="product-detail__image-wrapper">
        <img :src="product.imagen" alt="Product Image" class="product-detail__image" />
      </div>

      <!-- Información detallada del producto -->
      <div class="product-detail__info">
        <!-- Nombre de la categoría del producto -->
        <h3 class="product-detail__name">Categoría: {{ product.categoria }}</h3>

        <!-- Descripción del producto -->
        <p class="product-detail__description">Descripción: {{ product.descripcion }}</p>

        <!-- Información del stock del producto -->
        <p class="product-detail__description">Stock : {{ product.stock }}</p>

        <!-- Información de precios -->
        <p class="product-detail__price">
          <!-- Precio original y descuento si están disponibles -->
          <span v-if="product.descuento" class="product-detail__price--original">Precio Anterior: ${{ product.precio }}</span>
          <span v-if="product.descuento" class="product-detail__price--discount">Descuento :-$ {{ product.descuento }}</span>
          
          <!-- Precio actual si no hay descuento -->
          <span v-else>Precio: ${{ product.precio }}</span>
          
          <!-- Precio con descuento si está disponible -->
          <span v-if="product.descuento" class="product-detail__price--discounted">Precio Oferta: ${{ discountedPrice }}</span>
        </p>
      </div>
    </div>
  </section>

  <!-- Sección visible cuando no hay datos del producto -->
  <section v-else>
    <p class="product-detail__loading">Loading...</p>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DetailProductView',
  data() {
    return {
      // Almacena la información del producto seleccionado
      product: null,
    };
  },
  computed: {
    // Obtiene el array de productos del estado global usando Vuex
    ...mapGetters(['products']),
    
    /**
     * Calcula el precio con descuento del producto.
     * @returns {number} El precio con descuento aplicado.
     */
    discountedPrice() {
      return this.product.precio - this.product.descuento;
    }
  },
  methods: {
    /**
     * Busca el producto basado en el ID de la ruta.
     * Establece el producto encontrado en el estado local.
     */
    fetchProduct() {
      const productId = this.$route.params.id;
      
      // Verifica si el array de productos está definido
      if (this.products) {
        this.product = this.products.find(product => product.id === productId);
      } else {
        console.error('El array de productos no está definido');
      }
    }
  },
  watch: {
    // Observa los cambios en el ID de la ruta para volver a cargar el producto
    '$route.params.id': 'fetchProduct'
  },
  mounted() {
    // Llama a fetchProduct al montar el componente para obtener el producto
    this.fetchProduct();
  }
};
</script>



<style scoped>
.container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
 

}
/* Estilos para la vista de detalles del producto */
.product-detail {
  padding-bottom: 60px;
}

.product-detail__image-wrapper {
  text-align: center;
  margin-bottom: 20px;
}

.product-detail__image {
  height: 250px;
}

.product-detail__info {
  text-align: center;
}

.product-detail__name {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.product-detail__description {
  margin-bottom: 20px;
}

.product-detail__price {
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
}

.product-detail__price--original {
  text-decoration: line-through;
  color: red;
 
}

.product-detail__price--discounted {
  color: green;
  font-weight: bold;
  margin-left: 10px;
}

.product-detail__price--discount {
  color: #343A40;
 

}

.product-detail__loading {
  text-align: center;
  font-size: 1.25rem;
}
</style>
