<template>
  <!-- Sección visible solo para administradores -->
  <section v-if="isAdmin" class="admin-view">
    <h2 class="admin-view__title--center">Panel de Administración</h2>

    <!-- Formulario para agregar nuevos productos -->
    <div class="admin-view__form-container">
      <h3 class="admin-view__form-title">Agregar Producto</h3>
      <form @submit.prevent="addProduct" class="admin-view__form">
        <!-- Campo para el título del producto -->
        <div class="mb-3">
          <label for="title" class="form-label">Título:</label>
          <input v-model="newProduct.title" type="text" id="title" class="form-control" required />
        </div>
        
        <!-- Campo para la descripción del producto -->
        <div class="mb-3">
          <label for="description" class="form-label">Descripción:</label>
          <textarea v-model="newProduct.description" id="description" class="form-control" required></textarea>
        </div>
        
        <!-- Campo para el precio original del producto -->
        <div class="mb-3">
          <label for="price" class="form-label">Precio Original:</label>
          <input v-model.number="newProduct.originalPrice" type="number" id="price" class="form-control" required min="0" />
        </div>
        
        <!-- Campo para el descuento del producto -->
        <div class="mb-3">
          <label for="discount" class="form-label">Descuento:</label>
          <input v-model.number="newProduct.discount" type="number" id="discount" class="form-control" min="0" />
        </div>
        
        <!-- Campo para la URL de la imagen del producto -->
        <div class="mb-3">
          <label for="image" class="form-label">URL de Imagen:</label>
          <input v-model="newProduct.image" type="text" id="image" class="form-control" required />
        </div>
        
        <!-- Botón para enviar el formulario -->
        <button type="submit" class="btn btn-primary">Agregar Producto</button>
      </form>
    </div>

    <!-- Listado de productos existentes -->
    <div class="admin-view__table-container mt-4">
      <h3 class="admin-view__table-title">Listado de Productos</h3>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <!-- Encabezados de la tabla -->
              <th>Título</th>
              <th>Precio Original</th>
              <th>Descuento</th>
              <th>Precio con Descuento</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
              
            </tr>
          </thead>
          <tbody>
            <!-- Fila para cada producto en la lista -->
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.nombre }}</td>
              <td>${{ product.precio }}</td>
              <td>{{ product.descuento ? '-$' + product.descuento : 'N/A' }}</td>
              <td>${{ calculateDiscountedPrice(product) }}</td>
              <td>{{ product.stock}}</td>
              <td>${{ calculateDiscountedPrice(product) }}</td>
              <td>{{ product.categoria}}</td>
              <td>
                <!-- Botones para editar y eliminar productos -->
                <button @click="editProduct(product)" class="btn btn-warning btn-sm me-2">Editar</button>
                <button @click="deleteProduct(product.id)" class="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal para editar productos -->
    <div v-if="showEditModal" class="modal fade show" style="display: block;" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Producto</h5>
            <button type="button" class="btn-close" @click="showEditModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateProduct">
              <!-- Campo para el título del producto en el modal de edición -->
              <div class="mb-3">
                <label for="editTitle" class="form-label">Título:</label>
                <input v-model="editProductData.title" type="text" id="editTitle" class="form-control" required />
              </div>
              
              <!-- Campo para la descripción del producto en el modal de edición -->
              <div class="mb-3">
                <label for="editDescription" class="form-label">Descripción:</label>
                <textarea v-model="editProductData.description" id="editDescription" class="form-control" required></textarea>
              </div>
              
              <!-- Campo para el precio original del producto en el modal de edición -->
              <div class="mb-3">
                <label for="editPrice" class="form-label">Precio Original:</label>
                <input v-model.number="editProductData.originalPrice" type="number" id="editPrice" class="form-control" required min="0" />
              </div>
              
              <!-- Campo para el descuento del producto en el modal de edición -->
              <div class="mb-3">
                <label for="editDiscount" class="form-label">Descuento:</label>
                <input v-model.number="editProductData.discount" type="number" id="editDiscount" class="form-control" min="0" />
              </div>
              
              <!-- Campo para la URL de la imagen del producto en el modal de edición -->
              <div class="mb-3">
                <label for="editImage" class="form-label">URL de Imagen:</label>
                <input v-model="editProductData.image" type="text" id="editImage" class="form-control" required />
              </div>
              
              <!-- Botones para actualizar o cancelar la edición -->
              <button type="submit" class="btn btn-primary">Actualizar Producto</button>
              <button type="button" class="btn btn-secondary ms-2" @click="showEditModal = false">Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mensaje para usuarios sin permisos -->
  <section v-else>
    <p>No tienes permisos para acceder a esta página. Por favor, ingresa con un usuario Admin.</p>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'AdminView',
  computed: {
    // Obtiene los datos del estado global usando Vuex
    ...mapGetters(['isAdmin', 'products']),
  },
  data() {
    return {
      // Datos para el nuevo producto
      newProduct: {
        title: '',
        description: '',
        originalPrice: 0,
        discount: 0,
        image: ''
      },
      // Datos para el producto en edición
      editProductData: {
        id: null,
        title: '',
        description: '',
        originalPrice: 0,
        discount: 0,
        image: ''
      },
      // Controla la visibilidad del modal de edición
      showEditModal: false,
    };
  },
  async mounted() {
    // Carga los productos al montar el componente
    await this.loadProducts();
  },
  methods: {
    /**
     * Carga los productos desde el archivo JSON y los almacena en el estado global.
     */
    async loadProducts() {
      try {
        const response = await axios.get('/api/productos.json');
        this.$store.commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error('Error cargando productos:', error);
      }
    },

    /**
     * Agrega un nuevo producto al estado global.
     * Valida el precio y calcula el precio con descuento antes de agregarlo.
     */
    async addProduct() {
      if (this.newProduct.originalPrice <= 0) {
        alert('El precio debe ser mayor que cero.');
        return;
      }

      const newProduct = {
        ...this.newProduct,
        id: Date.now().toString(),
        discountedPrice: this.calculateDiscountedPrice(this.newProduct)
      };

      this.$store.commit('SET_PRODUCTS', [...this.products, newProduct]);

      // Limpiar formulario después de agregar el producto
      this.newProduct = { title: '', description: '', originalPrice: 0, discount: 0, image: '' };
    },

    /**
     * Calcula el precio con descuento de un producto.
     * @param {Object} product - El producto del cual calcular el precio con descuento.
     * @returns {number} El precio con descuento.
     */
    calculateDiscountedPrice(product) {
      return product.precio - (product.descuento || 0);
    },

    /**
     * Prepara los datos del producto para edición y muestra el modal.
     * @param {Object} product - El producto que se va a editar.
     */
    editProduct(product) {
      this.editProductData = { ...product };
      this.showEditModal = true;
    },

    /**
     * Actualiza un producto en el estado global.
     * Valida el precio antes de actualizarlo.
     */
    updateProduct() {
      if (this.editProductData.originalPrice <= 0) {
        alert('El precio debe ser mayor que cero.');
        return;
      }

      const updatedProduct = {
        ...this.editProductData,
        discountedPrice: this.calculateDiscountedPrice(this.editProductData)
      };

      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        this.$store.commit('SET_PRODUCTS', [
          ...this.products.slice(0, index),
          updatedProduct,
          ...this.products.slice(index + 1)
        ]);
        this.showEditModal = false;
      }
    },

    /**
     * Elimina un producto del estado global después de confirmar la acción.
     * @param {number} id - El ID del producto a eliminar.
     */
    deleteProduct(id) {
      if (confirm('¿Estás seguro de eliminar este producto?')) {
        this.$store.commit('SET_PRODUCTS', this.products.filter(p => p.id !== id));
      }
    }
  }
}
</script>



<style scoped>
/* Estilos generales para la vista administrativa */
p {
  font-family: "Anton", sans-serif;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  margin-top: 5rem;
  font-size: xx-large;
}

.admin-view {
  padding: 20px;
}

.admin-view__title--center {
  text-align: center;
}

.admin-view__form-container {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.admin-view__form {
  display: flex;
  flex-direction: column;
}

.admin-view__form-title {
  margin-bottom: 15px;
  font-size: 20px;
}

.admin-view__table-container {
  margin-top: 40px;
}

.admin-view__table-title {
  font-size: 20px;
  margin-bottom: 15px;
}

.table-responsive {
  overflow-x: auto;
}

/* Estilos específicos del modal */
.modal {
  display: block; /* Show the modal by default */
  background: rgba(0, 0, 0, 0.5); /* Overlay effect */
}

.modal-dialog {
  max-width: 500px;
  margin: 1.75rem auto;
}

.modal-content {
  padding: 20px;
}
</style>
