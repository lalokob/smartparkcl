(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{b93d:function(t,a,e){},d5d6:function(t,a,e){"use strict";var s=e("b93d"),i=e.n(s);i.a},d770:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-layout",{attrs:{view:"hHr Lpr fFr"}},[e("q-header",{staticClass:"bg-white text-dark"},[e("q-toolbar",[e("q-toolbar-title",{staticClass:"text-center"},[e("span",{staticClass:"text-weight-light"},[t._v(" Estacionamiento ")])])],1)],1),e("q-footer",{staticClass:"bg-white text-dark"},[e("q-toolbar",[e("q-toolbar-title",{staticClass:"text-center"},[e("span",{staticClass:"text-weight-light"},[t._v(" Grupo Vizcarra ")])])],1)],1),e("q-drawer",{attrs:{side:"right",bordered:"","content-class":"bg-white"},model:{value:t.lrDrawer,callback:function(a){t.lrDrawer=a},expression:"lrDrawer"}},[e("div",{staticClass:"q-pa-md"},[e("q-card",{staticClass:"text-weight-light"},[e("q-card-section",{staticClass:"text-weigth-light"},[t._v("\n\t\t\t\t\tHola, "+t._s(t.usdata.nick)+"\n\t\t\t\t")]),e("q-separator"),e("q-card-section",[t._v("\n\t\t\t\t\tCapacidad total: "+t._s(t.maxplaces)+"\n\t\t\t\t\t"),e("q-linear-progress",{attrs:{size:"25px",value:t.capacitypark,color:"dark"}},[e("div",{staticClass:"absolute-full flex flex-center"},[e("q-badge",{attrs:{color:"white","text-color":"dark",label:t.capacityparklabel}})],1)])],1),e("q-separator"),e("q-card-section",{attrs:{horizontal:""}},[e("q-card-section",{staticClass:"col column text-center"},[e("span",{staticClass:"text-center text-caption"},[t._v("En uso")]),e("span",{staticClass:"text-center text-h5"},[t._v(t._s(t.parking?t.pksactives.length:0))])]),e("q-card-section",{staticClass:"col column text-center"},[e("span",{staticClass:"text-caption"},[t._v("Libres")]),e("span",{staticClass:"text-h5"},[t._v(t._s(t.freeplaces))])])],1),1==t.usdata.rolid||2==t.usdata.rol?[e("q-separator"),e("q-card-section",{attrs:{horizontal:""}},[e("q-card-section",{staticClass:"col column text-center"},[e("span",{staticClass:"text-center text-caption"},[t._v("Entradas:")]),e("span",{staticClass:"text-center text-h5"},[t._v(t._s(t.parking?t.parking.length:0))])]),e("q-card-section",{staticClass:"col column text-center"},[e("span",{staticClass:"text-caption"},[t._v("Cobros:")]),e("span",{staticClass:"text-h6"},[t._v(t._s(t.parking?t.pkschargeds.length:0))])])],1)]:t._e()],2)],1),e("q-separator"),e("div",t._l(t.pkschargeds,(function(a,s){return e("div",{key:"pksch_"+s,staticClass:"text-weight-light"},[e("q-card",{attrs:{flat:""}},[e("q-card-section",[t._v("\n\t\t\t\t\t\tFolio: "+t._s(a.id)),e("br"),t._v("\n\t\t\t\t\t\tPlaca: "+t._s(a.plate)),e("br"),t._v("\n\t\t\t\t\t\tSalida: "+t._s(a.ends)+"\n\t\t\t\t\t")])],1),e("q-separator")],1)})),0)],1),e("q-page-container",[e("q-page",{staticClass:"column items-center justify-center"},[e("div",{staticClass:"bg-white q-pt-md q-mb-md"},[e("q-form",{on:{submit:t.defineParking}},[e("div",{staticClass:"finder row items-center q-py-md"},[e("q-icon",{staticClass:"col",attrs:{color:"dark",name:"fas fa-car",size:"30px"}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.iptplate.value,expression:"iptplate.value"}],ref:"iptplate_search",staticClass:"q-px-md col-8 iptplate text-uppercase text-h3 bg-none",attrs:{color:"dark",outlined:"",type:"text",disable:t.iptplate.state,autocomplete:"off"},domProps:{value:t.iptplate.value},on:{input:function(a){a.target.composing||t.$set(t.iptplate,"value",a.target.value)}}}),e("q-btn",{staticClass:"col",attrs:{color:"dark",flat:"",type:"submit",stack:"",icon:"fas fa-magic",disable:t.iptplate.state||t.iptplate.value.length<3}})],1)])],1),e("div",{staticClass:"row q-mt-md q-pt-md q-pl-md justify-center"},t._l(t.pksactives,(function(a,s){return e("div",{key:s},[e("q-card",{staticClass:"q-mr-md q-mb-md",attrs:{flat:"",bordered:""}},[e("q-card-section",{attrs:{horizontal:""}},[e("q-card-section",{staticClass:"column justify-center"},[e("div",{staticClass:"text-h6"},[t._v(t._s(a.plate))]),e("div",{attrs:{clasS:"text-caption"}},[t._v(t._s(a.init))])]),e("q-separator",{attrs:{vertical:""}}),e("q-card-actions",{staticClass:"justify-around q-px-md",attrs:{vertical:""}},[1==a.parkstate||4==a.parkstate?[e("q-btn",{attrs:{flat:"",round:"",color:1==a.parkstate?"primary":"accent",icon:"fas fa-angle-double-up"},on:{click:function(e){return t.autoCheckPark(a.plate)}}})]:t._e(),2==a.parkstate?[e("q-btn",{attrs:{flat:"",round:"",color:"red",icon:"fas fa-cut"}})]:t._e()],2)],1)],1)],1)})),0),e("q-dialog",{on:{"before-hide":function(a){t.iptplate.value=""}},model:{value:t.wndCheckinStd.state,callback:function(a){t.$set(t.wndCheckinStd,"state",a)},expression:"wndCheckinStd.state"}},[t.wndCheckinStd.case?e("q-card",[e("q-toolbar",[e("q-toolbar-title",{staticClass:"text-center"},[e("span",{staticClass:"text-weight-light text-uppercase"},[t._v(" "+t._s(t.iptplate.value)+" ")])]),e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{rounded:"",flat:"",color:"negative",icon:"close"}})],1),e("q-card-section",[e("q-select",{attrs:{color:"dark",options:t.tariffsdb,label:"Tarifa"},model:{value:t.usetariff,callback:function(a){t.usetariff=a},expression:"usetariff"}}),e("q-input",{attrs:{color:"dark","stack-label":"",label:"notas"},model:{value:t.notascheckinstd,callback:function(a){t.notascheckinstd=a},expression:"notascheckinstd"}})],1),e("q-card-actions",{attrs:{align:"center"}},[e("q-btn",{attrs:{outline:"",label:"Checkin"},on:{click:function(a){return t.checkInSTD()}}})],1)],1):e("q-card",[e("q-card-section",[e("h6",[t._v("No ha inicado caja..")])])],1)],1),e("q-dialog",{on:{hide:t.resetPrecheckout,"before-hide":function(a){t.iptplate.value=""}},model:{value:t.wndPreCheckOutStd.state,callback:function(a){t.$set(t.wndPreCheckOutStd,"state",a)},expression:"wndPreCheckOutStd.state"}},[e("q-card",[e("q-toolbar",[e("q-toolbar-title",[e("span",{staticClass:"text-weight-light text-uppercase"},[t._v(" Checkout ")])]),e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{rounded:"",flat:"",color:"negative",icon:"close"}})],1),t.wndPreCheckOutStd.topay?e("q-card-section",{attrs:{horizontal:""}},[e("q-card-section",[e("q-markup-table",{staticClass:"text-dark",attrs:{flat:""}},[e("tbody",[e("tr",[e("td",{staticClass:"text-left"},[t._v("Placa:")]),e("td",{staticClass:"text-left"},[t._v(t._s(t.wndPreCheckOutStd.dtpark.plate))])]),e("tr",[e("td",{staticClass:"text-left"},[t._v("Inicio:")]),e("td",{staticClass:"text-left"},[t._v(t._s(t.wndPreCheckOutStd.dtpark.init))])]),e("tr",[e("td",{staticClass:"text-left"},[t._v("Salida:")]),e("td",{staticClass:"text-left"},[t._v(t._s(t.wndPreCheckOutStd.topay.time_calc))])]),e("tr",[e("td",{staticClass:"text-left"},[t._v("Tiempo Total:")]),e("td",{staticClass:"text-left"},[t._v(t._s(t.wndPreCheckOutStd.topay.hours)+" horas, "+t._s(t.wndPreCheckOutStd.topay.mints_adds)+" minutos")])]),e("tr",[e("td",{staticClass:"text-left"},[t._v("Total a pagar")]),e("td",{staticClass:"text-left"},[t._v("$ "+t._s(t.wndPreCheckOutStd.topay.totalcost))])])])])],1),1==t.usdata.rolid||2==t.usdata.rol?e("q-card-section",[e("q-form",{on:{submit:function(a){return t.makeCharge()}}},[e("q-select",{attrs:{color:"dark",options:t.paywaysdb,"stack-label":"",label:"Forma de pago"},model:{value:t.usepayway,callback:function(a){t.usepayway=a},expression:"usepayway"}}),e("q-input",{attrs:{color:"dark",type:"number","stack-label":"",label:"pago"},model:{value:t.wndPreCheckOutStd.paytotal,callback:function(a){t.$set(t.wndPreCheckOutStd,"paytotal",a)},expression:"wndPreCheckOutStd.paytotal"}}),t.wndPreCheckOutStd.paytotal>=t.wndPreCheckOutStd.topay.totalcost?e("q-card-actions",{attrs:{align:"center"}},[e("q-btn",{attrs:{type:"submit",color:"primary","full-width":"",flat:"",label:"pagar"}})],1):t._e()],1),t.wndPreCheckOutStd.paytotal>=t.wndPreCheckOutStd.topay.totalcost?e("div",{staticClass:"text-center q-pa-md"},[t._v("\n\t\t\t\t\t\t\t\tCambio: "+t._s(t.wndPreCheckOutStd.paytotal-t.wndPreCheckOutStd.topay.totalcost)+"\n\t\t\t\t\t\t\t")]):t._e()],1):t._e()],1):t._e()],1)],1)],1)],1)],1)},i=[],c=(e("a434"),e("c973")),r=e.n(c),l=e("5671"),o={index(t){return console.log("%cIndexando Parking...","font-size:2em; color:gold;"),console.log(t),l["a"].post("park/index",t).then(t=>(console.log(t),t.data)).catch(t=>{console.log(t)})},magic(t){return console.log("%cBuscando...","font-size:2em; color:gold;"),console.log(t),l["a"].post("park/mginput",t)},makeCheckInStd(t){return console.log("%cHaciendo Checkin...","font-size:2em; color:gold;"),console.log(t),l["a"].post("park/stdcheckin",t)},makeCharge(t){return console.log("%cHaciendo Pago...","font-size:2em; color:gold;"),console.log(t),l["a"].post("park/charge",t)}},n={data(){return{parking:null,maxplaces:90,lrDrawer:!0,iptplate:{state:!1,value:""},wndCheckinStd:{state:!1,case:null},wndPreCheckOutStd:{state:!1,topay:null,dtpark:null,paytotal:0},tariffsdb:[{value:1,label:"Publico"},{value:1,label:"Especial"}],paywaysdb:[{value:1,label:"Efectivo"},{value:2,label:"TDC/TDD"}],usetariff:{value:1,label:"Publico"},usepayway:{value:1,label:"Efectivo"},notascheckinstd:"",progress1:.5,progress2:.8}},beforeMount(){this.index()},mounted(){console.log("%cCargando data dle usuario","font-size:2em;"),console.log(this.usdata)},methods:{index(){var t=this;return r()((function*(){let a=yield o.index({apikey:t.apikey});console.log(a),t.parking=a.park}))()},resetPrecheckout(){this.wndPreCheckOutStd.paytotal=0},autoCheckPark(t){this.iptplate.value=t,this.defineParking()},defineParking(){let t={apikey:this.apikey,mginput:this.iptplate.value};o.magic(t).then(t=>{let a=t.data;switch(console.log(a),this.wndCheckinStd.case=a.cashavls,a.parkexs){case 404:case 205:console.log("Realizar checkin STD, continuar?"),this.wndCheckinStd.state=!0;break;case 200:console.log("Hacer checkout"),this.wndPreCheckOutStd.state=!0,this.wndPreCheckOutStd.topay=a.precheckout.topay,this.wndPreCheckOutStd.dtpark=a.precheckout.dtpark,console.log(this.wndPreCheckOutStd.topay),console.log(this.wndPreCheckOutStd.dtpark);break}}).catch(t=>{console.log(t)})},makeCharge(){let t={apikey:this.apikey,topay:{init:this.wndPreCheckOutStd.dtpark.init,plate:this.wndPreCheckOutStd.dtpark.plate,plateid:this.wndPreCheckOutStd.dtpark.plateid,idtariff:this.wndPreCheckOutStd.dtpark.idtariff,parkid:this.wndPreCheckOutStd.dtpark.parkid,idmainservice:this.wndPreCheckOutStd.dtpark.idmainservice,time_calc:this.wndPreCheckOutStd.topay.time_calc,parts:[{method:this.usepayway.value,cant:this.wndPreCheckOutStd.paytotal,notes:""}]}};o.makeCharge(t).then(t=>{let a=t.data;console.log(a),this.wndPreCheckOutStd.state=!1;let e=this.parking.findIndex(t=>t.plate==this.wndPreCheckOutStd.dtpark.plate);this.parking.splice(e,1)}).catch(t=>{console.log(t)}),console.log(t)},checkInSTD(){let t={apikey:this.apikey,plate:this.iptplate.value,tariff:this.usetariff,notes:this.notascheckinstd};o.makeCheckInStd(t).then(t=>{let a=t.data;if(console.log(a),a.dtpark.success){let t={idmnservice:a.dtpark.data.idmservice,idtariff:a.dtpark.data.idmtariff,init:a.dtpark.data.init,parkstate:1,plate:a.dtpark.data.plate,plateid:a.dtpark.data.idplate};console.log(t),this.parking.unshift(t),console.log(this.parking),this.$q.notify({color:"positive",message:`Checkin ${a.idpark} correcto!!`,icon:"done"}),this.wndCheckinStd.state=!1,this.iptplate.value=""}}).catch(t=>{console.log(t)})}},computed:{apikey(){return this.$store.state.account.apikey},usdata(){return this.$store.state.account.user},capacityparklabel(){return this.parking?(100*this.pksactives.length/this.maxplaces).toFixed(1)+" %":0},capacitypark(){return this.parking?parseFloat((this.pksactives.length/this.maxplaces).toFixed(1)):0},pksactives(){if(this.parking)return this.parking.filter(t=>4==t.parkstate||1==t.parkstate)},pkschargeds(){if(this.parking)return this.parking.filter(t=>3==t.parkstate)},freeplaces(){return this.parking?this.maxplaces-this.pksactives.length:0}}},d=n,p=(e("d5d6"),e("2877")),u=e("4d5a"),h=e("e359"),k=e("65c6"),f=e("6ac5"),g=e("7ff0"),C=e("9404"),v=e("f09f"),m=e("a370"),b=e("eb85"),w=e("6b1d"),x=e("58a81"),q=e("09e3"),y=e("9989"),_=e("0378"),S=e("0016"),P=e("9c40"),O=e("4b7e"),Q=e("24e8"),z=e("ddd8"),T=e("27f9"),D=e("2bb1"),$=e("7f67"),I=e("eebe"),F=e.n(I),E=Object(p["a"])(d,s,i,!1,null,null,null);a["default"]=E.exports;F()(E,"components",{QLayout:u["a"],QHeader:h["a"],QToolbar:k["a"],QToolbarTitle:f["a"],QFooter:g["a"],QDrawer:C["a"],QCard:v["a"],QCardSection:m["a"],QSeparator:b["a"],QLinearProgress:w["a"],QBadge:x["a"],QPageContainer:q["a"],QPage:y["a"],QForm:_["a"],QIcon:S["a"],QBtn:P["a"],QCardActions:O["a"],QDialog:Q["a"],QSelect:z["a"],QInput:T["a"],QMarkupTable:D["a"]}),F()(E,"directives",{ClosePopup:$["a"]})}}]);