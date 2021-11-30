<script>
	import i18n from "../i18n";
	export default {
		data() {
			return {
				languages: [
					{
						flag: require("@/assets/images/flags/us.jpg"),
						language: "en",
						title: "English",
					},
					{
						flag: require("@/assets/images/flags/french.jpg"),
						language: "fr",
						title: "French",
					},
					{
						flag: require("@/assets/images/flags/spain.jpg"),
						language: "es",
						title: "Spanish",
					},
					{
						flag: require("@/assets/images/flags/chaina.png"),
						language: "zh",
						title: "Chinese",
					},
					{
						flag: require("@/assets/images/flags/arabic.png"),
						language: "ar",
						title: "Arabic",
					},
				],
				lan: i18n.locale,
				text: null,
				flag: null,
				value: null,
			};
		},
		mounted() {
			this.value = this.languages.find((x) => x.language === i18n.locale);
			this.text = this.value.title;
			this.flag = this.value.flag;
		},
		methods: {
			toggleMenu() {
				this.$parent.toggleMenu();
			},
			toggleRightSidebar() {
				this.$parent.toggleRightSidebar();
			},
			initFullScreen() {
				document.body.classList.toggle("fullscreen-enable");
				if (
					!document.fullscreenElement &&
					/* alternative standard method */ !document.mozFullScreenElement &&
					!document.webkitFullscreenElement
				) {
					// current working methods
					if (document.documentElement.requestFullscreen) {
						document.documentElement.requestFullscreen();
					} else if (document.documentElement.mozRequestFullScreen) {
						document.documentElement.mozRequestFullScreen();
					} else if (document.documentElement.webkitRequestFullscreen) {
						document.documentElement.webkitRequestFullscreen(
							Element.ALLOW_KEYBOARD_INPUT
						);
					}
				} else {
					if (document.cancelFullScreen) {
						document.cancelFullScreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					}
				}
			},
			setLanguage(locale, country, flag) {
				this.lan = locale;
				this.text = country;
				this.flag = flag;
				i18n.locale = locale;
			},
		},
	};
</script>

<template>
	<header id="page-topbar">
		<div class="navbar-header">
			<div class="d-flex">
				<!-- LOGO -->
				<div class="navbar-brand-box">
					<router-link tag="a" to="/" class="logo logo-dark">
						<span class="logo-sm">
							<img src="@/assets/images/logo.svg" alt height="22" />
						</span>
						<span class="logo-lg">
							<img src="@/assets/images/logo-dark.png" alt height="17" />
						</span>
					</router-link>

					<router-link tag="a" to="/" class="logo logo-light">
						<span class="logo-sm">
							<img src="@/assets/images/logo-light.svg" alt height="22" />
						</span>
						<span class="logo-lg">
							<img src="@/assets/images/logo-light.png" alt height="19" />
						</span>
					</router-link>
				</div>
			</div>

			<div class="d-flex">

				

				<b-dropdown right variant="black" toggle-class="header-item">
					<template v-slot:button-content>
						<img class="rounded-circle header-profile-user" src="@/assets/images/users/avatar-1.jpg" alt="Header Avatar" />
						<span class="d-none d-xl-inline-block ml-1">{{ $t('navbar.dropdown.user.text')}}</span>
						<i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
					</template>
					<!-- item-->
					<b-dropdown-item>
						<router-link tag="span" to="/contacts/profile">
							<i class="bx bx-user font-size-16 align-middle mr-1"></i>
							{{ $t('navbar.dropdown.user.list.profile') }}
						</router-link>
					</b-dropdown-item>
					<b-dropdown-item href="javascript: void(0);">
						<i class="bx bx-wallet font-size-16 align-middle mr-1"></i>
						{{ $t('navbar.dropdown.user.list.mywallet') }}
					</b-dropdown-item>
					<b-dropdown-item class="d-block" href="javascript: void(0);">
						<span class="badge badge-success float-right">11</span>
						<i class="bx bx-wrench font-size-16 align-middle mr-1"></i>
						{{ $t('navbar.dropdown.user.list.settings') }}
					</b-dropdown-item>
					<b-dropdown-item href="javascript: void(0);">
						<i class="bx bx-lock-open font-size-16 align-middle mr-1"></i>
						{{ $t('navbar.dropdown.user.list.lockscreen') }}
					</b-dropdown-item>
					<b-dropdown-divider></b-dropdown-divider>
					<a href="/logout" class="dropdown-item text-danger">
						<i class="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
						{{ $t('navbar.dropdown.user.list.logout') }}
					</a>
				</b-dropdown>

				<div class="dropdown d-inline-block">
					<button type="button" class="btn header-item noti-icon right-bar-toggle toggle-right" @click="toggleRightSidebar">
						<i class="bx bx-cog bx-spin toggle-right"></i>
					</button>
				</div>
			</div>
		</div>
	</header>
</template>
