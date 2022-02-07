
import React, { useState, useEffect, useRef } from "react";
import { MouseEvent, ChangeEvent, DragEvent } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, RouteProps, useParams } from "react-router";
import axios from "axios";
import NavBar  from "../pages/NavBar"
import Footer from "../pages/Footer";
import { isValidUrl } from "../helpers"
import { formatDistanceToNow, parseISO } from 'date-fns'
//import ogs from 'ts-open-graph-scraper'

// const options = {
//   url: "https://twitter.com/elonmusk/status/1364826301027115008",
//   headers: {
//     "user-agent": "Googlebot/2.1 (+http://www.google.com/bot.html)",
//   },
// };

// ogs(options, (error, results) => {
//   console.log("error:", error); // This returns true or false. True if there was an error. The error itself is inside the results object.
//   console.log("results:", results); // This contains all of the Open Graph results
// });




const Page = (props: RouteProps) => {
    // grab the id from route parameters
    const {id} = useParams();

    const initialUser = {
        "id": "",
        "created": "",
        "updated": "",
        "username": "",
        "email":  "",
        "links":  "",
    }
      //state to hold and update user
    const [user, setUser] = useState(initialUser);

    // ref to track...idk
    const countRef = useRef(0);

    // effect to async fetch
    useEffect(() => {
    retrieveUser();
  }, [countRef]);

   const retrieveUser = () => {

            axios
              .get(`${process.env.REACT_APP_API_URL}/${id}`, {
                headers: {
                  "id": id ?? ""
                },
              })
              .then((response) => {
                // state update
                if (response.data.length > 0) {
                    setUser(response.data[0])
                } 
              })
              .catch((e) => {
                console.error(e);
           });
      };
  
    // we can get the id from the props, and send a get to the store
    // if no users (response is empty)
        // display a friendly note that username does not exist
    // if user
        // display normal page
    return <div className='w-full h-screen bg-gradient-to-t from-green-100 to-lime-100'>

        <NavBar />
        <div className='m-4'>
            <div  className='self-center my-auto text-7xl font-semibold'> 
                { user.username }
            </div>

            <div> 
                { parseISO(user.created).toString() }
 
            </div>

            <div> 
                    { user.links && user.links.split(",").filter(function(item, i){return item != ""}).map(function(item, i){
                          console.log(item);
                          return (
                              isValidUrl(item) ?

                                   <div key={i} className='text-center p-2 bg-gradient-to-l from-green-300 to-lime-300  m-2 rounded shadow-lg hover:text-slate-100 hover:bg-green-200 hover:shadow-sm hover:opacity-80'>
                                      <URLCard for={ item }/>
                                  </div> 

                                : 
                                  <div key={i} className='text-center p-2 bg-gradient-to-l from-green-300 to-lime-300  m-2 rounded shadow-lg hover:text-slate-100 hover:bg-green-200 hover:shadow-sm hover:opacity-80'>
                                      { item } < span> NOT A URL </span>
                                  </div>                                    

                          )
                        })


                     }
            </div>
        </div>
        <Footer />
    </div>

};


interface URLProps {
    "for": string
}

interface URLData {
  title: string,
  type: string,
  url: string,
  site_name: string,
  description: string,
  image: {
    url: string,
    width: string,
    height: string,
  }
}
const URLCard = (props: URLProps) => {

    // async function fetch() {
    //   const ogResults = await ogs(props.for)
    //   console.table(ogResults)
    // }


       const retrieveData = () => {
            // OG(props.for, function (err: Error, meta: URLData) {
            //   console.log(meta);
            // });
           



       }

    // ref to track...idk
    const countRef = useRef(0);


    // effect to async fetch
    useEffect(() => {
       // fetch();
     }, [countRef]);

        return (<div> 



        </div>)
}

export default Page;