import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/app" element={<Sidebar />}>
        <Route path="/app/rooms/:roomid" element={<Chat />} />
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
