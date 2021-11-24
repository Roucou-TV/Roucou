<template>
	<div>
		Le monde est claire <br>
		<div class="container">
			<div class="row">
				<b-button @click="getColor" >Get Color</b-button>
				<b-button @click="getCategorie">Get CHannels</b-button>
				<b-button @click="getChannel">Get Categories</b-button>
			</div>
		</div>
		<div>{{colors}}</div><br>
		<div>{{channels}}</div><br>
		<div>{{categorys}}</div><br>

	</div>
</template>

<script>
	import { mapActions, mapState } from "vuex";
	export default {
		name: "",
		computed: {
			...mapState({
				categorys: (state) => state.categorie.categorys,
				colors: (state) => state.categorie.colors,
				channels: (state) => state.categorie.channels,
			}),
		},
        methods:{
            ...mapActions('categorie',['getColor',"getChannel","getCategorie"])
        }
	};
</script>

<style lang="scss" scoped>
</style>