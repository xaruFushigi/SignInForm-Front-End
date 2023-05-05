import React, {createContext, useEffect, useState} from 'react';
export const myContext = createContext({isSignedIn: false});

const Context = (props) => {
 
    const [userObject, setUserObject] = useState(()=> ({isSignedIn: false}));
    const [hasFetchedData, setHasFetchedData] = useState(false);
    useEffect(()=>{
      if (!hasFetchedData) {
        fetch('http://localhost:3050/', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(data => {
            if (data && !userObject.isSignedIn) {
              console.log(data);
              setUserObject(data);
              window.location.replace('http://localhost:3000/signup')
            }
          })
          .catch(error => console.log(error));
        setHasFetchedData(true);
      }
    }, [hasFetchedData]);

  return (
    <div>
      <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    </div>
  )
};

export default Context;
