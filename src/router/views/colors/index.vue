<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<b-row align-h="center">
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
										<ValidationProvider rules="required|isDifferent:@emission" v-slot="validationContext" name="Nom" mode="passive" vid="nom">
											<b-form-group :invalid-feedback="validationContext.errors[0]" :state="
													getValidationState(validationContext)">
												<label for="emailadmin">Nom</label>
												<b-input-group preprend="@">
													<b-form-input id="nom" v-model.trim="chaine.nom
														" name="nom" type="text" class="form-control" size="sm" placeholder="" autocomplete="off"></b-form-input>

												</b-input-group>
											</b-form-group>
										</ValidationProvider>
										<ValidationProvider :rules="{ required: true }" v-slot="validationContext" name="Couleur" mode="passive">
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
															chaine.emission
														" autocomplete="off" />

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
	import { mapActions } from "vuex";

	export default {
		page: {
			title: "Color",
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
				items: [
					{
						text: "Color",
						href: "/colors",
					},
					{
						text: "Default",
						active: true,
					},
				],
				chaine: {
					nom: "",
					emission: "",
					couleur: "",
					caption: "",
				},
			};
		},
		methods: {
			...mapActions("categorie", ["add"]),
			getValidationState({ dirty, validated, valid = null }) {
				return dirty || validated ? valid : null;
			},
			addCategorie() {
				this.add(this.chaine);
			},
			reset() {
				this.chaine = {
					couleur: "",
					nom: "",
					emission: "",
					caption: "",
				};
				this.$nextTick(() => {
					this.$refs.observer.reset();
				});
			},
		},
	};
</script>