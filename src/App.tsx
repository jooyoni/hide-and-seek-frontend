import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Map01 from "./pages/Map01/Map01";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/play/:map/:roomNumber" element={<Map01 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
