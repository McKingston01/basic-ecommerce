<template>
  <article class="product-card">
    <!-- Imagen del producto -->
    <img class="product-card__image" :src="product.imagen" alt="Imagen del producto" />
    <!-- Nombre del producto -->
    <h3 class="product-card__name">{{ product.nombre }}</h3>
    <!-- Descripción del producto -->
    <p class="product-card__description">{{ product.descripcion }}</p>
    <!-- Precio del producto -->
    <p class="product-card__price">
      <span v-if="product.descuento" class="product-card__price--original">
        ${{ product.precio }}
      </span>
      <span v-if="product.descuento" class="product-card__price--discount">
        -${{ product.descuento }}
      </span>
      <span v-if="product.descuento" class="product-card__price--final">
        ${{ discountedPrice }}
      </span>
      <span v-else class="product-card__price--final">
        ${{ product.precio }}
      </span>
    </p>
    <!-- Botón para ver más detalles del producto -->
    <button class="product-card__button" @click="viewDetails">Ver más</button>
  </article>
</template>

<script>
export default {
  name: 'CardProduct',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    // Calcula el precio con descuento restando el valor del descuento
    discountedPrice() {
      return this.product.precio - this.product.descuento;
    }
  },
  methods: {
    // Navega a la vista de detalles del producto
    viewDetails() {
      this.$router.push({ name: 'DetailProduct', params: { id: this.product.id } });
    }
  }
}
</script>

<style scoped>
/* Bloque principal: Tarjeta del producto */
.product-card {
  border: 1px solid #2D9CDB;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  text-align: center;
  background-color: #eaf3fcb2;
}

/* Elementos: Imagen, nombre, descripción */
.product-card__image {
  height: 200px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.product-card__name,
.product-card__description {
  margin: 0.5rem 0;
}

/* Precios del producto */
.product-card__price {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.product-card__price--original {
  text-decoration: line-through;
  color: red;
  margin-right: 0.5rem;
}

.product-card__price--discount {
  color: #343A40;
  margin-right: 0.5rem;
}

.product-card__price--final {
  color: green;
  font-weight: bold;
}

/* Botón: Ver más detalles */
.product-card__button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #2D9CDB;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product-card__button:hover {
  background-color:  #2D9CDB;
}
</style>
