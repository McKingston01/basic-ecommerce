<template>
  <div>
    <!-- Barra de navegación principal -->
    <nav>
      <NavbarMenu />
    </nav>

    <!-- Sección principal de la vista -->
    <section>
      <!-- Encabezado de la página -->
      <h1>
        <HeaderPage />
      </h1>

      <!-- Área para mostrar las vistas anidadas (rutas) -->
      <router-view />
    </section>
  </div>
</template>

<script>
import NavbarMenu from '@/components/NavbarMenu.vue';
import HeaderPage from '@/components/HeaderPage.vue';

export default {
  name: 'HomeView',
  components: {
    NavbarMenu,
    HeaderPage,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');


* {
  margin: 0;
  padding: 0;
  box-sizing: 0;
}

body {
  background-color:white;
}

h1 {
  color: #343A40;
  font-family: "Anton", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 50px;
}

h2 {
  color: #2D9CDB;
  font-family: "Anton", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 40px;

}
h3 {
  font-family: "Big Shoulders Stencil Text", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  color: #343A40;
}
p{
  color: #343A40;
  font-family: "Anton", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>