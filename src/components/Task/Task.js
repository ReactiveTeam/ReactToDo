/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import React from 'react';
import Task from '.';
import ID from '../../utils/Id';

class Tasker {
    constructor (message, checked = false, stared = false) {
        if (typeof message === 'object') {
            this.stared = message.stared;
            this.message = message.message;
            this.checked = message.checked;
            this.id = message.id;

            return;
        }
        this.stared = stared;
        this.message = message;
        this.checked = checked;
        this.id = ID.getId();
    }

    static toJSON (data) {
        if (data instanceof Array) {
            return JSON.stringify(data.map((e) => ({
                message: e.message,
                checked: e.checked,
                stared:  e.stared,
                id:      e.id,
            })));
        }
        if (data instanceof Tasker) {
            return JSON.stringify({
                message: data.message,
                checked: data.checked,
                stared:  data.stared,
                id:      data.id,
            });
        }
        throw new Error('Не могу преобразовать в JSON строку эту странную структуру данных...');
    }

    /** Сортирует задачи по алфавиту
     * @param  {array} array - Массив задач
     * @returns {array} Отсортированный массив задач
     */
    static sort (array) {
        return array.sort(
            (a, b) => (a.message.charCodeAt() - b.message.charCodeAt()) + (a.message.charCodeAt(1) - b.message.charCodeAt(1)) // eslint-disable-line
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
            <Task
                completed = { task.checked }
                editTask = { editTask }
                key = { task.id }
                removeTask = { removeTask }
                stared = { task.stared }
                taskid = { task.id }
                text = { task.message }
                toggleCheck = { toggleCheck }
                toggleStar = { toggleStar }
            />
        );
    }
}

export default Tasker;
