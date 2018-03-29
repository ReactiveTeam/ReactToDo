
import React, { Component } from 'react';
import type from 'prop-types';

import Checkbox from '../../theme/assets/Checkbox';
import Delete from '../../theme/assets/Delete';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';

import Catcher from './onerror';
import Styles from './styles.scss';
import Logger from 'prologger';
const logger = new Logger({ from: 'Task', showColors: false });
const { log } = logger;

export default class Task extends Component {
    static propTypes = {
        completed: type.bool.isRequired,
        stared:    type.bool.isRequired,
        taskid:    type.string.isRequired,
        text:      type.string.isRequired,
    }

    state = {
        completed: false,
        editMode:  false,
        editValue: '',
    }

    toggleEditMode = () => {
        const { editMode } = this.state;

        if (editMode) {
            this.setState({ editMode: false });

            if (!this.state.editValue.trim()) return this.props.removeTask(this.props.taskid);

            return this.props.editTask(this.props.taskid, this.state.editValue);
        }

        this.setState({ editMode: true, editValue: this.props.text });
    }

    onChange = (event) => {
        log(`onChange {${event.target.value.length}}`, { level: 'change' });
        if (event.target.value.length < 47) {
            this.setState({ editValue: event.target.value });
        }
    }

    onKeyDown = (event) => {
        if (event.keyCode === 13) return this.toggleEditMode(); // Enter
        if (event.keyCode === 27) return this.setState({ editMode: false }); // Esc
    }

    render () {
        const { completed, stared, text = '', taskid } = this.props;
        const toggleStar = () => this.props.toggleStar(taskid);
        const toggleCheck = () => this.props.toggleCheck(taskid);
        const removeTask = () => this.props.removeTask(taskid);

        const task = this.state.editMode
            ? <input autoFocus type = 'text' value = { this.state.editValue } onChange = { this.onChange } onKeyDown = { this.onKeyDown } />
            : <span>{text}</span>;

        return (

            <Catcher>
                <li className = { [Styles.task, completed ? Styles.completed : null].join(' ') }>
                    <div>
                        {/* FIXME: Hardcoded from palette.scss */}
                        <Checkbox checked = { completed } color1 = '#3B8EF3' color2 = '#FFF' onClick = { toggleCheck } />
                        {task}
                    </div>
                    <div>
                        <Star checked = { stared } color1 = '#3B8EF3' onClick = { toggleStar } />
                        <Edit checked = { this.state.editMode } color1 = '#3B8EF3' onClick = { completed ? null : this.toggleEditMode } />
                        <Delete color1 = '#3B8EF3' onClick = { removeTask } />
                    </div>
                </li>
            </Catcher>
        );
    }
}
