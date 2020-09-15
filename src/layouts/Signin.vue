<template>
	<q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
		<q-footer class="bg-none">
			<q-toolbar class="column justify-center text-center text-caption">
				Grupo Vizcarra - 2020
			</q-toolbar>
		</q-footer>

		<q-page-container class="bg-darkl0 exo">
			<!-- This is where pages get injected -->
			<!-- <router-view /> -->
			<q-page class="row items-center justify-center">
				<q-form @submit="tryLogin" v-if="credentials.formstate" class="column loginform">
					<div class="text-center q-mb-sm">
						<q-img src="~/assets/logo.png" spinner-color="white" style="width: 170px;"/>
					</div>
					<q-card class="bg-darkl1 text-white">
						<q-card-section class="text-h6 row justify-between items-center">
							<span>
								<span class="text-pink-6"> Smart</span>
								<span class="text-weight-thin">Park</span>
							</span>
						</q-card-section>
					</q-card>

					<q-card flat class="q-mt-sm bg-darkl1 text-white">
						<q-card-section>
							<div class="column">
								<q-input type="text" dark color="pink-6" label-color="grey-7" label="Usuario" class="ipt q-mb-xs" v-model="credentials.nick" autocapitalize="off" autocomplete="off"/>
								<q-input type="password" dark color="pink-6" label-color="grey-7" label="Contraseña" class="ipt q-mb-xs" v-model="credentials.pass" autocapitalize="off" autocomplete="off"/>
							</div>
						</q-card-section>

						<q-card-actions align="right" v-if="credentials.nick.length>=2&&credentials.pass.length>=4">
							<q-btn flat class="q-pa-sm" color="pink-6" type="submit" label="entrar"/>
						</q-card-actions>
					</q-card>
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
	created(){
   		this.$q.addressbarColor.set('#1D1D1D');
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
	.mainicon{ border-radius:20px; }
	.loginform{ width:300px; }
</style>