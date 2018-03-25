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
        this.stared = stared;
        this.message = message;
        this.checked = checked;
        this.id = ID.getId();
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
     * @param  {function} removeTask - Функция
     * @param  {function} toggleCheck - Функция
     * @param  {function} toggleStar - Функция
     * @returns {JSX} JSX представление
     */
    static toJSX (task, removeTask, toggleCheck, toggleStar) {
        if (!(task instanceof Tasker)) throw new TypeError('Переданное вами чудо не похоже на задачу!');

        return (
            <Task
                completed = { task.checked }
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
