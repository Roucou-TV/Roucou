<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<b-row v-if="showList" align-h="center">
			<b-col md="8">
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
									</tr>
								</thead>
								<tbody>
									<tr v-for="data in channels" :key="data.id">
										<td>{{data.id}}</td>
										<td>{{data.nom}}</td>
										<td>{{data.description}}</td>
										<td>{{data.categorie}}</td>
										<td>{{data.lien}}</td>
										<td>{{data.caption}}</td>
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
					</div>
				</div>
			</b-col>
		</b-row>
		<b-row align-h="center" v-else>
			<b-col cols="6">
				<ValidationObserver ref="observer" v-slot="{ handleSubmit }">
					<b-form @submit.prevent.stop="handleSubmit(add(categorie))" @reset.prevent.stop="reset" novalidate>
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
										<ValidationProvider rules="required" v-slot="validationContext" mode="passive" name="Nom" vid="nom">
											<b-form-group :invalid-feedback="validationContext.errors[0]" :state="
													getValidationState(validationContext)">
												<label for="emailadmin">Nom</label>
												<b-input-group preprend="@">
													<b-form-input id="nom" v-model.trim="chaine.nom
														" name="nom" type="text" class="form-control" size="sm" placeholder="" autocomplete="off"></b-form-input>

												</b-input-group>
											</b-form-group>
										</ValidationProvider>
										<ValidationProvider :rules="{ required: true }" v-slot="validationContext" name="Description" mode="passive">
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
															chaine.couleur" autocomplete="off">
													</b-form-input>

												</b-input-group>
											</b-form-group>
										</ValidationProvider>
										<ValidationProvider rules="required" v-slot="validationContext" name="Emission" mode="passive" vid="categorie">
											<b-form-group :invalid-feedback="
													validationContext.errors[0]
												" :state="
													getValidationState(
														validationContext
													)
												">
												<label for="passwordadmin">Emission</label>
												<b-input-group class="mb-2">
													<b-form-select v-model="chaine.categorie" :options="optionsCategories"></b-form-select>

												</b-input-group>
											</b-form-group>
										</ValidationProvider>
										<ValidationProvider :rules="{ required: true }" v-slot="validationContext" name="Caption" mode="passive">
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
															chaine.caption
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
													<button @click.prevent="goBack" class="
															btn btn-secondary
															mr-1
														">
														Annuler
													</button>
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
	import { mapActions, mapState } from "vuex";

	export default {
		page: {
			title: "Chaine",
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
					lien: "",
					caption: "",
				},
			};
		},
		computed: {
			...mapState({
				optionsCategories: (state) => state.categorie.optionsCategories,
				channels: (state) => state.categorie.channels,
			}),
		},
		methods: {
			...mapActions("categorie", ["addChannel"]),
			getValidationState({ dirty, validated, valid = null }) {
				return dirty || validated ? valid : null;
			},
			addCategorie() {
				this.add(this.chaine);
			},
			reset() {
				this.chaine = {
					nom: "",
					description: "",
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