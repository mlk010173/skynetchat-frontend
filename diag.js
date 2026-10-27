const WebSocket = require('ws');
const ws = new WebSocket(process.argv[2]);
let id=0; const pending=new Map();
function send(m,p={}){return new Promise((res,rej)=>{const i=++id;pending.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:m,params:p}));});}
ws.on('message',d=>{const m=JSON.parse(d);
  if(pending.has(m.id)){const{res,rej}=pending.get(m.id);pending.delete(m.id);m.error?rej(new Error(m.error.message)):res(m.result);return;}
  if(m.method==='Runtime.exceptionThrown')console.log('EXC:',JSON.stringify(m.params.exceptionDetails).slice(0,300));
  if(m.method==='Log.entryAdded')console.log('LOG:',m.params.entry.level,m.params.entry.text.slice(0,200));
  if(m.method==='Network.loadingFailed')console.log('FAIL:',m.params.errorText,m.params.type);
  if(m.method==='Network.responseReceived'&&m.params.response.status>=400)console.log('HTTP',m.params.response.status,m.params.response.url.slice(-70));
});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
ws.on('open',async()=>{
  await send('Runtime.enable');await send('Log.enable');await send('Network.enable');await send('Page.enable');
  await send('Page.navigate',{url:'http://127.0.0.1:8098/skynetchat-frontend/afiliado/'});
  await sleep(7000);process.exit(0);
});
