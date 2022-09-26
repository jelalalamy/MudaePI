import Home from './components/Home';
import Compare from './components/Compare';
import Snapshots from './components/Snapshots';
import About from './components/About';
import WIP from './components/WIP';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/characters" element={<WIP/>}/>
        <Route path="/compare" element={<Compare/>}/>
        <Route path="/snapshots" element={<Snapshots/>}/>
        <Route path="/api" element={<WIP/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </Router>
  );
}

export default App;
