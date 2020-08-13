<template>
	<q-layout view="hHr Lpr fFr"> <!-- Be sure to play with the Layout demo on docs -->

		<!-- (Optional) The Header -->
		<q-header class="bg-white text-dark" >
			<q-toolbar>
				<q-btn flat icon="fas fa-th" @click="$router.push('/');"/>
				<q-toolbar-title class="text-center">
					<span class="text-weight-light"> Estacionamiento </span>
				</q-toolbar-title>
			</q-toolbar>
			<q-toolbar class="column">
				<q-form class="q-pb-md" @submit="defineParking">
					<div class="finder row items-center q-py-md">
						<q-icon color="dark" name="fas fa-car" size="30px" class="col"/>
						<input color="dark" outlined ref="_mginput" type="text" class="q-px-md col-8 iptplate text-uppercase text-h3 bg-none" v-model="iptplate.value" :disable="iptplate.state" autocomplete="off"/>
						<q-btn color="dark" flat class="col" type="submit" stack icon="fas fa-magic" :disable="iptplate.defining" :loading="iptplate.defining"/>
					</div>
				</q-form>
			</q-toolbar>
			<q-separator/>
		</q-header>
		

		<!-- (Optional) The Footer -->
		<q-footer class="bg-white text-dark">
			<q-toolbar>
				<q-toolbar-title class="text-center">
					<span class="text-weight-light"> Grupo Vizcarra </span>
				</q-toolbar-title>
			</q-toolbar>
		</q-footer>

		<q-drawer v-model="lrDrawer" side="right" bordered content-class="bg-white">
			<div class="q-pa-md">
				<q-card class="text-weight-light">
					<q-card-section class="text-weigth-light">
						Hola, {{ usdata.nick }}
					</q-card-section>
					<q-separator/>
					<q-card-section>
						Capacidad total: {{ maxplaces }}
						<q-linear-progress size="25px" :value="capacitypark" color="dark">
							<div class="absolute-full flex flex-center">
								<q-badge color="white" text-color="dark" :label="capacityparklabel" />
							</div>
						</q-linear-progress>
					</q-card-section>
					<q-separator />
					<q-card-section horizontal>
						<q-card-section class="col column text-center">
							<span class="text-center text-caption">En uso</span>
							<span class="text-center text-h5">{{ parking ? pksactives.length:0 }}</span>
						</q-card-section>
						<q-card-section class="col column text-center">
							<span class="text-caption">Libres</span>
							<span class="text-h5">{{ freeplaces }}</span>
						</q-card-section>
					</q-card-section>
					<template v-if="usdata.rolid==1||usdata.rolid==2">
						<q-separator />
						<q-card-section horizontal>
							<q-card-section class="col column text-center">
								<span class="text-center text-caption">Entradas:</span>
								<span class="text-center text-h5">{{ parking ? parking.length:0 }}</span>
							</q-card-section>						
							<q-card-section class="col column text-center">
								<span class="text-caption">Cobros:</span>
								<span class="text-h5">{{ parking ? pkschargeds.length : 0 }}</span>
							</q-card-section>
						</q-card-section>
					</template>
						
				</q-card>
			</div>
			<q-separator/>
			<div>
				<div class="text-weight-light" v-for="(park,idxpk) in pkschargeds" :key="'pksch_'+idxpk">
					<transition appear
						enter-active-class="animated flipInX"
						leave-active-class="animated flipOutX"
					>
						<q-card flat>
							<q-card-section>					
								Folio: {{ park.parkid }}<br/>
								Placa: {{ park.plate }}<br/>
								Salida: {{ park.ends }}
							</q-card-section>
						</q-card>
					</transition>
					<q-separator/>
				</div>
			</div>
		</q-drawer>

		<q-page-container>
			<!-- This is where pages get injected -->
			<q-page class="column items-center justify-center">
				
				<div class="row q-mt-md q-pt-md q-pl-md justify-center">
					<!-- { "plateid": 24, "plate": "FGH-123", "idmnservice": 1, "init": "2020-08-01 02:14:00", "idtariff": 1, "parkstate": "1" } -->
					<div v-for="(park,idxpk) in pksactives" :key="idxpk">
						<transition appear
							enter-active-class="animated zoomInUp"
							leave-active-class="animated flipOutX"
						>
							<q-card class="q-mr-md q-mb-md" flat bordered>
								<q-card-section horizontal>
									<q-card-section class="column justify-center">
										<div class="text-h5">{{ park.parkid }}</div>
										<div class="text-bold">{{ park.plate }}</div>
										<div clasS="text-caption">{{ park.init }}</div>
									</q-card-section>
									<q-separator vertical/>
									<q-card-actions vertical class="justify-around q-px-md">
										<template v-if="park.parkstate==1||park.parkstate==4">
											<q-btn flat round :color="park.parkstate==1?'primary':'accent'" icon="fas fa-angle-double-up" @click="autoCheckPark(park.plate);" />
										</template>
										<template v-if="park.parkstate==2">
											<q-btn flat round color="red" icon="fas fa-cut" />
										</template>
									</q-card-actions>
								</q-card-section>
							</q-card>
						</transition>
					</div>
				</div>
				<!-- CHECKIN STANDARD -->
				<q-dialog v-model="wndCheckinStd.state" @show="bfShowCheckinStd" @hide="mginputFocus">
					<q-card v-if="wndCheckinStd.case">
						<q-toolbar>
							<q-toolbar-title>
								<span class="text-weight-light text-uppercase"> {{ iptplate.value }} </span>
							</q-toolbar-title>
							<q-btn rounded flat color="negative" icon="close" v-close-popup/>
						</q-toolbar>

						<q-card-section>
							<q-form @submit="checkInSTD">
								<q-select color="dark" v-model="usetariff" :options="tariffsdb" label="Tarifa" />
								<q-input color="dark" v-model="notascheckinstd" stack-label label="notas" ref="_chkinnotes" />

								<q-card-actions align="center">
									<q-btn :loadign="wndCheckinStd.incheckin" :disabled="wndCheckinStd.incheckin" type="submit" outline label="Checkin" />
								</q-card-actions>
							</q-form>
						</q-card-section>
						
					</q-card>
					<q-card v-else>
						<q-card-section>
							<h6>No ha inicado caja..</h6>
						</q-card-section>
					</q-card>
				</q-dialog>

				<q-dialog v-model="wndPreCheckOutStd.state" @show="afShowCheckOut" @hide="resetPrecheckout();mginputFocus();">
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

							<q-card-section  v-if="usdata.rolid==1||usdata.rolid==2">
								<q-form @submit="makeCharge">
									<q-select color="dark" v-model="usepayway" :options="paywaysdb" stack-label label="Forma de pago" />
									<q-input color="dark" type="number" ref="iptpayment" v-model="wndPreCheckOutStd.paytotal" stack-label label="Pago"/>

									<q-card-actions align="center" v-if="wndPreCheckOutStd.paytotal>=wndPreCheckOutStd.topay.totalcost">
										<q-btn 
											:disabled="wndPreCheckOutStd.paying" 
											:loading="wndPreCheckOutStd.paying" 
											type="submit" color="primary" 
											flat label="pagar"/>
									</q-card-actions>
								</q-form>
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
			maxplaces:90,
			lrDrawer: true,
			iptplate:{state:false,value:"",defining:false},
			wndCheckinStd:{
				state:false,
				case:null,
				incheckin:false
			},
			wndPreCheckOutStd:{
				state:false,
				topay:null,
				dtpark:null,
				paytotal:0,
				paying:false
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
			notascheckinstd:""
		}
	},
	beforeMount(){
		this.index();
	},
	mounted(){
		console.log("%cCargando data dle usuario","font-size:2em;");
		console.log(this.usdata);
		this.$refs._mginput.focus();
	},
	methods:{
		async index(){
			let idx = await apipark.index({apikey:this.apikey});
			console.log(idx);
			this.parking=idx.park;
		},
		resetPrecheckout(){
			this.wndPreCheckOutStd.paytotal=0;
		},
		autoCheckPark(plate){
			this.iptplate.value=plate;
			this.defineParking();
		},
		afShowCheckOut(){
			this.$refs.iptpayment.focus();
			this.wndPreCheckOutStd.paytotal="";
		},
		bfShowCheckinStd(){// despues de desplegar ventana de checkin standard
			this.notascheckinstd="";
			this.$refs._chkinnotes.focus();
		},
		mginputFocus(){
			this.notascheckinstd="";
			this.iptplate.value='';
			this.$refs._mginput.focus();
		},
		defineParking(){
			let data = {
				apikey:this.apikey,
				mginput:null
			};
			let trymginput = false;// aurotiza el paso a la paeticion
			this.iptplate.defining=true;// precargando el loading

			if(!this.iptplate.value){// si el campo esta vacio, se crea una placa random
				console.log("%cCrear placa random ","font-size:2em;color:gold");
				let rndmplate = Date.now();
				this.iptplate.value = rndmplate;
				data.mginput = rndmplate;
				trymginput=true;
			}else if(this.iptplate.value.length>=3){// si no esta vacio, al menos debe tener 3 caracteres
				console.log("%cCrear un parking por placa","font-size:2em;color:gold");
				data.mginput = this.iptplate.value.toUpperCase();
				trymginput=true;
			}else{
				alert("no es una placa valida");
				this.mginputFocus();
			}

			console.log(data);

			if(trymginput){
				apipark.magic(data).then(success=>{
					let resp = success.data;
					console.log(resp);
					this.wndCheckinStd.case=resp.cashavls;	

					switch (resp.parkexs) {
						case 404: case 205:
							this.wndCheckinStd.state=true;
						break;

						case 200:
							console.log("Hacer checkout");
							this.wndPreCheckOutStd.state=true;
							this.wndPreCheckOutStd.topay=resp.precheckout.topay;
							this.wndPreCheckOutStd.dtpark=resp.precheckout.dtpark;	
						break;
					}
				}).catch(fail=>{
					console.log(fail);
				});
			}

			this.iptplate.defining=false;
		},
		makeCharge(){
			if(this.wndPreCheckOutStd.paytotal>=this.wndPreCheckOutStd.topay.totalcost){
				// console.log(this.wndPreCheckOutStd);
				this.wndPreCheckOutStd.paying=true;
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
					let idx = this.parking.findIndex(item=>item.parkid==this.wndPreCheckOutStd.dtpark.parkid);
					console.log(this.parking[idx]);
					this.parking[idx].parkstate=3;
					this.parking[idx].ends=resp.printed.park.ends;
					this.wndPreCheckOutStd.state=false;
					this.wndPreCheckOutStd.paying=false;

				}).catch(fail=>{
					console.log(fail);
					this.wndPreCheckOutStd.paying=false;
				});
			}else{
				this.$q.notify({ color:'info', message: `Olvidaste cubrir el total`, icon: 'far fa-grin-beam-sweat' });
			}
		},
		checkInSTD(){
			let data = {
				apikey:this.apikey,
				plate:this.iptplate.value,
				tariff:this.usetariff,
				notes:this.notascheckinstd
			};

			if(this.notascheckinstd.length>=5){
				this.wndCheckinStd.incheckin=true;
				apipark.makeCheckInStd(data).then(success=>{
					let resp = success.data;
					console.log(resp);

					if(resp.dtpark.success){
						let addingplate = {
							idmnservice:resp.dtpark.data.idmservice,
							idtariff:resp.dtpark.data.idmtariff,
							init:resp.dtpark.data.init,
							parkstate:1,
							parkid: resp.idpark,
							plate:resp.dtpark.data.plate,
							plateid:resp.dtpark.data.idplate
						};
						console.log(addingplate);
						this.parking.unshift(addingplate);
						console.log(this.parking);
						this.$q.notify({ color:'positive', message: `Checkin ${resp.idpark} correcto!!`, icon: 'done' });
						this.wndCheckinStd.state=false;
						this.wndCheckinStd.incheckin=false;
						this.iptplate.value="";
					}
				}).catch(fail=>{
					console.log(fail);
				});
			}else{
				this.$refs._chkinnotes.focus();
				this.$q.notify({
					message: 'Ingrese notas del vehiculo',
					color: 'negative',
					icon: 'fas fa-grin-beam-sweat'
				});
			}
		}
	},
	computed:{
		apikey(){ return this.$store.state.account.apikey },
		usdata(){ return this.$store.state.account.user },
		capacityparklabel () {
			if(this.parking){ 
				return (this.pksactives.length*100/this.maxplaces).toFixed(1)+' %'
			}else{ return 0;}
		},
		capacitypark() {
			if(this.parking){ 
				return parseFloat((this.pksactives.length/this.maxplaces).toFixed(1))
			}else{ return 0;} 
		},
		pksactives(){ if(this.parking){ return this.parking.filter( pk =>{ return pk.parkstate==4||pk.parkstate==1 }); } },
		pkschargeds(){ if(this.parking){ return this.parking.filter( pk =>{ return pk.parkstate==3 }); } },
		freeplaces(){ if(this.parking){ return this.maxplaces-this.pksactives.length}else{return 0;} }
	}
}
</script>
<style lang="scss">
	.ds{border:1px solid red;}
	.finder{
		border-bottom: 2px solid #d1d1d1;
	}
	.iptplate{
		text-align: center;
		border:none;

		&:focus{
			outline:none;
		}
	}
</style>