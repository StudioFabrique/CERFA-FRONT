import { Search } from "lucide-react";
import { PageHeaderCerfa } from "./PageHeaderCerfa";
import { ListeContratCerfaUnsigned } from "../../components/Cerfa/ListeContratunsigned";

export function ContratUnsignedCerfa(){
    return(
        <div>
            <PageHeaderCerfa/>
            <div>
                <div className="border-2 mt-10 rounded-md ml-10">
                    <div className="m-5  border-2 rounded-lg w-[40%] flex">
                        <Search className="mt-4 ml-5  h-[20px] "/>
                        <input className=" px-5  py-3 text-xl w-[100%]" placeholder="Rechercher un apprentie"></input>
                    </div>     
                    <ListeContratCerfaUnsigned />    
                </div>
            </div>
        </div>
    )
}