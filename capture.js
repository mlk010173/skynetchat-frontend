const WebSocket = require('ws');
const fs = require('fs');
const ws = new WebSocket(process.argv[2]);
let id = 0; const pending = new Map();
function send(m, p = {}) { return new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })); }); }
ws.on('message', (d) => { const msg = JSON.parse(d); if (pending.has(msg.id)) { const { res, rej } = pending.get(msg.id); pending.delete(msg.id); msg.error ? rej(new Error(msg.error.message)) : res(msg.result); } });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const routes = [
  ['home','/'],['about','/about/'],['afiliado','/afiliado/'],['affiliate-panel','/affiliate-panel/'],
  ['checkout','/checkout/'],['dev-security','/dev/security/'],['indique-ganhe','/indique-ganhe/'],
  ['login','/login/'],['monetize','/monetize/'],['novo','/novo/'],['politicos','/politicos/'],
  ['recovery','/recovery/'],['sign-up','/sign-up/'],['termos','/termos/'],['v3','/v3/'],['voz','/voz/']
];
ws.on('open', async () => {
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  const out = [];
  for (const [name, path] of routes) {
    await send('Page.navigate', { url: 'http://127.0.0.1:8098/skynetchat-frontend' + path });
    await sleep(6500);
    let text = '';
    try { const r = await send('Runtime.evaluate', { expression: 'document.body.innerText.slice(0,900)', returnByValue: true }); text = String(r.result.value || ''); } catch {}
    try {
      const s = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/demo/' + name + '.png', Buffer.from(s.data, 'base64'));
    } catch (e) { console.log('shot fail', name, e.message); }
    out.push({ name, path, text });
    console.log(name, '::', text.replace(/\s+/g, ' ').slice(0, 110));
  }
  fs.writeFileSync('demo/capture.json', JSON.stringify(out, null, 1));
  process.exit(0);
});
