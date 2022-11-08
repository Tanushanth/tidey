import logo from './logo.svg';
import './App.css';
import { useWindowDimensions  } from 'react-native';
import { eventWrapper } from '@testing-library/user-event/dist/utils';




function App() {
  const {height,width} = useWindowDimensions();
  let tileSize = 200;
  let tileColumns = Math.floor( width / tileSize);
  let tileRows = Math.floor( height / tileSize);

  const wrapper = document.getElementById("tiles");

  const createTile = index => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    return tile;
  }

  const createTiles = quantity => {
    Array.from(Array(quantity)).map((tile, index) => (
      wrapper.appendChild(createTile(index))
    ))

  }

  const createGrid = () => {
    wrapper.innerHTML = "";
    tileColumns = Math.floor( width / tileSize);
    tileRows = Math.floor( height / tileSize);
    
    
    wrapper.style.setProperty("--columnNum", tileColumns);
    wrapper.style.setProperty("--rowNum", tileRows);

    createTiles(tileColumns * tileRows);
  }

  createGrid();
  window.onresize = () => createGrid();
  return (

    <body>
      <div id = "tiles"></div>

    </body>
    
  );
}





export default App;
