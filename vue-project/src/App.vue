<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="body">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink class="btn btn-outline-primary btn-custom" to="/">Home</RouterLink>
          <RouterLink class="btn btn-outline-primary btn-custom" to="/searchcocktails">Search Cocktails</RouterLink>
          <!-- <RouterLink class="btn btn-outline-primary btn-custom" to="/cocktails">Cocktail</RouterLink> -->
          <RouterLink class="btn btn-outline-primary btn-custom" to="/review">Review</RouterLink>
          <!-- Iniciar sesión -->
          <button type="button" class="btn btn-outline-primary btn-custom" data-bs-toggle="modal" data-bs-target="#login">
            Log in
          </button>
          <!-- Cerrar sesión -->
          <button class="btn btn-outline-primary btn-custom" data-bs-toggle="modal" data-bs-target="#login" @click="signout">
            Log out
          </button>
          <!-- Regístrate -->
          <button type="button" class="btn btn-outline-primary btn-custom" data-bs-toggle="modal"
            data-bs-target="#registro"><!-- inicia modal con id="registro" -->
            Regístrate
          </button>
        </nav>

        <!-- //// Modal - Registrarse //// -->
        <div class="modal fade" id="registro">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-black">Regístrate</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="register(this.email, this.password)">
                  <!-- CORREO -->
                  <div class="input-group mb-3">
                    <span class="input-group-text">Correo</span>
                    <input v-model="email" type="email" required="true" class="form-control">
                  </div>
                  <!-- PASSWORD -->
                  <div class="input-group mb-3">
                    <span class="input-group-text">Password</span>
                    <input v-model="password" type="password" required="true" class="form-control">
                  </div>
                  <!-- REPASSWORD -->
                  <div class="input-group mb-3">
                    <span class="input-group-text">Repite Password</span>
                    <input v-model="repassword" type="password" required="true" class="form-control">
                  </div>
                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Registrar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


        <!-- //// Modal - Iniciar sesión //// -->
        <div class="modal fade" id="login">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-black">Inicia de sesión</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="login(this.email, this.password)">
                  <!-- CORREO -->
                  <div class="input-group mb-3">
                    <span class="input-group-text">Correo</span>
                    <input v-model="email" type="email" required="true" class="form-control">
                  </div>
                  <!-- PASSWORD -->
                  <div class="input-group mb-3">
                    <span class="input-group-text">Password</span>
                    <input v-model="password" type="password" required="true" class="form-control">
                  </div>
                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal"><!-- Cierra el modal -->
                      Iniciar sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <RouterView />

    <footer>
      <div class="footer-left">
        <h1>CONTACTS:</h1>
        <a href="#"><i class="bi bi-instagram"></i></a>
        <a href="#"><i class="bi bi-facebook"></i></a>
        <a href="#"><i class="bi bi-twitter"></i></a>
      </div>
      <!-- <div class="footer-middle">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.0960799497547!2d-75.6951075855813!3d4.788583842058218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f8e2396c902d5%3A0xd8dc9992ca5eb5c5!2sBarranquilla%2C%20Atl%C3%A1ntico%2C%20Colombia!5e0!3m2!1sen!2sus!4v1651447012791!5m2!1sen!2sus"
              width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
          </div> -->
      <div class="footer-right">
        © 2023 Todos los derechos reservados |
      </div>
    </footer>
  </div>
</template>


<script>
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

export default {
  name: 'Navbar',
  data() {
    return {
      email: '',
      password: '',
      repassword: '',
      errorMessage: ''
    };
  },
  methods: {
    register(email, password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert('¡Registrado!');
        })
        .catch((error) => {
          const errorCode = error.code;
          this.errorMessage = error.message;
          alert(this.errorMessage);
          // ..
        });
    },
    login(email, password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert('¡Sesión iniciada!');
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          this.errorMessage = error.message;
          alert(this.errorMessage);
        });
    },
    signout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        alert('¡Sesión cerrada! Inicia sesión.');
      }).catch((error) => {
      });
    }
  }
}
</script>

