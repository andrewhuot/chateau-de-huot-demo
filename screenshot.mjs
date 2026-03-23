import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(process.env.HOME, 'Desktop', 'demo-v2-final-screenshots');
const baseUrl = `file://${__dirname}`;

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  // 1. Hero screenshot
  const page = await context.newPage();
  await page.goto(`${baseUrl}/index.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outDir}/01-hero.png`, fullPage: false });
  console.log('✓ 01-hero.png');

  // 2. Chat open
  await page.evaluate(() => ChatEngine.open());
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/02-chat-open.png`, fullPage: false });
  console.log('✓ 02-chat-open.png');

  // 3. Booking flow
  await page.evaluate(() => {
    ChatEngine.demoSpeed = 3;
    ChatEngine.addUserMessage("I'd like to reserve a suite", true);
    ChatEngine.playFlow('booking');
  });
  await page.waitForTimeout(6000);
  await page.screenshot({ path: `${outDir}/03-booking-flow.png`, fullPage: false });
  console.log('✓ 03-booking-flow.png');

  // 4. Modify flow
  await page.evaluate(() => {
    ChatEngine.messages.innerHTML = '';
    ChatEngine.flowToken++;
  });
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    ChatEngine.addUserMessage("I need to modify my reservation", true);
    ChatEngine.playFlow('modify');
  });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: `${outDir}/04-modify-flow.png`, fullPage: false });
  console.log('✓ 04-modify-flow.png');

  // 5. Service flow
  await page.evaluate(() => {
    ChatEngine.messages.innerHTML = '';
    ChatEngine.flowToken++;
  });
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    ChatEngine.addUserMessage("I'd like to order room service", true);
    ChatEngine.playFlow('service');
  });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: `${outDir}/05-service-flow.png`, fullPage: false });
  console.log('✓ 05-service-flow.png');

  // 6. My Stay page
  const page2 = await context.newPage();
  await page2.goto(`${baseUrl}/mystay.html`, { waitUntil: 'networkidle' });
  await page2.waitForTimeout(1500);
  await page2.screenshot({ path: `${outDir}/06-mystay.png`, fullPage: true });
  console.log('✓ 06-mystay.png');

  // 7. Admin panel
  await page.evaluate(() => {
    const panel = document.getElementById('demo-admin-panel');
    if (panel) panel.classList.add('is-open');
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/07-admin-panel.png`, fullPage: false });
  console.log('✓ 07-admin-panel.png');

  await browser.close();
  console.log(`\nAll screenshots saved to ${outDir}`);
}

run().catch(err => { console.error(err); process.exit(1); });
