import * as React from 'react';

export default class SortableTable extends React.Component{
    constructor(props){
        super(props);
    }

    dynamicSort(property) {
        var sortOrder = (this.state.sort.asc?1:-1);
        if (this.state.mode !== 'tps' && this.state.sort.columnName === 'theoreticalMaxTPS'){
          this.state.sort.columnName = "max";
        }
        else if (this.state.mode === 'tps' && this.state.sort.isMaxTheoreticalSelected){
          this.state.sort.columnName = "theoreticalMaxTPS";
        }
        switch(property){
          case 'max':
            return function (a,b) {
              //this.state.allMaxData[this.state.mode][row.name].value
              let x = 0;
              if (this.state.allMaxData[this.state.mode][a.name] !== undefined){
                x = this.state.allMaxData[this.state.mode][a.name].value;
              }
              let y = 0;
              if (this.state.allMaxData[this.state.mode][b.name] !== undefined){
                y = this.state.allMaxData[this.state.mode][b.name].value;
              }
              var result = (x < y) ? -1 : (x > y) ? 1 : 0;
              return result * sortOrder;
          }
          case 'value':
            return function (a,b) {
              let x = 0;
              if (this.state.data[a.name] !== undefined && this.state.data[a.name][0] !== null){
                x = this.state.data[a.name][0].value;
              }
              let y = 0;
              if (this.state.data[b.name] !== undefined && this.state.data[b.name][0] !== null){
                y = this.state.data[b.name][0].value;
              }
              var result = (x < y) ? -1 : (x > y) ? 1 : 0;
              return result * sortOrder;
          }
          case 'no':
            return function (a,b) {
              var result = (parseInt(a[property]) < parseInt(b[property])) ? -1 : (parseInt(a[property]) > parseInt(b[property])) ? 1 : 0;
              return result * sortOrder;
          }
          case 'name':
            return function (a,b) {
              var result = (a[property].toUpperCase() < b[property].toUpperCase()) ? -1 : (a[property].toUpperCase() > b[property].toUpperCase()) ? 1 : 0;
              return result * sortOrder;
          }
          case 'status':
            return function (a,b) {
              if (this.state.statuses[a.name] === undefined || this.state.statuses[b.name] === undefined){
                return 1;
              }
              var result = (this.state.statuses[a.name].status < this.state.statuses[b.name].status) ? -1 : (this.state.statuses[a.name].status > this.state.statuses[b.name].status) ? 1 : 0;
              return result * sortOrder;
          }
          default:
            return function (a,b) {
              var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
              return result * sortOrder;
          }
        }
    }
  
      sortTableBy(columnName, noSwitch = false){
        let state = this.state;
        state.sort.isMaxTheoreticalSelected = columnName === 'theoreticalMaxTPS';
        if (columnName !== state.sort.columnName){
          state.sort.columnName = columnName;
        }
        else if (!noSwitch){
          state.sort.asc = !state.sort.asc;
        }
        this.setState(state);
      }
}