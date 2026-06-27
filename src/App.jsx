import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          {/* Create an About.jsx and drop it here */}
          {/* <Route path="about" element={<About />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}
