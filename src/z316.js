/* ===== z316: translations over the Cyrillic signs, UAZ instead of wrecks, real 3D models for the big props, camera-facing sprites for the small things ===== */
/* ---------- A. what the signs say ---------- */
const PTR={'ЭНЕРГЕТИК':['Energetik (a kultúrpalota neve)','Energetik (name of the palace of culture)'],'ДВОРЕЦ КУЛЬТУРЫ':['Kultúrpalota','Palace of Culture'],'ШКОЛА №3':['3. számú iskola','School No. 3'],'УЧИТЬСЯ!':['Tanulni!','Study!'],
 'УНИВЕРМАГ':['Áruház','Department store'],'ПРИПЯТЬ':['Pripjaty','Pripyat'],'МСЧ-126':['126. sz. egészségügyi egység','Medical Unit No. 126'],'БОЛЬНИЦА':['Kórház','Hospital'],'ПОЛЕСЬЕ':['Poleszje (a vidék neve)','Polesie (the region)'],
 'ГОСТИНИЦА':['Szálloda','Hotel'],'ДЕТСКИЙ САД':['Óvoda','Kindergarten'],'«КЛЮЧИК»':['„Kulcsocska” (az óvoda neve)','“Little Key” (kindergarten name)'],'ШТАБ':['Parancsnokság','Headquarters'],'СКЛАД':['Raktár','Warehouse'],
 'ПРИПЯТЬ|1970':['Pripjaty, 1970 — a város alapítása','Pripyat, 1970 — founding of the city'],'ПР. ЛЕНИНА':['Lenin sugárút','Lenin Avenue'],'УЛ. КУРЧАТОВА':['Kurcsatov utca','Kurchatov Street'],
 'УЛ. ЭНТУЗИАСТОВ':['Lelkesedők utcája','Enthusiasts Street'],'УЛ. ДРУЖБЫ НАРОДОВ':['Népek barátsága utca','Friendship of Peoples Street'],'УЛ. ГЕРОЕВ СТАЛИНГРАДА':['Sztálingrád hőseinek utcája','Heroes of Stalingrad Street'],
 'БУЛЬВАР СТРОИТЕЛЕЙ':['Építők körútja','Builders’ Boulevard'],'ПАРК':['Park','Park'],'ПЕЧАТЬ':['Sajtó (újságos kioszk)','Press (newsstand)'],'АТТРАКЦИОН':['Attrakció (vidámparki játék)','Attraction (fairground ride)'],
 'СЛАВА ТРУДУ!':['Dicsőség a munkának!','Glory to labour!'],'МИР · ТРУД · МАЙ':['Béke · Munka · Május','Peace · Labour · May'],'НАРОД И ПАРТИЯ — ЕДИНЫ!':['A nép és a Párt egy!','The people and the Party are one!'],'ЛЕНИНСКИМ КУРСОМ':['Lenini úton!','On Lenin’s course!']};
let PCAP=null;
function priCapScan(){PCAP=[];for(let i=0;i<W*H;i++){const o=ob[i];if(!o||o.pm!=null)continue;const tx=i%W,ty=(i/W)|0,fw=o.fw||1,fh=o.fh||1;let ru=null,cx=tx+fw/2,cy=ty+fh,h=2.4,w=fw;
  let ay=ty*T;if(o.t=='psign'){ru=o.tx;h=(o.hy!=null?o.hy:1.35)+fh+.5}else if(o.t=='pbill'){ru=PSLOG[(o.k|0)%PSLOG.length];cy=ty+1;h=4.3;w=4;ay=ty*T-4}
  else if(o.t=='pgate'){ru='ПАРК';cx=tx+3.5;cy=ty+.5;h=4.4;w=5;ay=ty*T-26}else if(o.t=='pkiosk'){ru='ПЕЧАТЬ';cy=ty+1;h=2.9;ay=ty*T+4}else if(o.t=='pbump'){ru='АТТРАКЦИОН';cy=ty+2;h=3.4;w=6;ay=ty*T-4}
  if(ru&&PTR[ru])PCAP.push({ru,x:cx,y:cy,h,w:Math.max(2,w),ay})}}
let CAPD=null;
function capEl(){if(CAPD)return CAPD;const w=document.getElementById('wrap')||document.body,d=document.createElement('div');d.id='prcap';
 d.style.cssText='position:absolute;pointer-events:none;z-index:35;display:none;transform:translate(-50%,-100%);text-align:center;background:rgba(10,12,8,.84);border-top:2px solid #e8c43a;padding:.25em .7em .3em;font-family:"DejaVu Sans",Arial,sans-serif;line-height:1.3;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.55)';w.appendChild(d);return CAPD=d}
function priCaption(){const d=capEl();if(!PCAP)priCapScan();if(!PCAP.length||inD||inC||fvUI()){d.style.display='none';return}
 const px=P.x/T,py=P.y/T,fp=typeof fvA=='function'&&fvA();let best=null,bd=1e9;
 if(fp){const yaw=FV.yaw,fx=-Math.sin(yaw),fy=-Math.cos(yaw);for(const e of PCAP){const dx=e.x-px,dy=e.y-py,dd=Math.hypot(dx,dy);if(dd>20||dd<.6)continue;const c=(fx*dx+fy*dy)/dd;if(c<.7)continue;if(c<Math.cos(Math.min(1.2,Math.atan((e.w/2+.6)/dd)+.12)))continue;if(dd<bd){bd=dd;best=e}}}
 else{for(const e of PCAP){const dd=Math.hypot(e.x-px,e.y-py);if(dd<6.5&&dd<bd){bd=dd;best=e}}}
 if(!best){d.style.display='none';return}let sx,sy;
 if(fp){const v=new THREE.Vector3(best.x,v3H(best.x|0,best.y|0)+best.h,best.y).project(V3.cam);if(v.z>1||v.z<-1){d.style.display='none';return}sx=(v.x*.5+.5)*VW;sy=(1-(v.y*.5+.5))*VH}
 else{sx=(best.x*T-cam.x)*ZM;sy=(best.ay-cam.y)*ZM-3}
 sx=Math.max(VW*.12,Math.min(VW*.88,sx));sy=Math.max(VH*.14,Math.min(VH*.8,sy));
 const hu=LANG=='hu',tx=PTR[best.ru][hu?0:1],ru=best.ru.replace('|',' · '),key=ru+'|'+tx;
 if(d._k!==key){d._k=key;d.innerHTML='<div style="color:#e8c43a;font-weight:bold;letter-spacing:.04em"></div><div style="color:#f2f0e0"></div>';d.children[0].textContent=ru;d.children[1].textContent=tx}
 const wd=(d.parentNode.clientWidth||960);d.style.fontSize=Math.max(11,wd/480*8.4)+'px';d.style.left=(sx/VW*100)+'%';d.style.top=(sy/VH*100)+'%';d.style.display='block'}
{const h0=hud;hud=function(){const r=h0.apply(this,arguments);try{if(PRI&&state=='play')priCaption();else if(CAPD)CAPD.style.display='none'}catch(e){console.warn('cap',e)}return r}}
/* ---------- B. UAZ ---------- */
const UAZC=[['#5a6a3c','#6e8048','#3e4a2a'],['#8a5a3a','#a06c48','#5e3c26'],['#6e7c84','#8494a0','#48545c']];
BIG.puaz=function(o,x,y){const c=UAZC[(o.c|0)%3],fw=o.fw||3,fh=o.fh||2,cx=pSX(x)+fw*8,cy=pSY(y)+fh*8;g.save();g.translate(cx,cy);if(o.v)g.rotate(Math.PI/2);
 g.fillStyle='rgba(0,0,0,.27)';g.fillRect(-21,-9,44,23);
 g.fillStyle='#1c1c1e';for(const wx of[-14,12])for(const wy of[-12,8]){g.fillRect(wx,wy,8,4)}
 g.fillStyle=c[2];g.fillRect(-20,-10,40,20);g.fillStyle=c[0];g.fillRect(-19,-9,38,18);g.fillStyle=c[1];g.fillRect(-19,-9,38,2);   /* hood + body */
 g.fillStyle=c[1];g.fillRect(8,-8,11,16);g.fillStyle='#1a2428';g.fillRect(6,-7,3,14);g.fillStyle='rgba(120,150,170,.55)';g.fillRect(6,-7,3,14);   /* windscreen */
 g.fillStyle='#b8b098';g.fillRect(-17,-8,23,16);g.fillStyle='#d8d4c4';g.fillRect(-17,-8,23,2);for(let i=0;i<4;i++){g.fillStyle='rgba(60,56,40,.25)';g.fillRect(-14+i*5,-8,1,16)}   /* canvas roof */
 g.fillStyle='#f4f8fc';g.fillRect(-16,-6,6,3);g.fillRect(-9,-1,9,4);g.fillRect(-14,3,5,3);   /* snow */
 g.fillStyle='#2a2a2c';g.beginPath();g.arc(-21,0,4,0,6.3);g.fill();g.fillStyle='#4a4a4e';g.beginPath();g.arc(-21,0,2,0,6.3);g.fill();   /* spare wheel */
 g.fillStyle='#e8d890';g.fillRect(19,-8,2,3);g.fillRect(19,5,2,3);g.fillStyle='#8a8a8e';g.fillRect(20,-6,1,12);g.restore()};
SOLID.puaz=1;SOLID.p_puaz=1;NMX.puaz='UAZ';
function priUaz(){const r=prRng(PRIS+55),band=(y,x)=>{for(const[yy,w]of PRS.ew)if(y>=yy&&y<yy+w)return 0;for(const[xx,w]of PRS.ns)if(x>=xx&&x<xx+w)return 1;if(x>=PRS.ave[0]&&x<PRS.ave[0]+PRS.ave[1])return 1;return -1};
 const wrecks=[];for(let i=0;i<W*H;i++){const o=ob[i];if(o&&o.t=='wreck'){wrecks.push([i%W,(i/W)|0]);ob[i]=null}}
 for(const[x,y]of wrecks){if(r()<.42)continue;const v=band(y,x);if(v<0)continue;const fw=v?2:3,fh=v?3:2,x0=x-1,y0=y-1;let ok=true;
  for(let yy=y0;yy<y0+fh&&ok;yy++)for(let xx=x0;xx<x0+fw;xx++){if(map[yy*W+xx]!=3){ok=false;break}const o=ob[yy*W+xx];if(o&&o.t!='plane'&&o.t!='pcrack'&&o.t!='tgrass'&&o.t!='bush'){ok=false;break}}
  if(!ok)continue;for(let yy=y0;yy<y0+fh;yy++)for(let xx=x0;xx<x0+fw;xx++)ob[yy*W+xx]=null;setFP({t:'puaz',v,c:Math.floor(r()*3)},x0,y0,fw,fh)}}
{const f=priFinish;priFinish=function(rr){const o=f.apply(this,arguments);PCAP=null;try{priUaz()}catch(e){console.warn('uaz',e)}return o}}
/* ---------- C. real 3D models ---------- */
const LM3=new Map(),BRD3=new Map(),ANIM3=[];
function lm3(c){let m=LM3.get(c);if(!m){m=new THREE.MeshLambertMaterial({color:c});LM3.set(c,m)}return m}
function bx3(G,x,y,z,w,h,d,c){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),lm3(c));m.position.set(x+w/2,y+h/2,z+d/2);G.add(m);return m}
function cy3(G,x,y,z,r0,r1,h,c,seg,ax){const m=new THREE.Mesh(new THREE.CylinderGeometry(r0,r1,h,seg||12),lm3(c));m.position.set(x,y+h/2,z);if(ax)m.rotation.x=Math.PI/2;G.add(m);return m}
function brd3(key,w,h,fn){let m=BRD3.get(key);if(m)return m;const cv=document.createElement('canvas');cv.width=w;cv.height=h;v3Paint(cv,0,0,fn);m=new THREE.MeshLambertMaterial({map:v3Tex(cv)});BRD3.set(key,m);return m}
function pl3(G,x,y,z,w,h,mat,back){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat);m.position.set(x+w/2,y+h/2,z);if(back){m.rotation.y=Math.PI;m.position.x=x+w/2}G.add(m);return m}
const P3={concrete:0x8e9094,dark:0x5a5a5e,red:0xa8241c,gold:0xe8c43a,cream:0xe0d4b0};
function pylon3(G,x,z,ht){bx3(G,x+.1,0,z+.1,.8,ht,.8,P3.concrete);bx3(G,x,ht,z,1,.22,1,0xa0a2a6);bx3(G,x+.1,.1,z+.1,.8,.12,.8,0x6e7074);
 const st=brd3('pstar',32,32,()=>{Q(0,0,32,32,'#8e9094');pStar(16,16,12,PRED)});pl3(G,x+.25,ht*.5,z+.905,.5,.5,st);pl3(G,x+.25,ht*.5,z+.095,.5,.5,st,1)}
const M3={};
M3.ppil=(o,G)=>pylon3(G,0,0,3.3);
M3.pgate=(o,G)=>{pylon3(G,0,0,3.3);const m=brd3('arch',160,40,()=>{Q(0,0,160,40,'#3a3a3e');Q(2,2,156,36,PRED);pStar(22,20,11,PGOLD);pStar(138,20,11,PGOLD);pTxt('ПАРК',80,29,'#f4dc88',22,'center',0)});
 bx3(G,1,2.55,.3,5,1.35,.4,0x3a3a3e);pl3(G,1,2.6,.705,5,1.25,m);pl3(G,1,2.6,.295,5,1.25,m,1);bx3(G,1.2,2.4,.35,4.6,.16,.3,0x6e7074)};
M3.pmon=(o,G)=>{bx3(G,.1,0,.4,2.8,.4,2.2,0x6e7074);bx3(G,.4,.4,.7,2.2,.35,1.6,P3.concrete);bx3(G,.55,.75,1.1,1.9,3.0,.8,0x5a5a5e);
 const m=brd3('mon',120,190,()=>{Q(0,0,120,190,'#5a5a5e');Q(3,3,114,184,PRED);pStar(60,48,30,PGOLD);pHS(60,128,66,PGOLD)});pl3(G,.62,.9,1.91,1.76,2.7,m);pl3(G,.62,.9,1.09,1.76,2.7,m,1)};
M3.pbill=(o,G)=>{const k=(o.k|0)%PSLOG.length,m=brd3('bill'+k,232,88,()=>{Q(0,0,232,88,'#3a3a3e');Q(3,3,226,82,PRED);pStar(30,44,20,PGOLD);pHS(198,44,48,PGOLD);pTxt(PSLOG[k],116,52,'#f0d890',k==3?17:24,'center',0)});
 bx3(G,.5,0,.95,.14,2.6,.14,0x5a5a5e);bx3(G,3.36,0,.95,.14,2.6,.14,0x5a5a5e);bx3(G,.1,2.2,.9,3.8,1.5,.2,0x3a3a3e);pl3(G,.15,2.25,1.105,3.7,1.4,m);pl3(G,.15,2.25,.895,3.7,1.4,m,1)};
M3.pbusst=(o,G)=>{bx3(G,0,2.3,.2,3,.18,1.5,0x7a7e82);bx3(G,0,2.2,.2,3,.1,.08,P3.red);for(const x of[.1,2.85])for(const z of[.25,1.55])bx3(G,x,0,z,.07,2.3,.07,0x4a4a4e);
 bx3(G,.1,.2,.2,2.8,2.1,.07,0x3a4a50);const m=brd3('busst',180,100,()=>{Q(0,0,180,100,'#3a4a50');Q(0,0,180,8,PRED);pStar(40,52,16,PRED);pHS(90,52,40,PGOLD);pStar(140,52,16,PRED)});pl3(G,.2,.5,.275,2.6,1.4,m);pl3(G,.2,.5,.195,2.6,1.4,m,1);bx3(G,.4,.45,.5,2.2,.07,.45,0x8a6a40);bx3(G,.4,.2,.55,.07,.25,.35,0x4a3a2a);bx3(G,2.5,.2,.55,.07,.25,.35,0x4a3a2a)};
M3.pkiosk=(o,G)=>{bx3(G,.15,0,.4,1.7,1.9,1.25,0x6a8a78);bx3(G,0,1.9,.3,2,.22,1.45,P3.red);bx3(G,0,2.12,.3,2,.05,1.45,0xf0f4f8);
 const w=brd3('kiosk',120,100,()=>{Q(0,0,120,100,'#6a8a78');Q(8,40,104,36,'#1c2a26');for(let i=0;i<7;i++)Q(14+i*14,48,10,14,['#c8402e','#d8c8a0','#d8b43a','#c8402e','#d8c8a0','#3a6a9a','#c8402e'][i]);Q(0,0,120,30,PRED);pTxt('ПЕЧАТЬ',60,22,'#f4dc88',17,'center',0)});pl3(G,.2,.2,1.655,1.6,1.4,w);pl3(G,.2,.2,.395,1.6,1.4,w,1)};
M3.pbump=(o,G)=>{bx3(G,.1,0,.2,5.6,.08,3.6,0x4a4a50);for(const[x,z,w,d]of[[.1,.2,5.6,.15],[.1,3.65,5.6,.15],[.1,.2,.15,3.6],[5.55,.2,.15,3.6]])bx3(G,x,.08,z,w,.42,d,0x8a8a8e);
 for(const x of[.05,5.5])for(const z of[.15,3.6])bx3(G,x,0,z,.14,2.4,.14,0x7a7a7e);bx3(G,.05,2.35,.15,5.6,.12,.14,0x7a7a7e);bx3(G,.05,2.35,3.6,5.6,.12,.14,0x7a7a7e);
 for(let i=0;i<12;i++)bx3(G,.3+i*.46,2.0,3.62,.26,.34,.05,i%2?P3.red:P3.cream);
 const sg=brd3('bump',220,34,()=>{Q(0,0,220,34,'#3a3a3e');Q(2,2,216,30,PRED);pTxt('АТТРАКЦИОН',110,25,'#f4dc88',20,'center',0)});pl3(G,.5,2.45,3.68,4.6,.7,sg);
 const cc=[0xc8402e,0xd8b43a,0x3a6a9a,0x4a8a4a,0xa8602e,0x8a4a8a];for(let i=0;i<6;i++){const x=.6+((i*37)%44)/10,z=.6+((i*23)%26)/10;bx3(G,x,.1,z,.62,.3,.46,0x1a1a1c);bx3(G,x+.04,.2,z+.04,.54,.28,.38,cc[i]);bx3(G,x+.28,.48,z+.2,.04,.5,.04,0x6a6a6a)}};
M3.pcar2=(o,G,fw,fh)=>{const cx=fw/2,cz=fh/2;cy3(G,cx,0,cz,1.4,1.45,.3,0x7a6a58,18);cy3(G,cx,.3,cz,.1,.1,2.2,0x5a5a5e,8);const R=new THREE.Group();R.position.set(cx,0,cz);G.add(R);
 for(let i=0;i<10;i++){const a0=i*Math.PI/5,m=new THREE.Mesh(new THREE.CylinderGeometry(.04,1.5,.75,1,1,false,a0,Math.PI/5),new THREE.MeshLambertMaterial({color:i%2?0xc8402e:0xe0d4b0,side:THREE.DoubleSide}));m.position.set(0,2.55,0);R.add(m)}
 bx3(R,-.07,2.9,-.07,.14,.14,.14,P3.gold);for(let i=0;i<6;i++){const a=i*Math.PI/3,x=Math.cos(a)*1.0,z=Math.sin(a)*1.0;bx3(R,x-.02,.35,z-.02,.04,1.8,.04,0x6a6a6a);bx3(R,x-.11,.7,z-.2,.22,.36,.4,i%2?0xc8402e:0xd8c8a0)}
 ANIM3.push({g:R,fn:t=>{R.rotation.y=t/4000}})};
M3.pswing=(o,G,fw,fh)=>{const cx=fw/2,cz=fh/2;cy3(G,cx,0,cz,.1,.13,3.5,0x4a4a50,8);const R=new THREE.Group();R.position.set(cx,0,cz);G.add(R);
 const cn=new THREE.Mesh(new THREE.CylinderGeometry(.1,1.4,.55,12),new THREE.MeshLambertMaterial({color:0xa8241c}));cn.position.y=3.35;R.add(cn);
 for(let i=0;i<8;i++){const a=i*Math.PI/4,W2=new THREE.Group();W2.rotation.y=a;R.add(W2);const ch=new THREE.Mesh(new THREE.BoxGeometry(.03,2.33,.03),lm3(0x7a7a7a));ch.position.set(.6,2.2,0);ch.rotation.z=.54;W2.add(ch);bx3(W2,1.05,1.0,-.15,.36,.08,.3,i%2?0xc8402e:0xd8b43a)}
 ANIM3.push({g:R,fn:t=>{R.rotation.y=t/2600}})};
M3.pwheel=(o,G,fw,fh)=>{const cx=fw/2,cz=fh/2,R=3.7,hy=6.2,Wg=new THREE.Group();Wg.position.set(cx,hy,cz);G.add(Wg);const rm=lm3(0xc8a038),sm=lm3(0xb89030);
 for(const z of[-.42,.42]){let t=new THREE.Mesh(new THREE.TorusGeometry(R,.07,5,40),rm);t.position.z=z;Wg.add(t);t=new THREE.Mesh(new THREE.TorusGeometry(R*.52,.05,5,28),rm);t.position.z=z;Wg.add(t)}
 for(let i=0;i<12;i++){const a=i*Math.PI/6;for(const z of[-.42,.42]){const b=new THREE.Mesh(new THREE.BoxGeometry(R,.05,.05),sm);b.position.set(Math.cos(a)*R/2,Math.sin(a)*R/2,z);b.rotation.z=a;Wg.add(b)}
  const c=new THREE.Mesh(new THREE.BoxGeometry(.05,.05,.84),sm);c.position.set(Math.cos(a)*R,Math.sin(a)*R,0);Wg.add(c)}
 const hub=new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,1.1,12),lm3(0x7a4a2a));hub.rotation.x=Math.PI/2;Wg.add(hub);
 const cab=[],cc=[0xc8402e,0xd8b43a,0x3a6a9a,0x4a8a4a,0xa8602e,0xc8402e,0xd8b43a,0x3a6a9a,0x4a8a4a,0xa8602e,0xc8402e,0xd8b43a];
 for(let i=0;i<12;i++){const a=i*Math.PI/6,C=new THREE.Group();C.position.set(Math.cos(a)*R,Math.sin(a)*R,0);Wg.add(C);bx3(C,-.34,-.95,-.3,.68,.55,.6,cc[i]);bx3(C,-.38,-.4,-.34,.76,.07,.68,0xf0f4f8);bx3(C,-.03,-.45,-.03,.06,.45,.06,0x6a6a6a);cab.push(C)}
 const lg=lm3(0x7a4a2a),ang=Math.atan(2.4/hy),L=Math.hypot(2.4,hy);
 for(const z of[-.6,.6])for(const s of[-1,1]){const b=new THREE.Mesh(new THREE.BoxGeometry(.16,L,.16),lg);b.position.set(cx+s*1.2,hy/2,cz+z);b.rotation.z=s*ang;G.add(b)}
 for(const z of[-.6,.6])bx3(G,cx-1.9,1.3,cz+z-.04,3.8,.08,.08,0x5a3a22);bx3(G,cx-2.7,0,cz-.9,5.4,.12,1.8,0x6e7074);
 ANIM3.push({g:Wg,fn:t=>{const r=t/21000*2.4;Wg.rotation.z=r;for(const c of cab)c.rotation.z=-r}})};
M3.puaz=(o,G,fw,fh)=>{const c=[[0x5a6a3c,0x3e4a2a],[0x8a5a3a,0x5e3c26],[0x6e7c84,0x48545c]][(o.c|0)%3],U=new THREE.Group();U.position.set(fw/2,0,fh/2);if(o.v)U.rotation.y=-Math.PI/2;G.add(U);
 bx3(U,-1.2,.24,-.54,2.4,.5,1.08,c[0]);bx3(U,.35,.74,-.5,.85,.1,1.0,c[0]);bx3(U,-1.15,.74,-.5,1.5,.52,1.0,0xb8b098);bx3(U,-1.15,1.26,-.5,1.5,.04,1.0,0xd8d4c4);
 bx3(U,.35,.74,-.46,.04,.36,.92,0x1a2428);bx3(U,-1.2,.6,-.54,.02,.2,1.08,c[1]);bx3(U,1.19,.35,-.46,.02,.14,.28,0xe8d890);bx3(U,1.19,.35,.18,.02,.14,.28,0xe8d890);bx3(U,1.2,.3,-.5,.05,.12,1.0,0x8a8a8e);
 bx3(U,-1.1,1.3,-.46,1.0,.05,.8,0xf4f8fc);bx3(U,.42,.84,-.42,.7,.04,.84,0xf4f8fc);
 for(const x of[-.78,.78])for(const z of[-.58,.58]){const w=cy3(U,x,0,z,.27,.27,.2,0x1c1c1e,10,1);w.position.set(x,.27,z)}
 cy3(U,-1.28,.2,0,.24,.24,.12,0x2a2a2c,10,0).rotation.z=Math.PI/2;const sp=U.children[U.children.length-1];sp.position.set(-1.3,.7,0)};
/* ---------- D. in the chunk build: M3 models in place of the flat planes; small stuff turns to the camera ---------- */
{const bo=v3BuildObjs;v3BuildObjs=function(ch){bo.apply(this,arguments);
 try{if(!PRI)return;const x0=ch.cx*GQS,y0=ch.cy*GQS;
  for(let a=ANIM3.length-1;a>=0;a--)if(ANIM3[a].og===ch.og||ANIM3[a].ch===ch&&ANIM3[a].og!==ch.og)ANIM3.splice(a,1);
  const n0=ANIM3.length;
  for(let y=0;y<GQS;y++)for(let x=0;x<GQS;x++){const tx=x0+x,ty=y0+y,o=ob[ty*W+tx];if(!o||!M3[o.t])continue;const s=v3Sprite(o,tx,ty),fw=o.fw||1,fh=o.fh||1;
   for(const m of ch.og.children.slice())if(m.material===s.mat)ch.og.remove(m);
   const G=new THREE.Group();G.position.set(tx,v3H(tx,ty),ty);const k0=ANIM3.length;try{M3[o.t](o,G,fw,fh)}catch(e){console.warn('m3',o.t,e)}for(let a=k0;a<ANIM3.length;a++){ANIM3[a].og=ch.og;ANIM3[a].ch=ch}ch.og.add(G)}
  ch.pb=[];for(const b of(ch.xb||[])){const m=b.m;if(!m.parent)continue;
   for(const m2 of ch.og.children.slice())if(m2!==m&&m2.material===m.material&&m2.geometry===m.geometry)ch.og.remove(m2);
   const fh=Math.round((b.p0.z+.15-b.cz)*2),tx=Math.round(b.p0.x),ty=Math.round(b.p0.z+.15-fh),o=(tx>=0&&ty>=0&&tx<W&&ty<H)?ob[ty*W+tx]:null;
   if(o&&o.t=='pbirch')try{b.s=4.6/(fvSprH(m.material.map.image)/16)}catch(e){}
   m.scale.setScalar(b.s||FV_ES);m.castShadow=false;ch.pb.push(b)}
 }catch(er){console.warn('z316 build',er)}}}
{const ff=fvFrame;fvFrame=function(){ff.apply(this,arguments);if(!PRI||!V3)return;const yaw=FV.yaw,cy=Math.cos(yaw),sy=Math.sin(yaw),t=performance.now();
 for(const ch of V3.chunks.values()){if(!ch.vis||!ch.pb)continue;for(const b of ch.pb){const m=b.m,s=b.s||FV_ES,hw=b.hw*s;m.rotation.set(0,yaw,0);m.position.set(b.cx-hw*cy,b.y,b.cz+hw*sy)}}
 for(const a of ANIM3)if(a.ch&&a.ch.vis)a.fn(t)}}
