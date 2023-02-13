<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <b-row align-h="center">
            <b-col cols="6">
                <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                    <b-form @submit.prevent.stop="handleSubmit(add)" @reset.prevent.stop="reset" novalidate>
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">
                                    Envoyer une Notifications
                                </h4>
                                <p class="card-title-desc">
                                    * Toutes les informations sont obligatoires
                                </p>

                                <b-row>
                                    <b-col cols="12">
                                        <ValidationProvider rules="required" v-slot="validationContext" name="Nom" mode="passive" vid="nom">
                                            <b-form-group :invalid-feedback="validationContext.errors[0]" :state="getValidationState(validationContext)">
                                                <label for="emailadmin">Nom</label>
                                                <b-input-group preprend="@">
                                                    <b-form-input id="nom" v-model.trim="notification.title" name="nom" type="text" class="form-control" size="sm" placeholder="" autocomplete="off"></b-form-input>
                                                </b-input-group>
                                            </b-form-group>
                                        </ValidationProvider>
                                        <ValidationProvider rules="required" v-slot="validationContext" name="Description" mode="passive">
                                            <b-form-group :invalid-feedback="validationContext.errors[0]" :state="getValidationState(validationContext)">
                                                <label for="descriptionChaine">Description</label>
                                                <b-input-group class="mb-2">
                                                    <b-form-textarea size="sm" id="descriptionChaine" name="descriptionChaine" type="text" v-model.trim="notification.description" autocomplete="off" />
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
    </Layout>
</template>

<script>
import PageHeader from "@/components/page-header";
import Layout from "../../layouts/main";
export default {
    name: "notifications",
    components: {
        Layout,
        PageHeader,
    },
    data() {
        return {
            isloading: false,
            notification: { description: "Short description", title: "Title" },
            items: [
                {
                    text: "Notifications",
                    to: "/notifications",
                },
                {
                    text: "Default",
                    active: true,
                },
            ],
        }
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        async add() {
            this.isloading = !this.isloading;
            return this.addChannel(this.notification)
                .then((result) => {
                    this.isloading = !this.isloading;
                    this.$toast("Une notification a été ajouté", { icon: false });
                    setTimeout(() => {
                        this.showList = !this.showList;
                        this.reset()
                    }, 2000);
                })
                .catch((err) => {
                    console.log(err);
                    this.isloading = !this.isloading;
                    this.$toast("Impossible d'ajouter une notification", { icon: true, type: 'error' });
                });
        },
        reset() {
            this.notification = {
                title: "",
                description: "",

            };
            this.$nextTick(() => {
                this.$refs.observer.reset();
            });
        },
        goBack() {
            this.showList = !this.showList;
        },
    },
}
</script>

<style lang="scss" scoped>

</style>