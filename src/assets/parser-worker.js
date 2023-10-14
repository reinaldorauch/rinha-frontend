'use strict';

onmessage = (ev) => {
    try {
        const payload = JSON.parse(ev.data);

        postMessage([null, payload], undefined, [payload]);
    } catch (err) {
        postMessage([err.message]);
    }
};
