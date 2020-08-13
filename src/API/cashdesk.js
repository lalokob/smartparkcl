import { apipark } from 'boot/apipark'

export default{
    index(data){
        console.log("%cIndexando Cashdesks...","font-size:2em; color:gold;");
        console.log(data);
        return apipark.post('cashdesk/index',data).then(resp=>{
            console.log(resp.data);
            return resp.data;
        }).catch(fail=>{
            console.log("Hay un error importante");
            console.log(fail);
        });
    },
    newOpening(data){
        console.log("%cApertudando Caja...","font-size:2em; color:gold;");
        return apipark.post('cashdesk/opening',data);
    },
    reactiveOpening(data){
        console.log("%cRepertudando Caja...","font-size:2em; color:gold;");
        console.log(data);
        return apipark.post('cashdesk/reactive',data);
    },
    makeCut(data){
        console.log("%cHaciendo Corte...","font-size:2em; color:gold;");
        return apipark.post('cashdesk/cut',data);
    }
}