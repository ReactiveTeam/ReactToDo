/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import ID from '../utils/Id';

class Tasker {
    constructor (message, checked = false, stared = false) {
        this.stared = stared;
        this.message = message;
        this.checked = checked;
        this.id = ID.getId();
    }
}

export default Tasker;
