import React, { Component } from 'react';

import Scheduler from 'components/Scheduler';

import Task from '../../components/Tasker'; // Task class

export default class App extends Component {
    state = {
        tasks: [],
    }

    componentDidMount = () => {
        this.setState((prev) => ({ tasks: [new Task('Тестовая задача')]}));
    }

    addTask = (message) => {
        this.setState((prev) => ({
            tasks: [new Task(message), ...prev.tasks],
        }));
    }

    sortTasks = () => {
        this.setState((prev) => ({
            tasks: prev.tasks.sort((a, b) => a.message.charCodeAt() - b.message.charCodeAt()),
        }));
    }

    render () {
        return <Scheduler addTask = { this.addTask } tasks = { this.state.tasks } />;
    }
}
