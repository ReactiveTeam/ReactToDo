
import React, { Component } from 'react';
import type from 'prop-types';

import Task from '../Task';

import Styles from './styles.scss';

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
        addTask: type.func.isRequired,
        tasks:   type.array.isRequired, // Can't use arrayOf
    }

    state = {
        value: '',
    }

    /**
     * Methods
     */

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

         const tasklist = tasks.map((e, i) => (<Task
             completed = { e.checked }
             key = { i }
             removeTask = { removeTask } // eslint-disable-line
             stared = { e.stared }
             taskid = { e.id }
             text = { e.message }
             toggleCheck = { toggleCheck }
             toggleStar = { toggleStar }
         />));


         return (
             <div className = { Styles.scheduler }>
                 <main>
                     <header>
                         <h1>Планировщик задач</h1>
                         <button />
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
