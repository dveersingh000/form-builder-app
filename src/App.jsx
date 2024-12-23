import LandingPage from "./pages/LandingPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignIn from "./pages/SignIn";
// import CreateFormBot from "./pages/CreateFormBot";

function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
