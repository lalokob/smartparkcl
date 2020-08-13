<template>
	<q-page class="row items-center justify-center">
		<div class="row q-pt-md q-pl-md text-weight-light">
			<q-spinner
				color="dark"
				size="3em"
				:thickness="2"
				v-if="cashloading"
			/>

			<q-card v-for="(cash,cashidx) in cashdesks"
				:key="cashidx"
				class="q-mr-md q-mb-md" flat bordered
			>
				<q-card-section horizontal>
					<template v-if="cash._state==1"><!-- CAJA NUNCA UTILIZADA -->
						<q-card-section class="column justify-center">
							<div class="text-h6">Caja {{ cash.id }}</div>
							<div>{{ cashstates[cash._state] }}</div>
						</q-card-section>
						<q-separator vertical/>
						<q-card-actions vertical class="justify-around q-px-md" v-if="user.rolid==1">
							<q-btn @click="initOpening(cashidx)" flat round color="primary" icon="far fa-play-circle" />
						</q-card-actions>
					</template>

					<template v-if="cash._state==2"><!-- CAJA con corte previo -->
						<q-card-section class="column justify-center">
							<div> <span class="text-h6"> Caja {{ cash.id }} </span> <span>{{ cashstates[cash._state] }}</span> </div>
							<div>Ultima apertura: {{ humantime(cash.opening.init) }}, {{ cash.opening.usbynames }} {{ cash.opening.usbylnames }}</div>
							<div>Asignacion: {{ cash.opening.ustonames }} {{ cash.opening.ustolnames }}</div>
							<div>Ultimo corte: {{ humantime(cash.cut.makeit) }}, {{ cash.cut.fnames }} {{ cash.cut.lnames }}</div>
						</q-card-section>
						<q-separator vertical/>
						<q-card-actions vertical class="justify-around q-px-md" v-if="user.rolid==1">
							<q-btn v-if="recycleOpening(cash.opening,cash.cut)" @click="reactiveOpening(cash.opening,cash.id)" flat round color="orange-10" icon="fas fa-play-circle" :loading="wndOpening.reopen" :disable="wndOpening.reopen"/>
							<q-btn v-else @click="initOpening(cashidx)" flat round color="primary" icon="far fa-play-circle" />
						</q-card-actions>
					</template>

					<template v-if="cash._state==3"><!-- CAJA en uso -->
						<q-card-section class="column justify-center">
							<div> <span class="text-h6"> Caja {{ cash.id }} </span>: <span>{{ cashstates[cash._state] }}</span> </div>
							<div>Ultima Apertura: {{ humantime(cash.opening.init) }}, {{ cash.opening.usbynames }} {{ cash.opening.usbylnames }}</div>
							<div>Ultima Asignacion: {{ cash.opening.ustonames }} {{ cash.opening.ustolnames }} </div>
							<div v-if="cash.cut">Corte: {{ humantime(cash.cut.makeit) }}, {{ cash.cut.fnames }} {{ cash.cut.lnames }}</div>
						</q-card-section>
						<q-separator vertical/>
						<q-card-actions vertical class="justify-around q-px-md" v-if="user.rolid==1">
							<q-btn flat round color="red" icon="fas fa-cut" @click="initCut(cashidx)"/>
							<!-- <q-btn flat round color="accent" icon="fas fa-upload" />
							<q-btn flat round color="positive" icon="fas fa-download" /> -->
						</q-card-actions>
						<q-card-actions vertical class="justify-around q-px-md" v-if="user.rolid==2">
							<q-btn flat round color="red" icon="fas fa-cut" @click="initCut(cashidx)"/>
						</q-card-actions>
					</template>
				</q-card-section>
			</q-card>
		</div>

		<q-dialog v-model="wndOpening.state">
			<q-card >
				<q-toolbar class="bg-white text-dark">
						<q-toolbar-title>
							<span class="text-weight-light"> Apertura de Caja {{ wndOpening.cash ? wndOpening.cash.id:''}}</span>
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
					<q-btn color="dark" :loading="wndOpening.opening" @click="makeOpening">Iniciar con ${{ totalCurrs }}</q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-dialog v-model="wndCut.state">
			<q-card>
				<q-toolbar class="bg-white text-dark">
					<q-toolbar-title>
						<span class="text-weight-light"> Corte de Caja {{ wndCut.cash ? wndCut.cash.id:''}}</span>
					</q-toolbar-title>
				</q-toolbar>

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
					<q-btn color="dark" :loading="wndCut.cuting" @click="makeCut">Cerrar caja con: ${{ totalCurrs }}</q-btn>
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
		return{
			cashloading:true,
			cashdesks:[],
			cashiersdb:null,
			denomsdb:null,
			userforassign:{value:null,label:"Seleccione"},
			wndCut:{
				state:false,
				cash:null,
				cuting:false
			},
			wndOpening:{
				state:false,
				cash:null,
				opening:false,
				reopen:false
			},
			cashstates:{
				1:"Nueva/disponible para apertura",
				2:"Disponible para apertura",
				3:"En uso (cobrando)"
			},
		}
	},
	beforeMount(){
		this.index();
	},
	methods:{
		async index(){
			let idx = await apipark.index({apikey:this.apikey});
			this.cashdesks = idx.cashdesks;
			this.denomsdb = idx.currencies.map(curr=>{curr.model=0; return curr});
			this.cashiersdb = idx.cashiers;
			this.cashloading=false;
		},
		initCut(idx){
			this.wndCut.cash=this.cashdesks[idx];
			this.wndCut.state=true;
		},
		initOpening(idx){
			this.wndOpening.cash=this.cashdesks[idx];
			this.wndOpening.state=true;
		},
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
		resetwndCut(){
			this.wndCut.cash=null;
			this.wndCut.state=false;
			this.wndCut.cuting=false;
		},
		resetwndOpening(){
			this.wndOpening.cash=null;
			this.wndOpening.state=false;
			this.wndOpening.opening=false;
		},
		makeCut(){
			console.log("cutcash starts");
			let denoms = this.denomsdb.map(den=>{return {id:den.id,cant:parseInt(den.model)}});
			let data = {
				"apikey":this.apikey,
				"cashdesk":{
					"id":this.wndCut.cash.id,
					"denoms":denoms,
					"notes":""
				}
			}
			this.wndCut.cuting=true;

			apipark.makeCut(data).then(success=>{
				let resp = success.data;
				console.log(resp);
				this.$q.notify({ color:'positive', message: `Corte ${resp.resume.cut.id} concretado!!`, icon: 'done' });				
				let idx = this.cashdesks.findIndex(item => item.id==this.wndCut.cash.id);
				this.cashdesks[idx]._state=2;
				this.cashdesks[idx].cut=resp.resume.openandcut.cut;
				this.resetwndCut();
			}).catch(fail=>{
				console.log(fail);
			});
		},
		makeOpening(){
			if(this.userforassign.value){
				console.log("opening starts");
				let denoms = this.denomsdb.map(den=>{return {id:den.id,cant:parseInt(den.model)}});
				console.log(this.wndOpening.cash.id);
				let data = {
					"apikey":this.apikey,
					"cashdesk":{
						"id":this.wndOpening.cash.id,
						"denoms":denoms,
						"assignto":this.userforassign.value,
						"notes":""
					}
				}
				console.log(data);
				this.wndOpening.opening=true;

				apipark.newOpening(data).then(success=>{
					let resp  = success.data
					console.log(resp);
					if(resp){
						this.wndOpening.state=false;
						let idx = this.cashdesks.findIndex(item => item.id==this.wndOpening.cash.id);
						this.cashdesks[idx].opening=resp.rset.opening;
						this.cashdesks[idx]._state=3;
						console.log(this.cashdesks[idx]);

						this.$q.notify({ color:'positive', message: `Listo!! (${resp.rset.openid})`, icon: 'done' });
						this.resetwndOpening();
					}
				}).catch(fail=>{
					console.log(fail);
				});
			}else{
				this.$q.notify({ color:'warning', message: `Debes seleccionar un cajero`, icon: 'error_outline' });
			}
		}
	},
	computed:{
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
		},
		apikey(){ return this.$store.state.account.apikey },
		bills(){ if(this.denomsdb){ return this.denomsdb.filter( el => { return el.type==1; }); } },
		coins(){ if(this.denomsdb){ return this.denomsdb.filter( el => { return el.type==2; }); } },
		totalCurrs(){
			if(this.denomsdb){
				let $total = this.coins.map(coin => coin.value*coin.model).reduce((amount,el)=>{ return amount+el; })+this.bills.map(bill => bill.value*bill.model).reduce((amount,el)=>{ return amount+el; });
				return $total;
			}
			return 0;
		},
		cashiersavls(){
			if(this.cashiersdb){
				return this.cashiersdb.filter(cashier => !cashier.usingcash).map(cashier =>{
					return {value:cashier.accid,label:`${cashier.fnames} ${cashier.lnames} (${cashier.nick})`};
				});
			}
		},
		user(){ return this.$store.state.account.user },
	}
}
</script>
<style lang="scss">
	.ds{border:1px solid red!important;}
	.stlcash{
		width: 150px;
		min-height: 150px;
		
		&:hover{
			background-color: rgba(128, 128, 128, 0.02);
		};
	}
</style>