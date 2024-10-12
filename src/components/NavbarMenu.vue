<template>
  <nav class="navbar">
    <div class="navbar__container">
      <!-- Enlace a la página principal -->
      <router-link class="navbar__brand" to="/">Casa Ideal</router-link>
      <div class="navbar__collapse" id="navbarNav">
        <ul class="navbar__links">
          <!-- Enlaces a redes sociales -->
          <li class="navbar__item">
            <router-link class="navbar__link" to="/">Inicio</router-link>
          </li>
          <li class="navbar__item">
            <router-link class="navbar__link" to="/product">Productos</router-link>
          </li>
          <li class="navbar__item">
            <router-link class="navbar__link" to="/admin">Administración</router-link>
          </li>
          <li class="navbar__item">
            <router-link class="navbar__link" to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarMenu'
}
</script>

<style scoped>
/* Bloque principal de la barra de navegación */
.navbar {
  width: 100%;
  background-color: #eaf3fc;
}

/* Contenedor de la barra de navegación */
.navbar__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

/* Marca de la barra de navegación */
.navbar__brand {
  text-decoration: none;
  font-size: 3rem;
  color: #343A40;
  font-family: "Anton", sans-serif;
}

/* Lista de enlaces de navegación */
.navbar__links {
  display: flex;
  gap: 1rem;
  padding-left: 0;
  list-style: none;
}

/* Enlace de navegación individual */
.navbar__link {
  text-decoration: none;
  color: #343A40;
  font-size: 1.5rem;
  font-family: "Anton", sans-serif;
}

/* Efecto hover en los enlaces */
.navbar__link:hover {
  color: #2D9CDB;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .navbar__links {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }
}
</style>
