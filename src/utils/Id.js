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
