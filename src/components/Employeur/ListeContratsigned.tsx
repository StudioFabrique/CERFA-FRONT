import axios from "axios";
import { CircleCheck, HardDriveDownload } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import token from "../../services/token-service";
import { Tooltip } from "@mui/material";

interface Contratsigned{
    id: number,
    nom_usage: string,
    prenom:string,
    date_naissance: string,
    nom_entreprise: string,
    type_contrat:string,
    signature_employeur: Blob | null

}

export function ListeContratEmployeursigned(){

    const [contractssigned, setContractssigned] = useState<Contratsigned []>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchContractssigned = async () => {
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
            const id = JSON.parse(user).id
            const response = await axios.get(`${API_URL}/accueil/contrats/Employeursigned/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

    
            if (response.status !== 200) {
                throw new Error('Failed to fetch contracts');
            }
            
            setContractssigned(response.data);
            console.log(response.data);
        } catch (error: any) {
            if(error.response && error.response.status === 401){
                window.location.href="/"
                toast.error("Votre session a expiré !", {duration: 4000,className:"bg-grey-200 font-bold rounded-xl text-blue-600"})
            }else {
                console.log("Failed to fetch contracts: ", error.response ? error.response.data : error.message);
                setError(error.response ? error.response.data.detail : error.message);
            }
        }
    };

    useEffect(() => {
        fetchContractssigned();
        
    }, []);


return (
    <div className='border'>
        <table className='table-fixed w-[100%]'>
                <thead>
                    <tr className='align-text-bottom'>
                        <th scope="col" className='px-6 py-3'>
                            <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"></input>
                        </th>
                        <th scope="col" className='px-6 py-3'>
                            Nom
                        </th>
                        <th scope="col" className='px-6 py-3'>
                            Prénom
                        </th>
                        <th scope="col" className='px-6 py-3'>
                            Age
                        </th>
                        <th scope="col" className='px-6 py-3'>
                            Formation
                        </th>
                        <th scope="col" className='px-6 py-3'>
                            Promo
                        </th>
                        <th scope="col" className='px-6 py-3'>
                            Entreprise
                        </th>
                        <th scope="col" className='px-6 py-3'>
                            Contrat
                        </th>
                        <th scope="col" className='px-6 py-3'>
                            Status
                        </th>
                        <th scope="col" className='px-6 py-3'>
                            Action
                        </th>
                        <th scope="col" className='px-6 py-3'>
                            PDF
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {contractssigned.map(contractssigned => (
                    <tr key={contractssigned.id} className='border-t-2 align-text text-center'>
                        <td className='px-6 py-4'>
                        <input  type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"></input>
                        </td>
                        <td className='px-6 py-4'>
                            {contractssigned.nom_usage}
                        </td>
                        <td className='px-6 py-4'>
                            {contractssigned.prenom}
                        </td>
                        <td className='px-6 py-4'>
                            {contractssigned.date_naissance}
                        </td>
                        <td className='px-6 py-4'>
                            
                        </td>
                        <td className='px-6 py-4'>
                            
                        </td>
                        <td className='px-6 py-4'>
                            {contractssigned.nom_entreprise}
                        </td>
                        <td className='px-6 py-4'>
                            {contractssigned.type_contrat}
                        </td>
                        <td className='px-6 pt-7 flex justify-center'>
                            <Tooltip title="Signatur Employeur">
                                <CircleCheck color={contractssigned.signature_employeur ? "#4aea10" : "#000000"}/>
                            </Tooltip>
                        </td>
                        <td className='px-16 py-4'>
                            <a href='accuiel-employeur'>
                                <HardDriveDownload/>
                            </a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
    </div>
);
}
