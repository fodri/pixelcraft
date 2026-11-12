/* ===== v131: ZÓNA 2100 — fun pass: pick a difficulty, gentler hunger and thirst, a reward for every story step,
   pickup and kill feedback, fast travel between known places, a quieter first act, a run summary at the end ===== */
GAMEV=192;
const ZF={hs:0,pick:[],inv0:null,ban:null,dq:null,dqOk:false,tv:0};
const zfz=()=>ZS.fun||(ZS.fun={vis:{},k:0});

/* ---------- difficulty when a Zóna story begins ---------- */
const ZDQ=[[1,['Történet','Story'],['A sztorira figyelsz: lassan éhezel,','az ellenség gyengébben üt.']],[2,['Normál','Normal'],['Kiegyensúlyozott túlélés —','így terveztük.']],[3,['Túlélő','Survivor'],['Kemény éjszakák, erős ellenség.','Minden golyó számít.']]];
const ZDQE=[['You follow the story: hunger is slow,','enemies hit softer.'],['Balanced survival —','the way we designed it.'],['Hard nights, strong enemies.','Every bullet counts.']];
{const sm131=startMode;startMode=function(story){if(story===2&&MODEQ&&!ZF.dqOk&&!net){ZF.dq={sel:DIFF<=1?0:DIFF==2?1:2,t0:performance.now()};MODEQ=null;try{snd('ui')}catch(e){}return}ZF.dqOk=false;return sm131.apply(this,arguments)}}
function zdqRects(){const w=250,h=38,gap=6,x=VW/2-w/2,y0=VH/2-(3*h+2*gap)/2+10;return[0,1,2].map(i=>({x,y:y0+i*(h+gap),w,h}))}
function zdqGo(i){const d=ZDQ[i];if(!d)return;DIFF=d[0];try{localStorage.setItem('pxc_diff',String(DIFF))}catch(e){}ZF.dq=null;ZF.dqOk=true;try{snd('ui')}catch(e){}MODEQ={sel:2,t0:performance.now()};startMode(2)}
function zdqDraw(){const h=zhu(),R_=zdqRects();Q(0,0,VW,VH,'rgba(6,8,6,.86)');noTr=true;
 g.font=fnt(1,14);g.textAlign='center';g.fillStyle='#000';g.fillText(h?'Milyen legyen a Zóna?':'How hard is the Zone?',VW/2+1,R_[0].y-17);g.fillStyle='#ffd84a';g.fillText(h?'Milyen legyen a Zóna?':'How hard is the Zone?',VW/2,R_[0].y-18);
 R_.forEach((q,i)=>{const on=ZF.dq.sel==i,d=ZDQ[i],L=h?d[2]:ZDQE[i];Q(q.x-1,q.y-1,q.w+2,q.h+2,on?'#ffd84a':'#3a4634');Q(q.x,q.y,q.w,q.h,on?'#3a2c1a':'#16140e');if(on)Q(q.x,q.y,3,q.h,'#ffd84a');
  txt(d[1][h?0:1],q.x+12,q.y+13,on?'#ffd84a':'#e8e0c8');txt(L[0],q.x+12,q.y+24,'#a8b49a');txt(L[1],q.x+12,q.y+33,'#a8b49a');if(i==1){txt(h?'ajánlott':'recommended',q.x+q.w-8,q.y+13,'#6a8a5a','right')}});
 txt(h?'↑/↓ választ · Enter indít · Esc vissza — később a Beállításokban is állítható':'↑/↓ choose · Enter start · Esc back — you can change it later in Settings',VW/2,R_[2].y+R_[2].h+16,'#7a846a','center');noTr=false}
{const mn131=menu;menu=function(){mn131();try{if(ZF.dq&&state=='title')zdqDraw()}catch(e){noTr=false}}}
addEventListener('keydown',e=>{if(!ZF.dq)return;if(state!='title'){ZF.dq=null;return}const c=e.code;e.preventDefault();e.stopImmediatePropagation();
 if(c=='ArrowUp'||c=='KeyW'){ZF.dq.sel=(ZF.dq.sel+2)%3;snd('ui')}else if(c=='ArrowDown'||c=='KeyS'||c=='Tab'){ZF.dq.sel=(ZF.dq.sel+1)%3;snd('ui')}
 else if(c=='Enter'||c=='Space'||c=='NumpadEnter')zdqGo(ZF.dq.sel);else if(c=='Escape'){ZF.dq=null;MODEQ={sel:2,t0:performance.now()};snd('ui')}},true);
addEventListener('mousemove',()=>{if(!ZF.dq)return;zdqRects().forEach((q,i)=>{if(ms.x>=q.x&&ms.x<q.x+q.w&&ms.y>=q.y&&ms.y<q.y+q.h)ZF.dq.sel=i})});
addEventListener('mousedown',e=>{if(!ZF.dq)return;e.preventDefault();e.stopImmediatePropagation();try{sc(e)}catch(_){}if(performance.now()-ZF.dq.t0<250)return;const R_=zdqRects();for(let i=0;i<3;i++){const q=R_[i];if(ms.x>=q.x&&ms.x<q.x+q.w&&ms.y>=q.y&&ms.y<q.y+q.h){zdqGo(i);return}}},true);

/* ---------- rewards for every story step: what you need for the next one ---------- */
const ZRW={gather:[{stone_pickaxe:1,berry:3},['Egy rozsdás kőcsákány hever a fűben.','A rusty stone pickaxe lies in the grass.']],
 fire:[{wood:16,stone_axe:1,cooked:2},['A tűz mellett valaki hagyott egy fejszét és tűzifát.','Someone left an axe and firewood by the fire.']],
 shelter:[{bandage:2,torch:1,stone_sword:1},['A sarokban egy régi táska: kötszer, fáklya, bozótvágó.','An old bag in the corner: bandages, a flare, a machete.']],
 camp:[{canned:2,bottle:2},['A tábor szívesen lát: konzerv és víz.','The camp welcomes you: tins and water.']],
 sheriff:[{cuffs:1,bandage:2},['Kovács a kezedbe nyom egy bilincset.','Kovács presses a pair of handcuffs into your hand.']],
 bounty:[{stone_shovel:1,coal:4},['A vérdíj mellé ásó és szén jár.','The bounty pays a shovel and coal on top.']],
 glass:[{mask:1,iron:4},['Egy gázálarc és fémhulladék a kemence mögött.','A gas mask and scrap metal behind the furnace.']],
 drones:[{iron:6,coal:6},['A drón ledob egy ládát: fém és szén. „Olvaszd meg.”','A drone drops a crate: scrap and coal. “Melt it down.”']],
 plates:[{iron:3,gold:1},['„Előleg a toronyhoz.” Fém és elektronika.','“An advance for the tower.” Scrap and electronics.']],
 tower:[{laser:1,cell:8,medkit:1},['A drónok bizalma: lézerpuska. Az erőműnél kelleni fog.','The drones’ trust: a laser rifle. You will need it at the plant.']],
 box:[{medkit:1,tonic:2},['A reaktorterem elsősegélyszekrénye még tele van.','The reactor hall’s first-aid cabinet is still full.']],
 lili:[{tonic:2,canned:2},['Lili a zsebedbe csúsztat valamit. „Útravaló, apa.”','Lili slips something into your pocket. “For the road, Dad.”']]};
function zfGive(rw){const out=[];for(const k in rw){const n=rw[k];inv[k]=(inv[k]|0)+n;try{if(DMAX[k])du[k]=DMAX[k];if(TOOL[k]||(typeof GUN!='undefined'&&GUN[k]))givehb(k)}catch(e){}out.push((TOOL[k]&&n==1?'':n+' ')+tr(LBL[k]||k).toLowerCase())}return out.join(', ')}
{const sa131=stAdvance;stAdvance=function(){let s=null;try{if(STORY&&STORY.z)s=stCur()}catch(e){}const r=sa131.apply(this,arguments);
 try{if(s){const h=zhu(),rw=ZRW[s.id];let sub='';if(rw){const got=zfGive(rw[0]);sub=(h?'Jutalom: ':'Reward: ')+got;ZF.ban={t0:performance.now(),a:'✔ '+s.t[h?0:1],b:rw[1][h?0:1],c:sub}}else ZF.ban={t0:performance.now(),a:'✔ '+s.t[h?0:1],b:'',c:''};XS.xp=(XS.xp||0)+25;fanfare112();ZF.inv0=null}}catch(e){console.error(e)}return r}}
function zfBanner(){const B=ZF.ban;if(!B)return;const t=(performance.now()-B.t0)/1000;if(t>5.2){ZF.ban=null;return}if(showMap||book||invOpen||stOpen)return;const a=Math.min(1,t*4,(5.2-t)*2.5);g.font=fnt(0,9);const tw=Math.max(...[B.a,B.b,B.c].map(s=>s?g.measureText(s).width:0))+20,w=Math.min(VW-12,Math.max(170,tw)),x=Math.round(VW/2-w/2),y=88+Math.round((1-Math.min(1,t*4))*-8),h=B.c?42:22;const cx=x+w/2;
 g.globalAlpha=a*.9;Q(x,y,w,h,'#14120c');g.globalAlpha=a;Q(x,y,w,1,'#ffd84a');Q(x,y+h-1,w,1,'#6a5a2a');noTr=true;txt(B.a,cx,y+12,'#ffd84a','center');if(B.b)txt(B.b,cx,y+24,'#d8d0b8','center');if(B.c)txt(B.c,cx,y+35,'#9ad870','center');noTr=false;g.globalAlpha=1}

/* ---------- hunger and thirst: slower, and slower still on the story difficulty ---------- */
const zfDrain=()=>DIFF<=1?.5:DIFF==2?.65:.9;

/* ---------- feel: +items above your head, a short freeze and a shake when something dies ---------- */
function zfPickTick(){if(creative||(net&&!net.isHost&&net.dead===false&&false))return;const now=performance.now(),cur=ZF.inv0;if(!cur){ZF.inv0=Object.assign({},inv);return}let kinds=0;const add=[];
 for(const k in inv){const d=(inv[k]|0)-(cur[k]|0);if(d>0){kinds++;add.push([k,d])}}ZF.inv0=Object.assign({},inv);if(kinds>5)return;
 for(const[k,d]of add){if(d>60||k=='hand')continue;const p=ZF.pick.find(q=>q.k==k&&now-q.t0<900);if(p){p.n+=d;p.t0=now}else ZF.pick.push({k,n:d,t0:now})}if(ZF.pick.length>5)ZF.pick.splice(0,ZF.pick.length-5)}
function zfPickDraw(){const n=performance.now();ZF.pick=ZF.pick.filter(p=>n-p.t0<1600);if(!ZF.pick.length||inD&&!ZBK&&false)return;noTr=true;
 ZF.pick.forEach((p,i)=>{const a=(n-p.t0)/1600,y=P.y-cam.y-8-(ZF.pick.length-1-i)*9-a*6,x=P.x-cam.x+11;g.globalAlpha=Math.max(0,Math.min(1,(1-a)*2.2));txt('+'+p.n+' '+tr(LBL[p.k]||p.k),x,y,'#c8f08a','left')});g.globalAlpha=1;noTr=false}
{const dd131=drawDmgN;drawDmgN=function(){const r=dd131.apply(this,arguments);try{if(state=='play')zfPickDraw()}catch(e){noTr=false;g.globalAlpha=1}return r}}

/* ---------- fast travel between places you have found ---------- */
function zfPlaces(){const h=zhu(),L=[],V=zfz().vis;
 if(ZS.camp&&V.camp)L.push({k:'camp',n:h?'Tábor':'Camp',x:ZS.camp.x,y:ZS.camp.y+3});
 if(ZS.bunker&&V.bunker)L.push({k:'bunker',n:'Bunker-7',x:ZS.bunker.x,y:ZS.bunker.y+6});
 if(ZS.tower&&V.tower)L.push({k:'tower',n:h?'Adótorony':'Radio tower',x:ZS.tower.x,y:ZS.tower.y+2});
 if(typeof home!='undefined'&&home&&isFinite(home.x))L.push({k:'home',n:h?'Otthon':'Home',x:Math.floor(home.x/T),y:Math.floor(home.y/T)+1});return L}
function zfVisit(){const V=zfz().vis,px=P.x/T,py=P.y/T,c=(o,k,r)=>{if(o&&!V[k]&&Math.hypot(o.x-px,o.y-py)<r){V[k]=1;say(ZB('Gyorsutazás: '+({camp:'a tábor',bunker:'a bunker',tower:'a torony'})[k]+' felkerült a térképre (M).','Fast travel: '+({camp:'the camp',bunker:'the bunker',tower:'the tower'})[k]+' is now on your map (M).'))}};c(ZS.camp,'camp',10);c(ZS.bunker,'bunker',12);c(ZS.tower,'tower',8)}
function zfFree(x,y){for(let r=0;r<7;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!=r)continue;const tx=x+dx,ty=y+dy;if(tx<2||ty<2||tx>=W-2||ty>=H-2)continue;const i=ty*W+tx;try{if(wt(map[i]))continue;if(blocked(tx*T+8,ty*T+8,4))continue}catch(e){continue}return[tx,ty]}return null}
function zfWhyNot(){const h=zhu();if(inD)return h?'Odabentről nem lehet.':'Not from inside.';if(drv||P.boat)return h?'Előbb szállj ki.':'Get out first.';if(net&&!net.dead)return h?'Közös játékban nincs gyorsutazás.':'No fast travel in co-op.';if(ZS.raid&&ZS.raid.on)return h?'Rajtaütés van!':'There is a raid!';
 if(zs.some(z=>z.hp>0&&!z.cap&&!z.sur&&Math.hypot(z.x-P.x,z.y-P.y)<12*T))return h?'Ellenség van a közelben!':'Enemies nearby!';return null}
function zfTravel(p){const why=zfWhyNot();if(why){say(why);snd('click');return}const f=zfFree(p.x,p.y);if(!f){snd('click');return}const d=Math.hypot(f[0]-P.x/T,f[1]-P.y/T),walk=d/3.9;
 P.x=f[0]*T+8;P.y=f[1]*T+8;showMap=false;time+=walk*.6/(240*(typeof DAYSLOW=='number'?DAYSLOW:1));if(time>=1){time-=1;day++}if(surv){P.food=Math.max(8,P.food-walk*.15);if(P.th!=null)P.th=Math.max(8,P.th-walk*.2)}
 try{cam.x=cl(P.x-VW/(2*ZM),0,W*T-VW/ZM);cam.y=cl(P.y-VH/(2*ZM),0,H*T-VH/ZM)}catch(e){}ZF.inv0=null;snd('ui');say(ZB('Megérkeztél: ','Arrived: ')+p.n+ZB(' (eltelt kb. '+Math.max(1,Math.round(walk*.6*24*60/(240*(typeof DAYSLOW=='number'?DAYSLOW:1))/60))+' óra)',' (about '+Math.max(1,Math.round(walk*.6*24*60/(240*(typeof DAYSLOW=='number'?DAYSLOW:1))/60))+' h passed)'))}
function zfMapPts(){const G=mapGeo();return zfPlaces().map(p=>({p,X:Math.round(G.x0+(p.x+.5)*G.mf),Y:Math.round(G.y0+(p.y+.5)*G.mf)}))}
{const dm131=drawMapFull;drawMapFull=function(){const r=dm131.apply(this,arguments);try{if(!inD&&state=='play'){const pts=zfMapPts();if(pts.length){noTr=true;const why=zfWhyNot();
 for(const q of pts){const hov=Math.hypot(ms.x-q.X,ms.y-q.Y)<8;Q(q.X-4,q.Y-4,9,9,'#000');Q(q.X-3,q.Y-3,7,7,hov?'#ffd84a':'#d8803a');Q(q.X-1,q.Y-1,3,3,'#1a1208');txt(q.p.n,q.X+7,q.Y+3,hov?'#ffd84a':'#f0d8b0')}
 const G=mapGeo();txt(why?ZB('Gyorsutazás most nem megy: ','Fast travel unavailable: ')+why:ZB('Gyorsutazás: kattints egy narancs pontra','Fast travel: click an orange marker'),VW/2,G.fy+G.MS+12,why?'#c08a6a':'#d8b080','center');noTr=false}}}catch(e){noTr=false}return r}}
addEventListener('mousedown',e=>{if(state!='play'||!showMap||inD||e.button!==0)return;try{sc(e)}catch(_){}let hit=null;try{for(const q of zfMapPts())if(Math.hypot(ms.x-q.X,ms.y-q.Y)<8)hit=q.p}catch(_){}if(!hit)return;e.preventDefault();e.stopImmediatePropagation();zfTravel(hit)},true);

/* ---------- a quieter first act: the old-world crypt hints wait until the story is under way ---------- */
function zfQuiet(){try{if(STORY&&STORY.z&&!STORY.done&&STORY.act<1&&msgT>0&&typeof msg=='string'&&/felszerelés-pont|gear points|gear score/.test(msg)){msgT=0;msg=''}}catch(e){}}

/* ---------- the end: a short summary of your run ---------- */
{const ze131=zEndLines;zEndLines=function(){const L=ze131.apply(this,arguments);try{const h=zhu(),f=zfz(),days=Math.max(1,day-((STORY&&STORY.d0)|0)+1),stat=(h?'Napok: ':'Days: ')+days+' · '+(h?'Ölések: ':'Kills: ')+(f.k|0)+' · '+(h?'Vérdíjak: ':'Bounties: ')+(ZS.done|0)+' · '+(h?'Emlékek: ':'Memories: ')+((ZS.notes||[]).length)+'/6',
 ix=L.indexOf(h?'VÉGE':'THE END'),add=[stat,h?'A Zóna nem ér véget — a világ veled marad, folytathatod.':'The Zone goes on — your world stays, keep playing.'];if(ix>=0)L.splice(ix,0,...add,'');else L.push(...add)}catch(e){}return L}}

/* ---------- per frame ---------- */
{const up131=update;update=function(dt){if(ZF.hs>0&&state=='play'&&!net){ZF.hs-=Math.min(dt,.05);return}
 const play=state=='play',f0=play?P.food:0,t0=play?P.th:0,near=[];
 if(play)for(const z of zs){if(z.hp>0&&Math.abs(z.x-P.x)<200&&Math.abs(z.y-P.y)<200)near.push(z)}
 const r=up131.apply(this,arguments);if(state!='play')return r;
 try{const m=zfDrain();if(surv&&isFinite(f0)&&P.food<f0&&f0-P.food<2)P.food=f0-(f0-P.food)*m;if(surv&&isFinite(t0)&&P.th!=null&&P.th<t0&&t0-P.th<2)P.th=t0-(t0-P.th)*m;
  let kill=0;for(const z of near)if(!(z.hp>0)&&!z.cap)kill++;if(kill){const f=zfz();f.k=(f.k|0)+kill;ZF.hs=.055;shk=Math.min(.35,shk+.1)}
  zfQuiet();zfPickTick();ZF.tv-=dt;if(ZF.tv<=0){ZF.tv=.5;if(!inD)zfVisit()}}catch(e){console.error(e)}return r}}
{const dr131=draw;draw=function(){const r=dr131.apply(this,arguments);try{if(state=='play')zfBanner();else ZF.inv0=null}catch(e){noTr=false;g.globalAlpha=1}return r}}

/* ---------- first launch: speak the player's language ---------- */
try{if(!localStorage.getItem('ashl')){const nl=String(navigator.language||'').toLowerCase();setLang(nl.startsWith('hu')?'hu':'en')}}catch(e){}
