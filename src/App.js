import './App.css';
import { Link } from "react-router-dom";
import anime from "animejs/lib/anime.es.js"


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
    
    <div className="App">
  <nav class="navbar">
    <div class="navbar__container">
      <a href="" class="navbar__links" id="navbar__logo">Tidey</a>
      <div class="navbar__toggle" id="mobile-menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <ul class="navbar__menu">
        <li class="navbar__item">
          <a href="signup" class="navbar__links" id="paintings-page">Sign Up</a>
        </li>
        <li class="navbar__item">
          <a href="login" class="navbar__links" id="about-page">Login</a>
        </li>
        <li class="navbar__item">
          <a href="about" class="navbar__links" id="contact-page">About Us</a>
        </li>
      </ul>
    </div>
  </nav>
      <header className="App-header">
          <p><span>Hi, welcome to Tidey.</span>
          </p>
          <div className="button-container">

        <div className="main-btn">
        
        <a
          className="main-btn-content"
          Link href="/courses"
        
        >
          Add a  new course
        </a>
        
      
        </div>

        
        <div className="main-btn">
        <a
          className="main-btn-content"
          Link href="/calculator"
        
        >
          Calculate grades
        </a>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;