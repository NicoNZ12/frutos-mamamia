import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface IDecodedToken {
    id: string,
    isAdmin: boolean,
    email: string
}

export const decodeJWT = () => {
    const token = Cookies.get("token")

    if(!token){
        return
    }

    const decoded = jwtDecode<IDecodedToken>(token);

    return decoded
}