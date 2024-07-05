import { ChevronDown, CirclePower, FilePlus } from 'lucide-react'
import authService from '../../services/auth-service'
import Cerfa from '../../assets/cerfa.png'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../components/Cerfa/Modal';
import toast from 'react-hot-toast';
import axios from 'axios';



export function PageHeaderCerfa(){
    const location = useLocation();

    const [isModalOpen, setModalOpen] = useState(false);
    //Nombre total de contrat (Signé + non Signé)
    const [nombreContratTotal, setNombreContratTotal] = useState<string>();
    //Nombre total de contrat Signé
    const [nombreContratNonNull, setNombreContratNonNull] = useState<string>();
    //Nombre total de contrat non Signé
    const [nombreContratNull, setNombreContratNull] = useState<string>();
    const [error, setError] = useState<string | null>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const fetchNombreContracts = async () => {
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
        const response = await axios.get(`${API_URL}/header/cerfa`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });


        if (response.status !== 200) {
            throw new Error('Failed to fetch contracts');
        }
        setNombreContratNonNull(response.data.nombre_non_null)
        setNombreContratNull(response.data.nombre_null)
        setNombreContratTotal(response.data.nombre_total);
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
    fetchNombreContracts();
    
}, []);

    return(
        <div>
            <div className="flex justify-between pl-20 pr-10 pt-20  ">
                    <img src={Cerfa} className=' h-[80px] mb-3'></img>
                <div className='flex font-semibold pt-2'>
                    <a className={`px-5 pt-3 text-xl ${location.pathname === '/accueil-cerfa' ? 'text-orange-400' : 'hover:text-orange-400'}`}  href='/accueil-cerfa '>Accueil</a>
                    <a className='px-5 pt-3 hover:text-orange-400 text-xl'>Historique</a>
                    <a className='px-5 pt-3 hover:text-orange-400 text-xl'>Work</a>
                    <div className='pt-4 pl-5'>
                        <button>
                            <ChevronDown />
                        </button>
                    </div>
                    <button className='text-white font-semibold  content-center rounded-lg bg-[#140A82] hover:bg-orange-400 my-2 py-1 px-2 mb-10 ml-10 flex '  onClick={openModal}>
                        <FilePlus className='pt-1'/>
                        <p className='pl-2 text-lg'>Créer un contrat</p>
                    </button>
                    <button className='my-2 py-1 px-2 mb-10 ml-3'>
                        <CirclePower onClick={authService.logout}/>
                    </button>
                </div>
            
            </div>
            
            <div className="flex justify-center pt-10">
            
                    <a className="border-2 w-[30%] shadow-md ml-10 rounded-2xl flex justify-between transform transition-transform duration-300 hover:-translate-y-2" href='/accueil-cerfa'>
                        <div className="my-5">
                        <p className="font-bold text-2xl ml-20 mt-5">Contrat au total</p>
                        <p className="ml-20 mt-3 text-lg mb-5">Jusqu'au 12/02/2024</p>
                        </div>
                        <p className="font-bold text-6xl text-blue-800 mt-10 mr-20">{nombreContratTotal}</p>
                    </a>
                    <a className="border-2 w-[30%] shadow-md ml-10 rounded-2xl flex justify-between transform transition-transform duration-300 hover:-translate-y-2" href="/contrat-cerfa/signed" >
                        <div className="my-5">
                        <p className="font-bold text-2xl ml-20 mt-5">Contrat Signés</p>
                        <p className="ml-20 mt-3 text-lg mb-5">Jusqu'au 12/02/2024</p>
                        </div>
                        <p className="font-bold text-6xl text-blue-800 mt-10 mr-20">{nombreContratNonNull}</p>
                    </a>
                    <a className="border-2 w-[30%] shadow-md ml-10 rounded-2xl flex justify-between transform transition-transform duration-300 hover:-translate-y-2" href='/contrat-cerfa/unsigned'>
                        <div className="my-5">
                        <p className="font-bold text-2xl ml-20 mt-5">Contrat à Signés</p>
                        <p className="ml-20 mt-3 text-lg mb-5">Jusqu'au 12/02/2024</p>
                        </div>
                        <p className="font-bold text-6xl text-blue-800 mt-10 mr-20">{nombreContratNull}</p>
                    </a>
               
            </div>
        
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        
        </div>
    )
}