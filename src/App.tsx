import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./vues/rootlayout";
import { Authentification } from "./vues/Authentification";
import { ListeContratCerfa } from "./vues/CFA/ListeContratCFA";
import { ListeContratEmployeur } from "./vues/Employeur/ListeContratEmployeur";
import { Toaster } from "react-hot-toast";
import { ContratUnsignedCerfa } from "./vues/CFA/ContratUnsignedCFA";
import { ListeContratEmployeurSigned } from "./vues/Employeur/ListeContratEmployeurSigned";
import { ContratsignedCerfa } from "./vues/CFA/ContratsignedCFA";
import CreationcontratApp from "./vues/CFA/CreationContratAppren";
import { ListeContratEmployeurUnSigned } from "./vues/Employeur/ListeContratEmployeurUnsigned";
import { GetEmployeur } from "./vues/Edit/GetEmployeur";
import { EditCFA } from "./vues/Edit/EditCFA";
import { Getuser } from "./vues/Edit/GetUser";
import { Edituser } from "./vues/Edit/EditUser";
import { Editemployeur } from "./vues/Edit/EditEmployeur";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {index: true, element:<Authentification />}
    ]

  },
  {path:"/accueil-cerfa",
    element: <RootLayout />,
    children: [
      {index:true, element:<ListeContratCerfa />}
    ]
  },
  {path:"/accueil-employeur",
    element: <RootLayout />,
    children: [
      {index:true, element:<ListeContratEmployeur />}
    ]
  },
  {
    path: "/contrat-cerfa/unsigned",
    element: <RootLayout />,
    children: [
      {index:true, element:<ContratUnsignedCerfa />}
    ]
  },
  {
    path: "/contrat-cerfa/signed",
    element: <RootLayout />,
    children: [
      {index:true, element:<ContratsignedCerfa />}
    ]
  },
  {
    path: `/contrat-employeur/signed`,
    element: <RootLayout/>,
    children: [
      {index:true, element:<ListeContratEmployeurSigned />}
    ]
  },
  {
    path: `/contrat-employeur/unsigned`,
    element: <RootLayout/>,
    children: [
      {index:true, element:<ListeContratEmployeurUnSigned />}
    ]
  },
  {
    path: "/nouveau-contrat/Apprentissage",
    element: <RootLayout />,
    children: [
      {index:true, element:<CreationcontratApp />}
    ]
  }, 
  {path:"/get-user",
    element: <RootLayout />,
    children: [
      {index:true, element:<Getuser />}
    ]
  },
  {path:"/edit-CFA",
    element: <RootLayout />,
    children: [
      {index:true, element:<EditCFA />}
    ]
  },
  {path:"/edit-entreprise",
    element: <RootLayout />,
    children: [
      {index:true, element:<GetEmployeur />}
    ]
  },
  {path:"/edit/user/:id",
    element: <RootLayout />,
    children: [
      {index:true, element:<Edituser />}
    ]
  },
  {path:"/edit/employeur/:id",
    element: <RootLayout />,
    children: [
      {index:true, element:<Editemployeur />}
    ]
  },
]);

const App = () => {return <div><Toaster/> <RouterProvider router={router}></RouterProvider></div>}

export default App
