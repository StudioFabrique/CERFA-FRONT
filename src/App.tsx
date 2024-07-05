import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./vues/rootlayout";
import { Authentification } from "./vues/Authentification";
import { ListeContratCerfa } from "./vues/Cerfa/ListeContratCerfa";
import { Toaster } from "react-hot-toast";
import { ContratUnsignedCerfa } from "./vues/Cerfa/ContratUnsignedCerfa";
import { ListeContratCerfasigned } from "./components/Cerfa/ListeContratsigned";
import { ContratsignedCerfa } from "./vues/Cerfa/ContratsignedCerfa";

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
  }
]);

const App = () => {return <div><Toaster/> <RouterProvider router={router}></RouterProvider></div>}

export default App
