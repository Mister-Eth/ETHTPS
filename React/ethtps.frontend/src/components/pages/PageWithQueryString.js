import React from "react";
import * as qs from 'query-string';
import { useHistory } from "react-router";

export default class PageWithQueryString extends React.Component {
    constructor(props){
        super(props);
        let name = qs.parse(window.location.search).name;
        if (name === undefined){
            name = window.location.href.substring(window.location.href.lastIndexOf("/") + 1, window.location.href.length);
        }
        name = name.replace('%20', ' ');
        this.state = {
            name: name
        };
    }
}