<template>
	<q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

		<!-- (Optional) The Header -->
		<q-header class="bg-white text-dark">
			<q-toolbar>
				<q-toolbar-title class="text-center">
					<span class="text-weight-light"> Estacionamiento - Acceso </span>
				</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<!-- (Optional) The Footer -->
		<!-- <q-footer class="bg-white text-dark">
			<q-toolbar class="text-center">
				Grupo Vizcarra
			</q-toolbar>
		</q-footer> -->

		<q-page-container>
			<!-- This is where pages get injected -->
			<!-- <router-view /> -->
			<q-page class="row items-center justify-center">
				<q-form @submit="tryLogin"  v-if="credentials.formstate">
					<div class="column">
						<q-input type="text" color="dark" label="Usuario" stack-label class="ipt q-mb-xs" v-model="credentials.nick" autocomplete="off"/>
						<q-input type="password" color="dark" label="Contraseña" stack-label class="ipt q-mb-xs" v-model="credentials.pass" autocomplete="off"/>
						<q-btn outline class="q-pa-sm" color="dark" type="submit" label="entrar" v-if="credentials.nick.length>=2&&credentials.pass.length>=4"/>
					</div>
				</q-form>
			</q-page>
		</q-page-container>

	</q-layout>
</template>

<script>
import apipark from '../API/signin.js'
export default {
	// name: 'LayoutName',
	data () {
		return {
			credentials:{ nick:"", pass:"", formstate:true }
		}
	},
	methods:{
		tryLogin(){
			let data = {
				nick:this.credentials.nick,
				pass:this.credentials.pass
			};
			apipark.trySignin(data).catch(error=>{
				console.log(error);
			}).then(resp=>{
				let account = resp.data.rset;
				console.log(account);
				if(account.apikey){
					this.credentials.formstate=false;

					let $modules = account.modules;
					let $account = account.usdata;
					localStorage.setItem('apikey',account.apikey);
					localStorage.setItem('_modules',JSON.stringify($modules));
					localStorage.setItem('_account',JSON.stringify($account));
					this.$router.push('/launcher');
				}else{ this.$q.notify({ color:'negative', message: account.msg, icon: 'announcement' }); }
			});
		}
	}
}
</script>
<style lang="scss">
	.ds{border:1px solid red;}
</style>