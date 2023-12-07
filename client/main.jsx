import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import NavBar from "./NavBar.jsx";
import EditRecipe from "./EditRecipe.jsx";
import CreateRecipe from "./CreateRecipe.jsx";
import Footer from "./Footer.jsx";
import "./index.css";

const navLinks = [
  { href: "create-recipe", text: "Create a Recipe" },
  { href: "/", text: "View Recipes" },
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavBar links={navLinks} />
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/edit/:recipeName" element={<EditRecipe />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
      </Routes>
    </Router>
    <Footer />
  </React.StrictMode>,
);
