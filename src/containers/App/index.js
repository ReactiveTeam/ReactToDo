import React, { Component } from 'react';
import type from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // TODO:

import Scheduler from 'components/Scheduler';
import Settings from 'components/Settings';

import TaskClass from '../../components/Task/Task';
import Storage from '../../utils/Storage';
import Server from '../../utils/Server';

import Catcher from './onerror';
import Logger from 'prologger';
import config from '../../config';

import SettingsStyles from '../../components/Settings/styles.scss';

const logger = new Logger({ from:   'App',
    levels: [
        'ok'
    ]});
const { log, error } = logger;

// TODO
// import TODO from './todo';
// TODO

/* eslint-disable max-statements-per-line */
// По причине того, что break писать на отдельной строке не выгодно, так как при его отсутствии кейсы пишутся один за другим

Storage.load();
const options = {
    token: Storage.get('token') || '', // Я бы не клал token в context... Но так написано в ТЗ
    //TODO: Сделать уведомление об отсутствии токена
};

export default class App extends Component {
    static childContextTypes = {
        token: type.string.isRequired,
    }

    state = {
        tasks:    [],
        settings: false,
    }

    getChildContext () {
        return options;
    }

    componentDidMount = async () => {
        // this.setState({ tasks: [new TaskClass('Тестовая задача')]});
        //TODO: Вынести логику в класс Storage
        const tasks = JSON.parse(localStorage.getItem('tasks'));

        this.setState({ tasks: tasks.map((el) => new TaskClass(el)) }); //TODO

        if (Storage.get('api_enabled')) {
            const sertasks = await Server.load();

            if (!sertasks.data) return error('Видимо, произошла ошибка при получении задач с сервера...');

            this.setState({ tasks: sertasks.data.map((el) => new TaskClass(el)) }); //TODO
        }
    }

    //TODO:
    saveTasks = () => {
        localStorage.setItem('tasks', TaskClass.toJSON(this.state.tasks));
        log('Список задач успешно сохранен', { from: 'App->saveTasks', level: 'save' });
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
        this.setState({ tasks }, this.saveTasks);
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

        log(`Переключил задачу ${id} в положение ${tasks[index].checked} по по команде ${toggle}`, { from: 'App->toggleCheck', level: 'ok' });
        this.setState({ tasks }, this.saveTasks);
    }

    /** Переключает все задачи в положение "выполенено"
     * DANGER - очень опасная возможность, так как может быть использована случайно, при наличии большого списка задач
     */
    checkAll = () => {
        if (!confirm('Вы действительно хотите пометить ВСЕ задания как выполненные?')) return; // FIXME:

        const { tasks } = this.state;

        for (const task of tasks) {
            task.checked = true;
        }

        log(`Все задачи выполены`, { from: 'App->checkAll', level: 'ok' });
        this.setState({ tasks }, this.saveTasks);
    }

    addTask = async (message) => {
        if (!Storage.get('api_enabled')) { // В случае Апокалипсиса приложение тоже должно работать!
            return this.setState((prev) => ({
                tasks: [new TaskClass(message), ...prev.tasks], // Добавляет задачу в начало списка
            }), this.saveTasks);
        }

        const response = await Server.add(message);

        if (!response.data) return error('Видимо, произошла ошибка при отправке задачи на сервер...', { from: 'Scheduler->addTask', level: 'error' });

        this.setState((prev) => ({
            tasks: [
                new TaskClass({
                    message: response.data.message,
                    id:      response.data.id,
                    checked: response.data.completed,
                    stared:  response.data.favorite,
                }),
                ...prev.tasks
            ], // Добавляет задачу в начало списка
        }), this.saveTasks);
    }

    editTask = (id, message) => {
        const { tasks } = this.state;
        const index = tasks.map((e) => e.id).indexOf(id);

        tasks[index].message = message;
        log(`Задача ${id} изменена на ${tasks[index].message}`, { from: 'App->editTask' });
        this.setState({ tasks }, this.saveTasks);
    }

    removeTask = async (id) => {
        if (Storage.get('api_enabled')) await Server.remove(id);

        console.log(123);

        this.setState({
            tasks: this.state.tasks.filter((el) => el.id !== id), // Пропускает всё, кроме ID удаляемой задачи
        }, this.saveTasks);
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
            <Catcher>
                <CSSTransition
                    classNames = { {
                        enter:       SettingsStyles.animateInStart,
                        enterActive: SettingsStyles.animateInEnd,
                    } }
                    timeout = { { enter: 5000 } }>
                    <Settings show = { this.state.settings } toggleShow = { this.toggleSettings } />
                </CSSTransition>
                <Scheduler
                    addTask = { this.addTask }
                    checkAll = { this.checkAll }
                    editTask = { this.editTask }
                    removeTask = { this.removeTask }
                    tasks = { this.sortTasks() }
                    toggleCheck = { this.toggleCheck }
                    toggleSettings = { this.toggleSettings }
                    toggleStar = { this.toggleStar }
                />
            </Catcher>
        );
    }
}
