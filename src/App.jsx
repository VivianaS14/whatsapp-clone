import "./App.css";
import Sidebar from "./containers/Sidebar";
import Chat from "./pages/Chat";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./layout/Login";
import { useStateValue } from "./StateProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Sidebar />}>
        <Route path="/rooms/:roomid" element={<Chat />} />
      </Route>
    </>
  )
);

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    // BEM naming convention
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <RouterProvider router={router} />
        </div>
      )}
    </div>
  );
}

export default App;
