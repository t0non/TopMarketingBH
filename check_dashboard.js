const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
  page.on('response', response => {
    if (!response.ok()) {
      console.error('FAILED REQUEST:', response.url(), response.status());
    }
  });
  await page.goto('http://localhost:3005/admin/index.html', {waitUntil: 'networkidle2'});
  await browser.close();
})();
