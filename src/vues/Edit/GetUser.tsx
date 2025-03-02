import { EditUserComponent } from "../../components/CFA/Edit/Edit-user";
import { PageHeaderCerfa } from "../CFA/PageHeaderCerfa";

export function Getuser(){
    return <div>
        <PageHeaderCerfa />
        <p className="text-center font-bold text-2xl pt-10">Tous les utilisateurs</p>
        <EditUserComponent />      
    </div>
}