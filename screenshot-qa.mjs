import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';

const SITE_DIR = '/Users/andrew/Desktop/demo-v2/site';
const OUT_DIR = process.argv[2] || '/Users/andrew/Desktop/hotel-design-review';
const PORT = 8772;

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mjs': 'application/javascript' };

const server = createServer((req, res) => {
  let path = req.url.split('?')[0];
  if (path === '/') path = '/index.html';
  const fp = join(SITE_DIR, path);
  if (!existsSync(fp)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[extname(fp)] || 'application/octet-stream' });
  res.end(readFileSync(fp));
});

await new Promise(r => server.listen(PORT, '127.0.0.1', r));
console.log(`Server on http://127.0.0.1:${PORT}`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const pages = ['index', 'rooms', 'dining', 'spa', 'experiences', 'events', 'gallery', 'contact', 'mystay'];

// Helper: scroll through page to trigger all GSAP/IO animations
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const delay = ms => new Promise(r => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) {
      window.scrollTo(0, y);
      await delay(100);
    }
    window.scrollTo(0, 0);
    await delay(300);
  });
}

// 1. Screenshot every page
for (const name of pages) {
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${PORT}/${name}.html`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT_DIR}/${name}-viewport.png` });
  console.log(`  [page] ${name} viewport`);

  // Scroll through to trigger animations, then full-page screenshot
  await scrollThrough(page);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT_DIR}/${name}-full.png`, fullPage: true });
  console.log(`  [page] ${name} full`);
  await page.close();
}

// 2. Chat panel + demo flows
{
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);

  // Open chat
  await page.click('#chat-launcher');
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT_DIR}/chat-panel-open.png` });
  console.log('  [chat] panel open');

  const flows = ['booking', 'concierge', 'dining', 'spa', 'events', 'support', 'modify', 'service', 'explore', 'vip'];

  for (const flow of flows) {
    // Reset and play flow
    await page.evaluate(async (flowName) => {
      // ChatEngine is declared with const (not var), so it's a global but NOT on window
      const CE = typeof ChatEngine !== 'undefined' ? ChatEngine : null;
      if (!CE) return;

      // Clear chat
      if (CE.messages) CE.messages.innerHTML = '';
      CE.flowToken++;
      CE.demoSpeed = 4; // fast

      // Ensure panel is open
      CE.open();

      // Play flow and wait for completion
      await CE.playFlow(flowName);
    }, flow);

    // Extra wait to let the last widgets render
    await page.waitForTimeout(2000);

    // Scroll chat to bottom to see latest widgets
    await page.evaluate(() => {
      const msgs = document.getElementById('chat-messages');
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
    });
    await page.waitForTimeout(300);

    await page.screenshot({ path: `${OUT_DIR}/flow-${flow}.png` });
    console.log(`  [flow] ${flow}`);

    // Also screenshot scrolled to middle
    await page.evaluate(() => {
      const msgs = document.getElementById('chat-messages');
      if (msgs) msgs.scrollTop = Math.max(0, msgs.scrollHeight / 3);
    });
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT_DIR}/flow-${flow}-mid.png` });
  }

  await page.close();
}

await browser.close();
server.close();
console.log('\nDone! Screenshots in', OUT_DIR);
