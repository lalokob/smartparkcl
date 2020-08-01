<template>
	<q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

		<!-- (Optional) The Header -->
		<q-header class="bg-white text-dark">
			<q-toolbar>
				<q-toolbar-title class="text-center">
					<span class="text-weight-light"> Estacionamiento </span>
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
			<q-page class="column items-center justify-center">
				<div class="bg-white q-pt-md q-mb-md">
					<q-form @submit="defineParking">
						<div class="finder row items-center q-py-md">
							<q-icon color="dark" name="fas fa-car" size="30px"  class="col"/>
							<input color="dark" outlined ref="iptplate_search" type="text" class="q-px-md col-8 iptplate text-uppercase text-h3 bg-none" v-model="iptplate.value" :disable="iptplate.state" autocomplete="off"/>
							<q-btn color="dark" flat class="col" type="submit" stack icon="search" :disable="iptplate.state||iptplate.value.length<4"/>
						</div>
					</q-form>
				</div>
				
				<div class="row q-mt-md q-pt-md q-pl-md justify-center">
					<!-- { "plateid": 24, "plate": "FGH-123", "idmnservice": 1, "init": "2020-08-01 02:14:00", "idtariff": 1, "parkstate": "1" } -->
					<div v-for="(park,idxpk) in parking" :key="idxpk">
						<q-card class="q-mr-md q-mb-md" flat bordered>
							<q-card-section horizontal>
								<q-card-section class="column justify-center">
									<div class="text-h6">{{ park.plate }}</div>
									<div clasS="text-caption">{{ park.init }}</div>
								</q-card-section>
								<q-separator vertical/>
								<q-card-actions vertical class="justify-around q-px-md">
									<template v-if="park.parkstate==1">
										<q-btn flat round color="primary" icon="fas fa-angle-double-up" @click="autoCheckPark(park.plate);" />
									</template>
									<template v-if="park.parkstate==2">
										<q-btn flat round color="red" icon="fas fa-cut" />
									</template>
								</q-card-actions>
							</q-card-section>
						</q-card>
					</div>
				</div>

				<q-dialog v-model="wndCheckinStd.state" @before-hide="iptplate.value=''">
					<q-card>
						<q-toolbar>
							<q-toolbar-title class="text-center">
								<span class="text-weight-light text-uppercase"> {{ iptplate.value }} </span>
							</q-toolbar-title>
							<q-btn rounded flat color="negative" icon="close" v-close-popup/>
						</q-toolbar>

						<q-card-section>
							<q-select color="dark" v-model="usetariff" :options="tariffsdb" label="Tarifa" />
							<q-input color="dark" v-model="notascheckinstd" stack-label label="notas" />
						</q-card-section>
						<q-card-actions align="center">
							<q-btn outline label="Checkin" @click="checkInSTD()"/>
						</q-card-actions>
					</q-card>
				</q-dialog>

				<q-dialog v-model="wndPreCheckOutStd.state" @before-hide="iptplate.value=''">
					<q-card>
						<q-toolbar>
							<q-toolbar-title >
								<span class="text-weight-light text-uppercase"> Checkout </span>
							</q-toolbar-title>
							<q-btn rounded flat color="negative" icon="close" v-close-popup/>
						</q-toolbar>

						<q-card-section horizontal v-if="wndPreCheckOutStd.topay">
							<q-card-section>
								<q-markup-table flat class="text-dark">
									<tbody>
										<tr>
											<td class="text-left">Placa:</td>
											<td class="text-left">{{ wndPreCheckOutStd.dtpark.plate }}</td>
										</tr>

										<tr>
											<td class="text-left">Inicio:</td>
											<td class="text-left">{{ wndPreCheckOutStd.dtpark.init }}</td>
										</tr>

										<tr>
											<td class="text-left">Salida:</td>
											<td class="text-left">{{ wndPreCheckOutStd.topay.time_calc }}</td>
										</tr>

										<tr>
											<td class="text-left">Tiempo Total:</td>
											<td class="text-left">{{ wndPreCheckOutStd.topay.hours }} horas, {{ wndPreCheckOutStd.topay.mints_adds }} minutos</td>
										</tr>

										<tr>
											<td class="text-left">Total a pagar</td>
											<td class="text-left">$ {{ wndPreCheckOutStd.topay.totalcost }}</td>
										</tr>
									</tbody>
								</q-markup-table>
							</q-card-section>

							<q-card-section>
								<q-select color="dark" v-model="usepayway" :options="paywaysdb" stack-label label="Forma de pago" />
								<q-input color="dark" type="number" v-model="wndPreCheckOutStd.paytotal" stack-label label="pago"/>

								<q-card-actions align="center" v-if="wndPreCheckOutStd.paytotal>=wndPreCheckOutStd.topay.totalcost">
									<q-btn color="primary" full-width flat label="pagar" @click="makeCharge()"/>
								</q-card-actions>
								<div class="text-center q-pa-md" v-if="wndPreCheckOutStd.paytotal>=wndPreCheckOutStd.topay.totalcost">
									Cambio: {{wndPreCheckOutStd.paytotal-wndPreCheckOutStd.topay.totalcost}}
								</div>
							</q-card-section>

							
						</q-card-section>
					</q-card>
				</q-dialog>
			</q-page>
		</q-page-container>

	</q-layout>
</template>

<script>
import apipark from '../API/park'
export default {
    // name: 'LayoutName',

    data () {
		return {
			parking:null,
			leftDrawer: false,
			iptplate:{state:false,value:""},
			wndCheckinStd:{state:false},
			wndPreCheckOutStd:{
				state:false,
				topay:null,
				dtpark:null,
				paytotal:0,
			},
			tariffsdb:[
				{value:1,label:"Publico"},
				{value:1,label:"Especial"},
			],
			paywaysdb:[
				{value:1,label:"Efectivo"},
				{value:2,label:"TDC/TDD"},
			],
			usetariff:{value:1,label:"Publico"},
			usepayway:{value:1,label:"Efectivo"},
			notascheckinstd:"",
		}
	},
	beforeMount(){
		this.index();
	},
	methods:{
		async index(){
			let idx = await apipark.index({apikey:this.apikey});
			console.log(idx);
			this.parking=idx.park;
			// this.cashdesks = idx.cashdesks;
			// this.wndOpening.denoms = idx.currencies.map(curr=>{curr.model=0; return curr});
			// this.cashloading=false;
			// console.log(this.cashdesks);
		},
		autoCheckPark(plate){
			this.iptplate.value=plate;
			this.defineParking();
		},
		defineParking(){
			let data = {
				apikey:this.apikey,
				mginput:this.iptplate.value
			};

			apipark.magic(data).then(success=>{
				let resp = success.data;
				console.log(resp);

				switch (resp.inpark) {
					case 404: case 205:
						console.log("Realizar checkin STD, continuar?");
						this.wndCheckinStd.state=true;	
					break;

					case 200:
						console.log("Hacer checkout");
						this.wndPreCheckOutStd.state=true;
						this.wndPreCheckOutStd.topay=resp.precheckout.topay;
						this.wndPreCheckOutStd.dtpark=resp.precheckout.dtpark;

						console.log(this.wndPreCheckOutStd.topay);
						console.log(this.wndPreCheckOutStd.dtpark);	
					break;
				}
			}).catch(fail=>{
				console.log(fail);
			});
		},
		makeCharge(){
			// console.log(this.wndPreCheckOutStd);
			let data = {
				apikey:this.apikey,
				topay: {
					"init": this.wndPreCheckOutStd.dtpark.init,
					"plate": this.wndPreCheckOutStd.dtpark.plate,
					"plateid": this.wndPreCheckOutStd.dtpark.plateid,
					"idtariff": this.wndPreCheckOutStd.dtpark.idtariff,
					"parkid": this.wndPreCheckOutStd.dtpark.parkid,
					"idmainservice": this.wndPreCheckOutStd.dtpark.idmainservice,
					"time_calc": this.wndPreCheckOutStd.topay.time_calc,
					"parts":[
						{ "method":this.usepayway.value, "cant":this.wndPreCheckOutStd.paytotal, "notes":"" }
					]
				}
			}
			
			apipark.makeCharge(data).then(success=>{
				let resp = success.data;
				console.log(resp);
				this.wndPreCheckOutStd.state=false;
				let idx = this.parking.findIndex(item=>item.plate==this.wndPreCheckOutStd.dtpark.plate);
				this.parking.splice(idx,1);

			}).catch(fail=>{
				console.log(fail);
			});

			console.log(data);
		},
		checkInSTD(){
			let data = {
				apikey:this.apikey,
				plate:this.iptplate.value,
				tariff:this.usetariff,
				notes:this.notascheckinstd
			};
			apipark.makeCheckInStd(data).then(success=>{
				let resp = success.data;
				console.log(resp);

				if(resp.dtpark){
					let addingplate = {
						idmnservice:resp.dtpark._mainservice,
						idtariff:resp.dtpark._tariff,
						init:resp.dtpark.init,
						parkstate:1,
						plate:resp.dtplate.plate,
						plateid: resp.dtplate.id
					};
					this.parking.unshift(addingplate);
					this.$q.notify({ color:'positive', message: `Checkin ${resp.dtpark.id} correcto!!`, icon: 'done' });
					this.wndCheckinStd=true;
					this.iptplate.value="";
				}
			}).catch(fail=>{
				console.log(fail);
			});
		}
	},
	computed:{
		apikey(){ return this.$store.state.account.apikey },
	}
}
</script>
<style lang="scss">
	.ds{border:1px solid red;}
	.finder{
		border: 2px solid #1D1D1D;
		border-radius:10px;
	}
	.iptplate{
		text-align: center;
		border:none;

		&:focus{
			outline:none;
		}
	}
</style>