import React from "react";
import * as qs from 'query-string';

export default class PageWithQueryString extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: qs.parse(window.location.search).name
        };
    }
}