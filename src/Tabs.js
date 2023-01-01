import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
 
const Tabs = ({courses}) => {
    const { id } = useParams();
    const navigate = useNavigate();

    return ( 
        <nav class="tabs">
            <div class="tab-container">
            
                <ul class="tab-menu">
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
                        <Link className="tab-link" to={`../Courses/${id}/Workload`}>Workload</Link>
                        </li>
                    </div>

                </ul>
            </div>
        </nav>
     );
}

export default Tabs;