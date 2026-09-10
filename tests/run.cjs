/*
 * Test runner: serve the repo root, run each test file as a child process,
 * report pass/fail, then tear the server down. Used by `npm test` and CI.
 *
 * Env passed through to tests: URL (defaults to the local server) and
 * PLAYWRIGHT (path to the playwright module; defaults to bare 'playwright').
 */
const { spawn, spawnSync } = require('child_process');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = process.env.PORT || '8100';
const URL = `http://127.0.0.1:${PORT}/`;
const TESTS = ['security.cjs', 'smoke.cjs'];

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const server = spawn('python3', ['-m', 'http.server', PORT], { cwd: ROOT, stdio: 'ignore' });
  await wait(1200);
  let failed = 0;
  try {
    for (const t of TESTS) {
      console.log(`\n=== ${t} ===`);
      const res = spawnSync(process.execPath, [path.join(__dirname, t)], {
        stdio: 'inherit',
        env: { ...process.env, URL, PLAYWRIGHT: process.env.PLAYWRIGHT || '' },
      });
      if (res.status !== 0) failed++;
    }
  } finally {
    server.kill('SIGTERM');
  }
  console.log(`\n${failed ? failed + ' test file(s) FAILED' : 'ALL TESTS PASSED'}`);
  process.exit(failed ? 1 : 0);
})();
