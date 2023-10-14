'use strict';

onmessage = (ev) => {
    try {
        const payload = JSON.parse(ev.data);

        postMessage(['success', payload], undefined, [payload]);
    } catch (err) {
        postMessage(['error', err.message]);
    }
};
