<template>
	<q-page padding>
		<!-- (Optional) The Header -->
		<q-header class="bg-darkl1 text-grey-7">
			<q-toolbar>
				<q-btn flat icon="far fa-arrow-alt-circle-left" @click="$router.push('/cajas');"/>
				<q-toolbar-title class="text-center">
					<q-spinner v-if="loadingcash"
						color="dark"
						:thickness="2"
					/>
					<span v-else class="text-weight-light"> Caja {{ idcash }}</span>
				</q-toolbar-title>
				<span>
					<span class="text-pink-6"> Smart</span>
					<span class="text-white">Park</span>
				</span>
			</q-toolbar>
		</q-header>

		<div class="row justify-end items-center q-mb-md">
			<template v-if="data">
				<q-card flat class="bg-darkl1 q-ml-md">
					<q-card-section horizontal>
						<q-card-section>
							<div class="text-light-blue-13 text-h4">100</div>
							<div>operaciones</div>
						</q-card-section>
						<q-separator vertical/>
						<q-card-section>
							<div class="text-light-blue-13 text-h4">$ 100</div>
							<div>efectivo cobrado</div>
						</q-card-section>
					</q-card-section>
				</q-card>

				<template v-if="instance">
					<q-card flat class="bg-darkl1 q-ml-md text-pink-6">
						<q-card-section horizontal>
							<q-card-section>
								<q-btn flat round icon="fas fa-plus" size="lg"/>
							</q-card-section>
							<q-separator vertical/>
							<q-card-section>
								<q-btn flat round icon="fas fa-minus" size="lg"/>
							</q-card-section>
						</q-card-section>
					</q-card>
				</template>

				<q-card flat class="bg-darkl1 q-ml-md">
					<q-card-section>
						<template v-if="data._state==1">
							<q-btn @click="initOpening()" flat round color="green-13" icon="far fa-play-circle" size="lg" />
						</template>

						<template v-if="data._state==2">
							<q-btn v-if="recycleOpening(opening,cut)" @click="reactiveOpening(opening,idcash)" flat round color="orange-10" icon="fas fa-play-circle" :loading="wndOpening.reopen" :disable="wndOpening.reopen" size="lg"/>
							<q-btn v-else @click="initOpening(idcash)" flat round color="green-13" icon="far fa-play-circle" size="lg" />
						</template>

						<template v-if="data._state==3">
							<q-btn flat round color="red" icon="fas fa-cut" @click="initCut(idcash)" size="lg"/>
						</template>
					</q-card-section>
				</q-card>
				
			</template>
		</div>

		<q-card class="bg-darkl1">
			<q-card-section class="row justify-between items-center">
				<div><q-icon name="fas fa-history"/> Historico</div>
				<div>
					<q-select borderless dense dark @input="getHistoric"
						color="light-blue-13"
						v-model="histview" 
						style="width: 100px"
						:options="[
								{label: 'Semana', value: 'w'},
								{label: 'Mes', value: 'm'},
								{label: 'Año', value: 'y'}
							]"
					/>
				</div>
			</q-card-section>
			<q-separator/>
			<q-card-section>
				<q-spinner v-if="!historic" color="grey-7" size="2em" :thickness="2" />
				<div v-else>
					<q-table dark flat
						card-class="bg-none text-grey-6"
						:data="historic"
						:columns="columnsHist"
						row-key="opening"
						class="_thsticky"
						table-header-class="text-light-blue-13"
						separator="none"
					>
						<template v-slot:body="props">
							<q-tr :props="props" style="b">
								<q-td key="opening" :props="props">
									{{ props.row.opening }}
								</q-td>

								<q-td key="start" :props="props">
									{{ props.row.starts }}
								</q-td>

								<q-td key="end" :props="props">
									{{ props.row.ends }}
								</q-td>

								<q-td key="sparkings" :props="props">
									{{ props.row.parkings.length }}
								</q-td>

								<q-td key="spayments" :props="props">
									{{ pksPayments(props.row.parkings) }}
								</q-td>

								<q-td key="sarchiveds" :props="props">
									{{ pksArchiveds(props.row.parkings) }}
								</q-td>

								<q-td key="actions" :props="props">
									<q-btn dense flat color="light-blue-13" size="sm" icon="open_in_new" />
								</q-td>
							</q-tr>
						</template>
					</q-table>
				</div>
			</q-card-section>
			<q-separator/>
			<q-card-section horizontal>
				<q-card-section>
					<div>Ultima Apertura: </div>
					<div> {{ opening?humantime(opening.init):'---' }} </div>
				</q-card-section>
				<q-separator vertical/>
				<q-card-section>
					<div>Ultima Asignacion:</div>
					<div> {{ opening?opening.usbynick:'---' }} </div>
				</q-card-section>
				<q-separator vertical/>
				<q-card-section>
					<div>Ultimo Corte:</div>
					<div> {{ cut?humantime(cut.makeit):'---' }} </div>
				</q-card-section>
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
			histview:{label: 'Semana', value: 'w'},
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
			},
			instance:null,
			historic:null,
			columnsHist:[
				{ name: 'opening', required: true, label: 'Apertura', align: 'left', field: row => row.opening, sortable: true },
				{ name: 'start', align: 'center', label: 'Inicio', field: 'starts', sortable: true },
				{ name: 'end', align: 'center', label: 'Corte', field: 'ends', sortable: true },
				{ name: 'sparkings', align: 'center', label: 'Entradas', field: 'parkings', sortable: true },
				{ name: 'spayments', align: 'center', label: 'Cobros', field: 'parkings', sortable: true },
				{ name: 'sarchiveds', align: 'center', label: 'Archivados', field: 'parkings', sortable: true },
				{ name: 'actions', align: 'center' }
			]
		}
	},
	mounted(){
		this.getHistoric();
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
				this.instance = resp.instance;
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
		getHistoric(){
			let data = {
				apikey:this.apikey,
				histview:this.histview,
				idcash:this.idcash
			}
			
			apipark.historic(data).then(success=>{
				let resp = success.data;
				console.log(resp);

				this.historic = resp.openings;
			}).catch(fail=>{
				console.log(resp);
			});
		}
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
		},
		pksPayments(){ return pks =>{
				return pks.filter(pk=>{return pk.state==3}).length;
			}
		},
		pksArchiveds(){ return pks =>{
				return pks.filter(pk=>{return pk.state==6}).length;
			}
		},
	}
}
</script>
<style lang="scss">
	._thsticky{
		max-height: 400px;
		.q-table__top,.q-table__bottom,thead tr:first-child th{ background: #2D3035; }
		thead tr th{ position: sticky; z-index:1; }
		thead tr:first-child th{top: 0;}

		tbody tr{ border:4px solid red; }
	}
</style>