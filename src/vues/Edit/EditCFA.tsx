import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Cfa{
    n_siret: string,
    denomination_cfa: string,
    commune: string,
    code_postal:string,
    rue:string,
    complement:string,
    numero:string,
    n_uai_cfa:string
}

export function EditCFA(){

    const [cfa, setCfa] = useState<Partial<Cfa>>({});
    useEffect(() => {
        const fetchCfa = async () => {
            try {
                const API_URL = "http://localhost:8000";
                const currentuser = localStorage.getItem('user');
                if(!currentuser){
                    window.location.href="/"
                    toast.error("Votre session a expiré !", {duration: 4000,className:"bg-grey-200 font-bold rounded-xl text-blue-600"})
                    throw new Error('No user found')
                }
                const { token } = JSON.parse(currentuser);
                if (!token) {
                    window.location.href="/"
                    toast.error("Votre session a expiré !", {duration: 4000,className:"bg-grey-200 font-bold rounded-xl text-blue-600"})
                    throw new Error('No token found');
                }
                const response = await axios.get(`${API_URL}/edit/get/cfa`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.status !== 200) {
                    throw new Error('Failed to fetch contracts');
                }
                
                setCfa(response.data);
                console.log(response.data);
            } catch (error: any) {
                if(error.response && error.response.status === 401){
                    window.location.href="/"
                    toast.error("Votre session a expiré !", {duration: 4000,className:"bg-grey-200 font-bold rounded-xl text-blue-600"})
                }else {
                    console.log("Failed to fetch contracts: ", error.response ? error.response.data : error.message);
                }
            }
        }
        fetchCfa();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCfa((prevCfa) => ({ ...prevCfa, [name]: value }));
      };

      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
          const API_URL = "http://localhost:8000";
          const currentuser = localStorage.getItem("user");
          if (!currentuser) {
            window.location.href = "/";
            toast.error("Votre session a expiré !", {
              duration: 4000,
              className: "bg-grey-200 font-bold rounded-xl text-blue-600",
            });
            throw new Error("No user found");
          }
          const { token } = JSON.parse(currentuser);
          if (!token) {
            window.location.href = "/";
            toast.error("Votre session a expiré !", {
              duration: 4000,
              className: "bg-grey-200 font-bold rounded-xl text-blue-600",
            });
            throw new Error("No token found");
          }
          const response = await axios.put(
            `${API_URL}/edit/cfa`,
            {
              n_siret: cfa?.n_siret,
              n_uai_cfa: cfa?.n_uai_cfa,
              code_postal: cfa?.code_postal,
              commune: cfa?.commune,
              complement: cfa?.complement,
              rue: cfa?.rue,
              numero: cfa?.numero,
              denomination_cfa: cfa?.denomination_cfa
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status !== 200) {
            throw new Error("Failed to update cfa data");
          }
          toast.success("CFA data updated successfully!", {
            duration: 4000,
            className: "bg-green-200 font-bold rounded-xl text-green-600",
          });
          setTimeout( () => {
            window.location.href="/accueil-cerfa"
          }, 2000);
          
        } catch (error: any) {
          if (error.response && error.response.status === 401) {
            
            toast.error("Votre session a expiré !", {
              duration: 4000,
              className: "bg-grey-200 font-bold rounded-xl text-blue-600",
            });
          } else {
            console.log(
              "Failed to update cfa data: ",
              error.response ? error.response.data : error.message
            );
            toast.error("Failed to update cfa data!", {
              duration: 4000,
              className: "bg-red-200 font-bold rounded-xl text-red-600",
            });
          }
        }
      };

    return <div>
                <form onSubmit={handleSubmit}>
                    <p className="text-center pt-5 font-bold text-2xl">Modification du CFA</p>
                    <div className="flex flex-col items-center">
                        <label className="pt-5 font-semibold text-xl">Numéro de siret</label>
                        <input name="n_siret" value={cfa.n_siret || ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
                        <label className="pt-5 font-semibold text-xl">Numéro uai</label>
                        <input name="n_uai_cfa" value={cfa.n_uai_cfa || ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
                        <label className="pt-5 font-semibold text-xl">Dénomination</label>
                        <input name="denomination" value={cfa.denomination_cfa || ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
                        <label className="pl-5 font-semibold text-xl"> N°</label>
                        <input name="numero" value={cfa.numero || ''} onChange={handleChange} className="border rounded-md p-2 m-2 text-center w-[5%]"/>
                        <label className="pl-5 font-semibold text-xl"> Rue</label>
                        <input name="rue" value={cfa.rue || ''} onChange={handleChange} className="border rounded-md p-2 m-2 text-center w-[10%]"/>
                        <label className="pl-5 font-semibold text-xl"> Complément</label>
                        <input name="complement" value={cfa.complement || ''} onChange={handleChange} className="border rounded-md p-2 m-2 text-center w-[10%]"/>
                        <label className="pl-5 font-semibold text-xl"> Commune</label>
                        <input name="commune" value={cfa.commune || ''} onChange={handleChange} className="border rounded-md p-2 m-2 text-center w-[10%]"/>
                        <label className="pl-5 font-semibold text-xl"> Code Postal</label>
                        <input name="code_postal" value={cfa.code_postal || ''} onChange={handleChange} className="border rounded-md p-2 m-2 text-center w-[5%]"/>
                    </div>
                    <div className="flex justify-center items- mt-5">
                        <a className="border shadow-md rounded-2xl bg-red-500 px-5 py-3 text-white font-bold hover:bg-red-700 " href="/accueil-cerfa">Annuler</a>
                        <input type="submit" value="Submit" className="border shadow-md rounded-2xl ml-10 px-5 py-2 bg-green-500 text-white font-bold  text-2xl hover:bg-green-700"/>
                    </div>
                </form>
            </div>
}