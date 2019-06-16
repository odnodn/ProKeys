const {
        testSnippetExpansion,
        testSnippetExpansionDelimited,
    } = require("./snipExpand"),
    { acceptDialog } = require("./utils"),
    testURLs = require("./testURLs");

const usablePages = [],
    JEST_TIMEOUT = 60000;

/*
 * add this since jest's default timeout is 5s only
 * Loading a page might take longer
 */
jest.setTimeout(JEST_TIMEOUT);

beforeAll(async () => {
    // load all the pages
    /* eslint-disable no-await-in-loop */
    for (const testURL of testURLs) {
        const usablePage = await browser.newPage();
        await usablePage.setViewport({ width: 1920, height: 1080 });

        usablePage.on("dialog", acceptDialog);
        usablePages.push({
            usablePage,
            loadedPromise: usablePage.goto(testURL.url),
        });
    }
    /* eslint-enable no-await-in-loop */
});

/*
 * TESTS
 */
describe("Test snippet expansion", () => {
    testSnippetExpansion(usablePages);
});

describe("Test snipppet expansion delimited", () => {
    testSnippetExpansionDelimited(usablePages);
});