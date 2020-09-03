import React from "react"
import ReactDOM from "react-dom"

import SingleState from './SingleState';
const axios=require('axios');
class App extends React.Component{
    constructor(){
        super()
        this.state={
            states:[],
            selectedState:{},
            stateId:'',

        },
        this.selectState=this.selectState.bind(this);
    }
    async componentDidMount(){
        try{
            const response=await axios.get('/api/states');
            const states=response.data;
            this.setState({states})
        }catch(err){
            console.log('You ve  got some issues with connection of states')
        }
    }

    async  selectState(stateId){
        
        try{
            const res=await axios.get(`/api/states/${stateId}`);
            const selectedState=res.data;
            this.setState({selectedState})
        }catch(err){
            console.log('Problem with selection of state')
        }

    }
    render(){
        
        const{states,selectedState}=this.state;
        const{selectState}=this;
    return(
        
    <div>
        <h1>Amazing places of The Uniteed States</h1>
        {selectedState.id ?(
            <SingleState selectedState={selectedState} />
          ) : 
        <ul >
                   
                  {states.map(state =>
                      (
                          <li key={state.id} onClick={()=>selectState(state.id)}>
                              
                              <h3>{state.name}</h3>
                              
                              
                          </li>
                      )
                  )}
               </ul>}
    </div>
    )
    }
}

ReactDOM.render(<App />, document.getElementById("root"))
//make sure "root" is right or change it
