import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface Employeur{
    nom_entreprise: string,
    numero_siret: string,
    numero: string,
    rue:string,
    complement: string, 
    code_postal: string,
    commune: string,
    code_IDCC: string,
    effectif: string,
    code_activite_NAF: string,
    courriel: string,
    telephone: string
}


export function Editemployeur(){
    const { id } = useParams<{id: string}>();
    const [employeur, setEmployeur] = useState<Partial<Employeur>>({});

    useEffect(() => {
        const fetchEmployeur = async () => {
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
                const response = await axios.get(`${API_URL}/edit/get/employeur/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.status !== 200) {
                    throw new Error('Failed to fetch contracts');
                }
                
                setEmployeur(response.data);
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
        fetchEmployeur();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployeur((prevEmployeur) => ({ ...prevEmployeur, [name]: value }));
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
            `${API_URL}/edit/employeur/${id}`,
            {
              nom_entreprise: employeur?.nom_entreprise,
              numero_siret: employeur?.numero_siret,
              numero: employeur?.numero,
              rue: employeur?.rue,
              complement: employeur?.complement,
              code_postal: employeur?.code_postal,
              commune: employeur?.commune,
              code_IDCC: employeur?.code_IDCC,
              effectif: String(employeur?.effectif),
              code_activite_NAF: employeur?.code_activite_NAF,
              courriel: employeur?.courriel,
              telephone: employeur?.telephone,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status !== 200) {
            throw new Error("Failed to update user data");
          }
          toast.success("User data updated successfully!", {
            duration: 4000,
            className: "bg-green-200 font-bold rounded-xl text-green-600",
          });
          setTimeout( () => {
            window.location.href="/get-user"
          }, 2000);
          
        } catch (error: any) {
          if (error.response && error.response.status === 401) {
            
            toast.error("Votre session a expiré !", {
              duration: 4000,
              className: "bg-grey-200 font-bold rounded-xl text-blue-600",
            });
          } else {
            console.log(
              "Failed to update user data: ",
              error.response ? error.response.data : error.message
            );
            toast.error("Failed to update user data!", {
              duration: 4000,
              className: "bg-red-200 font-bold rounded-xl text-red-600",
            });
          }
        }
      };
    
      if (!employeur) {
        return <div>Loading...</div>;
      }
    
      return (
        <div>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <p className="text-center pt-10 font-bold text-2xl">Modification {employeur.nom_entreprise}</p>
            <label className="pt-20 font-semibold text-xl">Adresse Email</label>
            <input name="courriel" value={employeur.courriel || ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
            <label className="pt-5 font-semibold text-xl">Nom</label>
            <input name="nom_entreprise" value={employeur.nom_entreprise || ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
            <label className="pt-5 font-semibold text-xl">Numéro de Siret</label>
            <input name="numero_siret" value={employeur.numero_siret|| ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
            <label className="pt-5 font-semibold text-xl">Code IDCC</label>
            <input name="code_IDCC" value={employeur.code_IDCC|| ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
            <label className="pt-5 font-semibold text-xl">Effectif</label>
            <input name="effectif" value={employeur.effectif|| ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
            <label className="pt-5 font-semibold text-xl">Code d'activité NAF</label>
            <input name="code_activite_NAF" value={employeur.code_activite_NAF|| ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
            <label className="pt-5 font-semibold text-xl">Numéro de téléphone</label>
            <input name="telephone" value={employeur.telephone|| ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
            

            <div className="flex justify-center items- mt-10">
                <a className="border shadow-md rounded-2xl bg-red-500 px-5 py-3 text-white font-bold hover:bg-red-700 " href="/get-user">Annuler</a>
                <input type="submit" value="Submit" className="border shadow-md rounded-2xl ml-10 px-5 py-2 bg-green-500 text-white font-bold  text-2xl hover:bg-green-700"/>
            </div>
            </form>
            
        </div>
      );
    }