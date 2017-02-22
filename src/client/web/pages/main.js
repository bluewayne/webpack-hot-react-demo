/**
 * Created by liujinhe on 17/2/22.
 */

import React from 'react';
import {Link} from 'react-router';

class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onChange(state) {

    }

    render() {

        let back_image = require('../assets/background-cover.jpg');

        return (
            <div style={style.container}>
                <div>bruce</div>

                <img src={back_image}/>
            </div >
        )
            ;
    }
}

const style = {

    container: {
        textAlign: 'center'
    }

}

export default main;