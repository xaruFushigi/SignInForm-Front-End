import React, {createContext, useEffect, useState} from 'react';
export const myContext = createContext({});

export default function Context(props) {
    const [userObject, setUserObject] = useState(null);
    useEffect(()=>{
        fetch('http://localhost:3050/protected',
            {
                method: 'GET',
                credentials : 'include',
                headers : {'Content-Type': 'application/json'}
            }
        )
            .then(response => { return response.json() })
            .then(data => {
                //if data exists
                if(data) {
                    setUserObject(data)
                    console.log(data)
                }//end of if
            })
            .catch(error =>{return console.log(error)})
    },[]);

  return (
    <div>
      <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    </div>
  )
}
