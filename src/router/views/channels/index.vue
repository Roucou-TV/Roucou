<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<transition name="fade" mode="out-in">
			<b-row v-if="showList" align-h="center">
				<b-col md="12">
					<div class="card">
						<div class="card-body">
							<b-row class="mb-2">
								<b-col>
									<h4 class="card-title mb-4">List des chaines</h4>
								</b-col>
								<b-col class="text-right">
									<b-button variant="primary" class="text-right" @click="showList = !showList">Ajouter une chaine</b-button>
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
											<th>Description</th>
											<th>Categorie</th>
											<th>Lien</th>
											<th>Caption</th>
											<th>Description</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(data,index) in channels" :key="index">
											<td>{{index}}</td>
											<td>{{data.nom}}</td>
											<td>{{data.description}}</td>
											<td>{{data.categorie}}</td>
											<td>{{data.lien}}</td>
											<td>{{data.caption}}</td>
											<td>{{data.Description}}</td>
										</tr>
									</tbody>
								</table>

							</div>
							<b-row class=" mt-5">
								<b-col class="text-left" v-if="!checkChannel.hasMore">
									Plus aucune chaines à afficher
								</b-col>
								<b-col class="text-right">
									<b-button @click="getChannel" variant="primary">Voir plus</b-button>
								</b-col>
							</b-row>
						</div>
					</div>
				</b-col>
			</b-row>
			<b-row align-h="center" v-else>
				<b-col cols="6">
					<ValidationObserver ref="observer" v-slot="{ handleSubmit }">
						<b-form @submit.prevent.stop="handleSubmit(add)" @reset.prevent.stop="reset" novalidate>
							<div class="card">
								<div class="card-body">
									<h4 class="card-title">
										Ajouter une chaines
									</h4>
									<p class="card-title-desc">
										* Toutes les informations sont obligatoires
									</p>

									<b-row>
										<b-col cols="12">
											<ValidationProvider rules="required" v-slot="validationContext" name="Nom" mode="passive" vid="nom">
												<b-form-group :invalid-feedback="validationContext.errors[0]" :state="
													getValidationState(validationContext)">
													<label for="emailadmin">Nom</label>
													<b-input-group preprend="@">
														<b-form-input id="nom" v-model.trim="chaine.nom
														" name="nom" type="text" class="form-control" size="sm" placeholder="" autocomplete="off"></b-form-input>

													</b-input-group>
												</b-form-group>
											</ValidationProvider>
											<ValidationProvider rules="required" v-slot="validationContext" name="Couleur" mode="passive">
												<b-form-group :invalid-feedback="
													validationContext.errors[0]
												" :state="
													getValidationState(
														validationContext
													)
												">
													<label for="passwordadmin">Couleur</label>
													<b-input-group class="mb-2">
														<b-form-select v-model="chaine.color" :options="optionsColor"></b-form-select>
													</b-input-group>
												</b-form-group>
											</ValidationProvider>
											<ValidationProvider rules="required" v-slot="validationContext" name="Categorie" mode="passive" vid="categorie">
												<b-form-group :invalid-feedback="
													validationContext.errors[0]
												" :state="
													getValidationState(
														validationContext
													)
												">
													<label for="passwordadmin">Categorie</label>
													<b-input-group class="mb-2">
														<b-form-select v-model="chaine.categorie" :options="optionsCategories"></b-form-select>

													</b-input-group>
												</b-form-group>
											</ValidationProvider>
											<ValidationProvider rules="required" v-slot="validationContext" name="Lien" mode="passive">
												<b-form-group :invalid-feedback="
													validationContext.errors[0]
												" :state="
													getValidationState(
														validationContext
													)
												">
													<label for="lienChaine">Lien</label>
													<b-input-group class="mb-2">
														<b-form-input size="sm" id="lienChaine" name="lienChaine" type="text" v-model.trim="
															chaine.lien
														" autocomplete="off" />
													</b-input-group>
												</b-form-group>
											</ValidationProvider>
											<ValidationProvider rules="required" v-slot="validationContext" name="Description" mode="passive">
												<b-form-group :invalid-feedback="
													validationContext.errors[0]
												" :state="
													getValidationState(
														validationContext
													)
												">
													<label for="descriptionChaine">Description</label>
													<b-input-group class="mb-2">
														<b-form-textarea size="sm" id="descriptionChaine" name="descriptionChaine" type="text" v-model.trim="
															chaine.description
														" autocomplete="off" />
													</b-input-group>
												</b-form-group>
											</ValidationProvider>
											<b-row>
												<b-col>
													<b-form-group class="text-left">
														<b-button type="reset" variant="primary" :disabled="isloading">
															<b-icon icon="arrow-counterclockwise" aria-hidden="true"></b-icon>Réinitialiser
														</b-button>
													</b-form-group>
												</b-col>
												<b-col>
													<b-form-group class="text-right">
														<b-button @click.prevent="goBack" class="btn btn-secondary mr-1
														" :disabled="isloading">
															Annuler
														</b-button>
														<b-button type="submit" variant="primary" :disabled="isloading">
															<b-spinner v-if="isloading" small></b-spinner>
															Enregistrer
														</b-button>
													</b-form-group>
												</b-col>
											</b-row>
										</b-col>
									</b-row>
								</div>
							</div>
							<b-form-valid-feedback :state="error != null">
								OK.
							</b-form-valid-feedback>
							<b-form-invalid-feedback :state="error == null" class="pt-2 text-center">
								{{ error }}
							</b-form-invalid-feedback>
						</b-form>
					</ValidationObserver>
				</b-col>
			</b-row>
		</transition>

	</Layout>
</template>
<script>
	import Layout from "../../layouts/main";
	import appConfig from "@/app.config";
	import PageHeader from "@/components/page-header";
	import { mapActions, mapGetters, mapState } from "vuex";

	export default {
		page: {
			title: "Chaines",
			meta: [{ name: "description", content: appConfig.description }],
		},
		components: {
			Layout,
			PageHeader,
		},
		data() {
			return {
				title: "Chaine",
				error: null,
				isloading: false,
				showList: true,
				showModal: false,
				items: [
					{
						text: "Chaine",
						to: "/channels",
					},
					{
						text: "Default",
						active: true,
					},
				],
				chaine: {
					nom: "",
					categorie: "",
					description: "",
					img: "",
					lien: "",
					vues: "",
					caption: "",
				},
			};
		},
		computed: {
			...mapState({
				checkChannel: (state) => state.categorie.checkChannel,
			}),
			...mapGetters("categorie", {
				optionsCategories: "optionsCategories",
				optionsColor: "optionsColor",
				channels: "getChannels",
			}),
		},
		methods: {
			...mapActions("categorie", ["addChannel", "getChannel"]),
			getValidationState({ dirty, validated, valid = null }) {
				return dirty || validated ? valid : null;
			},
			async add() {
				this.isloading = !this.isloading;
				return this.addChannel(this.chaine)
					.then((result) => {
						this.isloading = !this.isloading;
						this.$toast("Une chaine a été ajouté", { icon: false });
						setTimeout(() => {
							this.showList = !this.showList;
							this.reset()
						}, 2000);
					})
					.catch((err) => {
						console.log(err);
						this.isloading = !this.isloading;
						this.$toast("Impossible d'ajouter une chaine", { icon: true,type:'error' });
					});
			},
			reset() {
				this.chaine = {
					nom: "",
					categorie: "",
					color: "",
					caption: "",
					description: "",
					lien: "",
				};
				this.$nextTick(() => {
					this.$refs.observer.reset();
				});
			},
			goBack() {
				this.showList = !this.showList;
			},
		},
	};
</script>