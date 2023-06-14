import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

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
