import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<h1>Home Screen</h1>} />
      <Route path="/app" element={<Sidebar />}>
        <Route path="/app/rooms/:roomid" element={<Chat />} />
      </Route>
    </>
  )
);

function App() {
  return (
    // BEM naming convention
    <div className="app">
      <div className="app__body">
        {/* Router */}
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
