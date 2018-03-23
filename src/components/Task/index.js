
import React, { Component } from 'react';
import type from 'prop-types';

import Checkbox from '../../theme/assets/Checkbox';
import Delete from '../../theme/assets/Delete';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';

import Styles from './styles.scss';

export default class Task extends Component {
    static propTypes = {
        completed: type.bool.isRequired,
        stared:    type.bool.isRequired,
        text:      type.string.isRequired,
    }

    state = {
        completed: false,
    }

    /**
     * Handlers
     */

     onClick = (event) => {
         console.log('onClick');
         this.setState((prev) => ({
             completed: !prev.completed,
         }));
     }

     onStar = (event) => {}

     onEdit = (event) => {}

     onRemove = (event) => {}

     /**
      * Methods
      */

      toggle = (mode) => {
          //
      }

      render () {
          const { completed = false, text = '' } = this.props;


          return (
              <li className = { [Styles.task, completed ? Styles.completed : null].join(' ') }>
                  <div>
                      <Checkbox checked = { completed } onClick = { this.onClick } />
                      {/* <input type = 'text' value = { text } /> */}
                      <span>{text}</span>
                  </div>
                  <div>
                      <Star onClick = { this.onStar } />
                      <Edit onClick = { this.onEdit } />
                      <Delete onClick = { this.onRemove } />
                  </div>
              </li>
          );
      }
}
