<template>
    <div class="container">
        <header>
            <h1>Carrito de Compra</h1>
        </header>
        <div v-if="cartItems.length === 0">
            <p>No hay elementos en el carrito</p>
        </div>
        <div v-else>
            <div v-for="item in cartItems" :key="item.id">
                <img :src="item.image" :alt="item.name" width="100" height="100">
                <p>{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';

export default {
    name: 'CartView',
    setup() {
        const cartItems = ref([]);

        onMounted(() => {
            // Obtén los elementos del carrito desde Firestore
            db.collection('cartItems')
                .get()
                .then(querySnapshot => {
                    cartItems.value = querySnapshot.docs.map(doc => doc.data());
                })
                .catch(error => {
                    console.log('Error al obtener los elementos del carrito:', error);
                });
        });

        return {
            cartItems
        };
    }
};
</script>

