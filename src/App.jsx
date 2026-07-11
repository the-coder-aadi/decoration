import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ScrollToTop from "./scrolltotop";
import BookingForm from "./bookingform";

import Enroll from "./Enroll";
function App() {
  return(
   <BrowserRouter>
   <ScrollToTop />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/book-decoration" element={<BookingForm />} />
    <Route path="/enroll-form" element={<Enroll />} />
   </Routes>
   </BrowserRouter>
  )
}
export default App