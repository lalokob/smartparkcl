<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header bordered class="bg-darkl1 exo">
		<q-toolbar class="bg-none text-white">
			<q-toolbar-title>
				<span class="text-pink-6">Smart</span>
				<span>Park</span>
			</q-toolbar-title>
		</q-toolbar>
	</q-header>

    <!-- (Optional) The Footer -->
    <q-footer class="text-white bg-none text-center">
		<span class="text-weight-light"> Grupo Vizcarra </span>
    </q-footer>
    <q-page-container class="bg-darkl0 text-grey-4">
      <!-- This is where pages get injected -->
      <!-- <router-view /> -->
		<q-page class="column items-center justify-center">
			<div class="darkl3">
				<div class="q-pa-sm">
					<div class="text-weight-thin text-h3">Hola <span class="text-green-13"> {{ user.nick }}</span> </div>
					<div class="text-left text-h6 q-mt-md text-weight-thin">por donde iniciamos hoy?</div>
				</div>
				<div class="row q-pt-md q-pl-md text-weight-light items-center justify-center exo">
					<div 
						v-for="(module,mdsidx) in modules"
						:key="mdsidx" @click="$router.push(module.path)"
						class="mainopt q-mr-md q-mb-md column items-center justify-center bg-darkl1"
					>
						<q-icon :name="icons[module.path]" size="35px" class="icon" color="darkl3"/>
						<span class="q-pt-sm">{{ module.name }}</span>
					</div>

					<div @click="sessionDestroy" class="mainopt q-mr-md q-mb-md bg-darkl1 column items-center justify-center">
						<q-icon name="power_settings_new" size="35px" class="icon" color="darkl3"/>
						<span class="q-pt-sm">Salir</span>
					</div>
				</div>
			</div>
		</q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
	// name: 'LayoutName',
	mounted(){
		console.log(this.user);
		console.log(this.modules);
	},
	data () {
		return {
			icons:{
				usuarios:"fas fa-users",
				cajas:"fas fa-cash-register",
				park:"fas fa-car"
			},
		}
	},
	methods:{
		sessionDestroy(){
			localStorage.removeItem("_account");
			localStorage.removeItem("_modules");
			localStorage.removeItem("apikey");
			this.$router.push('/signin');
		}
	},
	computed:{
		user(){ return this.$store.state.account.user },
		modulesnat(){ return this.$store.state.account.modules },
		modules(){ return this.modulesnat.map(el=>{ el.fontcolor="darkl3"; return el; }) }
	}
}
</script>
<style lang="scss">
	.mainopt{
		width: 150px;
		height: 150px;
		cursor:pointer;
		transition:all 300ms;

		.icon{
			padding:10px;
			border-radius:100%;
		}
		
		&:hover{
			transform: scale(1.05);
			color:#52E677!important;
			border: 1px solid #52E677;
		};
	}
</style>