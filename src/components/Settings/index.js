/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import React, { Component, Fragment } from 'react';
import type from 'prop-types';

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
 }

 onChange = (event) => {
     this.setState({ value: event.target.value });
 }

 onClick = () => {
     Storage.token = this.state.value;
     Storage._save();
 }

 closeWindow = () => {
     this.props.toggleShow(false);
 }

 render () {
     if (!this.props.show) return null;

     return (
         <Fragment>
             <div className = { Styles.overlay } />
             <div className = { Styles.settings }>
                 <button className = { Styles.cross } onClick = { this.closeWindow }>x</button>
                 <header>
                     <h2>Настройки</h2>
                     <label>Token:<br />
                         <input type = 'text' onChange = { this.onChange } />
                     </label>
                     <input type = 'button' value = 'Сохранить' onClick = { this.onClick } />
                 </header>
             </div>
         </Fragment>
     );
 }
}
