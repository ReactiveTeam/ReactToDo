import React, { Component } from 'react';

import Scheduler from 'components/Scheduler';

import Task from '../../components/Tasker'; // Task class

import Logger from 'prologger';
const logger = new Logger({ from: 'App' });
const { log } = logger;

export default class App extends Component {
    state = {
        tasks: [],
    }

    componentDidMount = () => {
        this.setState({ tasks: [new Task('Тестовая задача')]});
    }

    /** Переключатель звезданутых задач
     * @param  {number} id - ID задачи в массиве. Передается по props
     * @param  {number} [toggle=0] - Сознательное переключение (-1 - false; 0 - toggle; 1 - true)
     */
    toggleStar = (id, toggle = 0) => {
        const { tasks } = this.state;

        if (toggle === -1)
            tasks[id].stared = false;
        else if (toggle === 0)
            tasks[id].stared = !tasks[id].stared;
        else if (toggle === 1)
            tasks[id].stared = true;
        else
            throw new Error('[App->toggleStar] Неизвестное значение toggle! Возможно, это баг...');

        log(`Переключил выжность задачи ${id} в положение ${tasks[id].stared} по по команде ${toggle}`, { from: 'App->toggleStar' });
        this.setState({ tasks });
    }

    /** Переключатель выполненных задач
     * @param  {number} id - ID задачи в массиве. Передается по props
     * @param  {number} [toggle=0] - Сознательное переключение (-1 - false; 0 - toggle; 1 - true)
     */
    toggleCheck = (id, toggle = 0) => {
        const { tasks } = this.state;

        if (toggle === -1)
            tasks[id].checked = false;
        else if (toggle === 0)
            tasks[id].checked = !tasks[id].checked;
        else if (toggle === 1)
            tasks[id].checked = true;
        else
            throw new Error('[App->toggleStar] Неизвестное значение toggle! Возможно, это баг...');

        log(`Переключил задачу ${id} в положение ${tasks[id].checked} по по команде ${toggle}`, { from: 'App->toggleCheck' });
        this.setState({ tasks });
    }

    addTask = (message) => {
        this.setState((prev) => ({
            tasks: [new Task(message), ...prev.tasks],
        }));
    }

    removeTask = (id) => {
        this.setState((prev) => ({
            tasks: prev.tasks.filter((el) => el.id !== id), // Пропускает всё, кроме ID
        }));
    }

    sortTasks = () => {
        this.setState((prev) => ({
            tasks: prev.tasks.sort((a, b) => a.message.charCodeAt() - b.message.charCodeAt()),
        }));
    }

    render () {
        return (
            <Scheduler
                addTask = { this.addTask }
                removeTask = { this.removeTask }
                tasks = { this.state.tasks }
                toggleCheck = { this.toggleCheck }
                toggleStar = { this.toggleStar }
            />
        );
    }
}
