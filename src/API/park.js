import { apipark } from 'boot/apipark'

export default{
    index(data){
        console.log("%cIndexando Parking...","font-size:2em; color:gold;");
        console.log(data);
        return apipark.post('park/index',data).then(resp=>{
            console.log(resp);
            return resp.data;
        }).catch(fail=>{
            console.log(fail);
        });
    },
    magic(data){
        console.log("%cBuscando...","font-size:2em; color:gold;");
        console.log(data);
        return apipark.post('park/mginput',data);
    },
    makeCheckInStd(data){
        console.log("%cHaciendo Checkin...","font-size:2em; color:gold;");
        console.log(data);
        return apipark.post('park/stdcheckin',data);
    },
    makeCharge(data){
        console.log("%cHaciendo Pago...","font-size:2em; color:gold;");
        console.log(data);
        return apipark.post('park/charge',data);
    }
}