/**
 * Created by liujinhe on 17/2/22.
 */

import React from 'react';
import {Link} from 'react-router';

class layout extends React.Component {
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

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default layout;