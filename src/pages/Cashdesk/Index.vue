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
					<q-card-section class="column justify-center">
						<div class="text-h6">Caja {{ cash.id }}</div>
						<div>{{ cashstates[cash._state] }}</div>
					</q-card-section>
					<q-separator vertical/>
					<q-card-actions vertical class="justify-around q-px-md">
						<template v-if="cash._state<3">
							<q-btn @click="initOpening(cashidx)" flat round color="primary" icon="far fa-play-circle" />
							<!-- <q-btn flat round color="red" icon="fas fa-archive" /> -->
						</template>
						<template v-if="cash._state==3">
							<q-btn flat round color="red" icon="fas fa-cut" @click="initCut(cashidx)"/>
						</template>
						
					</q-card-actions>
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
export default {
	// name: 'PageName',
	data(){
		return{
			cashloading:true,
			cashdesks:[],
			denomsdb:null,
			wndCut:{
				state:false,
				cash:null,
				cuting:false
			},
			wndOpening:{
				state:false,
				cash:null,
				opening:false
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
					"assignedto":3,
					"notes":""
				}
			}
			this.wndCut.cuting=true;

			apipark.makeCut(data).then(success=>{
				let resp = success.data
				console.log(resp);
				this.$q.notify({ color:'positive', message: `Corte ${resp.resume.cut.id} concretado!!`, icon: 'done' });				
				let idx = this.cashdesks.findIndex(item => item.id==this.wndCut.cash.id);
				this.cashdesks[idx]._state=2;
				this.resetwndCut();
			}).catch(fail=>{
				console.log(fail);
			});
		},
		makeOpening(){
			console.log("opening starts");
			let denoms = this.denomsdb.map(den=>{return {id:den.id,cant:parseInt(den.model)}});
			console.log(this.wndOpening.cash.id);
			let data = {
				"apikey":this.apikey,
				"cashdesk":{
					"id":this.wndOpening.cash.id,
					"denoms":denoms,
					"assignto":3,
					"notes":""
				}
			}
			this.wndOpening.opening=true;

			apipark.newOpening(data).then(success=>{
				let resp  = success.data
				console.log(resp);
				if(resp){
					this.wndOpening.state=false;
					let idx = this.cashdesks.findIndex(item => item.id==this.wndOpening.cash.id);
					this.cashdesks[idx]._state=3;
					this.$q.notify({ color:'positive', message: `Listo!! (${resp.rset.openid})`, icon: 'done' });
					this.resetwndOpening();
				}
			}).catch(fail=>{
				console.log(fail);
			});
		}
	},
	computed:{
		apikey(){ return this.$store.state.account.apikey },
		bills(){ if(this.denomsdb){ return this.denomsdb.filter( el => { return el.type==1; }); } },
		coins(){ if(this.denomsdb){ return this.denomsdb.filter( el => { return el.type==2; }); } },
		totalCurrs(){
			if(this.denomsdb){
				let $total = this.coins.map(coin => coin.value*coin.model).reduce((amount,el)=>{ return amount+el; })+this.bills.map(bill => bill.value*bill.model).reduce((amount,el)=>{ return amount+el; });
				return $total;
			}
			return 0;
		}
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