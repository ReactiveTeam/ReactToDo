import React, { Component } from 'react';

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
            <section>
                <h1>Мы его потеряли...</h1>
                <h2>В приложении возникла критическая ошибка и отладчики не успели его спасти... Сожалеем :(</h2>
            </section>
        );
    }
}
