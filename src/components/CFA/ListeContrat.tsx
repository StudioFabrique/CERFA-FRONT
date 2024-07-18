import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CircleCheck, HardDriveDownload } from 'lucide-react';
import token from "../../services/token-service"
import { Tooltip } from '@mui/material';

interface Contrat{
    id: number,
    nom_usage: string,
    prenom:string,
    date_naissance: string,
    nom_entreprise: string,
    type_contrat:string,
    signature_apprenti: Blob | null,
    signature_cfa: Blob | null,
    signature_employeur: Blob | null

}

export function ListeContratCerf() {
    const [contracts, setContracts] = useState<Contrat []>([]);

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
            const response = await axios.get(`${API_URL}/accueil/contracts/CFA`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

    
            if (response.status !== 200) {
                throw new Error('Failed to fetch contracts');
            }
            
            setContracts(response.data);
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
    
    const delContract = async (id: number) => {
        try {
            const API_URL = "http://localhost:8000";
            const response = await axios.delete(`${API_URL}/accueil/contracts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setContracts(contracts.filter(contract => contract.id !== id));
                toast.success("Contrat supprimé avec succès !");
            } else {
                throw new Error('Failed to delete contract');
            }
        } catch (error: any) {
            toast.error("Erreur lors de la suppression du contrat");
            console.error("Failed to delete contract: ", error.response ? error.response.data : error.message);
        }
    }


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
                        {contracts.map(contract => (
                        <tr key={contract.id} className='border-t-2 align-text text-center'>
                            <td className='px-6 py-4'>
                            <input  type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"></input>
                            </td>
                            <td className='px-6 py-4'>
                                {contract.nom_usage}
                            </td>
                            <td className='px-6 py-4'>
                                {contract.prenom}
                            </td>
                            <td className='px-6 py-4'>
                                {contract.date_naissance}
                            </td>
                            <td className='px-6 py-4'>
                                
                            </td>
                            <td className='px-6 py-4'>
                                
                            </td>
                            <td className='px-6 py-4'>
                                {contract.nom_entreprise}
                            </td>
                            <td className='px-6 py-4'>
                                {contract.type_contrat}
                            </td>
                            <td className='px-6 pt-7 flex justify-center'>
                                <Tooltip title="Signature Apprenti">
                                    <CircleCheck color={contract.signature_apprenti ? "#4aea10" : "#000000"} />
                                </Tooltip>
                                <Tooltip title="Signature Employeur">
                                    <CircleCheck color={contract.signature_employeur ? "#4aea10" : "#000000"} />
                                </Tooltip>
                                <Tooltip title="Signature CFA">
                                    <CircleCheck color={contract.signature_cfa ? "#4aea10" : "#000000"} />
                                </Tooltip>
                            </td>
                            <td className='px-6 py-4 text-blue-700 font-bold text-lg'>
                                <button onClick={ () => delContract(contract.id)}>Supprimer</button>
                                
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