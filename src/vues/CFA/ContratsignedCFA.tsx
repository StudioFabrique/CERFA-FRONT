import { Search } from "lucide-react";
import { PageHeaderCerfa } from "./PageHeaderCerfa";
import { ListeContratCerfasigned } from "../../components/CFA/ListeContratsigned";


//Page accueillant les contrats signés 
export function ContratsignedCerfa(){
    return(
        <div className="pr-10">
            <PageHeaderCerfa/>
            <div>
                <div className="border-2 mt-10 rounded-md ml-10">
                    <div className="m-5  border-2 rounded-lg w-[40%] flex">
                        <Search className="mt-4 ml-5  h-[20px] "/>
                        <input className=" px-5  py-3 text-xl w-[100%]" placeholder="Rechercher un apprentie"></input>
                    </div>     
                    <ListeContratCerfasigned />
                </div>
            </div>
        </div>
    )
}
