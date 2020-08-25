<template>
	<q-page padding>
		<!-- (Optional) The Header -->
		<q-header class="text-white bg-smoke">
			<q-toolbar>
				<q-btn flat icon="far fa-arrow-alt-circle-left" @click="$router.push('/cajas');"/>
				<q-toolbar-title class="text-center">
					<q-spinner v-if="loadingcash"
						color="dark"
						:thickness="2"
					/>
					<span v-else class="text-weight-light"> Caja {{ idcash }}</span>
				</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<q-card class="text-weight-light">
			<q-toolbar>
				<template v-if="data">
					<span> Estado: {{ cashstates[data._state] }} </span>
					<q-space/>
					<template v-if="data._state==1">
						<q-btn @click="initOpening()" flat round color="primary" icon="far fa-play-circle" />
					</template>

					<template v-if="data._state==2">
						<q-btn v-if="recycleOpening(opening,cut)" @click="reactiveOpening(opening,idcash)" flat round color="orange-10" icon="fas fa-play-circle" :loading="wndOpening.reopen" :disable="wndOpening.reopen"/>
						<q-btn v-else @click="initOpening(idcash)" flat round color="primary" icon="far fa-play-circle" />
					</template>

					<template v-if="data._state==3">
						<q-btn flat round color="red" icon="fas fa-cut" @click="initCut(idcash)"/>
					</template>
				</template>
			</q-toolbar>
			<q-separator/>
			<q-card-section horizontal>
				<q-card-section>
					<div class="column">
						<span> Aperturas: 100 </span>
						<span> Cortes: 100 </span>
						<span> Operaciones: 100 </span>
					</div>
				</q-card-section>
				<q-separator vertical/>
				<q-card-section>
					<div class="column">
						<div> Ultima Apertura: <span> {{ opening?humantime(opening.init):'---' }} </span> </div>
						<div> Asignacion: <span> {{ opening?opening.usbynick:'---' }} </span> </div>
						<div> Ultimo Corte: <span> {{ cut?humantime(cut.makeit):'---' }} </span> </div>
					</div>
				</q-card-section>
				<q-separator vertical/>
			</q-card-section>
		</q-card>

		<q-dialog v-model="wndOpening.state">
			<q-card >
				<q-toolbar class="bg-white text-dark">
					<q-toolbar-title>
						<span class="text-weight-light"> Apertura de Caja {{ idcash }}</span>
					</q-toolbar-title>
				</q-toolbar>
				<q-card-section>
					<q-select color="dark" :options="cashiersavls" v-model="userforassign" stack-label label="Asignar a:"/>
				</q-card-section>
				<q-card-section>
					<div class="row">
						<q-markup-table flat>
							<tr v-for="(bill,idx) in bills" :key="idx+'_bill'" class="text-indigo-5">
								<td><q-input color="dark" type="number" min="0" v-model="bill.model" stack-label :label="'$ '+String(bill.value)" /></td>
							</tr>
						</q-markup-table>
						<q-markup-table flat>
							<tr v-for="(coin,idx) in coins" :key="idx+'_coin'">
								<td><q-input color="dark" type="number" min="0" v-model="coin.model" stack-label :label="'$ '+String(coin.value)"/></td>
							</tr>
						</q-markup-table>
					</div>
				</q-card-section>

				<q-card-actions align="center" v-if="totalCurrs" >
					<!-- <q-btn color="dark" :loading="wndOpening.opening" @click="makeOpening">Iniciar con ${{ totalCurrs }}</q-btn> -->
				</q-card-actions>
			</q-card>
		</q-dialog>

	</q-page>
</template>

<script>
import apipark from '../../API/cashdesk'
import { date } from 'quasar'
export default {
	// name: 'PageName',
	data(){
		return {
			loadingcash:true,
			idcash:null,
			data:null,
			cashiersdb:null,
			denomsdb:null,
			userforassign:{value:null,label:"Seleccione"},
			cashstates:{
				1:"Nueva/disponible para apertura",
				2:"Disponible para apertura",
				3:"En uso (cobrando)"
			},
			opening:null,
			cut:null,
			wndOpening:{
				state:false,
				cash:null,
				opening:false,
				reopen:false
			}
		}
	},
	beforeMount(){
		this.idcash = this.$route.params.id;
		console.log(this.idcash);
		console.log(`%cMontando Caja ${this.idcash}`,"font-size:2em");

		let data = {
			apikey:this.apikey,
			cashdesk:{
				id:this.idcash
			}
		}

		apipark.shield(data).then(success=>{
			let resp = success.data;
			console.log(resp);
			if(resp.shield){
				this.loadingcash=false;
				this.idcash = resp.cash.id;
				this.opening = resp.openandcut.opening;
				this.cut = resp.openandcut.cut;
				this.denomsdb = resp.currencies;
				this.cashiersdb = resp.cashiers;
				this.data = resp.cash;
			}else{
				this.$router.push('/cajas');
			}
		}).catch(fail => {
			console.log(fail);
		});
	},
	methods:{
		reactiveOpening(opening,cashid){
			console.log(opening);
			this.wndOpening.reopen=true;

			let data = {
				"apikey":this.apikey,
				"opening":opening
			}

			apipark.reactiveOpening(data).then(success=>{
				let resp = success.data;
				console.log(resp);
				this.wndOpening.reopen=false;
				let idx = this.cashdesks.findIndex(item => item.id==cashid);
				this.cashdesks[idx]._state=3;
				this.cashdesks[idx].cut=null;
			}).catch(fail=>{
				console.log(fail);
			});
		},
		initOpening(idx){
			// this.wndOpening.cash=this.cashdesks[idx];
			this.wndOpening.state=true;
		},
		initCut(idx){
			this.wndCut.cash=this.cashdesks[idx];
			this.wndCut.state=true;
		},
	},
	computed:{
		apikey(){ return this.$store.state.account.apikey },
		recycleOpening(){
			return (opening,cut)=>{
				if(opening&&cut){
					let now = Date.now();
					let opentime = Date.parse(opening.init);
					let diff = date.getDateDiff(now, opentime, 'days');

					return diff==0?true:false;
				}
				return false;
			}
		},
		cashiersavls(){
			if(this.cashiersdb){
				return this.cashiersdb.filter(cashier => !cashier.usingcash).map(cashier =>{
					return {value:cashier.accid,label:`${cashier.fnames} ${cashier.lnames} (${cashier.nick})`};
				});
			}
		},
		bills(){ if(this.denomsdb){ return this.denomsdb.filter( el => { return el.type==1; }); } },
		coins(){ if(this.denomsdb){ return this.denomsdb.filter( el => { return el.type==2; }); } },
		totalCurrs(){
			if(this.denomsdb){
				let $total = this.coins.map(coin => coin.value*coin.model).reduce((amount,el)=>{ return amount+el; })+this.bills.map(bill => bill.value*bill.model).reduce((amount,el)=>{ return amount+el; });
				return $total;
			}
			return 0;
		},
		humantime(){ return time =>{ 
				let now = Date.now(); 
				let timecalc = Date.parse(time);
				let diff = date.getDateDiff(now, timecalc, 'days');

				switch (diff) {
					case 1:
							return 'Ayer a las '+date.formatDate(timecalc, 'hh:mm a');
						break;
				
					case 0:
							return 'Hoy a las '+date.formatDate(timecalc, 'hh:mm a');
						break;

					default:
							return `Hace ${diff} dias, a las `+date.formatDate(timecalc, 'hh:mm a');
						break;
				}

				return diff;
			}
		}
	}
}
</script>
