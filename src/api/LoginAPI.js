import axios from "axios";
import { BASE_URL, setUserSession } from "./Common";

export const loginHandler = async (idToken,user, setUser) => {
    await axios.post(`${BASE_URL}login?idToken=${idToken}`,{
        // method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => {
        let data = response.data;
        console.log(response.data);
        setUser({...user,data})
        console.log(user);
    }).catch(error => {
        console.log("fail")
        console.error(error.code);
        console.error(error.message);
    })
}

// await axios(url, {
//     method: "get",
//     headers: {
//       'Content-type': 'Application/json',
//       Accept: 'Application/json',
//       Authorization: jwt,
//     },
//     data: {},
//   })