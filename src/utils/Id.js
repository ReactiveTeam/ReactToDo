/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * Данный файл служит для генерации ID задач
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

class ID {
    constructor () {
        this.genid = 0;
    }

    getUniqueID = (length = 15) => {
        if (typeof length !== 'number') {
            throw new Error('The function argument should be a number!');
        }

        let text = '';
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    };


    getId () {
        return this.getUniqueID();//this.genid++; // eslint-disable-line
    }

    get id () {
        return this.getUniqueID();//this.genid++; // eslint-disable-line
    }
}

export default new ID();
