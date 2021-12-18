import './App.css';
import './snowflakes.css';
import React, { ReactDOM, useState, useEffect } from "react";
import Main from './Main';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      mode: "tps"
    }
  }

 render(){
  let main = "Loading..."; 
  try{
      main = <Main/>;
   }
   catch {
     setTimeout(() => {
        window.location.reload(false);
     }, 2000);
   }
   
  let numberOfSnowflakes = parseInt(new Date().getDate() / 5);
  return (
    <>
    
    <div class="snowflakes" aria-hidden="true">
      {[...Array(numberOfSnowflakes).keys()].map(x =>  
      <div class="snowflake">
        ❅
      </div>
      )}
    </div>
    
    <div className={"container"}>
      {main}
    </div>
    <hr/>
    <div className='bottomnavbar'>
      <a href="/Status">
        Status
      </a>
    </div>
    <hr/>
    <footer>
      <div className={'inline'}>
      Brought to you by 
      <div style={{marginLeft:'5px'}} className={'trick'}>
        <span>
          Mister_Eth
        </span>
      </div>
      <br></br>
        Donate: 
        <a style={{marginLeft:'5px'}} href="https://ethtps.eth">
          ethtps.eth
        </a>
        <p className={'ul-hover inline'} style={{marginLeft:'5px'}}>
          (0x466Ef24d68ac9b61670eeE7fC2E001B951aBf482)
        </p>
      </div>
    </footer>
    </>
  );
}
}
export default App;
