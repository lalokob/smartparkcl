
export default async ({ router, store, axios }) => {
    // console.log(axios);
    
	router.beforeEach((to, from, next) => {
		console.log("%cezcudo works","font-size:3em;color:#40739e;");
		let apikey = localStorage.getItem("apikey");

		if(apikey){
			let $usdata = JSON.parse(localStorage.getItem('_account'));
            let $modules = JSON.parse(localStorage.getItem('_modules'));
            
			store.commit("account/setApikey",apikey);
			store.commit("account/setUserData",$usdata);
			store.commit("account/setModules",$modules);
		}

		if(to.path!='/signin'){
			apikey ? next() : next('/signin');
		}else{
			apikey ? next('/launcher') : next();
		}
	});
}

/**setApikey
setUserData
setModules */