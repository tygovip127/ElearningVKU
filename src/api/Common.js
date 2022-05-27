import AsyncStorage from '@react-native-async-storage/async-storage';

// dùng ngrok tạo host tới port 8000
// ngrok httop 8000
export const BASE_URL = "https://aa85-2402-9d80-406-fbfc-34fd-9f31-27c3-985b.ap.ngrok.io" + "/api/"
// export const BASE_URL = "" 

export const getUser = async (setUser) => {
  let user=null;
  try{
    user =  await AsyncStorage.getItem('USER')
    user = JSON.parse(user);
    setUser(user);
    console.log("Storage:",user)
    return user;
  }catch(e){
    console.log("Storage error",e);
    return null;
  }
}

export const getAuthUser= (setUser)=>{ 
  const _user = getUser(setUser);
    _user.then((data) => {
      setUser(data);
    })
}

export const getToken= async ()=>{ 
  try{
    let token= await AsyncStorage.getItem("@Token")
    return  token;
  }catch(err){
    console.log(err)
  }
}