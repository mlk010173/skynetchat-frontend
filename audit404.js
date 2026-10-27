const WebSocket = require('ws');
const ws = new WebSocket(process.argv[2]);
let id=0; const pending=new Map();
function send(m,p={}){return new Promise((res,rej)=>{const i=++id;pending.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:m,params:p}));});}
let bad = new Set();
ws.on('message',d=>{const m=JSON.parse(d);
 if(pending.has(m.id)){const{res,rej}=pending.get(m.id);pending.delete(m.id);m.error?rej(new Error(m.error.message)):res(m.result);return;}
 if(m.method==='Network.responseReceived'&&m.params.response.status>=400){bad.add(m.params.response.status+' '+m.params.response.url);}
});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const routes=['','about/','afiliado/','affiliate-panel/','checkout/','dev/security/','indique-ganhe/','login/','monetize/','novo/','politicos/','recovery/','sign-up/','termos/','v3/','voz/','quota/'];
ws.on('open',async()=>{
 await send('Network.enable');await send('Page.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
 for(const r of routes){bad.clear();await send('Page.navigate',{url:'http://127.0.0.1:8098/skynetchat-frontend/'+r});
  await sleep(4500);
  const list=[...bad].filter(u=>!u.includes('127.0.0.1:8098/') === false || u.includes('8098'));
  const real=[...bad].filter(u=>u.includes('8098/'));
  if(real.length)console.log('['+ (r||'home') +']');real.forEach(u=>console.log('   '+u.replace('http://127.0.0.1:8098','')));}
 process.exit(0);
});
