import { Link } from 'react-router-dom';

const NotFound = () => {
    return ( 
        <div className="App">
            <div className="App-header">
                <div className="not-found">
                    <h2>Error 404:</h2>
                    <p>Sorry, that page could not be found!</p>
                    <Link to="/tidey" style={{ 
                        color: "#0bceff", fontSize: "calc(10px + 2vmin)"}}>
                        Click here to go back to homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
export default NotFound;