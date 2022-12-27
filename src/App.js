import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';

import Create from './Create';
import Courses from './Courses';
import CourseDetails from './CourseDetails';
import Calculator from './Calculator';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


  /* TANU TILE STUFF
  let tileSize = 50;
  let tileColumns = Math.floor( document.body.clientWidth / tileSize);
  let tileRows = Math.floor( document.body.clientHeight / tileSize);

  const wrapper = document.getElementById("tiles");

  const createTile = index => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.onclick = e => handleOnClick(index);
    return tile;
  }

  const createTiles = quantity => {
    Array.from(Array(quantity)).map((tile, index) => (
      wrapper.appendChild(createTile(index))
    ))

  }

  const createGrid = () => {
    wrapper.innerHTML = "";
    tileColumns = Math.floor( document.body.clientWidth / tileSize);
    tileRows = Math.floor( document.body.clientHeight / tileSize);
    
    
    wrapper.style.setProperty("--columnNum", tileColumns);
    wrapper.style.setProperty("--rowNum", tileRows);

    createTiles(tileColumns * tileRows);
  }

  let count = -1;

  const handleOnClick = index => {
    const colors = ["rgb(10,143,189)","rgb(64,166,205)","rgb(85,191,212)","rgb(128,211,221)","rgb(161,288,233)","rgb(225,235,241)"];
    count = count + 1;
    anime({
      targets: ".tile",
      backgroundColor: colors[count % (colors.length - 1)],
      delay: anime.stagger(50,{
          grid: [tileColumns, tileRows],
          from: index
        })

    })
  }

  createGrid();
  window.onresize = () => createGrid();
  <div id = "tiles"></div>
  */


const App = () => {

  return (
    <Router>
    <div className="App">
      <Navbar />

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Courses/:id" element={<CourseDetails />} />
          <Route path="/Calculator" element={<Calculator />} />

        </Routes>
      </div>
      
    </div>
    </Router>
  );
}

export default App;