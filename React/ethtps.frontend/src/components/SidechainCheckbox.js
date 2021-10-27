import * as React from 'react';
import { globalApi, providerExclusionList, liveTPSObservable } from '../services/common';

class SidechainCheckbox extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            includeSidechains: true
          };
    }

    async handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({includeSidechains : value});
        if (value){
          await providerExclusionList.includeSidechains();
        }
        else{
          await providerExclusionList.excludeSidechains();
        }
      }

    render(){
        return <>
            <label className={"small"}>
            Include sidechains?
            <input
                    ref={ref=>this.includeSidechainsCheckBox = ref}
                    name="includeSidechains" type="checkbox"
                    checked={this.state.includeSidechains}
                    onChange={this.handleInputChange.bind(this)} />
            </label>
        </>
    }

}
export default SidechainCheckbox;