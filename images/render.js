const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const avatars = [
  { name: 'twitter',   size: 400, scale: 2 },    // 800x800
  { name: 'telegram',  size: 400, scale: 2.56 },  // 1024x1024
  { name: 'discord',   size: 400, scale: 2.56 },  // 1024x1024
  { name: 'facebook',  size: 400, scale: 2.56 },  // 1024x1024
  { name: 'instagram', size: 400, scale: 2.56 },  // 1024x1024
  { name: 'youtube',   size: 400, scale: 2 },    // 800x800
  { name: 'github',    size: 400, scale: 2.56 },  // 1024x1024
];

const headers = [
  { name: 'twitter',  width: 1500, height: 500, scale: 1 },  // 1500x500
  { name: 'facebook', width: 820,  height: 312, scale: 2 },  // 1640x624
  { name: 'youtube',  width: 2560, height: 1440, scale: 1 }, // 2560x1440
  { name: 'discord',  width: 960,  height: 540, scale: 1 },  // 960x540
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });

  // Render avatars — load via file URL for local script resolution
  const avatarFile = path.join(__dirname, 'avatar.html');
  for (const { name, size, scale } of avatars) {
    const page = await browser.newPage();
    await page.setViewport({ width: size, height: size, deviceScaleFactor: scale });
    await page.goto(`file://${avatarFile}`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    const outFile = `${name}-avatar.png`;
    await page.screenshot({ path: path.join(__dirname, outFile) });
    const px = Math.round(size * scale);
    console.log(`${outFile} (${px}x${px})`);
    await page.close();
  }

  // Render headers — lightweight-charts needs specific dimensions
  const headerHtml = fs.readFileSync(path.join(__dirname, 'header.html'), 'utf8');
  for (const { name, width, height, scale } of headers) {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: scale });

    // Adjust CSS and chart dimensions for this platform
    let html = headerHtml
      .replace(/width:\s*1500px/g, `width: ${width}px`)
      .replace(/height:\s*500px/g, `height: ${height}px`)
      .replace(/width: 1500,/g, `width: ${width},`)
      .replace(/height: 500,/g, `height: ${height},`);

    // Load via file URL so relative script paths resolve
    const tmpFile = path.join(__dirname, `_tmp_header_${name}.html`);
    require('fs').writeFileSync(tmpFile, html);
    await page.goto(`file://${tmpFile}`, { waitUntil: 'networkidle0' });
    require('fs').unlinkSync(tmpFile);

    // Give lightweight-charts time to render
    await new Promise(r => setTimeout(r, 2000));

    const outFile = `${name}-header.png`;
    await page.screenshot({ path: path.join(__dirname, outFile) });
    const px_w = Math.round(width * scale);
    const px_h = Math.round(height * scale);
    console.log(`${outFile} (${px_w}x${px_h})`);
    await page.close();
  }

  await browser.close();
})();
