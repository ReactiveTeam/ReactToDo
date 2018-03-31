
import React, { Component } from 'react';
import type from 'prop-types';
import FlipMove from 'react-flip-move';

import Catcher from './onerror';
import Styles from './styles.scss';
import TaskClass from '../Task/Task';


import Logger from 'prologger';
import Checkbox from '../../theme/assets/Checkbox';
const logger = new Logger({
    levels: [ // Уровни вывода лога. TODO: Не забудьте убрать после отладки!
        // 'submit',
        // 'change',
        // 'click'
        'release'
    ],
    from: 'Scheduler',
});
const { log } = logger;

export default class Sheduler extends Component {
    static propTypes = {
        addTask:        type.func.isRequired,
        checkAll:       type.func.isRequired,
        tasks:          type.array.isRequired, // Can't use arrayOf
        toggleSettings: type.func.isRequired,
    }

    state = {
        value:  '',
        search: '',

        allChecked: false,
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

     onSearchChange = (event) => {
         log(`onSearchChange {${event.target.value}}`, { level: 'change' });
         if (event.target.value.length < 47) {
             this.setState({ search: event.target.value });
         }
     }

     onCheckAll = () => {
         this.setState({ allChecked: true }, () => setTimeout(() => this.setState({ allChecked: false }), 1000));
         this.props.checkAll();
     }

     render () {
         const { tasks, toggleCheck, toggleStar, removeTask, editTask } = this.props;
         const { value, allChecked } = this.state;

         let tasklist = [];

         tasklist = tasklist.concat( // Объединяем массивы задач в один с нужным нам порядком; Переводим в JSX
             tasks[0]
                 .filter((e) => e.message.toLowerCase().includes(this.state.search.toLowerCase()))
                 .map((e) => TaskClass.toJSX(e, { editTask, removeTask, toggleCheck, toggleStar })), // Важные задачи
             tasks[1]
                 .filter((e) => e.message.toLowerCase().includes(this.state.search.toLowerCase()))
                 .map((e) => TaskClass.toJSX(e, { editTask, removeTask, toggleCheck, toggleStar })), // Обычные задачи
             tasks[2]
                 .filter((e) => e.message.toLowerCase().includes(this.state.search.toLowerCase()))
                 .map((e) => TaskClass.toJSX(e, { editTask, removeTask, toggleCheck, toggleStar })), // Выполненные задачи
         );


         return (
             <Catcher>
                 <div className = { Styles.scheduler }>
                     <main>
                         <header>
                             <h1>Планировщик задач</h1>
                             <button onMouseDown = { this.openSettings } />
                             <input placeholder = 'Поиск' type = 'text' onChange = { this.onSearchChange } />
                         </header>
                         <section>
                             <form onSubmit = { this.onSubmit }>
                                 <input
                                     autoFocus
                                     className = { value.length === 46 ? Styles.overflow : null }
                                     placeholder = 'Описание моей новой задачи'
                                     type = 'text'
                                     value = { value }
                                     onChange = { this.onInputChange }
                                 />
                                 <input type = 'submit' value = 'Добавить задачу' />
                             </form>
                             <ul>
                                 <FlipMove>
                                     {tasklist}
                                 </FlipMove>
                             </ul>
                         </section>
                         <footer>
                             <Checkbox checked = { allChecked } color1 = '#656565' color2 = '#FFF' onClick = { this.onCheckAll } />
                             <code>Все задачи выполнены</code>
                         </footer>
                     </main>
                 </div>
             </Catcher>
         );
     }
}
