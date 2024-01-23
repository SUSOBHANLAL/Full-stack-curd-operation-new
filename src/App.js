
import './App.css';
import  {RouterProvider, createBrowserRouter} from "react-router-dom"
import User from "./components/getUser/User";
import Add from './components/addUser/Add';
import Edit from './components/updateUser/Edit';
function App() {

  const routes = createBrowserRouter  ([
    {
      path:"/",
      element: <User/>,

    },

    {
      path:"/add",
      element: <Add/>,

    },
    {
      path:"/edit/:id",
      element: <Edit/>,

    },
  ])

  return (
    <div className="App">
     <h1>hello</h1>
     <RouterProvider router={routes}>

     </RouterProvider>
    </div>
  );
}

export default App;
