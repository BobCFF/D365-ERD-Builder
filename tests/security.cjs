/*
 * Security + CSP smoke test.
 *
 * Serve the built app, then verify:
 *   1. it renders under the strict CSP (sample schema),
 *   2. an export (XLSX default) + PNG export still work under the CSP,
 *   3. the attribute-injection XSS is neutralised (a malicious display name
 *      neither executes nor injects an event-handler attribute),
 *   4. no CSP violations and no console errors.
 *
 * Run:
 *   python3 build-d365.py
 *   python3 -m http.server 8100 &        # serve repo root
 *   PLAYWRIGHT=/path/to/playwright node tests/security.cjs
 * (PLAYWRIGHT defaults to a bare require('playwright').)
 */
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const URL = process.env.URL || 'http://127.0.0.1:8100/';

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1400, height: 900 }, acceptDownloads: true });
  const errs = [], csp = [];
  p.on('pageerror', e => errs.push('PAGEERR:' + e.message));
  p.on('console', m => {
    const t = m.text();
    if (/Content Security Policy|Refused to/i.test(t)) csp.push(t);
    else if (m.type() === 'error' && !/net::ERR|404|Failed to load resource/.test(t)) errs.push(t);
  });

  await p.goto(URL, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(700);
  await p.click('#lsample'); await p.waitForTimeout(900);
  const nodes = await p.$$eval('.node', ns => ns.length);

  // exports under CSP
  await p.click('#tabs .tab[data-view="dict"]'); await p.waitForTimeout(300);
  let dl = p.waitForEvent('download', { timeout: 8000 });
  await p.click('#expCsv'); await p.waitForTimeout(200); await p.click('#exGo');
  const exp1 = (await dl).suggestedFilename();
  await p.click('#tabs .tab[data-view="diagram"]'); await p.waitForTimeout(300);
  let dl2 = p.waitForEvent('download', { timeout: 12000 });
  await p.click('#expPng'); const pngName = (await dl2).suggestedFilename();

  // XSS regression: import a schema whose display name carries an injection payload
  const evil = `<?xml version="1.0"?><ImportExportXml><Entities>
<Entity><Name LocalizedName='Acme&quot; onmouseover=&quot;window.__XSS=1&quot; data-x=&quot;'>evil</Name>
<EntityInfo><entity Name="evil"><attributes>
<attribute><LogicalName>evilid</LogicalName><Type>primarykey</Type><displaynames><displayname description='Id&quot; onmouseover=&quot;window.__XSS=1&quot;'/></displaynames></attribute>
</attributes></entity></EntityInfo></Entity>
</Entities><EntityRelationships/></ImportExportXml>`;
  await p.evaluate(xml => { window.__erd && window.__erd.importXmlText && window.__erd.importXmlText(xml); }, evil);
  await p.waitForTimeout(700);
  await p.evaluate(() => document.querySelectorAll('.node .card, .node [title]').forEach(el => el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))));
  await p.waitForTimeout(200);
  const xssRan = await p.evaluate(() => !!window.__XSS);
  const injectedAttr = await p.evaluate(() => [...document.querySelectorAll('.node *')].some(el => el.hasAttribute && el.hasAttribute('onmouseover')));

  const ok = nodes > 0 && !!exp1 && !!pngName && !xssRan && !injectedAttr && !csp.length && !errs.length;
  console.log('nodes:', nodes, '| export1:', exp1, '| png:', pngName);
  console.log('xssRan:', xssRan, '| injectedAttr:', injectedAttr);
  console.log('cspViolations:', csp.length ? csp : 'none', '| errors:', errs.length ? errs : 'none');
  console.log(ok ? 'PASS' : 'FAIL');
  await b.close();
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
