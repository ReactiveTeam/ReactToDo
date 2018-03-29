/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Task from '.';
import ID from '../../utils/Id';
import Styles from './styles.scss';

class Tasker {
    constructor (message, checked = false, stared = false) {
        if (typeof message === 'object') {
            this.stared = message.stared || message.favorite;
            this.message = message.message;
            this.checked = message.checked || message.completed;
            this.id = message.id;

            return;
        }
        this.stared = stared;
        this.message = message;
        this.checked = checked;
        this.id = ID.getId();
    }

    /** Переводит задачу в JSON строку
     * @param  {Tasker} data - Задача
     * @returns {string} JSON строка
     */
    static toJSON (data) {
        if (data instanceof Array) {
            return JSON.stringify(
                data.map((e) => ({
                    message: e.message,
                    checked: e.completed || e.checked,
                    stared:  e.stared || e.favorite,
                    id:      e.id,
                }))
            );
        }
        if (data instanceof Tasker) {
            return JSON.stringify({
                message: data.message,
                checked: data.checked,
                stared:  data.stared,
                id:      data.id,
            });
        }
        throw new TypeError('Не могу преобразовать в JSON строку эту странную структуру данных...');
    }

    /** Сортирует задачи по алфавиту
     * @param  {array} array - Массив задач
     * @returns {array} Отсортированный массив задач
     */
    static sort (array) {
        return array.sort(
            (a, b) => (a.message.charCodeAt() - b.message.charCodeAt()) // eslint-disable-line
        );
    }

    /** Возвращает JSX представление задачи
     * @param  {Tasker} task - Задача
     * @param  {function} editTask - Функция
     * @param  {function} removeTask - Функция
     * @param  {function} toggleCheck - Функция
     * @param  {function} toggleStar - Функция
     * @returns {JSX} JSX представление
     */
    static toJSX (task, { editTask, removeTask, toggleCheck, toggleStar }) {
        if (!(task instanceof Tasker)) throw new TypeError('Переданное вами чудо не похоже на задачу!');


        return (
            <CSSTransition
                classNames = {
                    {
                        enter:       Styles.animateInStart,
                        enterActive: Styles.animateInEnd,
                        exit:        Styles.animateOutStart,
                        exitActive:  Styles.animateOutEnd,
                    }
                }
                key = { task.id }
                timeout = { 500 }>
                <Task
                    completed = { task.checked }
                    editTask = { editTask }
                    removeTask = { removeTask }
                    stared = { task.stared }
                    taskid = { task.id }
                    text = { task.message }
                    toggleCheck = { toggleCheck }
                    toggleStar = { toggleStar }
                />
            </CSSTransition>
        );
    }
}

export default Tasker;
