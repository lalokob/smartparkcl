<template>
	<q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

		<!-- (Optional) The Header -->
		<q-header class="bg-white text-dark">
			<q-toolbar>
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

		<!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
		<q-drawer v-model="leftDrawer" side="left" bordered content-class="bg-grey-2">
			<!-- QScrollArea is optional -->
			<q-scroll-area class="fit q-pa-sm">
				<!-- Content here -->
			</q-scroll-area>
		</q-drawer>

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
			leftDrawer: true
		}
    }
}
</script>
