import React from "react";
import { Link } from "react-router-dom";
import NavBar  from "../pages/NavBar";
import Footer from "../pages/Footer";

const Home = () => {
    const mainLogo = '/static/media/CigCardLynx.d8f71df3cab9df392ca1.png'
    
    return (

    <div className='w-full h-screen bg-gradient-to-tl from-green-100 to-lime-100 flex flex-col'>
       
            <div  className='py-2 flex flex-col font-sans'>
                 <span className='text-9xl font-bold mx-auto text-center text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-500'> Lynx</span>
                <span className='text-xl  font-semibold mx-auto text-center'> Collect 'em. Share 'em.</span>

            </div>
       <div  className='flex place-content-center my-1 w-full mx-auto item-center'>
           <img  src={mainLogo} className='object-contain h-96 rounded-lg opacity-80' alt="digital drawing of a lynx"/>
       </div>

 

            <div  className='flex flex-col items-center  p-2 mx-auto'>
                        <Link 
                             to="/register"
                             className="rounded-lg p-2  m-2 bg-lime-400 font-bold text-2xl text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm">
                                 Create an account
                        </Link>
                      <Link 
                         to="/login"
                         className="rounded-lg p-2  m-2 w-32 bg-lime-400 font-bold text-3xl text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm">
                             Login
                        </Link>
                </div>
           <Footer />
        </div>
    );
};

export default Home;