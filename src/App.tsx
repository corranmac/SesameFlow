import {FlowWorkspace} from "@/app/FlowWorkspace"
import Homepage from "@/app/Homepage"
import NavBar from "@/layout/Navbar";
import Tester from "@/dexie-test/tester" 

import { BrowserRouter, HashRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const ConditionalNavBar = () =>{
  const location = useLocation();
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    setNavbar(["/tester", "/flow", "/"].includes(location.pathname));
  }, [location.pathname]);

  return (
    <div>
      {navbar && <NavBar />}
      <Outlet />
    </div>
  );
}

const App = () => {
  return (
    <div className="main">
      <HashRouter>
        <Routes>
          <Route path="/" element={<ConditionalNavBar />}>
            <Route index element={<Homepage/>} />
            <Route path="flow" element={<FlowWorkspace/>} />
            <Route path="flow/:routeFlowId" element={<FlowWorkspace />} />
            <Route path="tester" element={<Tester />} />
          </Route>
        </Routes>
      </HashRouter>
      </div>
  );
}

export default App