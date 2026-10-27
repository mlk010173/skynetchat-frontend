const WebSocket=require('ws'), fs=require('fs');
const ws=new WebSocket(process.argv[2]);
let id=0,p=new Map();
function s(m,q={}){return new Promise((r,j)=>{const i=++id;p.set(i,{r,j});ws.send(JSON.stringify({id:i,method:m,params:q}));});}
ws.on('message',d=>{const m=JSON.parse(d);if(p.has(m.id)){const{r,j}=p.get(m.id);p.delete(m.id);m.error?j(new Error(m.error.message)):r(m.result);}});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const ev=async e=>{const r=await s('Runtime.evaluate',{expression:e,returnByValue:true});return r.result&&r.result.value;};
ws.on('open',async()=>{
  await s('Page.enable');await s('Network.setCacheDisabled',{cacheDisabled:true});
  await s('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  await s('Page.navigate',{url:'http://127.0.0.1:8098/skynetchat-frontend/?as=pro&fresh='+Date.now()});
  await sleep(7000);
  console.log('textareas:',await ev("document.querySelectorAll('textarea').length"));
  console.log('envio:',await ev(`(function(){
    var tas=[...document.querySelectorAll('textarea')];
    var ta=tas[tas.length-1];
    if(!ta) return 'sem textarea';
    var set=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set;
    set.call(ta,'Como funciona a linha de pensamento?');
    ta.dispatchEvent(new Event('input',{bubbles:true}));
    ta.closest('form').requestSubmit();
    return 'ok';
  })()`));
  await sleep(4000);
  fs.writeFileSync('estados/chat-1-pensando.png',Buffer.from((await s('Page.captureScreenshot',{format:'png'})).data,'base64'));
  console.log('4s:',await ev("document.body.innerText.replace(/\\s+/g,' ').slice(-260)"));
  await sleep(10000);
  fs.writeFileSync('estados/chat-2-resposta.png',Buffer.from((await s('Page.captureScreenshot',{format:'png'})).data,'base64'));
  console.log('14s:',await ev("document.body.innerText.replace(/\\s+/g,' ').slice(-320)"));
  process.exit(0);
});
