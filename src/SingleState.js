import React from 'react';


const SingleState=(props)=>{
  const {selectedState,deSelected}=props;
  const {name,description,imageUrl}=selectedState;

  return(
      <div id='single-state'>
        
          <img src={imageUrl}/>
          <h3>State:{name}</h3>
          <h3>Location:{description}</h3>
          <button onClick={deSelected}>Go back</button>
          
      </div>
  )
};
export default SingleState;