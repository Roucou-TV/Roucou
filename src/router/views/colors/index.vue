<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<transition name="fade" mode="out-in">
			<b-row v-if="showList" align-h="center" key="first">
				<b-col md="12">
					<div class="card">
						<div class="card-body">
							<b-row class="mb-2">
								<b-col>
									<h4 class="card-title mb-4">List des couleurs</h4>
								</b-col>
								<b-col class="text-right">
									<b-button variant="primary" class="text-right" @click="showList = !showList">Ajouter une couleur</b-button>
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
											<th>Code Couleur</th>

										</tr>
									</thead>
									<tbody>
										<tr v-for="(data,index) in colors" :key="data.id">
											<td>{{index}}</td>
											<td>{{data.nom | capitalizeFirst}}</td>
											<td>{{data.code }}</td>
										</tr>
									</tbody>
								</table>
								<b-modal v-model="showModal" title="Order Details" centered>
									<p class="mb-2">
										Product id:
										<span class="text-primary">#SK2540</span>
									</p>
									<p class="mb-4">
										Billing Name:
										<span class="text-primary">Neal Matthews</span>
									</p>
									<div class="table-responsive">
										<table class="table table-centered table-nowrap">
											<thead>
												<tr>
													<th scope="col">Product</th>
													<th scope="col">Product Name</th>
													<th scope="col">Price</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th scope="row">
														<div>
															<img src="@/assets/images/product/img-7.png" alt class="avatar-sm" />
														</div>
													</th>
													<td>
														<div>
															<h5 class="text-truncate font-size-14">Wireless Headphone (Black)</h5>
															<p class="text-muted mb-0">$ 225 x 1</p>
														</div>
													</td>
													<td>$ 255</td>
												</tr>
												<tr>
													<th scope="row">
														<div>
															<img src="@/assets/images/product/img-4.png" alt class="avatar-sm" />
														</div>
													</th>
													<td>
														<div>
															<h5 class="text-truncate font-size-14">Phone patterned cases</h5>
															<p class="text-muted mb-0">$ 145 x 1</p>
														</div>
													</td>
													<td>$ 145</td>
												</tr>
												<tr>
													<td colspan="2">
														<h6 class="m-0 text-right">Sub Total:</h6>
													</td>
													<td>$ 400</td>
												</tr>
												<tr>
													<td colspan="2">
														<h6 class="m-0 text-right">Shipping:</h6>
													</td>
													<td>Free</td>
												</tr>
												<tr>
													<td colspan="2">
														<h6 class="m-0 text-right">Total:</h6>
													</td>
													<td>$ 400</td>
												</tr>
											</tbody>
										</table>
									</div>
									<template v-slot:modal-footer>
										<b-button variant="secondary" @click="showModal = false">Close</b-button>
									</template>
								</b-modal>
							</div>
							<b-row class=" mt-5">
								<b-col class="text-left" v-if="!checkColor.hasMore">
									Plus aucune couleur à afficher
								</b-col>
								<b-col class="text-right">
									<b-button @click="getColor" variant="primary">Voir plus</b-button>
								</b-col>
							</b-row>
						</div>
					</div>
				</b-col>
			</b-row>
			<b-row align-h="center" v-else key="second">
				<b-col cols="6">
					<ValidationObserver ref="observer" v-slot="{ handleSubmit }">
						<b-form @submit.prevent.stop="handleSubmit(add)" @reset.prevent.stop="reset" novalidate>
							<div class="card">
								<div class="card-body">
									<h4 class="card-title">
										Ajouter une couleur
									</h4>
									<p class="card-title-desc">
										* Toutes les informations sont obligatoires
									</p>

									<b-row>
										<b-col cols="12">
											<ValidationProvider rules="required|isDifferent:@emission" v-slot="validationContext" name="Nom" mode="passive" vid="nom">
												<b-form-group :invalid-feedback="validationContext.errors[0]" :state="
													getValidationState(validationContext)">
													<label for="nom">Nom</label>
													<b-input-group preprend="@">
														<b-form-input id="nom" v-model.trim="color.nom" name="nom" type="text" class="form-control" size="sm" placeholder="" autocomplete="off">
														</b-form-input>

													</b-input-group>
												</b-form-group>
											</ValidationProvider>
											<ValidationProvider :rules="{ required: true }" v-slot="validationContext" name="Code" mode="passive">
												<b-form-group :invalid-feedback="
													validationContext.errors[0]
												" :state="
													getValidationState(
														validationContext
													)
												">
													<label for="color">Code Couleur</label>
													<b-input-group class="mb-2">
														<b-form-input size="sm" id="color" name="color" type="number" v-model.trim="
															color.code" autocomplete="off">
														</b-form-input>

													</b-input-group>
												</b-form-group>
											</ValidationProvider>
											<b-row>
												<b-col>
													<b-form-group class="text-left">
														<b-button type="reset" variant="primary">
															<b-icon icon="arrow-counterclockwise" aria-hidden="true" :disabled="isloading"></b-icon>Reinitialiser
														</b-button>
													</b-form-group>
												</b-col>
												<b-col>
													<b-form-group class="text-right">
														<b-button @click.prevent="goBack" class="
															btn btn-secondary
															mr-1
														" :disabled="isloading">
															Annuler
														</b-button>
														<b-button type="submit" variant="primary" :disabled="isloading">
															<b-spinner v-if="isloading" small type="grow"></b-spinner>
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
	import { mapActions, mapState } from "vuex";

	export default {
		page: {
			title: "Color",
			meta: [{ name: "description", content: appConfig.description }],
		},
		components: {
			Layout,
			PageHeader,
		},
		computed: {
			...mapState({
				colors: (state) => state.categorie.colors,
				checkColor: (state) => state.categorie.checkColor,
			}),
		},
		data() {
			return {
				title: "Color",
				error: null,
				isloading: false,
				showList: true,
				showModal: false,
				items: [
					{
						text: "Color",
						to: "/colors",
					},
					{
						text: "Default",
						active: true,
					},
				],
				color: {
					nom: "",
					code: "",
				},
			};
		},
		methods: {
			...mapActions("categorie", ["addColor", "getColor"]),
			getValidationState({ dirty, validated, valid = null }) {
				return dirty || validated ? valid : null;
			},
			async add() {
				return this.addColor(this.color)
					.then((result) => {
						this.$toast("Une couleur a été ajouté", { icon: false });
						this.isloading = !this.isloading;
						setTimeout(() => {
							this.showList = !this.showList;
							this.reset()
						}, 2000);
					})
					.catch((err) => {
						this.$toast("Impossible d'ajouter une couleur", {
							icon: true,
							type: "error",
						});
					});
			},
			reset() {
				this.color = {
					nom: "",
					code: "",
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