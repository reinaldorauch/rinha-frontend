'use strict';

onmessage = (ev) => {
    try {
        const payload = JSON.parse(ev.data);

        const domTree = buildDomTree(payload);

        postMessage(['success', domTree], undefined, [domTree]);
    } catch (err) {
        postMessage(['error', err.message]);
    }
};

function buildDomTree(member, obj) {
    const root = document.createElement('pre');

    root.textContent = member ? member + ': ' : '';

    for (const [member, val] of Object.entries(obj)) {
        if (Array.isArray(val)) root.appendChild(makeArray(member, val.map(buildDomTree)));
        if (typeof val === 'number') root.appendChild(makeNumber(member, val));
        if (typeof val === 'string') root.appendChild(makeString(member, val));
        root.appendChild(buildDomTree(member, val));
    }

    return root;
}

function makeArray(member, array) {
    const el = document.createElement('div');
    el.classList.add('array-entry');
    el.textContent = member;
    return el;
}

function makeString(member, string) {
    const el = document.createElement('div');
    el.classList.add('string-entry');
    el.textContent = member + ': ' + string;
    return el;
}

function makeNumber(member, number) {
    const el = document.createElement('div');
    el.classList.add('number-entry');
    el.textContent = member + ': ' + number;
    return el;
}