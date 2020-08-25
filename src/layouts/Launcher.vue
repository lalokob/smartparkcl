<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="bg-smoke">
		<q-toolbar class="bg-none text-white">
			<q-toolbar-title class="text-center ">
				<span class="text-weight-thin"> SmartPark, Launcher </span>
			</q-toolbar-title>
		</q-toolbar>
	</q-header>

    <!-- (Optional) The Footer -->
    <q-footer class="text-white bg-none text-center">
		<span class="text-weight-light"> Grupo Vizcarra </span>
    </q-footer>
    <q-page-container>
      <!-- This is where pages get injected -->
      <!-- <router-view /> -->
		<q-page class="column items-center justify-center">
			<div class="text-white">
				<div class="q-pa-sm">
					<div class="text-weight-thin text-h3">Hola {{ user.nick }}</div>
					<div class="text-left text-h6 q-mt-md text-weight-thin">por donde iniciamos hoy?</div>
				</div>
				<div class="row q-pt-md q-pl-md text-weight-light items-center justify-center">
					<div 
						v-for="(module,mdsidx) in modules"
						:key="mdsidx" @click="$router.push(module.path)"
						class="mainopt q-mr-md q-mb-md column items-center justify-center bg-smoke"
					>
						<q-icon :name="icons[module.path]" size="35px" class="icon" color="white"/>
						<span class="q-pt-sm">{{ module.name }}</span>
					</div>

					<div @click="sessionDestroy" class="mainopt q-mr-md q-mb-md bg-smoke column items-center justify-center">
						<q-icon name="power_settings_new" size="35px" class="icon" color="white"/>
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
			}
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
		modules(){ return this.$store.state.account.modules },
	}
}
</script>
<style lang="scss">
	.ds{border:1px solid red;}
	.bg-none{ background:none!important; }
	.bg-smoke{ background: rgba(#000000,.15); };
	.mainopt{
		width: 150px;
		height: 150px;
		cursor:pointer;
		border-radius:10px;
		transition:all 300ms;

		.icon{
			padding:10px;
			border-radius:100%;
		}
		
		&:hover{
			transform: scale(1.05);
		};
	}

	html{
		background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);
	}
</style>