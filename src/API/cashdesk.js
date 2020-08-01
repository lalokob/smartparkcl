import { apipark } from 'boot/apipark'

export default{
    index(data){
        console.log("%cIndexando Cajas...","font-size:2em; color:gold;");
        console.log(data);
        return apipark.post('cashdesk/index',data).then(resp=>{
            console.log(resp);
            return resp.data;
        }).catch(fail=>{
            console.log(fail);
        });
    },
    newOpening(data){
        console.log("%Apertudando Caja...","font-size:2em; color:gold;");
        console.log(data);

        return apipark.post('cashdesk/opening',data);
    }
}