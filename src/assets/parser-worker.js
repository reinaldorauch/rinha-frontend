'use strict';

const buffer = [];

onmessage = (ev) => {
    buffer.push(ev.data);
};