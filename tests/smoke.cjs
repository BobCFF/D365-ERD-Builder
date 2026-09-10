/*
 * Functional smoke test — guards the core flows against regressions.
 * See tests/run.cjs for how it's launched (serves the repo, sets URL/PLAYWRIGHT).
 */
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const URL = process.env.URL || 'http://127.0.0.1:8100/';

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERR:' + e.message));
  p.on('console', m => { const t = m.text(); if (m.type() === 'error' && !/net::ERR|404|Failed to load resource/.test(t)) errs.push(t); });

  await p.goto(URL, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(600);
  // landing -> sample
  const landing = await p.evaluate(() => !document.getElementById('landing').hidden);
  await p.click('#lsample'); await p.waitForTimeout(800);
  const nodes = await p.$$eval('.node', ns => ns.length);
  const edges = await p.$$eval('#links path', ps => ps.length);

  // theme cycle through all 7 back to start
  const t0 = await p.evaluate(() => document.documentElement.getAttribute('data-theme') || '(none)');
  for (let i = 0; i < 7; i++) { await p.click('#themebtn'); await p.waitForTimeout(60); }
  const t7 = await p.evaluate(() => document.documentElement.getAttribute('data-theme') || '(none)');

  // data dictionary renders rows
  await p.click('#tabs .tab[data-view="dict"]'); await p.waitForTimeout(300);
  const dictRows = await p.$$eval('#dictbody tr', r => r.length);
  await p.click('#tabs .tab[data-view="diagram"]'); await p.waitForTimeout(200);

  // minimap present with node rects
  const mmRects = await p.$$eval('#mmnodes rect', r => r.length);

  const ok = landing && nodes === 7 && edges > 0 && t0 === t7 && dictRows > 0 && mmRects === 7 && !errs.length;
  console.log('landing:', landing, '| nodes:', nodes, '| edges:', edges);
  console.log('theme cycle back to start:', t0, '==', t7, '->', t0 === t7);
  console.log('dict rows:', dictRows, '| minimap rects:', mmRects);
  console.log('errors:', errs.length ? errs : 'none');
  console.log(ok ? 'PASS' : 'FAIL');
  await b.close();
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
