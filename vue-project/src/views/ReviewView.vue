<template>
  <main>
    <section class="container">
      <form @submit.prevent="submitForm">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" v-model="nombre" required>
        <label for="comentario">Comentario:</label>
        <input type="text" id="comentario" name="comentario" v-model="comentario" required>
        <label for="estrellas">Calificación:</label>
        <select id="estrellas" name="estrellas" v-model="estrellas" required>
          <option value="" disabled selected>Selecciona una calificación</option>
          <option value="5">5 estrellas</option>
          <option value="4">4 estrellas</option>
          <option value="3">3 estrellas</option>
          <option value="2">2 estrellas</option>
          <option value="1">1 estrella</option>
        </select>
        <input type="submit" value="Enviar">
      </form>
    </section>
    <br>

    <div class="container">
      <div v-for="comentario in comentarios" :key="comentario.id">
        <h4>{{ comentario.nombre }}</h4>
        <p>{{ comentario.comentario }}</p>
        <p>Calificación: {{ comentario.estrellas }} estrellas</p>
        <button @click="borrarComentario(comentario.id)">Borrar</button>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import { agregarComentario, suscribirseComentarios, borrarComentarioFirestore } from '@/firebase.js';

export default {
  setup() {
    const nombre = ref('');
    const comentario = ref('');
    const estrellas = ref('');
    const comentarios = ref([]);

    const submitForm = async () => {
      const comentarioData = {
        nombre: nombre.value,
        comentario: comentario.value,
        estrellas: estrellas.value
      };

      await agregarComentario(comentarioData);

      // Limpiar los campos del formulario después de enviar
      nombre.value = '';
      comentario.value = '';
      estrellas.value = '';
    };

    const borrarComentario = async (comentarioId) => {
      await borrarComentarioFirestore(comentarioId);
    };

    onMounted(async () => {
      const unsubscribe = suscribirseComentarios((comentariosData) => {
        comentarios.value = comentariosData;
      });

      // Cuando el componente se desmonta, dejamos de escuchar los cambios en tiempo real
      return unsubscribe;
    });

    return {
      nombre,
      comentario,
      estrellas,
      comentarios,
      submitForm,
      borrarComentario
    };
  }
};
</script>
