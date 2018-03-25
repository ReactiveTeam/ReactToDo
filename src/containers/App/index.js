import React, { Component, Fragment } from 'react';

import Scheduler from 'components/Scheduler';
import Settings from 'components/Settings';

import TaskClass from '../../components/Task/Task';
import Storage from '../../utils/Storage';

import Logger from 'prologger';
const logger = new Logger({ from: 'App' });
const { log } = logger;

// TODO
import TODO from './todo';
// TODO

/* eslint-disable max-statements-per-line */
// По причине того, что break писать на отдельной строке не выгодно, так как при его отсутствии кейсы пишутся один за другим

export default class App extends Component {
    state = {
        tasks:    [],
        settings: false,
    }

    componentDidMount = () => {
        // Storage._load();
        // this.setState({ tasks: [new TaskClass('Тестовая задача')]});
        //TODO: Вынести логику в класс Storage
        const tasks = JSON.parse(localStorage.getItem('tasks'));

        this.setState({ tasks: tasks.map((el) => new TaskClass(el)) }); //TODO
    }

    //TODO:
    saveTasks = () => {
        localStorage.setItem('tasks', TaskClass.toJSON(this.state.tasks));
    }

    /** Переключатель видимости окошка настроек
     * @param  {bool} mode - (true - открыто);(false - скрыто)
     */
    toggleSettings = (mode) => {
        this.setState({ settings: Boolean(mode) });
    }

    /** Переключатель звезданутых задач
     * @param  {number} id - ID задачи в массиве. Передается по props
     * @param  {number} [toggle=0] - Сознательное переключение (-1 - false; 0 - toggle; 1 - true)
     */
    toggleStar = (id, toggle = 0) => {
        const { tasks } = this.state;
        const index = tasks.map((e) => e.id).indexOf(id);

        if (index < 0) throw new Error('Вы пометили несуществующее задание =D');

        switch (toggle) {
            case -1:
                tasks[index].stared = false; break;
            case 0:
                tasks[index].stared = !tasks[index].stared; break;
            case 1:
                tasks[index].stared = true; break;
            default:
                throw new Error('[App->toggleStar] Неизвестное значение toggle! Возможно, это баг...');
        }

        log(`Переключил выжность задачи ${id} в положение ${tasks[index].stared} по по команде ${toggle}`, { from: 'App->toggleStar' });
        this.setState({ tasks });
        this.saveTasks();
    }

    /** Переключатель выполненных задач
     * @param  {number} id - ID задачи в массиве. Передается по props
     * @param  {number} [toggle=0] - Сознательное переключение (-1 - false; 0 - toggle; 1 - true)
     */
    toggleCheck = (id, toggle = 0) => {
        const { tasks } = this.state;
        const index = tasks.map((e) => e.id).indexOf(id);

        if (index < 0) throw new Error('Вы выполнили несуществующее задание =D');

        if (toggle === -1)
            tasks[index].checked = false;
        else if (toggle === 0)
            tasks[index].checked = !tasks[index].checked;
        else if (toggle === 1)
            tasks[index].checked = true;
        else
            throw new Error('[App->toggleStar] Неизвестное значение toggle! Возможно, это баг...');

        log(`Переключил задачу ${id} в положение ${tasks[index].checked} по по команде ${toggle}`, { from: 'App->toggleCheck' });
        this.setState({ tasks });
        this.saveTasks();
    }

    addTask = (message) => {
        this.setState((prev) => ({
            tasks: [new TaskClass(message), ...prev.tasks], // Добавляет задачу в начало списка
        }));
        this.saveTasks();
    }

    removeTask = (id) => {
        this.setState((prev) => ({
            tasks: prev.tasks.filter((el) => el.id !== id), // Пропускает всё, кроме ID удаляемой задачи
        }));
        this.saveTasks();
    }

    /** Сортирует текущие задания на 3 списка
     * 1. Важные задания
     * 2. Обычные задания
     * 3. Выполненные задания
     * @returns {array} Двумерный массив: [выжные, обычные, выполненные]
     */
    sortTasks = () => {
        const { tasks } = this.state;


        const a = [
            /* TaskClass.sort */tasks.filter((el) => el.stared && !el.checked), // Важные задания
            /* TaskClass.sort */tasks.filter((el) => !el.stared && !el.checked), // Обычные задания
            /* TaskClass.sort */tasks.filter((el) => el.checked) // Выполненные задания
        ];


        return a;
    }

    render () {
        return (
            <Fragment>
                <Settings show = { this.state.settings } toggleShow = { this.toggleSettings } />
                <Scheduler
                    addTask = { this.addTask }
                    removeTask = { this.removeTask }
                    tasks = { this.sortTasks() }
                    toggleCheck = { this.toggleCheck }
                    toggleSettings = { this.toggleSettings }
                    toggleStar = { this.toggleStar }
                />
            </Fragment>
        );
    }
}
