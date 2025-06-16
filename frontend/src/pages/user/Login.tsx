// import React, { useContext, useState,useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { assets } from '../../assets/assets'
// import { AppContext } from '../../context/AppContext'
// import { toast } from "react-toastify";
// import { isValidEmail, isValidPassword } from "../../utils/validator";
// import { loginUserAPI, registerUserAPI } from "../../services/authServices";
// import { showErrorToast } from "../../utils/errorHandler";

// const Login = () => {

//   const navigate = useNavigate()
//   const context = useContext(AppContext)

//   if (!context) {
//     throw new Error("TopDoctors must be used within an AppContextProvider");
//   }

//   const { backendUrl,token,setToken  } = context;


//   const [state,setState]=useState('Sign Up')
//   const[email,setEmail] = useState('')
//   const[password,setPassword] = useState('')
//   const[name,setName] = useState('')
//   const [loading, setLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);

//   const onSubmitHandler = async(event: React.FormEvent<HTMLFormElement>)=>{
//     event.preventDefault()
  

//   if (!email || !password || (state === "Sign Up" && !name)) {
//     toast.error("Please fill in all required fields.");
//     return;
//   }

//   if (!isValidEmail(email)) {
//     toast.error("Please enter a valid email address.");
//     return;
//   }

//   if (!isValidPassword(password)) {
//     toast.error(
//       "Password must be at least 8 characters long, include 1 number and 1 special character."
//     );
//     return;
//   }

//   try {
//     setLoading(true);
//     if (state === "Sign Up") {
//       const { data } = await registerUserAPI(name, email, password);
//       if (data.success) {
//         localStorage.setItem(
//           "tempUserData",
//           JSON.stringify({ email, name, purpose: "register" })
//         );
//         toast.success("OTP sent to your email");
//         navigate("/verify-otp");
//       } else {
//         toast.error(data.message);
//       }
//     } else {
//       const { data } = await loginUserAPI(email, password);
//       if (data.success) {
//         localStorage.setItem("token", data.token);
//         setToken(data.token);
//       } else {
//         toast.error(data?.message || "Something went wrong");
//       }
//     }
//   } catch (error) {
//     showErrorToast(error);
//   }
// };

// useEffect(() => {
//   if (token) {
//     navigate("/");
//   }
// });

//   return (
//     <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center'>
//   <div className='flex flex-col mt-40 sm:flex-row bg-white shadow-lg rounded-xl overflow-hidden'>
    
//     {/* LEFT: Image section */}
//     <div className='hidden sm:block w-full sm:w-96'>
//       <img 
//         src={assets.contact_image}  
//         alt="Login Visual"
//         className='w-full h-full object-cover'
//       />
//     </div>

//     {/* RIGHT: Form section */}
//     <div className='flex flex-col gap-3 p-8 min-w-[340px] sm:min-w-96 text-zinc-600 text-sm'>
//       <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
//       <p>Please {state === 'Sign Up' ? "sign up" : "login"} to book appointment</p>

//       {state === 'Sign Up' && (
//         <div className='w-full'>
//           <p>Full Name</p>
//           <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
//         </div>
//       )}

//       <div className='w-full'>
//         <p>Email</p>
//         <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
//       </div>

//       <div className='w-full'>
//         <p>Password</p>
//         <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
//       </div>

//       {state === 'Login' && (
//         <div className="w-full text-right text-sm mt-1">
//           <span
//             onClick={() => navigate('/verify-email')}
//             className="text-primary cursor-pointer hover:underline"
//           >
//             Forgot Password?
//           </span>
//         </div>
//       )}

//       <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>

//       <button
//         type='button'
//         onClick={() => window.location.href = `${backendUrl}/api/auth/google`}
//         className='flex items-center justify-center gap-2 border border-zinc-300 w-full py-2 rounded-md mt-2 hover:bg-zinc-100'
//       >
//         <img
//           src="https://developers.google.com/identity/images/g-logo.png"
//           alt="Google"
//           className="w-5 h-5"
//         />
//         Continue with Google
//       </button>

//       <p className='mt-2'>
//         {state === "Sign Up" ? (
//           <>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></>
//         ) : (
//           <>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>click here</span></>
//         )}
//       </p>
//     </div>
//   </div>
// </form>
//   )
// }

// export default Login

// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/AppContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { assets } from "../../assets/assets";
// import { isValidEmail, isValidPassword } from "../../utils/validator";
// import { loginUserAPI, registerUserAPI } from "../../services/authServices";
// import { showErrorToast } from "../../utils/errorHandler";
// import LoadingButton from "../../components/common/LoadingButton";

// const Login = () => {
//   const navigate = useNavigate();

//   const context = useContext(AppContext);

//   if (!context) {
//     throw new Error("TopDoctors must be used within an AppContextProvider");
//   }

//   const { backendUrl, token, setToken } = context;

//   const [state, setState] = useState("Sign Up");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);

//   const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!email || !password || (state === "Sign Up" && !name)) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     if (!isValidEmail(email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     if (!isValidPassword(password)) {
//       toast.error(
//         "Password must be at least 8 characters long, include 1 number and 1 special character."
//       );
//       return;
//     }

//     try {
//       setLoading(true);
//       if (state === "Sign Up") {
//         const { data } = await registerUserAPI(name, email, password);
//         if (data.success) {
//           localStorage.setItem(
//             "tempUserData",
//             JSON.stringify({ email, name, purpose: "register" })
//           );
//           toast.success("OTP sent to your email");
//           navigate("/verify-otp");
//         } else {
//           toast.error(data.message);
//         }
//       } else {
//         const { data } = await loginUserAPI(email, password);
//         if (data.success) {
//           localStorage.setItem("token", data.token);
//           setToken(data.token);
//         } else {
//           toast.error(data?.message || "Something went wrong");
//         }
//       }
//     } catch (error) {
//       showErrorToast(error);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate("/");
//     }
//   });

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="min-h-[80vh] flex items-center justify-center"
//     >
//       <div className="flex flex-col mt-40 sm:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
//         {/* LEFT: Image section */}
//         <div className="hidden sm:block w-full sm:w-96">
//           <img
//             src={assets.contact_image}
//             alt="Login Visual"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* RIGHT: Form section */}
//         <div className="flex flex-col gap-3 p-8 min-w-[340px] sm:min-w-96 text-zinc-600 text-sm">
//           <p className="text-2xl font-semibold">
//             {state === "Sign Up" ? "Create Account" : "Login"}
//           </p>
//           <p>
//             Please {state === "Sign Up" ? "sign up" : "login"} to book
//             appointment
//           </p>

//           {state === "Sign Up" && (
//             <div className="w-full">
//               <p>Full Name</p>
//               <input
//                 className="border border-zinc-300 rounded w-full p-2 mt-1"
//                 type="text"
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 required
//               />
//             </div>
//           )}

//           <div className="w-full">
//             <p>Email</p>
//             <input
//               className="border border-zinc-300 rounded w-full p-2 mt-1"
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               required
//             />
//           </div>

//           <div className="w-full">
//             <p>Password</p>
//             <input
//               className="border border-zinc-300 rounded w-full p-2 mt-1"
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               required
//             />
//           </div>

//           {state === "Login" && (
//             <div className="w-full text-right text-sm mt-1">
//               <span
//                 onClick={() => navigate("/verify-email")}
//                 className="text-primary cursor-pointer hover:underline"
//               >
//                 Forgot Password?
//               </span>
//             </div>
//           )}

//           <LoadingButton
//   text={state === "Sign Up" ? "Create Account" : "Login"}
//   type="submit"
//   loading={loading}
//   className="w-full py-2 text-base"
// />

//           <LoadingButton
//   text={
//     <span className="flex items-center gap-2">
//       <img
//         src="https://developers.google.com/identity/images/g-logo.png"
//         alt="Google"
//         className="w-5 h-5"
//       />
//       Continue with Google
//     </span>
//   }
//   type="button"
//   loading={googleLoading}
//   onClick={() => {
//     setGoogleLoading(true);
//     window.location.href = `${backendUrl}/api/auth/google`;
//   }}
//   className="border border-zinc-300 text-zinc-700 w-full py-2 rounded-md mt-2 hover:bg-zinc-100 bg-white"
// />

//           <p className="mt-2">
//             {state === "Sign Up" ? (
//               <>
//                 Already have an account?{" "}
//                 <span
//                   onClick={() => setState("Login")}
//                   className="text-primary underline cursor-pointer"
//                 >
//                   Login here
//                 </span>
//               </>
//             ) : (
//               <>
//                 Create a new account?{" "}
//                 <span
//                   onClick={() => setState("Sign Up")}
//                   className="text-primary underline cursor-pointer"
//                 >
//                   click here
//                 </span>
//               </>
//             )}
//           </p>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Login;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { isValidEmail, isValidPassword } from "../../utils/validator";
import { loginUserAPI, registerUserAPI } from "../../services/authServices";
import { showErrorToast } from "../../utils/errorHandler";
import LoadingButton from "../../components/common/LoadingButton";

const Login = () => {
  const navigate = useNavigate();

  const context = useContext(AppContext);

  if (!context) {
    throw new Error("TopDoctors must be used within an AppContextProvider");
  }

  const { backendUrl, token, setToken } = context;

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password || (state === "Sign Up" && !name)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      toast.error(
        "Password must be at least 8 characters long, include 1 number and 1 special character."
      );
      return;
    }

    try {
      setLoading(true);
      if (state === "Sign Up") {
        const { data } = await registerUserAPI(name, email, password);
        if (data.success) {
          localStorage.setItem(
            "tempUserData",
            JSON.stringify({ email, name, purpose: "register" })
          );
          toast.success("OTP sent to your email");
          navigate("/verify-otp");
          setLoading(false);
          return;
        } else {
          toast.error(data.message);
          setLoading(false); // <-- ADD THIS
          return;
        }
      } else {
        const { data } = await loginUserAPI(email, password);
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setLoading(false);
         return;
        } else {
          toast.error(data?.message || "Something went wrong");
          setLoading(false); // <-- ADD THIS
          return;
        }
      }
    } catch (error) {
      showErrorToast(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
      
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#181c2b] relative overflow-hidden">
    {/* Floating shapes */}
    <div className="absolute top-0 left-0 w-72 h-72 bg-[#2d3250] opacity-40 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#393e63] opacity-30 rounded-full blur-2xl animate-pulse" />

    <form
      onSubmit={onSubmitHandler}
      className="z-10 flex flex-col sm:flex-row bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border border-white/20"
    >
      {/* Illustration */}
      <div className="hidden sm:flex flex-col items-center justify-center w-96 bg-gradient-to-b from-[#232946]/80 to-[#181c2b]/80 p-8">
        <img
          src={assets.contact_image}
          alt="User Login Illustration"
          className="w-60 h-60 object-contain drop-shadow-2xl mb-6"
        />
        <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-zinc-300 text-center text-base">
          {state === "Sign Up"
            ? "Sign up to book appointments and connect with top doctors."
            : "Welcome back! Login to book appointments and manage your health."}
        </p>
      </div>
      {/* Form */}
      <div className="flex flex-col gap-5 p-10 min-w-[340px] sm:min-w-96 text-zinc-200 bg-[#232946]/80">
        {state === "Sign Up" && (
          <div>
            <label className="text-zinc-300 font-medium">Full Name</label>
            <input
              className="bg-[#181c2b] border border-[#393e63] rounded-lg p-3 text-zinc-100 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}
        <div>
          <label className="text-zinc-300 font-medium">Email</label>
          <input
            className="bg-[#181c2b] border border-[#393e63] rounded-lg p-3 text-zinc-100 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div>
          <label className="text-zinc-300 font-medium">Password</label>
          <input
            className="bg-[#181c2b] border border-[#393e63] rounded-lg p-3 text-zinc-100 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        {state === "Login" && (
          <div className="w-full text-right text-sm mt-1">
            <span
              onClick={() => navigate("/verify-email")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>
        )}
        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-[#5f6fff] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#5f6fff] text-white font-semibold py-2 rounded-lg shadow-lg transition-all duration-200"
          disabled={loading}
        >
          {loading ? (state === "Sign Up" ? "Creating..." : "Logging in...") : (state === "Sign Up" ? "Create Account" : "Login")}
        </button>
        <button
          type="button"
          onClick={() => {
            setGoogleLoading(true);
            window.location.href = `${backendUrl}/api/auth/google`;
          }}
          className="flex items-center justify-center gap-2 border border-[#393e63] w-full py-2 rounded-lg mt-2 hover:bg-[#232946]/60 bg-[#181c2b] text-zinc-200 font-medium transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
        <p className="mt-2 text-center text-zinc-400 text-sm">
          {state === "Sign Up" ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState("Login")}
                className="text-blue-400 underline cursor-pointer hover:text-blue-300"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Create a new account?{' '}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-400 underline cursor-pointer hover:text-blue-300"
              >
                click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  </div>
);
};

export default Login;