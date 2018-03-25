
import React, { Component } from 'react';
import type from 'prop-types';

import Styles from './styles.scss';
import TaskClass from '../Task/Task';

import Logger from 'prologger';
const logger = new Logger({
    levels: [ // Уровни вывода лога. TODO: Не забудьте убрать после отладки!
        'submit',
        'change',
        'click'
    ],
    from: 'Scheduler',
});
const { log } = logger;

export default class Sheduler extends Component {
    static propTypes = {
        addTask:        type.func.isRequired,
        tasks:          type.array.isRequired, // Can't use arrayOf
        toggleSettings: type.func.isRequired,
    }

    state = {
        value: '',
    }

    /**
     * Methods
     */

     openSettings = () => {
         this.props.toggleSettings(true);
     }

    /**
     * Handlers
     */

     onSubmit = (event) => {
         event.preventDefault();
         log('onSubmit', { level: 'submit' });
         if (!this.state.value.trim()) {
             log('Не пропускаем пустую строку', { level: 'submit' });

             return false;
         }

         this.props.addTask(this.state.value);
         this.setState({ value: '' });

         return false;
     }

     onInputChange = (event) => {
         log(`onInputChange {${event.target.value.length}}`, { level: 'change' });
         if (event.target.value.length < 47) {
             this.setState({ value: event.target.value });
         }
     }

     render () {
         const { tasks, toggleCheck, toggleStar, removeTask } = this.props;

         let tasklist = [];

         tasklist = tasklist.concat( // Объединяем массивы задач в один с нужным нам порядком
             tasks[0].map((e) => TaskClass.toJSX(e, removeTask, toggleCheck, toggleStar)), // Важные задачи
             tasks[1].map((e) => TaskClass.toJSX(e, removeTask, toggleCheck, toggleStar)), // Обычные задачи
             tasks[2].map((e) => TaskClass.toJSX(e, removeTask, toggleCheck, toggleStar)), // Выполненные задачи
         );


         return (
             <div className = { Styles.scheduler }>
                 <main>
                     <header>
                         <h1>Планировщик задач</h1>
                         <button onMouseDown = { this.openSettings } />
                         <input placeholder = 'Поиск' type = 'text' />
                     </header>
                     <section>
                         <form onSubmit = { this.onSubmit }>
                             <input
                                 autoFocus
                                 className = { this.state.value.length === 46 ? Styles.overflow : null }
                                 placeholder = 'Описание моей новой задачи'
                                 type = 'text'
                                 value = { this.state.value }
                                 onChange = { this.onInputChange }
                             />
                             <input type = 'submit' value = 'Добавить задачу' />
                         </form>
                         <ul>
                             {tasklist}
                         </ul>
                     </section>
                     <footer>
                         {/* <span>Все задачи выполнены</span> */}
                         <code />
                     </footer>
                 </main>
             </div>
         );
     }
}
