const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 400, height: 400, deviceScaleFactor: 2 });

  const html = fs.readFileSync(path.join(__dirname, 'twitter-avatar.html'), 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.screenshot({ path: path.join(__dirname, 'twitter-avatar.png') });
  console.log('Rendered twitter-avatar.png (800x800 @2x)');

  await browser.close();
})();
