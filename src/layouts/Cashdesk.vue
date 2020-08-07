<template>
	<q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

		<!-- (Optional) The Header -->
		<q-header class="bg-white text-dark">
			<q-toolbar>
				<q-btn flat icon="fas fa-th" @click="$router.push('/');"/>
				<q-toolbar-title class="text-center">
					<span class="text-weight-light"> Estacionamiento - Cajas </span>
				</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<!-- (Optional) The Footer -->
		<q-footer class="bg-white text-dark">
			<q-toolbar>
				<q-toolbar-title class="text-center">
					<span class="text-weight-light"> Grupo Vizcarra </span>
				</q-toolbar-title>
			</q-toolbar>
		</q-footer>

		<q-page-container>
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
