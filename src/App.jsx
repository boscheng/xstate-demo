import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMachine } from "@xstate/react";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Todos from "./pages/todos";
import Home from "./pages/home";
import Base from "./pages/base";
import Count from "./pages/redux";
import TkCount from "./pages/redux-toolkit";
// import "todomvc-common/base.css";
// import "todomvc-app-css/index.css";
import "./App.css";

import { MachineContext, userMachine } from "./machines";

function App() {
  const [currentMachine, sendToMachine] = useMachine(userMachine);
  return (
    <MachineContext.Provider value={[currentMachine, sendToMachine]}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout machine={currentMachine} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/base" element={<Base />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/count" element={<Count />} />
            <Route path="/tkcount" element={<TkCount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MachineContext.Provider>
  );
}

export default App;
