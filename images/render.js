const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const platforms = [
  { name: 'twitter',   size: 400, scale: 2 },  // 800x800
  { name: 'telegram',  size: 400, scale: 2.56 }, // 1024x1024
  { name: 'discord',   size: 400, scale: 2.56 }, // 1024x1024
  { name: 'facebook',  size: 400, scale: 2.56 }, // 1024x1024
  { name: 'instagram', size: 400, scale: 2.56 }, // 1024x1024
  { name: 'youtube',   size: 400, scale: 2 },  // 800x800
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const html = fs.readFileSync(path.join(__dirname, 'twitter-avatar.html'), 'utf8');

  for (const { name, size, scale } of platforms) {
    const page = await browser.newPage();
    await page.setViewport({ width: size, height: size, deviceScaleFactor: scale });
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const outFile = `${name}-avatar.png`;
    await page.screenshot({ path: path.join(__dirname, outFile) });
    const px = Math.round(size * scale);
    console.log(`${outFile} (${px}x${px})`);
    await page.close();
  }

  await browser.close();
})();
