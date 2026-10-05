import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ScrollToTop from "./scrolltotop";
import CourseView from "./CourseView";
import OnlineCourses from "./OnlineCourses";

import Enroll from "./Enroll";
function App() {
  return(
   <BrowserRouter>
   <ScrollToTop />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/enquire-form" element={<Enroll />} />
    <Route path="/course/:slug" element={<CourseView />} />
    <Route path="/online-courses" element={<OnlineCourses />} />
   </Routes>
   </BrowserRouter>
  )
}
export default App