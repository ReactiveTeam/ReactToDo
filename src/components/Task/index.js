
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
     * Reactive handlers
     */

    componentDidMount = () => {
        this.setState({
            //
        });
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

     render () {
         const { completed, stared, text = '', taskid } = this.props;
         const toggleStar = () => this.props.toggleStar(taskid);
         const toggleCheck = () => this.props.toggleCheck(taskid);
         const removeTask = () => this.props.removeTask(taskid);

         return (
             <li className = { [Styles.task, completed ? Styles.completed : null].join(' ') }>
                 <div>
                     <Checkbox checked = { completed } onClick = { toggleCheck } />
                     {/* <input type = 'text' value = { text } /> */}
                     <span>{text}</span>
                 </div>
                 <div>
                     <Star checked = { stared } onClick = { toggleStar } />
                     <Edit onClick = { this.onEdit } />
                     <Delete onClick = { removeTask } />
                 </div>
             </li>
         );
     }
}
