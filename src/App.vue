<script>
	import appConfig from "@/app.config";

	export default {
		name: "app",
		page: {
			// All subcomponent titles will be injected into this template.
			titleTemplate(title) {
				title = typeof title === "function" ? title(this.$store) : title;
				return title ? `${title} | ${appConfig.title}` : appConfig.title;
			},
		},
		mounted() {},
		watch: {
			/**
			 * Clear the alert message on route change
			 */
			// eslint-disable-next-line no-unused-vars
			$route(to, from) {
				// clear alert on location change
			},
		},
	};
</script>

<template>
	<div id="app">
		<RouterView />
	</div>
</template>
<style scoped src="./assets/css/main.css">

</style>
