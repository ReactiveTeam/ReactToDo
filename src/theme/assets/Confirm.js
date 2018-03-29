import React, { Component } from 'react';
import type from 'prop-types';

import Styles from './ConfirmStyles.scss';

export default class Confirm {
    static propTypes = {
        message: type.string.isRequired,
        no:      type.func.isRequired,
        yes:     type.func.isRequired,
    };

    state = {
        status:  false,
        message: '',
        yes () { },
        no () { },
    }

    open = (message, yes = () => {}, no = () => {}) => {
        this.setState({ status: true, message, yes, no });
    }

    onYes = () => {
        this.close();
        this.state.yes();
    }

    onNo = () => {
        this.close();
        this.state.no();
    }

    close = () => {
        this.setState({ status: false });
    }

    render () {
        if (!this.state.status) return null;

        return (<div>
            <div className = { Styles.overlay } />
            <div className = { Styles.confirm }>
                <h1 />
                <span>Message</span>
                <form>
                    <button onClick = { this.close }>Нет</button>
                    <button>Да</button>
                </form>
            </div>
        </div>);
    }
}
