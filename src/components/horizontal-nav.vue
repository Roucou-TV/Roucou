<script>
	import { layoutMethods } from "@/state/helpers";
	import { menuItems } from "./horizontal-menu";

	export default {
		data() {
			return {
				menuItems: menuItems,
			};
		},
		mounted() {
			var links = document.getElementsByClassName("side-nav-link-ref");
			var matchingMenuItem = null;
			for (var i = 0; i < links.length; i++) {
				if (window.location.pathname === links[i].pathname) {
					matchingMenuItem = links[i];
					break;
				}
			}

			if (matchingMenuItem) {
				matchingMenuItem.classList.add("active");
				var parent = matchingMenuItem.parentElement;

				/**
				 * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
				 * We should come up with non hard coded approach
				 */
				if (parent) {
					parent.classList.add("active");
					const parent2 = parent.parentElement;
					if (parent2) {
						parent2.classList.add("active");
					}
					const parent3 = parent2.parentElement;
					if (parent3) {
						parent3.classList.add("active");
						var childAnchor = parent3.querySelector(".has-dropdown");
						if (childAnchor) childAnchor.classList.add("active");
					}

					const parent4 = parent3.parentElement;
					if (parent4) parent4.classList.add("active");
					const parent5 = parent4.parentElement;
					if (parent5) parent5.classList.add("active");
				}
			}
		},
		methods: {
			...layoutMethods,
			onMenuClick(event) {
				event.preventDefault();
				const nextEl = event.target.nextSibling;
				if (nextEl && !nextEl.classList.contains("show")) {
					const parentEl = event.target.parentNode;
					if (parentEl) {
						parentEl.classList.remove("show");
					}
					nextEl.classList.add("show");
				} else if (nextEl) {
					nextEl.classList.remove("show");
				}
				return false;
			},
			/**
			 * Returns true or false if given menu item has child or not
			 * @param item menuItem
			 */
			hasItems(item) {
				return item.subItems !== undefined
					? item.subItems.length > 0
					: false;
			},
		},
	};
</script>
<template>
	<div class="topnav">
		<div class="container-fluid">
			<nav class="navbar navbar-light navbar-expand-lg topnav-menu active">
				<div class="collapse navbar-collapse active" id="topnav-menu-content">
				
				</div>
			</nav>
		</div>
	</div>
</template>