
<template>
	<Layout>
		<b-row align-h="center">
			<b-col md="8" lg="6" xl="5">
				<b-card no-body class="overflow-hidden">
					<div class="bg-soft-primary">
						<b-row>
							<b-col cols="7">
								<div class="text-primary p-3">
									<h5 class="text-primary">
										Bienvenue !
									</h5>
									<p>
										Connectez-vous pour
										acceder a Madia
									</p>
								</div>
							</b-col>
							<b-col cols="5" align-self="end">
								<img src="@/assets/images/profile-img.png" alt class="img-fluid" />
							</b-col>
						</b-row>
					</div>
					<div class="card-body pt-0">
						<div>
							<router-link to="/">
								<div class="avatar-md profile-user-wid mb-4">
									<span class="avatar-title rounded-circle bg-light">
										<img src="@/assets/images/logo.svg" alt height="34" />
									</span>
								</div>
							</router-link>
						</div>

						<b-form class="p-2" @submit.prevent="connecter">
							<b-form-group id="input-group-1" label="Email" label-for="input-1">
								<b-form-input id="emaily" name="username" autocomplete="false" v-model="user.email" type="text" placeholder="Entrer l'email"></b-form-input>
							</b-form-group>

							<b-form-group id="input-group-2" label="Mot de passe" label-for="input-2">
								<b-form-input id="pass" name="password" v-model="user.password" type="password" placeholder="Entrer le mot de passe" autocomplete="current-password"></b-form-input>
							</b-form-group>

							<div class="mt-3">
								<b-row>
									<b-button v-if="tryingToLogIn" type="submit" variant="primary" block>Se connecter</b-button>
									<button class="btn btn-primary btn-block" type="button" v-else disabled>
										<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
										Veuillez patienter...
									</button>
								</b-row>
							</div>
							<b-row align-content="center" align-h="center">
								<b-form-invalid-feedback :state="autherror==null" class="pt-2 text-center">
									{{error}}
								</b-form-invalid-feedback>
							</b-row>
							<div class="mt-4 text-center">
								<router-link to="/forgot-password" class="text-muted">
									<i class="mdi mdi-lock mr-1"></i>
									Mot de passe oublié?
								</router-link>
							</div>
						</b-form>
					</div>
					<!-- end card-body -->
				</b-card>
				<!-- end card -->
				<div class="mt-5 text-center">
					<p>
						©
						{{ new Date().getFullYear() }}
						Madia. Crafted with
						<i class="mdi mdi-heart text-danger"></i>
						by Din Technology
					</p>
				</div>
				<!-- end row -->
			</b-col>
			<!-- end col -->
		</b-row>
		<!-- end row -->
	</Layout>
</template>
<script>
import Layout from "@/router/layouts/auth";
import appConfig from "@/app.config";
import { mapState, mapActions } from "vuex";
import store from "@/state/store";
import { auth } from "@/firebase/firebase";
export default {
	page: {
		title: "Login",
		meta: [{ name: "description", content: appConfig.description }],
	},
	components: { Layout },
	data() {
		return {
			formIsvalid: true,
			user: {
				email: "",
				password: "",
			},
			submitted: false,
			authError: null,
			tryingToLogIn: true,
			error: null,
		};
	},

	computed: {
		...mapState({
			message: (state) => state.notification.message,
			type: (state) => state.notification.type,
			autherror: (state) => state.auth.error,
		}),
	},
	watch: {
		autherror(newError, oldError) {
			// if (newError != null && oldError != null) {
			if (newError != oldError) {
				this.error = newError.message;
				// this.$toasted.show(newError.message, {
				// 	type: "error",
				// 	duration: 100000,
				// 	singleton: true,
				// });
			}
			// }
		},
	},
	methods: {
		...mapActions("auth", ["login", "signOut"]),
		...mapActions("restaurant", ["test"]),
		validateState(ref) {
			if (
				this.veeFields[ref] &&
				(this.veeFields[ref].dirty || this.veeFields[ref].validated)
			) {
				return !this.veeErrors.has(ref);
			}
			return null;
		},
		async connecter() {
			// this.tryingToLogIn = !this.tryingToLogIn;
			// try {
			// 	var loginResponse = await this.login(this.user);
			// 	this.tryingToLogIn = !this.tryingToLogIn;
			// 	if (loginResponse !== "error-type") {
			// 		console.log({ loginResponse });
			this.$router.push('/');
			// 	}
			// } catch (error) {
			// 	console.log(error.stack);
			// 	this.$router.push({ name: "error" });
			// 	this.$toasted.show(error.message, { type: "error" });
			// 	this.tryingToLogIn = !this.tryingToLogIn;
			// }
		},
	},
};
</script>


<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>
