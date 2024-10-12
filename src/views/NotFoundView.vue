<template>
  <div class="not-found">
    <section class="not-found__section">
      <!-- Título de la página de error 404 -->
      <h2 class="not-found__title">Página no encontrada</h2>
      <!-- Mensaje que indica que la página no existe -->
      <p class="not-found__message">Lo sentimos, la página que buscas no existe.</p>
      <!-- Enlace para regresar al inicio -->
      <router-link class="btn btn-primary not-found__link" to="/">Volver al inicio</router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
}
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center; 
  align-items: center; 
  height: 100vh; 
  padding: 1rem; 
}

.not-found__section {
  text-align: center; 
  max-width: 600px; 
  margin: 0 auto; 
}


.not-found__title {
  font-size: 2rem; 
  margin-bottom: 1rem; 
}

.not-found__message {
  font-size: 1.25rem; 
  margin-bottom: 1.5rem; 
}


.not-found__link {
  text-decoration: none; 
}
</style>
