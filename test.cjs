const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    
    console.log('Navigating to http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    const content = await page.content();
    console.log('CONTENT LENGTH:', content.length);
    console.log('Root content:', await page.$eval('#root', el => el.innerHTML).catch(() => 'No root found'));
    
    await browser.close();
  } catch (error) {
    console.log('Script error:', error.message);
  }
})();
