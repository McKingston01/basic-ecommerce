<template>
  <section class="login">
    <!-- Título del formulario de inicio de sesión -->
    <h2 class="login__title">Iniciar Sesión</h2>
    <form class="login__form" @submit.prevent="performLogin">
      <!-- Campo para el correo del usuario -->
      <div class="form-group">
        <label for="username" class="form-label">Correo:</label>
        <input v-model="username" type="text" id="username" class="form-control" required>
      </div>

      <!-- Campo para la contraseña del usuario -->
      <div class="form-group">
        <label for="password" class="form-label">Contraseña:</label>
        <input v-model="password" type="password" id="password" class="form-control" required>
      </div>

      <!-- Botón para enviar el formulario de inicio de sesión -->
      <button type="submit" class="btn btn-primary login__submit-button">Iniciar Sesión</button>

      <!-- Mensaje de error en caso de fallo en el inicio de sesión -->
      <p v-if="loginError" class="login__error">{{ loginError }}</p>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',   // Correo del usuario ingresado
      password: '',   // Contraseña del usuario ingresada
      loginError: null, // Mensaje de error en caso de fallo en el inicio de sesión
    };
  },
  methods: {
    ...mapActions(['login']),
    /**
     * Realiza el inicio de sesión del usuario.
     * Envía el correo y la contraseña a la acción de inicio de sesión en Vuex.
     * Si el inicio de sesión es exitoso, redirige al usuario al panel de administración.
     * Si hay un error, muestra un mensaje de error.
     */
    async performLogin() {
      try {
        const success = await this.login({ username: this.username, password: this.password });
        if (success) {
          alert(`Bienvenido ${this.$store.state.currentUser.nombre}`);
          this.$router.push('/');
        } else {
          this.loginError = 'Nombre de usuario o contraseña incorrectos.';
        }
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        this.loginError = 'Hubo un problema con la solicitud.';
      }
    }
  }
}
</script>

<style scoped>
/* Estilos para el contenedor principal del formulario de inicio de sesión */
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f8f9fa; 
}


.login__title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}


.login__form {
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}


.form-label {
  font-weight: bold;
}


.login__submit-button {
  width: 100%;
}

.login__error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
