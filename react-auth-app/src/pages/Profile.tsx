
import React, { useState, useEffect, useRef } from "react";
import { MouseEvent, ChangeEvent, DragEvent } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import authSlice from "../store/slices/auth";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AccountResponse } from "../types" 
import axios from "axios";
import Footer from "../pages/Footer";
import NavBar from "../pages/NavBar";


interface ProfileProps {
    account: AccountResponse
}

const Profile = (props: ProfileProps) => {

  const dispatch = useDispatch();
  const history = useNavigate();
  
  const listInit: string[] = [];

  const [sortedList, setSortedList] = React.useState(listInit);
  const [listDirtyFlag, setListDirtyFlag] = React.useState(false);


  const handleLogout = () => {
      //
    dispatch(authSlice.actions.logout());
    history("/login");

  };




  const initialUserState = {
        id: null,
        created: new Date,
        updated: new Date,
        username: "",
        email: "",
        links: "",


      };

    // hold user, intialized with blank data
    const [user, setUser] = useState(initialUserState);
    
    // track whether edits have been made
     const [edited, setEdited] = useState(false);

    // track whether edits have been saved
    const [submitted, setSubmitted] = useState(false);


    // idk why
    const countRef = useRef(0);

      useEffect(() => {
        retrieveUser();
      }, [countRef]);


    const retrieveUser = () => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/${props.account.username}/`, {
            headers: {
                "Content-type": "application/json",
            },
          })
          .then((response) => {
             // guard for empty here
            const temp = response.data[0];
            setUser({
                "id": temp.id,
                "created": temp.created,
                "updated": temp.updated,
                "username": temp.username,
                "email": temp.email,
                "links": temp.links
            });

            if (temp.links != "") {
              setSortedList(temp.links.split(","));
            }

            console.log(response);
          })
          .catch((e) => {
            console.error(e);
          });
      };

    const updateUser = () => {
        var tempLinks = ""
        if (sortedList.length != 0) {
            tempLinks = sortedList.join(",")
        }

        let data = {
          // fill with use
            "id": user.id,
            "created":  user.created,
            "updated": user.updated,
            "username": user.username,
            "email": user.email,
            "links": tempLinks
        };
        axios
          .put(`${process.env.REACT_APP_API_URL}/user/${user.id}/`, data, {
            headers: {
              "Content-type": "application/json",
             },
          })
          .then((response) => {
            setUser({
                "id": response.data.id,
                "created":  response.data.created,
                "updated": response.data.updated,
                "username": response.data.username,
                "email": response.data.email,
                "links": response.data.links
             });
            setSubmitted(true);
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
      };





     
  let sourceElement: HTMLDivElement | null = null;


  /* save list */
  const saveList = () => {
   
      updateUser();
      setListDirtyFlag(false);
  }

  /* add a new entry at the end of the list.  */
  const newLine = () => {

    const temp = [""].concat(sortedList);
    setSortedList(temp);
  }
  
  /* change opacity for the dragged item. 
  remember the source item for the drop later */
  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.opacity = "0.5"
    sourceElement = event.currentTarget
    event.dataTransfer.effectAllowed = 'move'
  }

  /* do not trigger default event of item while passing (e.g. a link) */
  const handleDragOver = (event:  DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move' 
  }

  /* add class .over while hovering other items */
  const handleDragEnter = (event:  DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.add('over')    
  }

  /* remove class .over when not hovering over an item anymore*/
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove('over')
  }

  const handleDrop = (event: DragEvent<HTMLInputElement>) => {
    /* prevent redirect in some browsers*/
    event.stopPropagation()
    
    /* only do something if the dropped on item is 
    different to the dragged item*/
    console.log("SOURCE", sourceElement)
    console.log("TARGET", event.target)

    if (sourceElement?.id !== event.currentTarget.id) {

      /* remove dragged item from list */
      const list = sortedList.filter((item, i) => 
        i.toString() !== sourceElement?.id)

      /* this is the removed item */
      const removed = sortedList.filter((item, i) => 
        i.toString() === sourceElement?.id)[0]

      /* insert removed item after this number. */
      let insertAt = Number(event.currentTarget.id)

      console.log('list with item removed', list)
      console.log('removed:  line', removed)
      console.log('insertAt index', insertAt)

      let tempList = []

      /* if dropped at last item, don't increase target id by +1. 
         max-index is arr.length */
      if (insertAt >= list.length) {
        tempList = list.slice(0).concat(removed)
        setSortedList(tempList)
        event.currentTarget.classList.remove('over')
      } else
      if ((insertAt < list.length)) {
      /* original list without removed item until the index it was removed at */
        tempList = list.slice(0,insertAt).concat(removed)

        console.log('tempList', tempList)
        console.log('insert the rest: ', list.slice(insertAt))

        /* add the remaining items to the list */
        const newList = tempList.concat(list.slice(
          insertAt))
        console.log('newList', newList)

        /* set state to display on page */
        setSortedList(newList);
        setListDirtyFlag(true);
        event.currentTarget.classList.remove('over');
      }
    }
    else {
      console.log('nothing happened');
    }
    event.currentTarget.classList.remove('over'); 

  }

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.opacity = "1";
    console.log('-------------------------------------------------------------')
  }

  /* log changes in current input field */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log('event.target.value', event.target.value)

    // maybe have a dirty flag here?
    if (!listDirtyFlag) {
       setListDirtyFlag(true);
    }
    /* create new list where everything stays the same except that the current
    item replaces the existing value at this index */
    const list = sortedList.map((item, i) => {
      if (i !== Number(event.target.id)) { 
        return item }
      else return event.target.value   
    })
    setSortedList(list)

  }

  /* filter list where only items with id unequal to current id's are allowed */
  const handleDelete = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    const list = sortedList.filter((item, i) => 
      i !== Number(event.currentTarget.id))
    console.log(event.currentTarget.id);
    setSortedList(list);
    setListDirtyFlag(true);
  }
  
  /* create list of items */
  const listItems = () => {

    return sortedList.map((item, i) => (
      <div 
        key= {i}
        id={i.toString()} 
        className='rounded bg-lime-300 p-1 m-3 text-green flex items-center drop-shadow-lg'
        draggable='true' 
        onDragStart={handleDragStart} 
        onDragOver={handleDragOver} 
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
        >
        <input           
          id={i.toString()}
          type='text'
          className='input-item rounded w-full flex-start text-xl p-2 bg-lime-100 opacity-70'   
          placeholder='Enter text here'
          value={sortedList[i]}
          onChange={handleChange}
        />
        <div id={i.toString()} className='p-1 flex-end text-white text-3xl font-bold' onClick={handleDelete}> x </div>
      </div>
    )
    )
  };

 

  const OptionalSave = () => {
       if (listDirtyFlag) {
          return <button className='rounded-lg p-2  m-2 w-32 bg-lime-400 font-bold text-3xl text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm' onClick={() => saveList()}> Save </button>
       } 
       return <div></div>
  }


  return (
    <div className="w-full h-screen bg-gradient-to-t from-green-100 to-lime-100">

        <NavBar />
        <div className='p-6 flex flex-col sm:flex-row'>
             <div className="grow-0 p-1">
                  <p className="self-center my-auto text-7xl font-semibold  ">{ props.account.username } </p>
              
              <div className="w-full" >
                <button
                  onClick={handleLogout}
                  className="rounded-lg p-2  m-2 w-32 bg-lime-400 font-bold text-xl text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm"
                >
                  Logout
                </button>
               </div>
            </div>

              <div className='w-full m-2 grow'>
                <div className='self-center p-2'>
                  <div className="flex p-2">
                        <button className='rounded-lg p-2  m-2 w-32 bg-lime-500 font-bold text-3xl text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm' onClick={() => newLine()}> Add </button>
                         <OptionalSave/>
                   </div>
                  <div className="m-auto items-center p-2">  
                   { listItems() }
                  </div>
              </div>
            </div>
        </div>
        <Footer />
     </div>
  );




};






export default Profile;