import toast from 'react-hot-toast';

const verifier_token = () => {
    const user = localStorage.getItem('user');
    if(!user){
        window.location.href="/"
        toast.error("Votre session a expiré !", {duration: 4000,className:"bg-grey-200 font-bold rounded-xl text-blue-600"})
        throw new Error('No user found')
    }
    const { token } = JSON.parse(user);
    if (!token) {
        window.location.href="/"
        toast.error("Votre session a expiré !", {duration: 4000,className:"bg-grey-200 font-bold rounded-xl text-blue-600"})
        throw new Error('No token found');
    }
}

export default{
    verifier_token
}