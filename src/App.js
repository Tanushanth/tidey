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
          <Route path="/tidey" element={<Home />} />
          <Route path="/tidey/" element={<Home />} />
          <Route path="/tidey/Login" element={<Login />} />
          <Route path="/tidey/SignUp" element={<SignUp />} />
          <Route path="/tidey/Create" element={<Create />} />
          <Route path="/tidey/Courses" element={<Courses />} />
          <Route path="/tidey/Courses/:id" element={<CourseDetails />} />
          <Route path="/tidey/Courses/:id/Calculator" element={<CourseCalculator />} />
          <Route path="/tidey/Courses/:id/Workload" element={<Workload />} />
          <Route path="/tidey/Calculator" element={<Calculator />} />
          <Route path="/tidey/Tabs" element={<Tabs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
    </div>
    </Router>
  );
}

export default App;