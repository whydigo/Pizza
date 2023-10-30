import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import NotFound from "./components/pages/NotFound";
import FullPizza from "./components/pages/FullPizza";
import MainLoyaout from "./layouts/MainLoyaout";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<MainLoyaout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    
  );
}

export default App;
