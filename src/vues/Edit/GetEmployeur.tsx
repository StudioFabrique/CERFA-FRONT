import { EditEmployeurComponent } from "../../components/CFA/Edit/Edit-employeur";
import { PageHeaderCerfa } from "../CFA/PageHeaderCerfa";

export function GetEmployeur(){
    return <div>
        <PageHeaderCerfa />
        <p className="text-center font-bold text-2xl pt-10">Tous les Employeurs</p>
        <EditEmployeurComponent />
    </div>
}