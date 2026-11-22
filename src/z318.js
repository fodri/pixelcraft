/* ===== z318: the first-person view on touch screens — joystick moves, dragging turns, a tap fires, a button switches between FPS and top-down ===== */
const TFP={id:null,x:0,x0:0,y0:0,t0:0,moved:false,fired:false,tm:null,init:false};
{const fc=fvCan;fvCan=function(){if(PRI&&typeof THREE!='undefined'&&TCH.on)return state=='play'&&!inD&&!view;return fc.apply(this,arguments)}}
{const up=update;update=function(dt){up(dt);if(!PRI||state!='play')return;
 if(!TFP.init){TFP.init=true;let s=null;try{s=localStorage.getItem('pxc_fps')}catch(e){}if(s!=='0')FPV=true}
 if(TCH.on&&fvA()&&!fvUI()){FV.lock=true;FV.noLock=false}}}
const tfpActive=()=>PRI&&TCH.on&&fvA()&&!fvUI()&&state=='play';
C.addEventListener('touchstart',e=>{if(!tfpActive())return;e.preventDefault();e.stopImmediatePropagation();const t=e.changedTouches[0];
 if(TFP.id!=null)return;TFP.id=t.identifier;TFP.x=TFP.x0=t.clientX;TFP.y0=t.clientY;TFP.t0=performance.now();TFP.moved=false;TFP.fired=false;
 TFP.tm=setTimeout(()=>{if(TFP.id!=null&&!TFP.moved&&tfpActive()){TFP.fired=true;tMouse('mousedown',t,0)}},260)},{passive:false,capture:true});
C.addEventListener('touchmove',e=>{if(TFP.id==null)return;if(tfpActive()){e.preventDefault();e.stopImmediatePropagation()}
 for(const t of e.changedTouches)if(t.identifier==TFP.id){const dx=t.clientX-TFP.x;TFP.x=t.clientX;if(Math.hypot(t.clientX-TFP.x0,t.clientY-TFP.y0)>12)TFP.moved=true;if(tfpActive()&&FV.lock)FV.yaw-=dx*.0055}},{passive:false,capture:true});
const tfpEnd=e=>{if(TFP.id==null)return;for(const t of e.changedTouches)if(t.identifier==TFP.id){if(tfpActive()){e.preventDefault();e.stopImmediatePropagation()}clearTimeout(TFP.tm);
  if(TFP.fired)tMouse('mouseup',t,0);else if(!TFP.moved&&performance.now()-TFP.t0<400&&tfpActive()){tMouse('mousedown',t,0);setTimeout(()=>tMouse('mouseup',t,0),90)}
  TFP.id=null;TFP.fired=false}};
C.addEventListener('touchend',tfpEnd,{passive:false,capture:true});C.addEventListener('touchcancel',tfpEnd,{passive:false,capture:true});
/* the switch button */
{const w=document.getElementById('wrap');const b=document.createElement('div');b.id='fpsbtn';b.style.cssText='position:absolute;left:1.2%;top:38%;width:11%;max-width:62px;aspect-ratio:1;border-radius:50%;background:rgba(10,12,8,.62);border:2px solid #e8c43a;color:#e8c43a;font:bold 13px "DejaVu Sans",Arial,sans-serif;display:none;align-items:center;justify-content:center;z-index:30;user-select:none;-webkit-user-select:none;touch-action:none;cursor:pointer';
 const go=e=>{e.preventDefault();e.stopPropagation();if(PRI&&state=='play')fvToggle()};b.addEventListener('touchstart',go,{passive:false});b.addEventListener('click',go);(w||document.body).appendChild(b);
 setInterval(()=>{const show=!!PRI&&state=='play'&&!fvUI()&&!inD;b.style.display=show?'flex':'none';if(show){const t=TPS?'FPS':'TPS';if(b.textContent!==t)b.textContent=t}},300)}
{const t0=toast112;toast112=function(a,b){if(PRI&&TCH.on&&/FPS/.test(String(a)))b=LANG=='hu'?'Joystick: mozgás · húzás: fordulás · koppintás: lövés · kerek gomb: FPS / TPS':'Joystick: move · drag: turn · tap: fire · round button: FPS / TPS';return t0.call(this,a,b)}}
