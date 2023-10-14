/**
 * Search for one element based on a CSS selector on the defined context
 * @param {String} s CSS selector to search for
 * @param {HTMLElement|Document} c The context of the search
 * @returns An Element or null if not found
 */
const $ = (s, c = document) => c.querySelector(s);

(function () {
    "use strict";

    const loadingPanel = $('#loading');
    const loader = $('#loader');
    const loadJson = $('#load-json');
    const errorContainer = $('#error');
    const viewerPage = $('#viewer-page');
    const mainPage = $('#main-page');
    const viewerContainer = $('#viewer');
    const filename = $('#filename');

    init();

    /**
     * Initalizes the app
     */
    function init() {
        loader.addEventListener('change', async ev => {
            /**
             * @var File
             */
            const file = ev.target.files[0];

            setLoading(true);

            setFilename(file.name);

            const [message, data] = await runParserWorker(file);

            if ('error' === message) {
                showError(data);
            } else if ('success' === message) {
                showSuccess(data);
            }

            setLoading(false);
        }, false);

        loadJson.addEventListener('click', ev => {
            loader.click(); 
        });
    }

    /**
     * Set loading state of the app
     * @param {boolean} v
     */
    function setLoading(v) {
        loadJson.disabled = v;
        v ? show(loadingPanel) : hide(loadingPanel);
    }

    /**
     * Shows the element
     * @param {HTMLElement} el 
     */
    function show(el) {
        el.classList.remove('hidden');
    }

     /**
     * Hides the element
     * @param {HTMLElement} el 
     */
    function hide(el) {
        el.classList.add('hidden');
    }

    function showError(error) {
        errorContainer.textContent = error;
        show(errorContainer)
    }

    function resetError() {
        errorContainer.textContent = '';
        hide(errorContainer);
    }

    function setFilename(name) {
        filename.textContent = name;
    }

    function showSuccess(domTree) {
        viewerContainer.appendChild(domTree);

        hide(mainPage);
        show(viewerPage);
    }

    function runParserWorker(file) {
        const worker = new Worker('/rinha-frontend/assets/parser-worker.js');
        const fileReader = new FileReader();

        return new Promise((res, rej) => {
            const onload = ev => {
                worker.postMessage(ev.target.result, undefined, [ev.target.result]);
            };

            const onerror = err => {
                clean();
                rej();
            };

            fileReader.addEventListener("load", onload);
            fileReader.addEventListener('error', onerror);

            const onmesssage = (ev) => {
                clean();
                const domTree = buildDomTree(ev.data);
                res(domTree);
            };
    
            worker.addEventListener("message", onmesssage);
    
            fileReader.readAsText(file);

            function clean() {
                fileReader.removeEventListener('load', onload);
                fileReader.removeEventListener('error', onerror);
                worker.removeEventListener('message', onmesssage);
                worker.terminate();
            }
        });
    }

    function buildDomTree(member, obj) {
        const root = document.createElement('pre');

        if (obj === null || obj === undefined) {
            root.textContent = 'null';
            return root;
        }

        root.textContent = member ? member + ': {' : '{';

        for (const [member, val] of Object.entries(obj)) {
            if (Array.isArray(val)) root.appendChild(makeArray(member, val.map(buildDomTree)));
            if (typeof val === 'number') root.appendChild(makeNumber(member, val));
            if (typeof val === 'string') root.appendChild(makeString(member, val));
            root.appendChild(buildDomTree(member, val));
        }

        root.textContent += '}';

        return root;
    }

    function makeArray(member, array) {
        const el = document.createElement('div');
        el.classList.add('array-entry');
        el.textContent = '[\n' + member + '\n]';
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
})();