
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

    render () {
        const { completed, stared, text = '', taskid } = this.props;
        const toggleStar = () => this.props.toggleStar(taskid);
        const toggleCheck = () => this.props.toggleCheck(taskid);
        const removeTask = () => this.props.removeTask(taskid);

        return (
            <li className = { [Styles.task, completed ? Styles.completed : null].join(' ') }>
                <div>
                    {/* FIXME: Hardcoded from palette.scss */}
                    <Checkbox checked = { completed } color1 = '#3B8EF3' color2 = '#FFF' onClick = { toggleCheck } />
                    {/* <input type = 'text' value = { text } /> */}
                    <span>{text}</span>
                </div>
                <div>
                    <Star checked = { stared } color1 = '#3B8EF3' onClick = { toggleStar } />
                    <Edit color1 = '#3B8EF3' onClick = { this.onEdit } />
                    <Delete color1 = '#3B8EF3' onClick = { removeTask } />
                </div>
            </li>
        );
    }
}
