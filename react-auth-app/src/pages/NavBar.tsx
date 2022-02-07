import React from "react";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { RootState } from "../store";



const NavBar = () => {

    const auth = useSelector((state: RootState) => state.auth);

    const profileLink = "/" + auth.account?.username
    return (
            <div className='w-full flex p-4'>

                 <div className='p-2 justify-start'>
                       <Link  to="/"
                     className="rounded-lg p-2  m-2 w-32 bg-lime-400 text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm">
                         Home
                    </Link>
                 </div>
            {  auth.refreshToken ? 

                 <div className='p-2 flex-end'>
                    <Link  to="/profile"
                     className="rounded-lg p-2  m-2 w-32 bg-lime-400 text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm">
                         My Profile
                    </Link>
                   <Link  to={ profileLink }
                     className="rounded-lg p-2  m-2 w-32 bg-lime-400 text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm">
                         My Page
                    </Link>
                 </div>

                :
                <div className='p-2 justify-end'>
                     <Link 
                     to="/login"
                     className="rounded-lg p-2  m-2 w-32 bg-lime-400 text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm">
                         Login
                    </Link>
                    <Link 
                         to="/register"
                         className="rounded-lg p-2  m-2 w-32 bg-lime-400 text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm">
                             Register
                    </Link>
                </div>
            }
            </div>
           
        );    
};

export default NavBar