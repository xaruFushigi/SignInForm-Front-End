import React, {createContext, useEffect, useState} from 'react';

export const logOutContext = createContext({});

export default function Context(props) {

    const [logOutObject, setLogOutObject] = useState(null);

//////////////////////////////////////////////////////////////////
    // useEffect(()=> {
    //     fetch('http://localhost:3050/logout',
    //         {
    //             method: 'GET',
    //             credentials : 'include',
    //             headers: {'Content-Type' : 'application/json'}
    //         }
    //     ).then(response => { return response.json() })
    //      .then(data => {
    //         //if data exists
    //         if(data) {
    //             setLogOutObject(data)
    //             console.log(data)
    //         }//end of if
    //      })
    //      .catch(error => {return console.log(error)})
    // }, []);

  return (
    <div>
      <logOutContext.Provider value={logOutObject}>{props.children}</logOutContext.Provider>
    </div>
  )
}

