import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Switcher from "../components/Switcher";

export default function Root() {
  return (
    <div className="App">
      <Sidebar />
      <div className="flex flex-col p-4 sm:ml-52 xl:mx-auto pr-30 max-w-4xl">
        <Outlet />
      </div>
    </div>
  );
}
