import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import token from "../../../services/token-service"


interface User{
    id: number,
    nom: string,
    prenom: string,
    email: string

}

export function EditUserComponent(){


    const [users, setUsers] = useState<User []>([]);


    const fetchContracts = async () => {
        try {
            const API_URL = "http://localhost:8000";
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
            const response = await axios.get(`${API_URL}/edit/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

    
            if (response.status !== 200) {
                throw new Error('Failed to fetch contracts');
            }
            
            setUsers(response.data);
            console.log(response.data);
        } catch (error: any) {
            if(error.response && error.response.status === 401){
                window.location.href="/"
                toast.error("Votre session a expiré !", {duration: 4000,className:"bg-grey-200 font-bold rounded-xl text-blue-600"})
            }else {
                console.log("Failed to fetch contracts: ", error.response ? error.response.data : error.message);
            }
        }
    };

    useEffect(() => {
        fetchContracts();
        
    }, []);

    const delUser = async (id: number) => {
        try {
            const API_URL = "http://localhost:8000";
            const response = await axios.delete(`${API_URL}/edit/delete/user/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setUsers(users.filter(user => user.id !== id));
                toast.success("User supprimé avec succès !");
            } else {
                throw new Error('Failed to delete User');
            }
        } catch (error: any) {
            toast.error("Erreur lors de la suppression du user");
            console.error("Failed to delete User: ", error.response ? error.response.data : error.message);
        }
    }
    

    return <div className="border m-20">
                <table className='table-fixed w-[100%]'>
                    <thead>
                        <tr className='align-text-bottom'>
                            <th scope="col" className='px-6 py-3'>
                                Email
                            </th>
                            <th scope="col" className='px-6 py-3'>
                                Nom
                            </th>
                            <th scope="col" className='px-6 py-3'>
                                Prénom
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                         {users.map(user => (
                        <tr key={user.id} className='border-t-2 align-text text-center'>
                            <td className='px-6 py-4'>
                                {user.email}
                            </td>
                            <td className='px-6 py-4'>
                                {user.nom}
                            </td>
                            <td className='px-6 py-4'>
                                {user.prenom}
                            </td>
                            <td className='px-6 py-4 text-blue-700 font-bold text-lg'>
                                <a href={`/edit/user/${user.id}`}>Modifier</a>
                            </td>
                            <td className='px-6 py-4 text-blue-700 font-bold text-lg'>
                                <button onClick={ () => delUser(user.id)}>Supprimer</button>
                                
                            </td>
                        </tr>
                         ))}
                    </tbody>
                </table>
            </div>
}