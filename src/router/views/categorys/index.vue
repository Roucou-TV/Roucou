<template>
	<Layout>
		<PageHeader :title="title" :items="items" />

		<b-row v-if="showList">
			<b-col>
				<div class="card">
					<div class="card-body">
						<b-row class="mb-2">
							<b-col>
								<h4 class="card-title mb-4">List des categories</h4>
							</b-col>
							<b-col class="text-right">
								<b-button variant="primary" class="text-right" @click="showList = !showList">Ajouter une categorie</b-button>
							</b-col>
						</b-row>

						<div class="table-responsive mb-0">
							<table class="table table-centered table-nowrap">
								<thead class="thead-light">
									<tr>
										<th>ID</th>
										<th>Nom</th>
										<th>Caption</th>
										<th>Couleur</th>
										<th>Emission</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(data,index) in categorys" :key="index">
										<td>
											{{index}}
										</td>
										<td>{{data.nom}}</td>
										<td>{{data.caption}}</td>
										<td>{{data.couleur}}</td>
										<td>{{data.emission}}</td>
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
							<b-col class="text-left" v-if="!checkCat.hasMore">
								Plus aucune categorie à afficher
							</b-col>
							<b-col class="text-right">
								<b-button @click="getCategorie" variant="primary">Voir plus</b-button>
							</b-col>
						</b-row>
					</div>
				</div>
			</b-col>

		</b-row>
		<b-row v-else align-h="center">
			<b-col cols="6">
				<ValidationObserver ref="observer" v-slot="{ handleSubmit }">
					<b-form @submit.prevent.stop="handleSubmit(addCategorie)" @reset.prevent.stop="reset" novalidate>
						<div class="card">
							<div class="card-body">
								<h4 class="card-title">
									Ajouter une categorie
								</h4>
								<p class="card-title-desc">
									* Toutes les informations sont obligatoires
								</p>

								<b-row>
									<b-col cols="12">
										<ValidationProvider rules="required|isDifferent:@emission" v-slot="validationContext" name="Nom" mode="passive" vid="nom">
											<b-form-group :invalid-feedback="validationContext.errors[0]" :state="
													getValidationState(validationContext)">
												<label for="emailadmin">Nom</label>
												<b-input-group preprend="@">
													<b-form-input id="nom" v-model.trim="categorie.nom
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
													<b-form-input size="sm" id="passwordadmin" name="passwordadmin" type="text" v-model.trim="
															categorie.couleur" autocomplete="off">
													</b-form-input>

												</b-input-group>
											</b-form-group>
										</ValidationProvider>
										<ValidationProvider rules="required|isDifferent:@nom" v-slot="validationContext" name="Emission" mode="passive" vid="emission">
											<b-form-group :invalid-feedback="
													validationContext.errors[0]
												" :state="
													getValidationState(
														validationContext
													)
												">
												<label for="passwordadmin">Emission</label>
												<b-input-group class="mb-2">
													<b-form-input size="sm" id="passwordadmin" name="passwordadmin" type="text" v-model.trim="
															categorie.emission
														" autocomplete="off" />

												</b-input-group>
											</b-form-group>
										</ValidationProvider>
										<ValidationProvider rules="required" v-slot="validationContext" name="Caption" mode="passive">
											<b-form-group :invalid-feedback="
													validationContext.errors[0]
												" :state="
													getValidationState(
														validationContext
													)
												">
												<label for="captionCategorie">Caption</label>
												<b-input-group class="mb-2">
													<b-form-input size="sm" id="captionCategorie" name="captionCategorie" type="text" v-model.trim="
															categorie.caption
														" autocomplete="off" />
												</b-input-group>
											</b-form-group>
										</ValidationProvider>
										<b-row>
											<b-col>
												<b-form-group class="text-left">
													<b-button type="reset" variant="primary">
														<b-icon icon="arrow-counterclockwise" aria-hidden="true"></b-icon>Reinitialiser
													</b-button>
												</b-form-group>
											</b-col>
											<b-col>
												<b-form-group class="text-right">
													<b-button variant="secondary" @click.prevent="goBack" class="mr-1">
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

	</Layout>
</template>
<script>
	import Layout from "../../layouts/main";
	import appConfig from "@/app.config";
	import PageHeader from "@/components/page-header";
	import { mapActions, mapState, mapGetters } from "vuex";

	export default {
		page: {
			title: "Categorie",
			meta: [{ name: "description", content: appConfig.description }],
		},
		components: {
			Layout,
			PageHeader,
		},
		computed: {
			...mapState({
				categorys: (state) => state.categorie.categorys,
				checkCat: (state) => state.categorie.checkCat,
			}),
			...mapGetters("categorie", {
				optionsColor: "optionsColor",
			}),
		},
		data() {
			return {
				title: "Categorie",
				error: null,
				isloading: false,
				showList: true,
				showModal: false,
				items: [
					{
						text: "Categorie",
						to: "/categorys",
					},
					{
						text: "Default",
						active: true,
					},
				],
				categorie: {
					nom: "",
					emission: "",
					couleur: "",
					caption: "",
				},
				categories: [
					{
						id: "#SK2540",
						name: "Neal Matthews",
						date: "07 Oct, 2019",
						total: "$400",
						status: "Paid",
						payment: ["fa-cc-mastercard", "Mastercard"],
						index: 1,
					},
					{
						id: "#SK2541",
						name: "Jamal Burnett",
						date: "07 Oct, 2019",
						total: "$380",
						status: "Chargeback",
						payment: ["fa-cc-visa", "Visa"],
						index: 2,
					},
					{
						id: "#SK2542",
						name: "Juan Mitchell",
						date: "06 Oct, 2019",
						total: "$384",
						status: "Paid",
						payment: ["fab fa-cc-paypal", "Paypal"],
						index: 3,
					},
					{
						id: "#SK2543",
						name: "Barry Dick",
						date: "05 Oct, 2019",
						total: "$412",
						status: "Paid",
						payment: ["fa-cc-mastercard", "Mastercard"],
						index: 4,
					},
					{
						id: "#SK2544",
						name: "Ronald Taylor",
						date: "04 Oct, 2019",
						total: "$404",
						status: "Refund",
						payment: ["fa-cc-visa", "Visa"],
						index: 5,
					},
					{
						id: "#SK2545",
						name: "Jacob Hunter",
						date: "04 Oct, 2019",
						total: "$392",
						status: "Paid",
						payment: ["fab fa-cc-paypal", "Paypal"],
						index: 6,
					},
				],
			};
		},
		methods: {
			...mapActions("categorie", ["addCategorie", "getCategorie"]),
			getValidationState({ dirty, validated, valid = null }) {
				return dirty || validated ? valid : null;
			},
			async add() {
				this.isloading = !this.isloading;
				return this.addCategorie(this.categorie)
					.then((result) => {
						this.isloading = !this.isloading;
						this.showList = !this.showList;
					})
					.catch((err) => {
						this.isloading = !this.isloading;
						this.showList = !this.showList;
					});
			},
			reset() {
				this.categorie = {
					couleur: "",
					nom: "",
					emission: "",
					caption: "",
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