<template>
	<q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
		<q-footer class="bg-smoke">
			<q-toolbar class="column justify-center text-center text-caption">
				Grupo Vizcarra - 2020
			</q-toolbar>
		</q-footer>

		<q-page-container>
			<!-- This is where pages get injected -->
			<!-- <router-view /> -->
			<q-page class="row items-center justify-center">
				<q-form @submit="tryLogin" v-if="credentials.formstate" class="column loginform">
					<div class="text-center">
						<q-img src="~/assets/logo.png" spinner-color="white" style="width: 170px;"/>
					</div>
					<q-card class="q-mt-sm">
						<q-card-section class="text-h6 text-grey-8 text-weight-light row justify-between items-center">
							<span>Acceso</span>
							<span> <q-icon name="fas fa-car"/> SmartPark</span>
						</q-card-section>
						<q-separator/>
						<q-card-section>
							<div class="column">
								<q-input type="text" color="dark" label="Usuario" stack-label class="ipt q-mb-xs" v-model="credentials.nick" autocapitalize="off" autocomplete="off"/>
								<q-input type="password" color="dark" label="Contraseña" stack-label class="ipt q-mb-xs" v-model="credentials.pass" autocapitalize="off" autocomplete="off"/>
							</div>
						</q-card-section>
						<div class="column" v-if="credentials.nick.length>=2&&credentials.pass.length>=4">
							<q-btn flat class="q-pa-sm" color="dark" type="submit" label="entrar"/>
						</div>
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
	.ds{border:1px solid red;}
	.bg-smoke{ background: rgba(#000000,.15); };
	html{ background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%); }
	.bg-none{ background:none!important;}
	.mainicon{ border-radius:20px; }
	.loginform{ width:300px; }
</style>