/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

class Tasker {
    constructor (message, checked = true, stared = false) {
        this.stared = stared;
        this.message = message;
        this.checked = checked;
    }
}

export default Tasker;
