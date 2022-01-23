import './App.css';
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
   
  return (
    <>
    <div className={"container"}>
      {main}
    </div>
    <hr/>
    <div className='bottomnavbar'>
      <a href="/Status">
        Status
      </a>
      <div className={'inline'} style={{marginRight: '10px'}}/>
      <a href="https://api.ethtps.info/API/v2/AllData">
        Download data
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
        <a style={{marginLeft:'5px'}} href="https://app.ens.domains/name/ethtps.eth/details">
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
