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
            isClicked:false,
            

        },
        this.selectState=this.selectState.bind(this);
        this.deSelected=this.deSelected.bind(this)
        
    }
    async componentDidMount(){
        window.addEventListener('hashchange',async()=>{
            const stateId=window.location.hash.slice(1);
           
            const res=await axios.get(`/api/states/${stateId}`);
            const selectedState=res.data;
            this.setState({selectedState})
        })
        const stateId=window.location.hash.slice(1);
        const respon=await axios.get(`/api/states/${stateId}`);
        const selectedState=respon.data;
        this.setState({selectedState})
        try{
            const response=await axios.get('/api/states');
            const states=response.data;
            this.setState({states})
        }catch(err){
            console.log('You ve  got some issues with connection of states')
        }
    }
//     async returning(){
//     try{
//         const response=await axios.get('/api/states');
//         const states=response.data;
//         this.setState({states})
//     }catch(err){
//         console.log('You ve  got some issues with connection of states')
//     }
// }
    // handleClick=()=>{
    //     this.setState.bind({isClicked:true})
    // }


    async  selectState(stateId){
        
        try{
            const res=await axios.get(`/api/states/${stateId}`);
            const selectedState=res.data;
            this.setState({selectedState})
        }catch(err){
            console.log('Problem with selection of state')
        }

    }
    deSelected(){
        this.setState({
            selectedState:{},
        })
    }
    render(){
        let style={
            backgroundColor:'lightgrey'
        }
        
        const{states,selectedState,isClicked}=this.state;
        const{selectState,deSelected}=this;
    return(
        
    <div style={style} >
        <h1>Amazing places of The United States</h1>
        {selectedState.id ?(
            <SingleState selectedState={selectedState}  deSelected={deSelected}/>
          ) : 
        <ul>
                   
                  {states.map(state =>
                      (
                          <li key={state.id} onClick={()=>selectState(state.id)}>
                              <a href={`#${state.id}`}>
                              <h3>{state.name}</h3>
                              </a>
                              
                              
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
