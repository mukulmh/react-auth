import "./App.css";
import "antd/dist/antd.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Books from "./pages/Books";
import PrivateRoutes from "./utils/PrivateRoutes";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/" exact />
              <Route element={<Books />} path="/books" />
            </Route>
            <Route element={<Login />} path="/login" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
