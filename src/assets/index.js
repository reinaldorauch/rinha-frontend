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
            await runParserWorker(file);
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
        loadingPanel.classList[(v ? 'add' : 'remove')]('hidden');
    }

    function showError(error) {
        errorContainer.textContent = error;
        errorContainer.classList.remove('hidden');
    }

    function resetError() {
        errorContainer.textContent = '';
        errorContainer.classList.add('hidden');
    }

    async function runParserWorker(file) {
        const worker = new Worker('/assets/parser-worker.js');
        const fileReader = new FileReader();

        return new Promise((res, rej) => {
            fileReader.addEventListener("load", ev => {
                worker.postMessage(ev.target.result);
            });
    
            worker.addEventListener("message", (ev) => {
                res()
            });
    
            fileReader.readAsText(file);
        });
    }
})();