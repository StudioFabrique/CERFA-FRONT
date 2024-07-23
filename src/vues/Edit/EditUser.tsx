import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface User{
    nom: string,
    prenom: string,
    email: string,
    role:string,
}


export function Edituser(){
    const { id } = useParams<{id: string}>();
    const [user, setUser] = useState<Partial<User>>({});

    useEffect(() => {
        const fetchUser = async () => {
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
                const response = await axios.get(`${API_URL}/edit/get/user/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.status !== 200) {
                    throw new Error('Failed to fetch contracts');
                }
                
                setUser(response.data);
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
        fetchUser();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
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
            `${API_URL}/edit/user/${id}`,
            {
              nom: user?.nom,
              prenom: user?.prenom,
              email: user?.email,
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
    
      if (!user) {
        return <div>Loading...</div>;
      }
    
      return (
        <div>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <p className="text-center pt-10 font-bold text-2xl">Modification {user.nom}</p>
            <label className="pt-20 font-semibold text-xl">Adresse Email</label>
            <input name="email" value={user.email || ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
            <label className="pt-5 font-semibold text-xl">Nom</label>
            <input name="nom" value={user.nom || ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
            <label className="pt-5 font-semibold text-xl">Prénom</label>
            <input name="prenom" value={user.prenom || ''} onChange={handleChange} className="border rounded-md p-2 m-5 text-center w-[20%]"/>
            <div className="flex justify-center items- mt-10">
                <a className="border shadow-md rounded-2xl bg-red-500 px-5 py-3 text-white font-bold hover:bg-red-700 " href="/get-user">Annuler</a>
                <input type="submit" value="Submit" className="border shadow-md rounded-2xl ml-10 px-5 py-2 bg-green-500 text-white font-bold  text-2xl hover:bg-green-700"/>
            </div>
            </form>
            
        </div>
      );
    }