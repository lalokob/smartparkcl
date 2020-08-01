import { apipark } from 'boot/apipark'

export default{
    trySignin(data){
        console.log("%cLogueando...","font-size:2em; color:gold;");
        console.log(data);
        return apipark.post('account/trylogin',data);
    },
    trySetPass(accid,data,headers){
        console.log("%cSetting Pass...","font-size:2em; color:blue;");
        return apipark.put(`account/${accid}/password`,data,headers);
    }
}