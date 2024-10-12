<template>
  <footer class="footer">
    <div class="footer__container">
      <!-- Título del pie de página -->
      <h2 class="footer__title">Casa Ideal</h2>
      <!-- Enlaces a redes sociales -->
      <div class="footer__social-links">
        <a href="https://www.tiktok.com/explore" target="_blank" class="footer__link">
          <i class="fa-brands fa-tiktok footer__icon"></i>
          <span class="footer__text">Tik-Tok</span>
        </a>
        <a href="https://www.facebook.com/" target="_blank" class="footer__link">
          <i class="fa-brands fa-facebook footer__icon"></i>
          <span class="footer__text">Facebook</span>
        </a>
        <a href="https://www.instagram.com/" target="_blank" class="footer__link">
          <i class="fa-brands fa-instagram footer__icon"></i>
          <span class="footer__text">Instagram</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterLink',
}
</script>

<style scoped>
/* Bloque principal del pie de página */
.footer {
  width: 100%;
  height: 90px;
  position: fixed;
  bottom: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}

/* Contenedor de elementos dentro del pie de página */
.footer__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Título del pie de página */
.footer__title {
  margin: 0 0 0.5rem 0;
  color:#343A40;
}

/* Enlaces a redes sociales */
.footer__social-links {
  display: flex;
  gap: 1.5rem;
}

/* Enlace individual a red social */
.footer__link {
  text-decoration: none;
  color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Texto e iconos de los enlaces */
.footer__text,
.footer__icon {
  margin-bottom: 0.25rem;
  font-size: 1.5rem;
 
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .footer__social-links {
    flex-direction: row;
  }

  .footer__link {
    margin-bottom: 1rem;
  }
}
</style>
