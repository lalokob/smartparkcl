<template>
	<q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

		<!-- (Optional) The Header -->
		<q-header class="text-grey-7 bg-darkl1 exo">
			<q-toolbar>
				<q-btn flat icon="fas fa-th" @click="$router.push('/');"/>
				<q-toolbar-title class="text-center">
					<span> Estacionamiento - Cajas </span>
				</q-toolbar-title>

				<span>
					<span class="text-pink-6"> Smart</span>
					<span class="text-white">Park</span>
				</span>
			</q-toolbar>
		</q-header>

		<!-- (Optional) The Footer -->
		<q-footer class="text-white bg-none text-center">
			<span class="text-weight-light"> Grupo Vizcarra </span>
		</q-footer>

		<q-page-container class="bg-darkl0 text-owngrey exo">
			<!-- This is where pages get injected -->
			<router-view />
		</q-page-container>

	</q-layout>
</template>

<script>
export default {
    // name: 'LayoutName',

    data () {
		return {
			// leftDrawer: true
		}
    }
}
</script>
