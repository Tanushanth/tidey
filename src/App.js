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
      
      <header className="App-header">
          <p><span>Hi, </span>what would you like to do today?
          </p>
          <div className="button-container">

        <div className="main-btn">
        <ul>
        <li>
      
          <Link to="/login">Login</Link>
        </li>
        <li>
  
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
        </div>

        
        <div className="main-btn">
        <a
          className="main-btn-content"
          href="Login.js"
        
        >
          Log In
        </a>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;