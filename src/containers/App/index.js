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

import SettingsStyles from '../../components/Settings/styles.scss';

const logger = new Logger({ from:   'App',
    levels: [
        'ok'
    ]});
const { log, error } = logger;

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
        const tasks = Storage.get('tasks');

        this.setState({ tasks: tasks.map((el) => new TaskClass(el)) });

        if (Storage.get('api_enabled')) {
            const sertasks = await Server.load();

            if (!sertasks.data) return error('Видимо, произошла ошибка при получении задач с сервера...');

            this.setState({ tasks: sertasks.data.map((el) => new TaskClass(el)) }); //TODO
        }
    }

    //TODO:
    saveTasks = () => {
        Storage.set('tasks', this.state.tasks);
        Storage.save();
        log('Список задач успешно сохранен', { from: 'App->saveTasks', level: 'save' });
    }

    /** Переключатель видимости окошка настроек
     * @param  {bool} mode - (true - открыто);(false - скрыто)
     */
    toggleSettings = (mode) => {
        this.setState({ settings: Boolean(mode) });
    }

    /**
     * Task controllers
     */

    /** Переключатель звезданутых задач
     * @param  {number} id - ID задачи в массиве. Передается по props
     * @param  {number} [toggle=0] - Сознательное переключение (-1 - false; 0 - toggle; 1 - true)
     */
    toggleStar = async (id, toggle = 0) => {
        const { tasks } = this.state;
        const index = tasks.map((e) => e.id).indexOf(id);
        const ti = tasks[index];

        if (index < 0) throw new Error('Вы пометили несуществующее задание =D');

        switch (toggle) {
            case -1:
                ti.stared = false; break;
            case 0:
                ti.stared = !ti.stared; break;
            case 1:
                ti.stared = true; break;
            default:
                throw new Error('[App->toggleStar] Неизвестное значение toggle! Возможно, это баг...');
        }

        if (Storage.get('api_enabled')) {
            await Server.edit(id, ti.message, ti.checked, ti.stared);
        }

        log(`Переключил выжность задачи ${id} в положение ${ti.stared} по по команде ${toggle}`, { from: 'App->toggleStar' });
        this.setState({ tasks }, this.saveTasks);
    }

    /** Переключатель выполненных задач
     * @param  {number} id - ID задачи в массиве. Передается по props
     * @param  {number} [toggle=0] - Сознательное переключение (-1 - false; 0 - toggle; 1 - true)
     */
    toggleCheck = async (id, toggle = 0) => {
        const { tasks } = this.state;
        const index = tasks.map((e) => e.id).indexOf(id);
        const ti = tasks[index];

        if (index < 0) throw new Error('Вы выполнили несуществующее задание =D');

        if (toggle === -1)
            ti.checked = false;
        else if (toggle === 0)
            ti.checked = !ti.checked;
        else if (toggle === 1)
            ti.checked = true;
        else
            throw new Error('[App->toggleStar] Неизвестное значение toggle! Возможно, это баг...');

        if (Storage.get('api_enabled')) {
            await Server.edit(id, ti.message, ti.checked, ti.stared);
        }

        log(`Переключил задачу ${id} в положение ${ti.checked} по по команде ${toggle}`, { from: 'App->toggleCheck', level: 'ok' });
        this.setState({ tasks }, this.saveTasks);
    }

    /** Переключает все задачи в положение "выполенено"
     * DANGER - очень опасная возможность, так как может быть использована случайно, при наличии большого списка задач
     */
    checkAll = async () => {
        if (!confirm('Вы действительно хотите пометить ВСЕ задания как выполненные?')) return; // FIXME:

        const { tasks } = this.state;

        for (const task of tasks) {
            task.checked = true;
        }

        if (Storage.get('api_enabled')) {
            // TODO: Надо бы провести рефакторинг и обозвать все переменные как их называют на сервере
            const sertasks = tasks.map((el) => ({ id: el.id, message: el.message, completed: el.checked, favorite: el.stared }));

            await Server.edit(sertasks);
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

    editTask = async (id, message) => {
        const { tasks } = this.state;
        const index = tasks.map((e) => e.id).indexOf(id);
        const ti = tasks[index];

        ti.message = message;

        if (Storage.get('api_enabled')) { //TODO: Вынести
            await Server.edit(id, ti.message, ti.checked, ti.stared);
        }

        log(`Задача ${id} изменена на ${ti.message}`, { from: 'App->editTask' });
        this.setState({ tasks }, this.saveTasks);
    }

    removeTask = async (id) => {
        if (Storage.get('api_enabled')) await Server.remove(id);

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
                {/* <TransitionGroup> роняет приложение */}
                <TransitionGroup>
                {this.state.settings ? (
                    <CSSTransition
                        classNames = { {
                            enter:       SettingsStyles.animateInStart,
                            enterActive: SettingsStyles.animateInEnd,
                            exit:        SettingsStyles.animateOutStart,
                            exitActive:  SettingsStyles.animateOutEnd,
                        } }
                        key = { Date.now().toString() }
                        timeout = { 500 }>
                        <Settings show = { this.state.settings } toggleShow = { this.toggleSettings } />
                    </CSSTransition>
                ) : null}
                </TransitionGroup>
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
