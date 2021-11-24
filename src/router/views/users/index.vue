<template>
	<Layout>
		<PageHeader :title="title" :items="items" />

	</Layout>
</template>

<script>
	import Layout from "../../layouts/main";
	import appConfig from "@/app.config";
	import PageHeader from "@/components/page-header";
	import { mapActions, mapState } from "vuex";

	export default {
		name: "users",
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
				title: "Users",
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