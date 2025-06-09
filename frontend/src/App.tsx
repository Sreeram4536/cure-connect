// import React from 'react'
// import Navbar from './components/users/Navbar'
// import { Route, Routes } from 'react-router-dom'
// import Home from './pages/user/Home'
// import Doctors from './pages/user/Doctors'
// import Login from './pages/user/Login'
// import About from './pages/user/About'
// import Contact from './pages/user/Contact'
// import MyProfile from './pages/user/MyProfile'
// import MyAppointments from './pages/user/MyAppointments'
// import Appointment from './pages/user/Appointment'
// import Footer from './components/users/Footer'

// const App = () => {
//   return (
//     <div className='mx-4 sm:mx-[10%]'>
//       <Navbar/>
//       <Routes>
//       <Route path='/' element={<Home/>}/>
//         <Route path='/doctors' element={<Doctors/>}/>
//         <Route path='/doctors/:speciality' element={<Doctors/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/about' element={<About/>}/>
//         <Route path='/contact' element={<Contact/>}/>
//         <Route path='/my-profile' element={<MyProfile/>}/>
//         <Route path='/my-appointments' element={<MyAppointments/>}/>
//         <Route path='/appointments/:docId' element={<Appointment/>}/>
//       </Routes>
//       <Footer/>
//     </div>
//   )
// }

// export default App

import React from "react";
import { Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Routes
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";

const App = () => {
  return (
    <div>
      <Routes>
        {UserRoutes()}
        {AdminRoutes()}
        {DoctorRoutes()}
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;

