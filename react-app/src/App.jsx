import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { NotFound } from "./components/NotFound";
import { Home } from "./components/home";
import { User } from "./components/user";
import { Admin } from "./components/admin";
import { createContext, useState } from "react";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="user" element={<User />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
