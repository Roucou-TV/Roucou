<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<b-row v-if="showList" align-h="center">
			<b-col md="8">
				<div class="card">
					<div class="card-body">
						<b-row class="mb-2">
							<b-col>
								<h4 class="card-title mb-4">Liste des utilisateurs</h4>
							</b-col>

						</b-row>
						<div class="table-responsive mb-0">
							<table class="table table-centered table-nowrap">
								<thead class="thead-light">
									<tr>
										<th style="width: 20px;">
											#
										</th>
										<th>Nom</th>
										<th>Actif</th>
										<th>Creation</th>
										<th>Téléphone</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="data in users" :key="data.id">
										<td>{{data.id}}</td>
										<td>{{data.name}}</td>
										<td>{{data.disabled}}</td>
										<td>{{data.creation}}</td>
										<td>{{data.telephone}}</td>
									</tr>
								</tbody>
							</table>

						</div>
					</div>
				</div>
			</b-col>
		</b-row>
	</Layout>
</template>

<script>
	import Layout from "../../layouts/main";
	import appConfig from "@/app.config";
	import PageHeader from "@/components/page-header";
	import { mapActions, mapState, mapGetters } from "vuex";

	export default {
		name: "users",
		page: {
			title: "Users",
			meta: [{ name: "description", content: appConfig.description }],
		},
		components: {
			Layout,
			PageHeader,
		},
		computed: {
			// ...mapState({
			// 	optionsCategories: (state) => state.categorie.optionsCategories,
			// 	channels: (state) => state.categorie.channels,
			// }),
			...mapGetters("categorie",{
				users: "getUsers"
			}),
		},
		data() {
			return {
				title: "Users",
				showList: true,
				showModal: true,
				items: [
					{
						text: "Users",
						to: "/users",
					},
					{
						text: "Default",
						active: true,
					},
				],
			};
		},
	};
</script>

<style lang="scss" scoped>
</style>