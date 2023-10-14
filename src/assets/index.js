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
        loadingPanel.classList[(v ? 'add' : 'remove')]('hidden');
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
        $('#viewer', mainContainer).appendChild(domTree);

        hide(mainContainer);
        show(viewerContainer);
    }

    function runParserWorker(file) {
        const worker = new Worker('./assets/parser-worker.js');
        const fileReader = new FileReader();

        return new Promise((res, rej) => {
            fileReader.addEventListener("load", ev => {
                worker.postMessage(ev.target.result);
            });

            fileReader.addEventListener('error', err => {
                clean();
                rej();
            });
    
            worker.addEventListener("message", (ev) => {
                clean();
                res(ev.data);
            });
    
            fileReader.readAsText(file);

            function clean() {
                fileReader.removeEventListener('load');
                fileReader.removeEventListener('error');
                worker.removeEventListener('message');
                worker.terminate();
            }
        });
    }
})();