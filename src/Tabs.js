import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "react-feather";

const Tabs = ({courses}) => {
    const { id } = useParams();
    const navigate = useNavigate();


    const handleNav = () => {
        navigate("../Courses");
    }

    return ( 
        <nav class="tabs">
            
            <div class="tab-container">
            
                <ul class="tab-menu">
                    <div className="back-button">
                    <ArrowLeftCircle color='white' size="30px" cursor="pointer" onClick={handleNav} ></ArrowLeftCircle>
                    

                    <Link className="tab-link" to={`../Courses`}>Back</Link>
                    
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