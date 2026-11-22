/* ===== z323: the opening is a slow cutscene — a camera flies over the Ferris wheel, the monument and the HQ hut, letterbox bars, text typed out slowly; Space / Enter / click skips ===== */
const CNS={on:false,t:0,T:41.4,out:false,ot:0,a:1,fin:0,sv:null,yaw:0,skip:false};
const CNSL=[[2.3,6.2,'1986. április 26., 01:23.','April 26, 1986 — 01:23.'],
 [6.6,13.6,'A 4-es reaktor felrobban. Ötvenezer ember azt hiszi, csak pár napra mennek el.','Reactor four explodes. Fifty thousand people think they are leaving for a few days.'],
 [16.2,20.6,'Soha nem jöttek vissza.','They never came back.'],
 [20.9,27.0,'2070. A világ befagyott, de Pripjaty ugyanaz maradt — mintha megállt volna az idő.','2070. The world froze over, but Pripyat stayed the same — as if time had stopped.'],
 [28.8,34.2,'A csendben mozgás van. Ők még itt vannak.','Something moves in the silence. They are still here.'],
 [34.6,40.6,'Te vagy az új stalker. Maradj melegen. Figyeld a Geigert.','You are the new stalker. Stay warm. Watch the Geiger counter.']];
const ciSm=u=>{u=Math.max(0,Math.min(1,u));return u*u*(3-2*u)},ciL=(a,b,u)=>a+(b-a)*u;
let CNSS=null;
function cinShots(){if(CNSS)return CNSS;let wx=161,wz=130,mx=182,mz=161;
 for(let i=0;i<W*H;i++){const o=ob[i];if(!o||o.pm!=null)continue;if(o.t=='pwheel'){wx=i%W+(o.fw||6)/2;wz=((i/W)|0)+(o.fh||6)/2}else if(o.t=='pmon'){mx=i%W+(o.fw||2)/2;mz=((i/W)|0)+(o.fh||2)/2}}
 const hx=170,hz=288;
 CNSS=[{t0:0,d:14.6,f:u=>{const e=ciSm(u),a=ciL(2.55,3.35,e),r=ciL(19,15,e);return[wx+Math.sin(a)*r,wz-Math.cos(a)*r,ciL(10,5.5,e),wx,wz,ciL(6.6,5.6,e)]}},
  {t0:14.6,d:12.6,f:u=>{const e=ciSm(u),a=ciL(.4,1.15,e),r=ciL(10,6.5,e);return[mx+Math.sin(a)*r,mz+Math.cos(a)*r,ciL(1.5,2.1,e),mx,mz,ciL(2.4,3.2,e)]}},
  {t0:27.2,d:14.2,f:u=>{const e=ciSm(u);return[ciL(179,173,e),ciL(299,295,e),ciL(1.3,2.7,e),hx,hz,ciL(1.7,2.6,e)]}}];return CNSS}
function cinStart(){if(window.NOCUT||/nocut/.test(location.search)||CNS.on||!PRI)return;CNSS=null;CNS.on=true;CNS.t=0;CNS.out=false;CNS.ot=0;CNS.skip=false;CNS.a=1;CNS.fin=0;CNS.sv={x:P.x,y:P.y};if(typeof THREE!='undefined')FPV=true}
function cinEnd(){CNS.on=false;CNS.out=false;if(CNS.sv){P.x=CNS.sv.x;P.y=CNS.sv.y}CNS.fin=1.1;try{FV.yaw=-1.25;FV.pitch=-.05;FV.tpD=null;cam.x=cl(P.x-VW/(2*ZM),0,W*T-VW/ZM);cam.y=cl(P.y-VH/(2*ZM),0,H*T-VH/ZM)}catch(e){}
 try{const e=document.getElementById('prcap');if(e)e.style.display='none'}catch(x){}try{say(prT('Pripjaty, 1986. Mintha megállt volna az idő.','Pripjat, 1986. As if time had stopped.'))}catch(e){}}
function cinStep(dt){CNS.t+=dt;if(typeof THREE!='undefined'&&V3&&V3.ok)FPV=true;if(CNS.skip&&!CNS.out){CNS.out=true;CNS.ot=0}
 if(CNS.out){CNS.ot+=dt;if(CNS.ot>=.7){cinEnd();return}}else if(CNS.t>=CNS.T){CNS.out=true;CNS.ot=0}
 const S=cinShots();let sh=S[S.length-1];for(const q of S)if(CNS.t>=q.t0&&CNS.t<q.t0+q.d){sh=q;break}
 const lt=CNS.t-sh.t0;let a=lt<.9?1:Math.max(0,1-(lt-.9)/1);const rem=sh.d-lt;if(rem<.8)a=Math.max(a,1-rem/.8);if(CNS.out)a=Math.max(a,Math.min(1,CNS.ot/.7));CNS.a=a;CNS.sh=sh;CNS.u=Math.min(1,lt/sh.d)}
/* the camera */
{const fc=fvCam;fvCam=function(){if(!CNS.on||!CNS.sh)return fc.apply(this,arguments);const c=V3.cam,v=CNS.sh.f(CNS.u),gx=v[0],gz=v[1],gy=v3HW(gx*T,gz*T);
 c.position.set(gx,gy+v[2],gz);c.rotation.order='YXZ';const lx=v[3],lz=v[4],ly=v3HW(lx*T,lz*T)+v[5];c.lookAt(lx,ly,lz);
 if(Math.abs(c.fov-52)>.01||c.near!==.04){c.fov=52;c.near=.04;c.far=140;c.updateProjectionMatrix()}
 P.x=cl(gx*T,16,(W-2)*T);P.y=cl(gz*T,16,(H-2)*T);FV.yaw=Math.atan2(-(lx-gx),-(lz-gz));
 const tg=FV.tg||(FV.tg=new THREE.Vector3());tg.set(gx,gy,gz);V3.tgt=tg.clone();return tg}}
try{FVUI.push(()=>CNS.on)}catch(e){}
/* the world stands still while it plays */
{const up=update;update=function(dt){if(PRI&&CNS.on&&state=='play'){cinStep(dt);return}if(CNS.fin>0)CNS.fin=Math.max(0,CNS.fin-dt);return up.apply(this,arguments)}}
for(const ev of['keydown','mousedown','touchstart'])addEventListener(ev,e=>{if(!CNS.on||CNS.out)return;if(ev=='keydown'&&!/^(Space|Enter|Escape|NumpadEnter)$/.test(e.code))return;try{e.preventDefault();e.stopImmediatePropagation()}catch(x){}CNS.skip=true},true);
{const po=priOpening;priOpening=function(){const r=po.apply(this,arguments);try{cinStart()}catch(e){console.warn('cut',e)}return r}}
/* drawing: bars, typed subtitles, fade */
function cinWrap(t,maxw){const w=t.split(' '),L=[];let c='';for(const x of w){const n=c?c+' '+x:x;if(g.measureText(n).width>maxw&&c){L.push(c);c=x}else c=n}if(c)L.push(c);return L}
function drawCin(){try{weather()}catch(e){}
 const bh=Math.round(VH*.115*Math.min(1,CNS.t/.9)),hu=LANG=='hu';Q(0,0,VW,bh,'#000');Q(0,VH-bh,VW,bh,'#000');
 noTr=true;try{let li=null;for(const l of CNSL)if(CNS.t>=l[0]&&CNS.t<l[1]+.5){li=l;break}
  if(li){const t=hu?li[2]:li[3],n=Math.min(t.length,Math.floor((CNS.t-li[0])*17)),done=n>=t.length,al=Math.min(1,(li[1]+.5-CNS.t)/.5);g.font=fnt(1,10);const L=cinWrap(t,VW-90);let k=0;g.globalAlpha=Math.max(0,Math.min(1,al))*(1-CNS.a*.9);
   const y0=VH-bh-6-(L.length-1)*13;for(let j=0;j<L.length;j++){const part=t.slice(0,n),cut=L.slice(0,j).join(' ').length+(j?1:0),seg=part.slice(cut,cut+L[j].length);if(seg.length){txt(seg+(!done&&j==L.length-1||(!done&&seg.length<L[j].length)?'_':''),VW/2,y0+j*13+1,'#000','center');txt(seg+(!done&&seg.length<L[j].length?'_':''),VW/2,y0+j*13,'#efe6c4','center')}}g.globalAlpha=1}
  g.globalAlpha=.55;g.font=fnt(0,7);txt(hu?'Szóköz / Enter / kattintás: kihagyás':'Space / Enter / click: skip',VW-8,VH-5,'#9a9a8a','right');g.globalAlpha=1;
  if(CNS.a>0){g.globalAlpha=CNS.a;Q(0,0,VW,VH,'#000');g.globalAlpha=1}}finally{noTr=false;g.globalAlpha=1}}
{const h0=hud;hud=function(){if(PRI&&CNS.on&&state=='play'){try{const e=document.getElementById('prcap');if(e)e.style.display='none'}catch(x){}drawCin();return}
 const r=h0.apply(this,arguments);if(PRI&&CNS.fin>0&&state=='play'){g.globalAlpha=Math.min(1,CNS.fin/1.1);Q(0,0,VW,VH,'#000');g.globalAlpha=1}return r}}
