import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8000"
const login = async(email: string, password: string, rememberMe : boolean) => {
    const formData = new FormData();
    formData.append("email",email);
    formData.append("password",password);
    formData.append("rememberMe",rememberMe.toString());
    try {
        
        const response = await axios.post(API_URL + '/auth', formData)
        console.log(response.data);
        
        if (response.data.access) {
            localStorage.setItem('user', JSON.stringify({
                token:response.data.access,
                role:response.data.role,
                id:response.data.id
            }));
            return true;
        }  
    }
    catch(error: any) {
        console.log("Login failed: ", error.response ? error.response.data : error.message);
        toast.error("Mot de passe ou adresse email erroné", {duration: 4000,className:"bg-grey-200 font-bold rounded-xl text-blue-600"})
        return false;
    }
};

const logout = () => {
    
    localStorage.removeItem('user');
    window.location.href="/"

};

export default {
    login,
    logout
};