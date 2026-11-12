/* ===== v131: ZÓNA 2100 on top of PixelCRAFT's fun pack — pick a difficulty, a reward for every story step,
   the camp, bunker and tower on the fast-travel map, a quieter first act, a run summary at the end ===== */
GAMEV=194;
const ZF={dq:null,dqOk:false};

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
FUN.reward=s=>STORY&&STORY.z&&ZRW[s.id]||null;

/* ---------- fast travel: the camp, the bunker and the radio tower join the map once you have been there ---------- */
FUN.src.push(()=>{if(!STORY||!STORY.z&&!ZS.zm)return[];const h=zhu(),L=[];if(ZS.camp)L.push({k:'camp',n:h?'Tábor':'Camp',x:ZS.camp.x,y:ZS.camp.y,dy:3,r:10});if(ZS.bunker)L.push({k:'bunker',n:'Bunker-7',x:ZS.bunker.x,y:ZS.bunker.y,dy:6,r:12});if(ZS.tower)L.push({k:'tower',n:h?'Adótorony':'Radio tower',x:ZS.tower.x,y:ZS.tower.y,dy:2,r:8});return L});
FUN.block.push(()=>ZS.raid&&ZS.raid.on?ZB('Rajtaütés van!','There is a raid!'):null);
/* saves from build 192 kept these inside the Zone's own state */
{const ld131=load;load=function(){const r=ld131.apply(this,arguments);try{if(ZS.fun){Object.assign(FUN.vis,ZS.fun.vis||{});FUN.k=Math.max(FUN.k|0,ZS.fun.k|0);delete ZS.fun}}catch(e){}return r}}

/* ---------- a quieter first act: the old-world crypt hints wait until the story is under way ---------- */
{const up131=update;update=function(dt){const r=up131.apply(this,arguments);try{if(state=='play'&&STORY&&STORY.z&&!STORY.done&&STORY.act<1&&msgT>0&&typeof msg=='string'&&/felszerelés-pont|gear points|gear score/.test(msg)){msgT=0;msg=''}}catch(e){}return r}}

/* ---------- the end: a short summary of your run ---------- */
{const ze131=zEndLines;zEndLines=function(){const L=ze131.apply(this,arguments);try{const h=zhu(),days=Math.max(1,day-((STORY&&STORY.d0)|0)+1),stat=(h?'Napok: ':'Days: ')+days+' · '+(h?'Ölések: ':'Kills: ')+(FUN.k|0)+' · '+(h?'Vérdíjak: ':'Bounties: ')+(ZS.done|0)+' · '+(h?'Emlékek: ':'Memories: ')+((ZS.notes||[]).length)+'/6',
 ix=L.indexOf(h?'VÉGE':'THE END'),add=[stat,h?'A Zóna nem ér véget — a világ veled marad, folytathatod.':'The Zone goes on — your world stays, keep playing.'];if(ix>=0)L.splice(ix,0,...add,'');else L.push(...add)}catch(e){}return L}}
