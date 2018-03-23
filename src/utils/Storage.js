/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

//FIXME: Столько костылей я ещё в жизни не видел...

const Storage = {
    _save: () => {
        if (!window.localStorage) throw new Error('Браузер какого года Вы используете?');

        const data = JSON.stringify(this.a);

        localStorage.setItem('storage', data);
    },
    _load: () => {
        if (!window.localStorage) throw new Error('Браузер какого года Вы используете?');

        let data = localStorage.getItem('storage');

        if (!data) {
            Storage._save();
            data = {};
        }

        Object.assign(this.a, JSON.parse(data)); //TODO: Try/Catch
    },
};

export default Storage;
