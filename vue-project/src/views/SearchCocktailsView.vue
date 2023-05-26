<template>
	<div class="container">
		<header>
			<h1>Bar Menu</h1>
		</header>
		<div class="row">
			<div class="col-md-8">
				<nav>
					<ul>
						<li>
							<h2>Cocktails</h2>
							<hr>
							<ul>
								<li v-for="bebida in listaBebidas" :key="bebida">
									<h3>{{ bebida.strDrink }}</h3>
									<img :src="bebida.strDrinkThumb" width="150" alt="">
									<p class="description">{{ bebida.strInstructions }}</p>
									<button class="btn-custom-menu" @click="showCocktailDetails(bebida)">Details</button>
									<button class="btn-cart-menu"><span class="bi bi-cart-menu"></span> Add to cart</button>
									<hr>
								</li>
							</ul>
						</li>
					</ul>
				</nav>
			</div>

			<div class="col-md-4">
				<div class="search-box">
					<input type="text" placeholder="Search" v-model="pesquisa">
					<button @click="getLista"><span class="bi bi-search"></span></button>
				</div>
				<div v-for="item in lista" :key="item">
					<img :src="item" alt="" width="150">
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
// para acceder al enrutador de Vue.
import { useRouter } from 'vue-router';

const pesquisa = ref('');//valor de la pesquiça
const lista = ref([]);//uma lista de imágenes.
const listaBebidas = ref([]);//lista de objetos de coaktails 
const router = useRouter();//acceder al enrutador de Vue, para aceder a pagina de 'details'

const getLista = () => {//filtra as bebidas atraves do input
	fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
		.then(data => data.json())
		.then(res => {
			listaBebidas.value = res.drinks.filter(bebida => bebida.strDrink.toLowerCase().includes(pesquisa.value.toLowerCase()));
		});
};

fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
	.then(data => data.json())//procura os 'Ordinary Drinks' 
	.then(res => {
		listaBebidas.value = res.drinks;
	}); 

const showCocktailDetails = (cocktail) => {//redirigir atraves do id 
	router.push({ name: 'cocktails', params: { id: cocktail.idDrink } });
};
</script>
