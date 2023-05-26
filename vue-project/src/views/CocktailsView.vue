<template>
  <section class="container">
    <h1>{{ cocktailName }}</h1>
    <img :src="cocktailImage" alt="Nombre del Cocktail" width="200" height="150">
    <br>
    <ul>
      <hr>
      <li v-for="ingredient in cocktailIngredients" :key="ingredient.name">
        {{ ingredient.name }}
        <img :src="ingredient.image" alt="" width="200" height="150">
      </li>
    </ul>
    <p>{{ cocktailInstructions }}</p>
  </section>
  <section class="text-center">
    <p>Precio: {{ cocktailPrice }}</p>
    <form>
      <label for="cantidad">Cantidad:</label>
      <input type="number" id="cantidad" name="cantidad" min="1" max="10" v-model="cantidad" />
      <button type="submit">Agregar al carrito</button>
    </form>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'CocktailsView',
  props: ['id'],
  setup() {
    const cocktailName = ref('');
    const cocktailImage = ref('');
    const cocktailIngredients = ref([]);
    const cocktailInstructions = ref('');
    const cocktailPrice = ref(0);
    const cantidad = ref(1);

    const route = useRoute();

    onMounted(() => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${route.params.id}`)
        .then(response => response.json())
        .then(data => {
          const cocktail = data.drinks[0];
          cocktailName.value = cocktail.strDrink;
          cocktailImage.value = cocktail.strDrinkThumb;
          cocktailIngredients.value = extractIngredients(cocktail);
          cocktailInstructions.value = cocktail.strInstructions;
          cocktailPrice.value = getPrice();
        });
    });

    const extractIngredients = (cocktail) => {
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredientName = cocktail[`strIngredient${i}`];
        const ingredientMeasure = cocktail[`strMeasure${i}`];
        if (ingredientName && ingredientMeasure) {
          ingredients.push({
            name: ingredientName,
            measure: ingredientMeasure,
            // You may need to adjust the URL format depending on the API response structure
            image: `https://www.thecocktaildb.com/images/ingredients/${ingredientName}.png`
          });
        }
      }
      return ingredients;
    };

    const getPrice = () => {
      // calcular precio del cóctel
      return '$X';
    };

    return {
      cocktailName,
      cocktailImage,
      cocktailIngredients,
      cocktailInstructions,
      cocktailPrice,
      cantidad
    };
  }
};
</script>

