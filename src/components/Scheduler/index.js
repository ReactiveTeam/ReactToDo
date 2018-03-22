
import React, { Component } from 'react';
import type from 'prop-types';

import Task from '../Task';

import Styles from './styles.scss';

export default class Sheduler extends Component {
    static propTypes = {
        addTask: type.func.isRequired,
        tasks:   type.array.isRequired, // Can't use arrayOf
    }

    /**
     * Methods
     */

    /**
     * Handlers
     */

     onSubmit = (event) => {
         event.preventDefault();
         console.log('onSubmit');

         this.props.addTask('New Task');

         return false;
     }

     render () {
         const { tasks } = this.props;

         const tasklist = tasks.map((e, i) => <Task completed = { e.checked } key = { i } stared = { e.stared } text = { e.message } />);


         return (
             <div className = { Styles.scheduler }>
                 <main>
                     <header>
                         <h1>Планировщик задач</h1>
                         <input placeholder = 'Поиск' type = 'text' />
                     </header>
                     <section>
                         <form onSubmit = { this.onSubmit }>
                             <input autoFocus type = 'text' value = 'Описание моей новой задачи' />
                             <input type = 'submit' value = 'Добавить задачу' />
                         </form>
                         <ul>
                             {tasklist}
                         </ul>
                     </section>
                     <footer>
                         <span />
                         <code />
                     </footer>
                 </main>
             </div>
         );
     }
}
