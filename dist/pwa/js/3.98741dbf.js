(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"05a7":function(t,e,a){"use strict";var s=a("3d85"),n=a.n(s);n.a},"3d85":function(t,e,a){},5948:function(t,e,a){"use strict";var s=a("5671");e["a"]={index(t){return console.log("%cIndexando Cashdesks...","font-size:2em; color:gold;"),console.log(t),s["a"].post("cashdesks/index",t).then(t=>(console.log(t.data),t.data)).catch(t=>{console.log("Hay un error importante"),console.log(t)})},newOpening(t){return console.log("%cApertudando Caja...","font-size:2em; color:gold;"),s["a"].post("cashdesks/opening",t)},reactiveOpening(t){return console.log("%cRepertudando Caja...","font-size:2em; color:gold;"),console.log(t),s["a"].post("cashdesks/reactive",t)},makeCut(t){return console.log("%cHaciendo Corte...","font-size:2em; color:gold;"),s["a"].post("cashdesks/cut",t)},shield(t){return console.log("%cCargando Dashboard de caja...","font-size:2em; color:gold;"),console.log(t),s["a"].post("cashdesks/shield",t)}}},b02b:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"row items-center justify-center"},[a("div",{staticClass:"row q-pt-md q-pl-md text-weight-light"},[t.cashloading?a("q-spinner",{attrs:{color:"dark",size:"3em",thickness:2}}):t._e(),t._l(t.cashdesks,(function(e,s){return a("q-card",{key:s,staticClass:"q-mr-md q-mb-md",attrs:{flat:"",bordered:""}},[a("q-card-section",{attrs:{horizontal:""}},[1==e._state?[a("q-card-section",{staticClass:"column justify-center"},[a("div",{staticClass:"text-h6"},[t._v("Caja "+t._s(e.id))]),a("div",[t._v(t._s(t.cashstates[e._state]))])]),a("q-separator",{attrs:{vertical:""}}),1==t.user.rolid?a("q-card-actions",{staticClass:"justify-around q-px-md",attrs:{vertical:""}},[a("q-btn",{attrs:{flat:"",round:"",color:"dark",icon:"fas fa-external-link-alt"},on:{click:function(a){return t.$router.push("cajas/"+e.id)}}}),a("q-btn",{attrs:{flat:"",round:"",color:"primary",icon:"far fa-play-circle"},on:{click:function(e){return t.initOpening(s)}}})],1):t._e()]:t._e(),2==e._state?[a("q-card-section",{staticClass:"column justify-center"},[a("div",[a("span",{staticClass:"text-h6"},[t._v(" Caja "+t._s(e.id)+" ")]),a("span",[t._v(t._s(t.cashstates[e._state]))])]),a("div",[t._v("Ultima apertura: "+t._s(t.humantime(e.opening.init))+", "+t._s(e.opening.usbynames)+" "+t._s(e.opening.usbylnames))]),a("div",[t._v("Asignacion: "+t._s(e.opening.ustonames)+" "+t._s(e.opening.ustolnames))]),a("div",[t._v("Ultimo corte: "+t._s(t.humantime(e.cut.makeit))+", "+t._s(e.cut.fnames)+" "+t._s(e.cut.lnames))])]),a("q-separator",{attrs:{vertical:""}}),1==t.user.rolid?a("q-card-actions",{staticClass:"justify-around q-px-md",attrs:{vertical:""}},[a("q-btn",{attrs:{flat:"",round:"",color:"dark",icon:"fas fa-external-link-alt"},on:{click:function(a){return t.$router.push("cajas/"+e.id)}}}),t.recycleOpening(e.opening,e.cut)?a("q-btn",{attrs:{flat:"",round:"",color:"orange-10",icon:"fas fa-play-circle",loading:t.wndOpening.reopen,disable:t.wndOpening.reopen},on:{click:function(a){return t.reactiveOpening(e.opening,e.id)}}}):a("q-btn",{attrs:{flat:"",round:"",color:"primary",icon:"far fa-play-circle"},on:{click:function(e){return t.initOpening(s)}}})],1):t._e()]:t._e(),3==e._state?[a("q-card-section",{staticClass:"column justify-center"},[a("div",[a("span",{staticClass:"text-h6"},[t._v(" Caja "+t._s(e.id)+" ")]),t._v(": "),a("span",[t._v(t._s(t.cashstates[e._state]))])]),a("div",[t._v("Ultima Apertura: "+t._s(t.humantime(e.opening.init))+", "+t._s(e.opening.usbynames)+" "+t._s(e.opening.usbylnames))]),a("div",[t._v("Ultima Asignacion: "+t._s(e.opening.ustonames)+" "+t._s(e.opening.ustolnames)+" ")]),e.cut?a("div",[t._v("Corte: "+t._s(t.humantime(e.cut.makeit))+", "+t._s(e.cut.fnames)+" "+t._s(e.cut.lnames))]):t._e()]),a("q-separator",{attrs:{vertical:""}}),1==t.user.rolid?a("q-card-actions",{staticClass:"justify-around q-px-md",attrs:{vertical:""}},[a("q-btn",{attrs:{flat:"",round:"",color:"dark",icon:"fas fa-external-link-alt"},on:{click:function(a){return t.$router.push("cajas/"+e.id)}}}),a("q-btn",{attrs:{flat:"",round:"",color:"red",icon:"fas fa-cut"},on:{click:function(e){return t.initCut(s)}}})],1):t._e(),2==t.user.rolid?a("q-card-actions",{staticClass:"justify-around q-px-md",attrs:{vertical:""}},[a("q-btn",{attrs:{flat:"",round:"",color:"red",icon:"fas fa-cut"},on:{click:function(e){return t.initCut(s)}}})],1):t._e()]:t._e()],2)],1)}))],2),a("q-dialog",{model:{value:t.wndOpening.state,callback:function(e){t.$set(t.wndOpening,"state",e)},expression:"wndOpening.state"}},[a("q-card",[a("q-toolbar",{staticClass:"bg-white text-dark"},[a("q-toolbar-title",[a("span",{staticClass:"text-weight-light"},[t._v(" Apertura de Caja "+t._s(t.wndOpening.cash?t.wndOpening.cash.id:""))])])],1),a("q-card-section",[a("q-select",{attrs:{color:"dark",options:t.cashiersavls,"stack-label":"",label:"Asignar a:"},model:{value:t.userforassign,callback:function(e){t.userforassign=e},expression:"userforassign"}})],1),a("q-card-section",[a("div",{staticClass:"row"},[a("q-markup-table",{attrs:{flat:""}},t._l(t.bills,(function(e,s){return a("tr",{key:s+"_bill",staticClass:"text-indigo-5"},[a("td",[a("q-input",{attrs:{color:"dark",type:"number",min:"0","stack-label":"",label:"$ "+String(e.value)},model:{value:e.model,callback:function(a){t.$set(e,"model",a)},expression:"bill.model"}})],1)])})),0),a("q-markup-table",{attrs:{flat:""}},t._l(t.coins,(function(e,s){return a("tr",{key:s+"_coin"},[a("td",[a("q-input",{attrs:{color:"dark",type:"number",min:"0","stack-label":"",label:"$ "+String(e.value)},model:{value:e.model,callback:function(a){t.$set(e,"model",a)},expression:"coin.model"}})],1)])})),0)],1)]),t.totalCurrs?a("q-card-actions",{attrs:{align:"center"}},[a("q-btn",{attrs:{color:"dark",loading:t.wndOpening.opening},on:{click:t.makeOpening}},[t._v("Iniciar con $"+t._s(t.totalCurrs))])],1):t._e()],1)],1),a("q-dialog",{model:{value:t.wndCut.state,callback:function(e){t.$set(t.wndCut,"state",e)},expression:"wndCut.state"}},[a("q-card",[a("q-toolbar",{staticClass:"bg-white text-dark"},[a("q-toolbar-title",[a("span",{staticClass:"text-weight-light"},[t._v(" Corte de Caja "+t._s(t.wndCut.cash?t.wndCut.cash.id:""))])])],1),a("q-card-section",[a("div",{staticClass:"row"},[a("q-markup-table",{attrs:{flat:""}},t._l(t.bills,(function(e,s){return a("tr",{key:s+"_bill",staticClass:"text-indigo-5"},[a("td",[a("q-input",{attrs:{color:"dark",type:"number",min:"0","stack-label":"",label:"$ "+String(e.value)},model:{value:e.model,callback:function(a){t.$set(e,"model",a)},expression:"bill.model"}})],1)])})),0),a("q-markup-table",{attrs:{flat:""}},t._l(t.coins,(function(e,s){return a("tr",{key:s+"_coin"},[a("td",[a("q-input",{attrs:{color:"dark",type:"number",min:"0","stack-label":"",label:"$ "+String(e.value)},model:{value:e.model,callback:function(a){t.$set(e,"model",a)},expression:"coin.model"}})],1)])})),0)],1)]),t.totalCurrs?a("q-card-actions",{attrs:{align:"center"}},[a("q-btn",{attrs:{color:"dark",loading:t.wndCut.cuting},on:{click:t.makeCut}},[t._v("Cerrar caja con: $"+t._s(t.totalCurrs))])],1):t._e()],1)],1)],1)},n=[],i=a("c973"),o=a.n(i),r=a("5948"),c=a("bd4c"),l={data(){return{cashloading:!0,cashdesks:[],cashiersdb:null,denomsdb:null,userforassign:{value:null,label:"Seleccione"},wndCut:{state:!1,cash:null,cuting:!1},wndOpening:{state:!1,cash:null,opening:!1,reopen:!1},cashstates:{1:"Nueva/disponible para apertura",2:"Disponible para apertura",3:"En uso (cobrando)"}}},beforeMount(){this.index()},methods:{index(){var t=this;return o()((function*(){let e=yield r["a"].index({apikey:t.apikey});t.cashdesks=e.cashdesks,t.denomsdb=e.currencies.map(t=>(t.model=0,t)),t.cashiersdb=e.cashiers,t.cashloading=!1}))()},initCut(t){this.wndCut.cash=this.cashdesks[t],this.wndCut.state=!0},initOpening(t){this.wndOpening.cash=this.cashdesks[t],this.wndOpening.state=!0},reactiveOpening(t,e){console.log(t),this.wndOpening.reopen=!0;let a={apikey:this.apikey,opening:t};r["a"].reactiveOpening(a).then(t=>{let a=t.data;console.log(a),this.wndOpening.reopen=!1;let s=this.cashdesks.findIndex(t=>t.id==e);this.cashdesks[s]._state=3,this.cashdesks[s].cut=null}).catch(t=>{console.log(t)})},resetwndCut(){this.wndCut.cash=null,this.wndCut.state=!1,this.wndCut.cuting=!1},resetwndOpening(){this.wndOpening.cash=null,this.wndOpening.state=!1,this.wndOpening.opening=!1},makeCut(){console.log("cutcash starts");let t=this.denomsdb.map(t=>({id:t.id,cant:parseInt(t.model)})),e={apikey:this.apikey,cashdesk:{id:this.wndCut.cash.id,denoms:t,notes:""}};this.wndCut.cuting=!0,r["a"].makeCut(e).then(t=>{let e=t.data;console.log(e),this.$q.notify({color:"positive",message:`Corte ${e.resume.cut.id} concretado!!`,icon:"done"});let a=this.cashdesks.findIndex(t=>t.id==this.wndCut.cash.id);this.cashdesks[a]._state=2,this.cashdesks[a].cut=e.resume.openandcut.cut,this.resetwndCut()}).catch(t=>{console.log(t)})},makeOpening(){if(this.userforassign.value){console.log("opening starts");let t=this.denomsdb.map(t=>({id:t.id,cant:parseInt(t.model)}));console.log(this.wndOpening.cash.id);let e={apikey:this.apikey,cashdesk:{id:this.wndOpening.cash.id,denoms:t,assignto:this.userforassign.value,notes:""}};console.log(e),this.wndOpening.opening=!0,r["a"].newOpening(e).then(t=>{let e=t.data;if(console.log(e),e){this.wndOpening.state=!1;let t=this.cashdesks.findIndex(t=>t.id==this.wndOpening.cash.id);this.cashdesks[t].opening=e.rset.opening,this.cashdesks[t]._state=3,console.log(this.cashdesks[t]),this.$q.notify({color:"positive",message:`Listo!! (${e.rset.openid})`,icon:"done"}),this.resetwndOpening()}}).catch(t=>{console.log(t)})}else this.$q.notify({color:"warning",message:"Debes seleccionar un cajero",icon:"error_outline"})},entry(t){console.log("navegar en caja "+t)}},computed:{recycleOpening(){return(t,e)=>{if(t&&e){let e=Date.now(),a=Date.parse(t.init),s=c["a"].getDateDiff(e,a,"days");return 0==s}return!1}},humantime(){return t=>{let e=Date.now(),a=Date.parse(t),s=c["a"].getDateDiff(e,a,"days");switch(s){case 1:return"Ayer a las "+c["a"].formatDate(a,"hh:mm a");case 0:return"Hoy a las "+c["a"].formatDate(a,"hh:mm a");default:return`Hace ${s} dias, a las `+c["a"].formatDate(a,"hh:mm a")}return s}},apikey(){return this.$store.state.account.apikey},bills(){if(this.denomsdb)return this.denomsdb.filter(t=>1==t.type)},coins(){if(this.denomsdb)return this.denomsdb.filter(t=>2==t.type)},totalCurrs(){if(this.denomsdb){let t=this.coins.map(t=>t.value*t.model).reduce((t,e)=>t+e)+this.bills.map(t=>t.value*t.model).reduce((t,e)=>t+e);return t}return 0},cashiersavls(){if(this.cashiersdb)return this.cashiersdb.filter(t=>!t.usingcash).map(t=>({value:t.accid,label:`${t.fnames} ${t.lnames} (${t.nick})`}))},user(){return this.$store.state.account.user}}},d=l,u=(a("05a7"),a("2877")),p=a("9989"),h=a("0d59"),g=a("f09f"),m=a("a370"),f=a("eb85"),k=a("4b7e"),b=a("9c40"),_=a("24e8"),v=a("65c6"),C=a("6ac5"),w=a("ddd8"),q=a("2bb1"),y=a("27f9"),O=a("eebe"),x=a.n(O),$=Object(u["a"])(d,s,n,!1,null,null,null);e["default"]=$.exports;x()($,"components",{QPage:p["a"],QSpinner:h["a"],QCard:g["a"],QCardSection:m["a"],QSeparator:f["a"],QCardActions:k["a"],QBtn:b["a"],QDialog:_["a"],QToolbar:v["a"],QToolbarTitle:C["a"],QSelect:w["a"],QMarkupTable:q["a"],QInput:y["a"]})}}]);