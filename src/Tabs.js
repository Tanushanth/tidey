import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
 
const Tabs = (courses) => {
    const { id } = useParams();
    const navigate = useNavigate();
 
    return ( 
        <nav class="tabs">
            <div class="tab-container">
            
                <ul class="tab-menu">
                    <div className="box">
                        <li className="tab-item">
                        <Link className="tab-link" to="#">Course Info</Link>
                        </li>
                    </div>

                    <div className="box">
                        <li className="tab-item">
                        <Link className="tab-link" to="./Calculator">Grade Calculator</Link>
                        </li>
                    </div>

                    <div className="box">
                        <li className="tab-item">
                        <Link className="tab-link" to="./Workload">Workload</Link>
                        </li>
                    </div>

                </ul>
            </div>
        </nav>
     );
}

export default Tabs;