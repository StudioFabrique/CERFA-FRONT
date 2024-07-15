import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./vues/rootlayout";
import { Authentification } from "./vues/Authentification";
import { ListeContratCerfa } from "./vues/CFA/ListeContratCFA";
import { ListeContratEmployeur } from "./vues/Employeur/ListeContratEmployeur";
import { Toaster } from "react-hot-toast";
import { ContratUnsignedCerfa } from "./vues/CFA/ContratUnsignedCFA";
import { ListeContratCerfasigned } from "./components/CFA/ListeContratsigned";
import { ContratsignedCerfa } from "./vues/CFA/ContratsignedCFA";
import CreationcontratApp from "./vues/CFA/CreationContratAppren";

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
    path: "/nouveau-contrat/Apprentissage",
    element: <RootLayout />,
    children: [
      {index:true, element:<CreationcontratApp />}
    ]
  }
]);

const App = () => {return <div><Toaster/> <RouterProvider router={router}></RouterProvider></div>}

export default App
