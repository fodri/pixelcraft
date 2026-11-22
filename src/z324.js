/* ===== z324: co-op lobby — after joining with the room code, a waiting room (DOM overlay): the code (copyable), who is in, ready / Start (host), Leave. Start → everyone gets the opening cutscene; joining late skips it ===== */
const PLB={on:false,ready:false,seen:{},list:[],go:false,el:null,iv:0,t0:0,late:false};
const plbH=()=>LANG=='hu';
function plbBegin(){const nt=net;if(!nt||PLB.on)return;PLB.on=true;PLB.ready=false;PLB.seen={};PLB.list=[];PLB.go=false;PLB.late=false;PLB.t0=performance.now();PLB.nt=nt;
 const r=nt.r;
 r.on('plbr',m=>{if(!nt.isHost||!m||!m.data)return;PLB.seen[m.from]={n:String(m.data.n||'?').slice(0,12),r:!!m.data.r,t:performance.now()}});
 r.on('plbs',m=>{if(nt.isHost||!m||!m.data)return;const d=m.data;PLB.list=Array.isArray(d.l)?d.l:[];if(d.go&&PLB.on){PLB.late=performance.now()-PLB.t0<2500;plbGo(PLB.late)}else if(d.go)PLB.go=true});
 plbDom();plbTick();clearInterval(PLB.iv);PLB.iv=setInterval(plbTick,400)}
function plbGo(skipCut){PLB.on=false;PLB.go=true;clearInterval(PLB.iv);PLB.iv=0;plbShow(false);
 try{if(skipCut){say(plbH()?'Csatlakoztál a játékhoz':'You joined the game')}else priOpening()}catch(e){console.warn('plbGo',e)}
 if(net&&net.isHost){PLB.hiv=setInterval(()=>{if(!net||net.dead){clearInterval(PLB.hiv);return}try{net.r.emit('plbs',{go:1,l:[]})}catch(e){}},1500)}}
function plbTick(){const nt=net;if(!PLB.on)return;if(!nt||nt.dead){plbRender();return}
 const me={id:nt.r.id,n:String(uname||'Player').slice(0,12),r:nt.isHost?true:PLB.ready,h:nt.isHost};
 if(nt.isHost){const now=performance.now(),l=[me];for(const p of nt.peers){const s=PLB.seen[p.id];l.push({id:p.id,n:s&&now-s.t<4000?s.n:'…',r:!!(s&&s.r&&now-s.t<4000),h:false})}
  PLB.list=l;try{nt.r.emit('plbs',{l})}catch(e){}}
 else{try{nt.r.emit('plbr',{n:me.n,r:me.r})}catch(e){}}
 plbRender()}
function plbDom(){if(PLB.el)return PLB.el;const d=document.createElement('div');d.id='prlb';
 d.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;z-index:90;display:none;align-items:center;justify-content:center;background:rgba(6,8,6,.82);font-family:"DejaVu Sans",Arial,sans-serif;color:#efe6c4;-webkit-user-select:none;user-select:none';
 d.innerHTML='<div style="width:min(440px,92vw);background:#14160f;border:2px solid #e8c43a;box-shadow:0 6px 30px #000;padding:18px 22px 16px;text-align:center">'
 +'<div id="prlb_t" style="font-size:12px;letter-spacing:.22em;color:#8fe0ff;font-weight:700"></div>'
 +'<div style="margin:8px 0 2px;font-size:11px;color:#9a9a8a" id="prlb_h"></div>'
 +'<div id="prlb_c" style="font-size:36px;font-weight:700;letter-spacing:.3em;color:#ffd84a;margin:2px 0 8px;padding-left:.3em"></div>'
 +'<button id="prlb_cp" style="font:inherit;font-size:11px;background:#262a1c;color:#efe6c4;border:1px solid #5a6446;padding:4px 12px;cursor:pointer"></button>'
 +'<div id="prlb_l" style="margin:14px 0 6px;text-align:left"></div>'
 +'<div id="prlb_m" style="min-height:16px;font-size:11px;color:#c9b26a;margin:4px 0 10px"></div>'
 +'<div style="display:flex;gap:10px;justify-content:center"><button id="prlb_go" style="font:inherit;font-size:13px;font-weight:700;background:#e8c43a;color:#1a1608;border:0;padding:8px 22px;cursor:pointer"></button>'
 +'<button id="prlb_lv" style="font:inherit;font-size:13px;background:#3a2018;color:#efd0c4;border:1px solid #7a4a3a;padding:8px 16px;cursor:pointer"></button></div></div>';
 document.body.appendChild(d);PLB.el=d;
 const $=i=>d.querySelector('#'+i);
 $('prlb_cp').onclick=()=>{const c=net&&net.code||'';try{navigator.clipboard.writeText(c)}catch(e){const t=document.createElement('textarea');t.value=c;document.body.appendChild(t);t.select();try{document.execCommand('copy')}catch(x){}t.remove()}$('prlb_cp').textContent=plbH()?'Kimásolva ✓':'Copied ✓';setTimeout(plbRender,1400)};
 $('prlb_go').onclick=plbAct;$('prlb_lv').onclick=plbLeave;return d}
function plbAct(){const nt=net;if(!PLB.on||!nt||nt.dead)return;
 if(nt.isHost){try{nt.r.emit('plbs',{go:1,l:PLB.list})}catch(e){}plbGo(false)}else{PLB.ready=!PLB.ready;plbTick()}}
function plbLeave(){PLB.on=false;clearInterval(PLB.iv);plbShow(false);try{if(net){net.r.leave().catch(()=>{})}}catch(e){}net=null;state='title'}
function plbShow(v){if(PLB.el)PLB.el.style.display=v?'flex':'none'}
function plbRender(){if(!PLB.on){plbShow(false);return}const d=plbDom(),$=i=>d.querySelector('#'+i),hu=plbH(),nt=net;plbShow(true);
 const dead=!nt||nt.dead;
 $('prlb_t').textContent=hu?'CO-OP ELŐSZOBA':'CO-OP LOBBY';$('prlb_h').textContent=hu?'Szoba kód — a másik játékos ezt adja meg az Online co-opnál':'Room code — the other player types this in Online co-op';
 $('prlb_c').textContent=nt&&nt.code||'—';if(!$('prlb_cp').textContent.includes('✓'))$('prlb_cp').textContent=hu?'Kód másolása':'Copy code';
 const L=PLB.list.length?PLB.list:[{id:'me',n:String(uname||'Player').slice(0,12),r:!!(nt&&nt.isHost),h:!!(nt&&nt.isHost)}];
 $('prlb_l').innerHTML=L.map(p=>{const me=nt&&p.id===nt.r.id,st=p.h?(hu?'HOST':'HOST'):(p.r?(hu?'kész':'ready'):(hu?'várakozik':'waiting')),col=p.h||p.r?'#8fe0a0':'#c9b26a';
  return '<div style="display:flex;justify-content:space-between;padding:5px 8px;margin:3px 0;background:#1d2016;border-left:3px solid '+(me?'#8fe0ff':'#4a5238')+';font-size:13px"><span>'+String(p.n).replace(/[<>&]/g,'')+(me?(hu?'  (te)':'  (you)'):'')+'</span><span style="color:'+col+';font-size:11px;font-weight:700">'+st+'</span></div>'}).join('');
 const n=L.length;
 $('prlb_m').textContent=dead?(hu?'A host kilépett — a szoba megszűnt.':'The host left — the room is closed.'):nt.isHost?(n<2?(hu?'Még senki sem csatlakozott — indíthatsz egyedül is, később is be tudnak jönni.':'Nobody has joined yet — you can start alone; others can join later.'):(hu?'Indítsd el, ha mindenki kész.':'Start when everyone is ready.')):(PLB.ready?(hu?'Várjuk, hogy a host elindítsa a játékot…':'Waiting for the host to start…'):(hu?'Nyomd meg a Kész gombot.':'Press Ready.'));
 const go=$('prlb_go');go.style.display=dead?'none':'';go.textContent=nt&&nt.isHost?(hu?'INDÍTÁS':'START'):(PLB.ready?(hu?'Mégsem kész':'Not ready'):(hu?'KÉSZ':'READY'));$('prlb_lv').textContent=hu?'Kilépés':'Leave'}
/* the world stands still, keys go to the lobby */
{const up=update;update=function(dt){if(PLB.on&&state=='play')return;return up.apply(this,arguments)}}
addEventListener('keydown',e=>{if(!PLB.on)return;if(/^(Enter|NumpadEnter|Space)$/.test(e.code))plbAct();else if(e.code=='Escape')plbLeave();try{e.preventDefault();e.stopImmediatePropagation()}catch(x){}},true);
for(const ev of['mousedown','mouseup','click','touchstart','wheel'])addEventListener(ev,e=>{if(!PLB.on)return;if(e.target&&e.target.closest&&e.target.closest('#prlb'))return;try{e.stopImmediatePropagation()}catch(x){}},true);
try{FVUI.push(()=>PLB.on)}catch(e){}
/* no calendar box on top of the cutscene / lobby */
{const c=calOn209;calOn209=function(){if(PRI&&(CNS.on||PLB.on))return false;return c.apply(this,arguments)}}
