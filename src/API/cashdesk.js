import { apipark } from 'boot/apipark'

export default{
    index(data){
        console.log("%cIndexando Cashdesks...","font-size:2em; color:gold;");
        console.log(data);
        return apipark.post('cashdesks/index',data).then(resp=>{
            console.log(resp.data);
            return resp.data;
        }).catch(fail=>{
            console.log("Hay un error importante");
            console.log(fail);
        });
    },
    newOpening(data){
        console.log("%cApertudando Caja...","font-size:2em; color:gold;");
        return apipark.post('cashdesks/opening',data);
    },
    reactiveOpening(data){
        console.log("%cRepertudando Caja...","font-size:2em; color:gold;");
        console.log(data);
        return apipark.post('cashdesks/reactive',data);
    },
    makeCut(data){
        console.log("%cHaciendo Corte...","font-size:2em; color:gold;");
        return apipark.post('cashdesks/cut',data);
    },
    /**
     * funciones para una caja
     */
    shield(data){
        console.log("%cCargando Dashboard de caja...","font-size:2em; color:gold;");
        console.log(data);

        return apipark.post('cashdesks/shield',data);
    },
    historic(data){
        console.log("%cCargando Historico","font-size:2em; color:purple;");
        console.log(data);

        return apipark.post('cashdesks/historic',data);
    }
}