import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Switcher from "../components/Switcher";

export default function Root() {
  return (
    <div className="App">
      <Sidebar />
      <div className="flex flex-col p-4 sm:ml-52 pr-30 max-w-2xl">
        <Outlet />
      </div>
    </div>
  );
}
