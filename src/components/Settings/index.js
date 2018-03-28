/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import React, { Component, Fragment } from 'react';
import type from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Styles from './styles.scss';

import Storage from '../../utils/Storage';

export default class Settings extends Component {
    static propTypes = {
        show:       type.bool.isRequired,
        toggleShow: type.func.isRequired,
    }

    state = {
        value:  '',
        active: false, // Состояние фокуса. Для безопасности токена
        error:  false,
    }

    /**
     * Reactive handlers
     */

    componentDidMount = () => {
        this.setState({ value: Storage.get('token') });
    }

    /**
     * Handlers
     */

    onChange = (event) => {
        const { value } = event.target;

        this.setState({ value });
    }

    onClick = () => {
        const { value } = this.state;

        if (!(/[A-Za-z0-9]{12,24}/).test(value)) return this.setState({ error: true });
        this.setState({ error: false });
        Storage.set('token', value);
        Storage.save();
        this.closeWindow();
    }

    onBlur = () => {
        this.setState({ active: false });
    }

    onFocus = () => {
        this.setState({ active: true });
    }

    /**
     * Methods
     */

    closeWindow = () => {
        this.props.toggleShow(false);
    }

    render () {
        if (!this.props.show) return null;
        const { error, value, active } = this.state;

        return (
            <Fragment>
                <div className = { Styles.overlay } />
                <div className = { Styles.settings }>
                    <button className = { Styles.cross } onMouseDown = { this.closeWindow }>x</button>
                    <header>
                        <h2>Настройки</h2>
                        <label>Token:<br />
                            <input
                                className = { error ? Styles.error : null }
                                type = 'text'
                                value = { active ? value : value.replace(/./g, '*') }
                                onBlur = { this.onBlur }
                                onChange = { this.onChange }
                                onFocus = { this.onFocus }
                            />
                        </label>
                        <input type = 'button' value = 'Сохранить' onMouseDown = { this.onClick } />
                    </header>
                </div>
            </Fragment>
        );
    }
}
