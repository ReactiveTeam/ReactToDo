import React, { Component } from 'react';

import Styles from './styles.scss';

export default class Catcher extends Component {
    state = {
        isError: false,
    }

    componentDidCatch = (error, stack) => {
        this.setState({ isError: true });
        console.error(error, stack);
    }

    render () {
        if (!this.state.isError) return this.props.children;

        return (
            <li className = { Styles.task }>
                <div>Возникла ошибка</div>
            </li>
        );
    }
}
