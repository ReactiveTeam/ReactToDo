/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

class Tasker {
    constructor (message, checked = false, stared = false) {
        this.stared = false;
        this.message = '';
        this.checked = false;
    }
}

export default Tasker;
