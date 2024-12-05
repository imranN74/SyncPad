import { MainPage } from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex grow">
        <Routes>
          <Route path="/:key" element={<MainPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
