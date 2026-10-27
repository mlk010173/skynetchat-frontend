const WebSocket=require('ws'), fs=require('fs');
const ws=new WebSocket(process.argv[2]);
let id=0,p=new Map();
function s(m,q={}){return new Promise((r,j)=>{const i=++id;p.set(i,{r,j});ws.send(JSON.stringify({id:i,method:m,params:q}));});}
ws.on('message',d=>{const m=JSON.parse(d);if(p.has(m.id)){const{r,j}=p.get(m.id);p.delete(m.id);m.error?j(new Error(m.error.message)):r(m.result);}});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const ev=async(expr)=>{const r=await s('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});return r.result&&r.result.value;};
ws.on('open',async()=>{
  await s('Page.enable');await s('Runtime.enable');
  await s('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  await s('Page.navigate',{url:'http://127.0.0.1:8098/skynetchat-frontend/'});
  await sleep(7000);
  const ok = await ev(`(function(){
    var ta=document.querySelector('textarea');
    if(!ta) return 'sem textarea';
    ta.focus();
    var setter=Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'value').set;
    setter.call(ta,'Explique como funciona a linha de pensamento');
    ta.dispatchEvent(new Event('input',{bubbles:true}));
    ta.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',keyCode:13,which:13,bubbles:true}));
    return 'enviado';
  })()`);
  console.log('envio:',ok);
  await sleep(3000);
  fs.writeFileSync('screenshots/demo/chat-thinking.png',Buffer.from((await s('Page.captureScreenshot',{format:'png'})).data,'base64'));
  console.log('--- 3s ---'); console.log((await ev('document.body.innerText.replace(/\\s+/g," ").slice(-500)'))||'');
  await sleep(9000);
  fs.writeFileSync('screenshots/demo/chat-resposta.png',Buffer.from((await s('Page.captureScreenshot',{format:'png'})).data,'base64'));
  console.log('--- 12s ---'); console.log((await ev('document.body.innerText.replace(/\\s+/g," ").slice(-700)'))||'');
  process.exit(0);
});
