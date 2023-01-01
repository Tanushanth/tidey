import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Create from './Create';
import Courses from './Courses';
import CourseDetails from './CourseDetails';
import Calculator from './Calculator';
import CourseCalculator from './CourseCalculator';
import Workload from './Workload';
import NotFound from './NotFound';
import Tabs from './Tabs';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



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
          <Route path="/Courses/:id/Calculator" element={<CourseCalculator />} />
          <Route path="/Courses/:id/Workload" element={<Workload />} />
          <Route path="/Calculator" element={<Calculator />} />
          <Route path="/Tabs" element={<Tabs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
    </div>
    </Router>
  );
}

export default App;