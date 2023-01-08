import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Tabs = ({courses}) => {
    const { id } = useParams();

    return ( 
        <nav class="tabs">
            
            <div class="tab-container">
            
                <ul class="tab-menu">
                    <div className="box">
                        <li className="tab-item">
                        <Link className="tab-link" to={`../Courses`}>Back to Courses</Link>
                        </li>
                    </div>
                    <div className="box">
                        <li className="tab-item">
                        <Link className="tab-link" to={`../Courses/${id}`}>Course Info</Link>
                        </li>
                    </div>

                    <div className="box">
                        <li className="tab-item">
                        <Link className="tab-link" to={`../Courses/${id}/Calculator`}>Grade Calculator</Link>
                        </li>
                    </div>

                    <div className="box">
                        <li className="tab-item">
                        <Link className="tab-link" to={`../Courses/${id}/Workload`}>Syllabus</Link>
                        </li>
                    </div>

                </ul>
            </div>
        </nav>
     );
}

export default Tabs;