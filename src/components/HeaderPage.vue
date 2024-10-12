<template>
  <header class="header">
    <!-- Muestra el título de la página -->
    <h1 class="header__title">{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: 'HeaderPage',
  computed: {
    // Computed property para obtener el título desde las meta propiedades de la ruta
    title() {
      return this.$route.meta.title;
    }
  }
}
</script>

<style scoped>
/* Bloque principal del header */
.header {
  text-align: center;
  background-color: white;
  padding: 1rem 0; 
}

/* Título dentro del header */
.header__title {
  font-size: 3rem; 
  color: #333; 
}
</style>
