<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<b-row v-if="showList" align-h="center">
			<b-col md="12">
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
									<tr v-for="(data,index) in users" :key="index">
										<td>{{index}}</td>
										<td>{{data.name}}</td>
										<td>{{data.disabled}}</td>
										<td>{{data.creation |formatDate}}</td>
										<td>{{data.telephone}}</td>
									</tr>
								</tbody>

							</table>
						</div>
						<b-row class=" mt-5">
							<b-col class="text-left" v-if="!checkUser.hasMore">
								Plus aucun utilisateurs à afficher
							</b-col>
							<b-col class="text-right">
								<b-button @click="getUsers" variant="primary">Voir plus</b-button>
							</b-col>
						</b-row>
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
		methods: {
			...mapActions("categorie", ["getUsers"]),
		},
		computed: {
			...mapState({
				checkUser: (state) => state.categorie.checkUser,
			}),
			...mapGetters("categorie", {
				users: "getUsers",
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