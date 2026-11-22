/* ===== z301: PRIPJATY 1986 — the one story mode. A hand-built city frozen in 1986, seen 84 years later by a stalker on the first day.
   Core: the mode card, starting the fixed world, saved state, the look (colour grade, mist, vignette, grain) ===== */
GAMEV=301;
const PRIS=19860426;
var PRI=null;
const prH=()=>LANG=='hu';
const prT=(h,e)=>LANG=='hu'?h:e;
function prRng(s){let a=s>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

/* ---------- the mode card: Survival | Pripjaty 1986 ---------- */
drawModeQ=function(){const h=prH(),R_=mqRects();noTr=true;Q(0,0,VW,VH,'rgba(4,6,8,.92)');g.font=fnt(1,15);g.textAlign='center';g.fillStyle='#ffd84a';g.fillText(h?'Válassz játékmódot':'Choose a game mode',VW/2,R_[0].y-16);
 const C=[[h?'Túlélő mód':'Survival',h?['Szabad játék, a te','szabályaid szerint.','Építs, fedezz fel, élj túl.']:['Free play on your','own terms.','Build, explore, survive.'],'#6aa84a'],
  ['Pripjaty 1986',h?['Az első napod a Zónában.','Szkafander, Geiger, tisztogatás,','egy város, ami megállt 1986-ban.']:['Your first day in the Zone.','Hazmat suit, Geiger counter, clearing,','a city that stopped in 1986.'],'#c8302a']];
 R_.forEach((q,i)=>{const s=MODEQ.sel==i;Q(q.x-2,q.y-2,q.w+4,q.h+4,s?'#ffd84a':'#5a4a30');Q(q.x,q.y,q.w,q.h,s?'#22281c':'#16140e');Q(q.x,q.y,q.w,3,C[i][2]);
  if(i==0){Q(q.x+q.w/2-10,q.y+18,20,14,'#7a5434');Q(q.x+q.w/2-12,q.y+14,24,4,'#a8743e');Q(q.x+q.w/2-3,q.y+24,6,8,'#3a2414')}
  else{Q(q.x+q.w/2-18,q.y+10,36,26,'#a8241c');try{pStar(q.x+q.w/2-7,q.y+20,7,'#ffd84a');pHS(q.x+q.w/2+9,q.y+23,13,'#ffd84a')}catch(e){}}
  g.font=fnt(1,12);g.textAlign='center';g.fillStyle=s?'#ffd84a':'#e8f2d8';g.fillText(C[i][0],q.x+q.w/2,q.y+50);C[i][1].forEach((l,k)=>txt(l,q.x+q.w/2,q.y+66+k*11,'#a8b49a','center'))});
 txt(h?'← → választ   Enter: indít   Esc: vissza':'← → choose   Enter: start   Esc: back',VW/2,R_[0].y+R_[0].h+20,'#6f7c62','center');noTr=false};
{const sm=startMode;startMode=function(story){if(!story)return sm.apply(this,arguments);return priStart()}}

function priNew(){return{v:1,day0:day,rub:0,rep:0,q:{},f:{},suit:100,filt:100,sx:0,sy:0,read:{},kill:0,jobs:{},visit:{},seen:{}}}
function priStart(){MODEQ=null;STQ=null;STORY=null;try{if(net){net.r.leave().catch(()=>{});net=null}}catch(e){}
 init(PRIS);tut=0;started=true;state='play';PRI=null;priBuild();PRI=priNew();PRI.day0=day;priPlacePlayer();priOpening();try{priSave()}catch(e){}}
function priPlacePlayer(){const[x,y]=PRIST;SX=x;SY=y;P.x=x*T+8;P.y=y*T+8;P.hp=100;P.food=Math.max(P.food||0,85);P.th=Math.max(P.th??0,85);try{cam.x=cl(P.x-VW/(2*ZM),0,W*T-VW/ZM);cam.y=cl(P.y-VH/(2*ZM),0,H*T-VH/ZM)}catch(e){}}

/* ---------- saved state ---------- */
function priSave(){try{if(PRI)localStorage.setItem(SKEY()+'_pri',JSON.stringify(PRI));else localStorage.removeItem(SKEY()+'_pri')}catch(e){}}
{const sv=save;save=function(){const r=sv.apply(this,arguments);priSave();return r}}
{const ld=load;load=function(){PRI=null;const r=ld.apply(this,arguments);try{if(r){const s=localStorage.getItem(SKEY()+'_pri');if(s){PRI=JSON.parse(s);PRI.q=PRI.q||{};PRI.f=PRI.f||{};PRI.read=PRI.read||{};PRI.jobs=PRI.jobs||{};PRI.visit=PRI.visit||{};PRI.seen=PRI.seen||{};try{priAfterLoad()}catch(e){}}}}catch(e){PRI=null}return r}}
{const in_=init;init=function(...a){PRI=null;return in_.apply(this,a)}}

/* ---------- the look: an overcast, washed-out 1986 — colour grade, mist, vignette, grain ---------- */
{const p=PAL;p[0]=['#6e7a3e','#74803f','#7a8646','#808c4a'];p[3]=['#7a7e80','#74787a','#84888a','#7e8284']}
const MIST={cv:null,t:0};
function mistMake(){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d'),r=prRng(1986);for(let i=0;i<22;i++){const px=r()*256,py=r()*256,rr=30+r()*56,gr=x.createRadialGradient(px,py,0,px,py,rr);gr.addColorStop(0,'rgba(215,220,205,.5)');gr.addColorStop(1,'rgba(215,220,205,0)');x.fillStyle=gr;for(const ox of[-256,0,256])for(const oy of[-256,0,256]){x.save();x.translate(ox,oy);x.fillRect(px-rr,py-rr,rr*2,rr*2);x.restore()}}MIST.cv=c}
function priGrade(){if(!PRI||CLASSIC)return;const cw=g.canvas.width,ch=g.canvas.height,now=performance.now();
 g.save();g.setTransform(1,0,0,1,0,0);
 try{g.globalCompositeOperation='saturation';g.fillStyle='rgba(128,128,128,'+(inD?.3:.42)+')';g.fillRect(0,0,cw,ch);
  g.globalCompositeOperation='multiply';g.fillStyle=inD?'rgb(210,204,184)':'rgb(222,218,196)';g.fillRect(0,0,cw,ch);
  g.globalCompositeOperation='source-over';
  if(!inD){if(!MIST.cv)mistMake();g.globalAlpha=.16;const s=cw/256*1.1;for(let k=0;k<2;k++){const ox=-((now/(k?90:140))*(k?1:-.6)%256+256)%256,oy=((now/(k?260:200))%256);g.drawImage(MIST.cv,0,0,256,256,ox*s*(k?1.2:1)-cw*.1,oy*s*.5-ch*.1,256*s*(k?1.3:1),256*s*(k?1.3:1));g.drawImage(MIST.cv,0,0,256,256,ox*s*(k?1.2:1)-cw*.1+256*s*(k?1.3:1),oy*s*.5-ch*.1,256*s*(k?1.3:1),256*s*(k?1.3:1))}g.globalAlpha=1}
  const gr=g.createRadialGradient(cw/2,ch/2,Math.min(cw,ch)*.28,cw/2,ch/2,Math.max(cw,ch)*.78);gr.addColorStop(0,'rgba(10,12,8,0)');gr.addColorStop(1,'rgba(10,12,8,'+(inD?.62:.5)+')');g.fillStyle=gr;g.fillRect(0,0,cw,ch);
  g.fillStyle='rgba(235,235,220,.07)';for(let i=0;i<46;i++)g.fillRect((Math.random()*cw)|0,(Math.random()*ch)|0,2,2);
 }finally{g.restore()}}
{const hd=hud;hud=function(){try{if(PRI&&state=='play')priGrade()}catch(e){}return hd.apply(this,arguments)}}
