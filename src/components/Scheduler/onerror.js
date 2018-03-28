import React, { Component } from 'react';

import Styles from './styles.scss';

export default class Catcher extends Component {
    state = {
        isError: false,
    }

    componentDidCatch = (error, stack) => {
        this.setState({ isError: true });
        console.error(error, stack);
    }

    render () {
        if (!this.state.isError) return this.props.children;

        return (
            <div className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <button disabled />
                        <input placeholder = 'Поиск' type = 'text' />
                    </header>
                    <section>
                        <h1>Возникла ошибка :(</h1>
                    </section>
                </main>
            </div>
        );
    }
}
