import { Search } from "lucide-react";
import { PageHeaderEmployeur } from "./PageHeaderEmployeur";
import { ListeContratCerf } from "../../components/CFA/ListeContrat";


//Page accueillant tous les contrats
export function ListeContratEmployeur(){
    return(
        <div className="pr-10">
            <PageHeaderEmployeur />
            <div>
                <div className="border-2 mt-10 rounded-md ml-10">
                    <div className="m-5  border-2 rounded-lg w-[40%] flex">
                        <Search className="mt-4 ml-5  h-[20px] "/>
                        <input className=" px-5  py-3 text-xl w-[100%]" placeholder="Rechercher un Contrat"></input>
                    </div>     
                    {/* <ListeContratCerf/>     */}
                </div>
            </div>
        </div>
    )
}