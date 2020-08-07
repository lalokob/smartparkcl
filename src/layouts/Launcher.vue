<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="bg-white text-dark">
		<q-toolbar>
			<q-toolbar-title class="text-center">
				<span class="text-weight-light"> Launcher </span>
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
      <!-- <router-view /> -->
		<q-page class="column items-center justify-center">
			<div>
				<div>
					<div class="text-weight-thin text-h2">Hola {{ user.nick }}</div>
					<div class="text-left text-h6 q-mt-md text-weight-thin">por donde iniciamos hoy?...</div>
				</div>
				<div class="row q-pt-md q-pl-md text-weight-light">
					<div 
						v-for="(module,mdsidx) in modules"
						:key="mdsidx" @click="$router.push(module.path)"
						class="mainopt q-mr-md q-mb-md column items-center justify-center"
					>
							<q-icon :name="icons[module.path]" size="50px" color="grey-8"/>
							<span class="q-pt-sm">{{ module.name }}</span>
					</div>

					<div @click="sessionDestroy"
						class="mainopt q-mr-md q-mb-md column items-center justify-center"
					>
							<q-icon name="power_settings_new" size="50px" color="grey-8"/>
							<span class="q-pt-sm">salir</span>
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
	.mainopt{
		width: 150px;
		height: 150px;
		cursor:pointer;
		border-radius:20px;
		border: 1px solid rgba(128, 128, 128, 0.342);
		
		&:hover{
			background-color: rgba(128, 128, 128, 0.05);
		};
	}
</style>