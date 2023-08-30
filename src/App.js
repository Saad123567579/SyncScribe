import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Notfound from "./components/Notfound";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />

      


      <Route path="*" element={<Notfound />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
