<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<b-row>
			<b-col lg="12">
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
									<b-col sm="12" lg="8" md="8">
										<b-row class="mb-3">
											<b-col md="4">
												<b-img v-if="myfile == null" blank blank-color="#ccc" fluid-grow alt="placeholder"></b-img>
												<vue-croppie v-if="myfile != null" ref="croppieRef" :enableOrientation="true" :boundary="{
														type: 'circle',
														width: '100%',
														height: '100%',
													}" id="zzz" :showZoomer="false" :viewport="{
														type: 'circle',
													}" @result="result">
												</vue-croppie>
											</b-col>
											<b-col md="8">
												<ValidationProvider :rules="{ required: true }" v-slot="validationContext" name="Nom">
													<b-form-group :invalid-feedback="
															validationContext
																.errors[0]
														" :state="
															getValidationState(
																validationContext
															)
														">
														<label for="nomadmin">Nom de
															l'administrateur</label>
														<input autocomplete="false" id="nomadmin" name="nomadmin" type="text" class="form-control" v-model.trim="
																admin.nom
															" placeholder="ex: Robert Xavier" />
													</b-form-group>
												</ValidationProvider>
												<ValidationProvider :rules="{ required: true }" v-slot="validationContext" name="Image">
													<b-form-group invalid-feedback="Vous devez indiquer une image pour cette annonce" :state="
															getValidationState(
																validationContext
															)
														" class="mb-4" label="Image">
														<b-row>
															<b-col lg="12">
																<b-form-file v-model="
																		myfile
																	" placeholder="Choisissez une image ou déposez-la ici..." drop-placeholder="Déposez ici..." @change="
																		bind
																	" required></b-form-file>
															</b-col>
														</b-row>
													</b-form-group>
												</ValidationProvider>
											</b-col>
										</b-row>

										<ValidationProvider :rules="{
												required: true,
												email: true,
											}" v-slot="validationContext" name="Email">
											<b-form-group :invalid-feedback="
													validationContext.errors[0]
												" :state="
													getValidationState(
														validationContext
													)
												">
												<label for="emailadmin">Email</label>
												<b-input-group preprend="@">
													<input id="emailadmin" v-model.trim="
															admin.email
														" name="emailadmin" type="text" class="form-control" placeholder="ex: administrateur@madia.com" />
												</b-input-group>
											</b-form-group>
										</ValidationProvider>
										<ValidationProvider :rules="{ required: true }" v-slot="validationContext" name="Password">
											<b-form-group :invalid-feedback="
													validationContext.errors[0]
												" :state="
													getValidationState(
														validationContext
													)
												">
												<label for="passwordadmin">Mot de passe</label>
												<b-input-group class="mb-2">
													<b-form-input preprend="" id="passwordadmin" name="passwordadmin" type="text" v-model.trim="
															admin.password
														" />
													<b-input-group-append>
														<b-button @click="
																fieldpassclicked
															" variant="primary" size="sm">
															<b-icon icon="arrow-counterclockwise" aria-hidden="true"></b-icon>
														</b-button>
													</b-input-group-append>
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

export default {
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description }],
	},
	components: {
		Layout,
		PageHeader,
	},
	data() {
		return {
			title: "Home",
			items: [
				{
					text: "Dashboards",
					href: "/",
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
		};
	},
	methods: {
		getValidationState({ dirty, validated, valid = null }) {
			return dirty || validated ? valid : null;
		},
		addCategorie() {
			this.add(this.categorie);
		},
	},
};
</script>