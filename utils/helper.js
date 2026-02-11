import { expect } from 'allure-playwright';
const fs = require('fs');
const path = require('path');

const DOWNLOAD_FOLDER = path.resolve(__dirname, '../fastwillFiles'); 
const FILE_NAME = 'Estate-Planning-Checklist.pdf';
const FILE_PATH = path.join(DOWNLOAD_FOLDER, FILE_NAME);

async function clickElement(locator) {
    await expect(locator).toBeVisible();
    await locator.click();
}
function getRandomEmail() {
  const timestamp = Date.now(); 
  const email = `ambreeny.qat123+${timestamp}@gmail.com`;
  return email;
}
function getRandomForDeedEmail() {
  const timestamp = Date.now(); 
  const email = `ambreeny.qat123${timestamp}@gmail.com`;
  return email;
}
function isWithinNotaryHours() {
  const now = new Date();
  const hour = now.getHours(); // local machine time (0–23)

  return hour >= 9 && hour < 17;
}
function calculateAge({ day, month, year }) {
    const birthDate = new Date(`${month} ${day}, ${year}`);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
        age--;
    }

    return age;
}



async function prepareDownloadFolder() {
    if (!fs.existsSync(DOWNLOAD_FOLDER)) {
        fs.mkdirSync(DOWNLOAD_FOLDER, { recursive: true });
    }

    const files = fs.readdirSync(DOWNLOAD_FOLDER);
    for (const file of files) {
        fs.unlinkSync(path.join(DOWNLOAD_FOLDER, file));
    }

    console.log(`✅ Download folder prepared at ${DOWNLOAD_FOLDER}`);
}

async function downloadAndVerifyFile(page, locator) {
    const downloadPromise = page.waitForEvent('download');
    await clickElement(locator)
    const download = await downloadPromise;
    await download.saveAs(FILE_PATH);
    if (fs.existsSync(FILE_PATH)) {
        console.log(`✅ File downloaded successfully: ${FILE_PATH}`);
        return true;
    } else {
        throw new Error(`❌ File not found: ${FILE_PATH}`);
    }
}
async function createContextWithMockTime(browser, isoTime) {
    const mockDate = new Date(isoTime);

    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        javaScriptEnabled: true,
        timezoneId: 'UTC', // optional, makes time consistent
    });

    await context.addInitScript(dateStr => {
        const ts = new Date(dateStr);

        const OriginalDate = Date;

        class MockDate extends OriginalDate {
            constructor(...args) {
                if (args.length === 0) return new OriginalDate(ts);
                return new OriginalDate(...args);
            }
            static now() { return ts.getTime(); }
        }

        global.Date = MockDate;
    }, mockDate.toISOString());

    return context;
}

async function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function extractNumericString(value) {
    return value.replace(/[^0-9.-]+/g, "")
}

module.exports = {
    prepareDownloadFolder,
    downloadAndVerifyFile,
    clickElement, 
    getRandomEmail,
    getRandomForDeedEmail,
    DOWNLOAD_FOLDER,
    FILE_PATH, 
    createContextWithMockTime, 
    isValidEmail,
    extractNumericString,
    isWithinNotaryHours,
    calculateAge
};
