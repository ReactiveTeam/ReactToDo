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

    getId () {
        return this.genid++; // eslint-disable-line
    }

    get id () {
        return this.genid++; // eslint-disable-line
    }
}

export default new ID();
