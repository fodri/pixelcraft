/* ===== v130: ZÓNA 2100 — sand to glass, rooms you build get a roof, bandits and their hideouts, bounties dead or alive with handcuffs and a prison,
   robots and a laser rifle at the plant, and a new story mode: Bunker-7, its drones, the radio tower, the black box, memories and four endings ===== */
GAMEV=191;
var ZS=null,ZR=[],ZBK=false,ZDLG=null,ZOUT=null,ZSWAP=0;
const ZB=(h,e)=>LANG=='hu'?h:e,zhu=()=>LANG=='hu';
const zri=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),zpk=a=>a[Math.floor(Math.random()*a.length)];
function zNew(){return{v:1,camp:null,hq:[],bty:{L:[],d:-9,act:null,n:0},pris:[],done:0,rep:0,karma:0,st:0,met:{},notes:[],end:null,tower:null,bunker:null,box:null,rooms:{},rob:{t:0},raid:{d:-1}}}
ZS=zNew();

/* ---------- items ---------- */
const ZIT={sand:['Sand','Homok'],glass:['Glass','Üveg'],cuffs:['Handcuffs','Bilincs'],dtag:['Dog tag','Azonosító'],cell:['Energy cell','Energiacella'],laser:['Laser rifle','Lézerpuska'],zbox:['Black box','Fekete doboz'],gwin:['Glass window','Üvegablak']};
for(const k in ZIT){LBL[k]=ZIT[k][0];LBLX[k]=ZIT[k][0];HU.unshift([ZIT[k][0],ZIT[k][1]],[ZIT[k][0].toLowerCase(),ZIT[k][1].toLowerCase()]);if(!NEWK.includes(k))NEWK.push(k);if(inv[k]==null)inv[k]=0}
REC.push(['cuffs','Handcuffs',{iron_ingot:1,copper:1}],['gwin','Glass window',{glass:2,wood:2}],['cell','Energy cell',{gold:1,copper:1,iron:1}]);
PL.gwin=1;SOLID.gwin=1;try{if(typeof ICOBJ!='undefined')ICOBJ.gwin=1;STYSKIP.gwin=1}catch(e){}
/* sand melts into glass in the furnace */
SMELT.sand='glass';FIN.sand=1;
/* the laser rifle: retro-future, runs on energy cells */
GUN.laser={am:'cell',d:6.5,rt:.34,sp:.01,n:1,v:900,r:.85,au:0,sn:'laser'};TOOL.laser=1;DMAX.laser=GDUR.laser=400;MAGC.laser=8;RLT.laser=1.4;
GUNV.laser=function(){Q(-5,-1,5,3,'#8a8f96');Q(-5,-1,5,1,'#c8ccd2');Q(0,-3,9,5,'#c8ccd2');Q(0,-3,9,1,'#eef0f2');Q(1,-2,1,3,'#c83a2a');Q(4,-2,1,3,'#c83a2a');Q(9,-2,4,3,'#8a8f96');Q(13,-1,3,1,'#5af0ff');Q(3,2,2,3,'#4a4e54')};
GTIP.laser=15;GCX.laser=4;GSC.laser=.85;ICX.laser=(x,y)=>{g.save();g.translate(Math.round(x+10-GCX.laser*GSC.laser),y+10);g.scale(GSC.laser,GSC.laser);GUNV.laser();g.restore()};
EBC.push(['#8a5a10','#ffe08a'],['#106a8a','#8af8ff']);/* 4: bandit bullet, 5: robot laser */
{const sn130=snd;snd=function(t){if(t=='laser'){try{sfx(()=>{sxT('sawtooth',1800,260,.18,.07);sxT('sine',2400,500,.15,.05)})}catch(e){}return}return sn130(t)}}
{const fg130=fireGun;fireGun=function(it){const n=arrs.length,r=fg130(it);if(it=='laser')for(let i=n;i<arrs.length;i++)arrs[i].lz=1;return r}}
/* icons */
{const ic130=icon2;icon2=function(k,x,y){const S=(a,b,w,h,c)=>Q(x+a,y+b,w,h,c);
 if(k=='sand'){S(3,11,14,6,'#c8a86a');S(5,9,10,3,'#d8bc80');S(7,8,6,2,'#e4cc94');S(6,13,1,1,'#a08050');S(12,12,1,1,'#a08050');S(9,15,1,1,'#f0dcaa');return true}
 if(k=='glass'){S(4,4,12,13,'#6aa8c8');S(5,5,10,11,'#9ad0e8');S(6,6,3,8,'#e8f8ff');S(11,9,2,5,'#c8ecf8');S(4,4,12,1,'#d8f4ff');return true}
 if(k=='cuffs'){S(3,8,6,6,'#8a9096');S(4,9,4,4,'#22262a');S(11,8,6,6,'#8a9096');S(12,9,4,4,'#22262a');S(8,10,4,1,'#c8ccd0');S(3,8,6,1,'#c8ccd0');S(11,8,6,1,'#c8ccd0');return true}
 if(k=='dtag'){S(5,3,1,6,'#8a8f96');S(6,8,8,10,'#9aa0a6');S(6,8,8,1,'#d8dce0');S(8,11,4,1,'#3a3e42');S(8,13,4,1,'#3a3e42');S(8,15,3,1,'#3a3e42');S(12,9,1,1,'#3a3e42');return true}
 if(k=='cell'){S(6,4,8,13,'#3a4048');S(7,5,6,11,'#2a8a9a');S(7,5,6,3,'#5af0ff');S(8,2,4,2,'#c8ccd2');S(9,9,2,5,'#8af8ff');return true}
 if(k=='zbox'){S(3,6,14,11,'#e07a1a');S(3,6,14,2,'#f0a040');S(5,9,10,6,'#2a2420');S(6,10,3,1,'#7aff6a');S(4,16,12,1,'#8a4a10');return true}
 if(k=='gwin'){S(3,3,14,14,'#6a4a2a');S(4,4,12,12,'#9ad0e8');S(9,4,2,12,'#6a4a2a');S(4,9,12,2,'#6a4a2a');S(5,5,2,3,'#e8f8ff');return true}
 return ic130(k,x,y)}}

/* ---------- world objects ---------- */
const ZOB={zboard:['Bounty board','Vérdíjtábla'],zcage:['Prison cage','Börtönketrec'],ztent:['Bandit tent','Banditasátor'],zflag:['Bandit banner','Bandita zászló'],zsand:['Sandbags','Homokzsák'],zstash:['Bandit stash','Bandita rejtekláda'],
 zblast:['Bunker-7 blast door','Bunker-7 páncélkapu'],zcon:['Concrete','Beton'],ztower:['Radio tower','Adótorony'],zbox:['Black box','Fekete doboz'],znote:['Memory','Emlék'],zterm:['Terminal','Terminál'],zbexit:['Way out','Kijárat'],zgen:['Field generator','Mezőgenerátor'],zbulb:['Bunker lamp','Bunkerlámpa'],zplant:['Hydroponic bed','Hidropónikus ágyás'],zlock:['Locker','Szekrény']};
for(const k in ZOB){LBL[k]=LBL[k]||ZOB[k][0];LBLX[k]=LBLX[k]||ZOB[k][0];NMX[k]=ZOB[k][0].toLowerCase();HU.unshift([ZOB[k][0],ZOB[k][1]],[ZOB[k][0].toLowerCase(),ZOB[k][1].toLowerCase()])}
Object.assign(SOLID,{zinv:1,zboard:1,zcage:1,ztent:1,zflag:1,zsand:1,zstash:1,zblast:1,zcon:1,ztower:1,zterm:1,zgen:1,zlock:1,zplant:1});
Object.assign(INT,{zboard:1,zcage:1,zstash:1,zblast:1,ztower:1,zbox:1,znote:1,zterm:1,zbexit:1,zgen:1,zlock:1});
try{for(const k in ZOB)STYSKIP[k]=1}catch(e){}
Object.assign(DRAWX,{
 zinv(){},
 gwin(o,x,y){W_(x,y+12,16,4,'rgba(0,0,0,.25)');W_(x,y-8,16,22,'#5a3d24');W_(x,y-8,16,2,'#7a5636');W_(x+2,y-5,12,15,'#4a6a7a');W_(x+3,y-4,10,13,'#8ac0d8');W_(x+4,y-3,3,6,'#d8f0f8');W_(x+7,y-5,2,15,'#5a3d24');W_(x+2,y+1,12,2,'#5a3d24');W_(x,y+12,16,2,'#3a2814')},
 zboard(o,x,y){W_(x+1,y+13,15,3,'rgba(0,0,0,.3)');W_(x+2,y+2,2,13,'#5a3d24');W_(x+12,y+2,2,13,'#5a3d24');W_(x,y-8,16,12,'#6a4a2a');W_(x+1,y-7,14,10,'#8a6a40');
  for(let i=0;i<3;i++){W_(x+2+i*5,y-6,4,6,'#e8dcc0');W_(x+3+i*5,y-5,2,2,'#5a4a3a');W_(x+2+i*5,y-1,4,1,'#c83a2a')}W_(x,y-9,16,2,'#4a3320')},
 zcage(o,x,y){const n=Math.min(3,o.n|0);W_(x-1,y+13,18,3,'rgba(0,0,0,.3)');W_(x,y+12,16,3,'#3a3e42');for(let i=0;i<n;i++){const cx=x+3+i*5;W_(cx,y,3,4,'#c89a70');W_(cx,y+4,4,7,['#5a4a3a','#3a3a44','#6a3030'][i]);W_(cx,y+11,1,2,'#2a2a2a');W_(cx+2,y+11,1,2,'#2a2a2a')}
  for(let i=0;i<5;i++)W_(x+i*4,y-6,1,19,'#6a7078');W_(x,y-7,17,2,'#8a9096');W_(x,y+11,17,1,'#5a5e64')},
 ztent(o,x,y){W_(x-2,y+12,22,4,'rgba(0,0,0,.3)');W_(x-2,y+2,22,12,'#4a4434');W_(x,y-4,18,8,'#5a5440');W_(x+2,y-8,14,6,'#6a6248');W_(x+8,y-10,2,24,'#3a3424');W_(x+6,y+5,6,9,'#1a1812');W_(x-2,y+13,22,1,'#2a2618');W_(x+1,y-1,4,3,'#7a3a2a');W_(x+13,y+6,3,3,'#3a4a5a')},
 zflag(o,x,y){const t=performance.now()/300,w=Math.round(Math.sin(t+x)*1.5);W_(x+6,y+14,6,2,'rgba(0,0,0,.3)');W_(x+7,y-14,2,29,'#4a4a4a');W_(x+9,y-13,9+w,8,'#1a1a1a');W_(x+11,y-11,4,4,'#d8d0c0');W_(x+12,y-10,1,1,'#1a1a1a');W_(x+14,y-10,1,1,'#1a1a1a');W_(x+11,y-6,5,1,'#c83a2a')},
 zsand(o,x,y){W_(x,y+11,16,4,'rgba(0,0,0,.25)');for(let r=0;r<2;r++)for(let i=0;i<3;i++){const sx=x+i*5+(r?2:0)-1,sy=y+6-r*5;W_(sx,sy,6,5,'#8a7a5a');W_(sx,sy,6,1,'#a8987a');W_(sx,sy+4,6,1,'#6a5a3a')}},
 zstash(o,x,y){W_(x+1,y+12,15,4,'rgba(0,0,0,.3)');W_(x+1,y+2,15,11,o.op?'#4a3a28':'#6a5034');W_(x+1,y+2,15,3,'#8a6a44');W_(x+1,y+6,15,1,'#3a2a18');W_(x+3,y+4,1,9,'#7a7e84');W_(x+13,y+4,1,9,'#7a7e84');if(!o.op){W_(x+7,y+7,3,3,'#c8a040')}W_(x+5,y-1,7,3,'#c83a2a')},
 zcon(o,x,y){const h=hs(x*.13,y*.29);W_(x,y-10,16,26,'#6a6c6a');W_(x,y-10,16,2,'#8a8c88');W_(x,y+14,16,2,'#3a3c3a');if(h<.3)W_(x+3,y-4,4,6,'#5a5c58');if(h>.7){W_(x+9,y,1,7,'#4a4c48');W_(x+10,y+6,3,1,'#4a4c48')}if(h>.4&&h<.5)W_(x+2,y+8,6,3,'rgba(120,80,40,.4)')},
 zblast(o,x,y){const t=performance.now(),op=ZS&&ZS.st>=4;W_(x-24,y+14,64,4,'rgba(0,0,0,.35)');W_(x-24,y-26,64,42,'#5a5c58');W_(x-24,y-26,64,3,'#7a7c78');W_(x-20,y-20,56,36,'#3a3c3a');
  for(let i=0;i<7;i++){W_(x-20+i*8,y-20,4,3,'#d8b020');W_(x-16+i*8,y-20,4,3,'#1a1a1a')}
  if(op){W_(x-14,y-14,44,30,'#0a0c0e');W_(x-14,y+12,44,4,'rgba(255,220,140,.35)');W_(x-16,y-15,4,31,'#6a6c70');W_(x+30,y-15,4,31,'#6a6c70')}
  else{W_(x-14,y-14,44,30,'#7a7e84');W_(x-14,y-14,44,2,'#a8acb2');W_(x+7,y-14,2,30,'#4a4e54');for(const bx of[-8,22])for(const by of[-8,4])W_(x+bx,y+by,3,3,'#5a5e64');W_(x-4,y-4,24,8,'#9a9ea4');W_(x+1,y-2,14,4,'#c8ccd0')}
  W_(x+30,y-30,4,4,Math.floor(t/600)%2?'#ff3a2a':'#5a1a14');W_(x-22,y-30,4,4,Math.floor(t/600)%2?'#5a1a14':'#ff3a2a');
  W_(x-6,y-25,28,6,'#2a2c2a');noTr=true;g.font=fnt(1,5);g.textAlign='center';g.fillStyle='#e8e0c0';g.fillText('BUNKER-7',Math.round(x+8-cam.x),Math.round(y-20.5-cam.y));noTr=false},
 ztower(o,x,y){const t=performance.now(),f=o.fixed;W_(x-6,y+13,28,4,'rgba(0,0,0,.3)');for(const s of[-1,1]){for(let i=0;i<14;i++){const yy=y+12-i*4,xx=x+8+s*(8-i*.45);W_(xx,yy,2,4,'#6a6e74')}}
  for(let i=0;i<7;i++){const yy=y+10-i*8,w=16-i*2;W_(x+8-w/2,yy,w,1,'#8a8e94');W_(x+8-w/2,yy-4,1,4,'#5a5e64')}W_(x+7,y-50,2,8,'#8a8e94');
  W_(x+6,y-54,4,4,f?(Math.floor(t/500)%2?'#ff4a3a':'#6a1a14'):'#2a2a2a');if(f){const a=.5+.5*Math.sin(t/200);for(let r=1;r<=3;r++){g.strokeStyle='rgba(255,220,140,'+(.35*a/r)+')';g.lineWidth=1;g.beginPath();g.arc(Math.round(x+8-cam.x),Math.round(y-52-cam.y),r*6,-2.5,-.6);g.stroke()}}
  W_(x+2,y+4,12,9,'#4a4e54');W_(x+3,y+5,10,4,f?'#3a6a3a':'#2a2e34');if(!f){W_(x+12,y+8,4,1,'#c83a2a');W_(x+13,y+9,1,4,'#c83a2a')}},
 zbox(o,x,y){const t=performance.now();W_(x+2,y+11,13,4,'rgba(0,0,0,.3)');W_(x+3,y+3,11,10,'#e07a1a');W_(x+3,y+3,11,2,'#f0a040');W_(x+5,y+6,7,5,'#2a2420');W_(x+6,y+7,2,1,Math.floor(t/400)%2?'#7aff6a':'#2a5a2a');if(Math.floor(t/900)%2){g.fillStyle='rgba(255,180,80,.18)';g.fillRect(Math.round(x-cam.x),Math.round(y-cam.y),17,16)}},
 znote(o,x,y){const t=performance.now(),b=Math.round(Math.sin(t/300+x)*1.5);W_(x+4,y+12,9,2,'rgba(0,0,0,.25)');W_(x+4,y+4+b,9,10,'#e8dcc0');W_(x+5,y+6+b,7,1,'#8a7a5a');W_(x+5,y+8+b,6,1,'#8a7a5a');W_(x+5,y+10+b,7,1,'#8a7a5a');const a=.35+.3*Math.sin(t/250);g.fillStyle='rgba(200,160,240,'+a.toFixed(2)+')';g.fillRect(Math.round(x+3-cam.x),Math.round(y+3+b-cam.y),11,12);W_(x+4,y+4+b,9,10,'rgba(232,220,192,.8)')},
 zterm(o,x,y){const t=performance.now();W_(x+1,y+12,15,4,'rgba(0,0,0,.3)');W_(x+1,y-2,15,15,'#4a5058');W_(x+1,y-2,15,2,'#6a7078');W_(x+3,y,11,7,'#0a1a10');const c=o.k=='gen'?'#ffb04a':'#6aff8a';for(let i=0;i<3;i++)W_(x+4,y+1+i*2,(4+((t/300+i*3)|0)%6),1,c);W_(x+3,y+9,11,2,'#2a2e34');W_(x+4,y+9,2,1,'#c83a2a');W_(x+8,y+9,2,1,'#d8b020')},
 zbexit(o,x,y){W_(x,y-2,16,18,'#2a2c2e');W_(x+2,y,12,16,'#7a6a4a');W_(x+2,y,12,2,'#a89070');W_(x+2,y+12,12,4,'rgba(255,230,160,.45)');W_(x+3,y-6,10,4,'#1a3a1a');noTr=true;g.font=fnt(1,4);g.textAlign='center';g.fillStyle='#7aff6a';g.fillText(ZB('KIJÁRAT','EXIT'),Math.round(x+8-cam.x),Math.round(y-2.5-cam.y));noTr=false},
 zgen(o,x,y){const t=performance.now(),on=!(ZS&&ZS.end=='C');W_(x-8,y+13,32,4,'rgba(0,0,0,.35)');W_(x-8,y-14,32,28,'#3a3e44');W_(x-8,y-14,32,2,'#5a5e64');W_(x-4,y-10,24,20,'#1a1e22');
  if(on){const a=.5+.5*Math.sin(t/180);g.fillStyle='rgba(120,200,255,'+(.35+.3*a).toFixed(2)+')';g.beginPath();g.arc(Math.round(x+8-cam.x),Math.round(y-cam.y),8+2*a,0,6.283);g.fill();W_(x+5,y-3,6,6,'#e8f8ff')}else W_(x+5,y-3,6,6,'#2a2e34');for(let i=0;i<4;i++)W_(x-8+i*9,y+11,4,3,'#d8b020')},
 zbulb(o,x,y){W_(x+6,y-2,4,3,'#3a3e42');W_(x+5,y+1,6,3,'#ffe8a0');W_(x+6,y+1,4,1,'#fff8e0')},
 zplant(o,x,y){W_(x,y+10,16,5,'#4a3a2a');W_(x,y+9,16,2,'#6a5a40');for(let i=0;i<4;i++){W_(x+1+i*4,y+3,2,7,'#3a7a2a');W_(x+i*4,y+2,4,3,'#5aa83a');W_(x+1+i*4,y+1,2,1,'#8ad85a')}W_(x,y-3,16,1,'rgba(200,120,255,.5)')},
 zlock(o,x,y){W_(x+1,y+12,15,4,'rgba(0,0,0,.3)');W_(x+2,y-8,13,21,'#5a6a5a');W_(x+2,y-8,13,2,'#7a8a7a');W_(x+8,y-6,1,18,'#3a4a3a');for(let i=0;i<3;i++){W_(x+4,y-5+i*2,3,1,'#3a4a3a');W_(x+10,y-5+i*2,3,1,'#3a4a3a')}W_(x+6,y+2,1,2,'#c8c4b0');W_(x+10,y+2,1,2,'#c8c4b0')}});
/* lights for the new things */
{const fl130=fireList;fireList=function(){const a=fl130();return a}}

/* ---------- sand: dig it with a shovel in the desert or on the shore ---------- */
function zSandy(tx,ty){if(inD)return false;const i=ty*W+tx;if((bm[i]|0)==2)return true;for(let y=ty-2;y<=ty+2;y++)for(let x=tx-2;x<=tx+2;x++){if(x<0||y<0||x>=W||y>=H)continue;if(map[y*W+x]==1)return true}return false}
{const ac130=act;act=function(){try{const tl=tool();if(tl&&tl.k=='shovel'&&!inD&&mtx>=0&&mty>=0&&mtx<W&&mty<H&&!ob[mty*W+mtx]&&Math.hypot(mtx*T+8-P.x,mty*T+8-P.y)<=46){const i=mty*W+mtx,m0=map[i];
   if((m0==0||m0==4||m0==2||m0==14)&&zSandy(mtx,mty)){if(!edge||P.cd>0)return;if(!canAdd('sand')){fullMsg();return}inv.sand=(inv.sand|0)+1;P.cd=.45;hit(mtx*T+8,mty*T+8,'#d8bc80');snd('hit');say(ZB('Homokot ástál (+1). A kemencében üveget olvaszthatsz belőle.','You dug sand (+1). Melt it into glass in the furnace.'));return}
   const r=ac130();if(m0!=4&&map[i]==4&&zSandy(mtx,mty)&&canAdd('sand')){inv.sand=(inv.sand|0)+2;say(ZB('Homok! (+2) — kemencében üveg lesz belőle','Sand! (+2) — the furnace turns it into glass'))}return r}}catch(e){console.error(e)}return ac130()}}

/* ---------- rooms you build: recognised and roofed automatically ---------- */
const ZWALL={wall:1,sblock:1,door:1,gate:1,gwin:1};
let ZRH=-1,ZRT=0;
function zIsW(i){const o=ob[i];return !!(o&&ZWALL[o.t])}
function zRoomScan(){ZR=[];if(inD)return;try{underRoof(0,0)}catch(e){}const rg=(typeof RGD!='undefined'&&RGD&&RGD.length==W*H)?RGD:null,seen=new Uint8Array(W*H),q=new Int32Array(200);
 for(let i=0;i<W*H;i++){if(!zIsW(i)||(rg&&rg[i]>=0))continue;const x=i%W,y=(i/W)|0;
  for(const j of[i-1,i+1,i-W,i+W]){if(j<0||j>=W*H||seen[j]||zIsW(j))continue;const jx=j%W;if(Math.abs(jx-x)>1)continue;
   /* flood the space next to this wall; a room is a closed pocket of at most 160 tiles */
   let n=0,open=false,h=0,t=0;const cells=[];q[t++]=j;seen[j]=1;
   while(h<t){const c=q[h++];cells.push(c);n++;const cx=c%W,cy=(c/W)|0;if(cx<=0||cy<=0||cx>=W-1||cy>=H-1){open=true;break}if(rg&&rg[c]>=0){open=true;break}const m=map[c];if(m==1||m==5||m==7||m==9||m==11){open=true;break}
    for(const k of[c-1,c+1,c-W,c+W]){if(seen[k]||zIsW(k))continue;if(t>=160){open=true;break}seen[k]=1;q[t++]=k}if(open)break}
   if(open||n<2)continue;{let mine=false;for(const c of cells){for(const k of[c-1,c+1,c-W,c+W]){const o=ob[k];if(o&&ZWALL[o.t]&&o.pb){mine=true;break}}if(mine)break}if(!mine)continue}
   const set=new Set(cells),walls=new Set();let x0=1e9,y0=1e9,x1=-1,y1=-1;for(const c of cells)for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const k=c+dy*W+dx;if(zIsW(k))walls.add(k)}
   for(const c of[...set,...walls]){const cx=c%W,cy=(c/W)|0;x0=Math.min(x0,cx);y0=Math.min(y0,cy);x1=Math.max(x1,cx);y1=Math.max(y1,cy)}
   ZR.push({k:Math.min(...cells),cells:set,walls,x0,y0,x1,y1,a:1,cv:null})}}
 for(const r of ZR){const key=r.k+':'+r.cells.size;if(!ZS.rooms[key]){ZS.rooms[key]=1;if(ZRH>=0){const nm=zRoomName(r);say(ZB('Új helyiség: '+nm[0]+' ('+r.cells.size+' m²) — a tető magától rákerült','New room: '+nm[1]+' ('+r.cells.size+' m²) — it got a roof by itself'));try{snd('craft')}catch(e){}}}}}
{const pl130=place;place=function(...a){const k=sel,tx=mtx,ty=mty;const r=pl130.apply(this,a);try{const i=ty*W+tx,o=ob[i];if(o&&ZWALL[o.t]&&o.t==k)o.pb=1}catch(e){}return r}}
function zRoomName(r){let bed=0,work=0,eat=0,glass=0;for(const c of r.cells){const o=ob[c];if(!o)continue;if(o.t=='bed')bed++;else if(o.t=='furnace'||o.t=='ctable'||o.t=='workbench'||o.t=='anvil')work++;else if(o.t=='table'||o.t=='chair'||o.t=='pot'||o.t=='fridge'||o.t=='stove')eat++}for(const w of r.walls){const o=ob[w];if(o&&o.t=='gwin')glass++}
 if(bed&&r.cells.size<=12)return['hálókuckó','sleeping nook'];if(bed)return['hálószoba','bedroom'];if(work)return['műhely','workshop'];if(eat)return['konyha','kitchen'];if(glass>=2)return['világos szoba','bright room'];return['szoba','room']}
function zRoomHash(){let h=0;for(let i=0;i<W*H;i++){const o=ob[i];if(o&&ZWALL[o.t])h=(h*31+i+(o.t.length<<20))|0}return h}
function zRoomTick(dt){if(inD){return}ZRT-=dt;if(ZRT>0)return;ZRT=.6;const h=zRoomHash();if(h!==ZRH){const first=ZRH<0;if(first)ZRH=0;zRoomScan();ZRH=h}}
const ZRC=['#5e4a36','#6a5640','#54483c','#5a5e62'];
function zRoofCanvas(r){const w=(r.x1-r.x0+1)*T,h=(r.y1-r.y0+1)*T,cv=document.createElement('canvas');cv.width=w;cv.height=h+4;const c=cv.getContext('2d'),cover=new Set([...r.cells,...r.walls]);
 let stone=0,wood=0;for(const k of r.walls){const o=ob[k];if(o&&o.t=='sblock')stone++;else wood++}
 const base=stone>wood?'#5a5e62':ZRC[(r.k>>>0)%3],rnd=(()=>{let a=r.k*2654435761>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();
 const has=(x,y)=>cover.has(y*W+x),mid=(r.y0+r.y1)/2,F=(x,y,ww,hh,col)=>{c.fillStyle=col;c.fillRect(x,y,ww,hh)};
 for(let ty=r.y0;ty<=r.y1;ty++)for(let tx=r.x0;tx<=r.x1;tx++){if(!has(tx,ty)||!has(tx,ty+1))continue;const px=(tx-r.x0)*T,py=(ty-r.y0)*T,up=ty+.5<mid,col=up?shade(base,1.16):shade(base,.78);
  F(px,py,T,T,col);for(let yy=1;yy<T;yy+=4)F(px,py+yy,T,1,up?shade(base,1.04):shade(base,.64));for(let yy=0;yy<T;yy+=4)for(let xx=((yy+ty*4)/4|0)%2*4;xx<T;xx+=8)F(px+xx,py+yy,1,4,'rgba(0,0,0,.14)');
  if(!has(tx-1,ty)||!has(tx-1,ty+1))F(px,py,1,T,shade(base,.5));if(!has(tx+1,ty)||!has(tx+1,ty+1))F(px+T-1,py,1,T,shade(base,.5));if(!has(tx,ty-1))F(px,py,T,1,shade(base,1.3));if(!has(tx,ty+2))F(px,py+T-2,T,2,shade(base,.45));
  if(Math.abs(ty+.5-mid)<.6&&Math.abs(ty+1-mid)<.01||Math.floor(mid)==ty&&mid%1>.4)F(px,py+T-1,T,2,shade(base,1.4))}
 /* patches: corrugated tin, tarp, a hole fixed with boards — a survivor's roof, not a magazine one */
 const cells=[...cover].filter(k=>has(k%W,((k/W)|0)+1));for(let i=0,n=Math.max(1,Math.round(cells.length/9));i<n;i++){const k=cells[Math.floor(rnd()*cells.length)],px=(k%W-r.x0)*T+Math.floor(rnd()*6),py=(((k/W)|0)-r.y0)*T+Math.floor(rnd()*6),kind=rnd();
  if(kind<.45){F(px,py,10,8,'#7a7268');for(let xx=1;xx<10;xx+=2)F(px+xx,py,1,8,'#5e5850');F(px,py,10,1,'#9a9288');F(px+1,py+1,1,1,'#c8c0b0');F(px+8,py+6,1,1,'#c8c0b0');if(rnd()<.6)F(px+3,py+3,4,3,'rgba(150,80,30,.55)')}
  else if(kind<.75){F(px,py,11,9,'#3a5a6a');F(px,py,11,1,'#5a7a8a');F(px+1,py+8,9,1,'#2a3a44');F(px-1,py+4,1,1,'#c8c0a0');F(px+11,py+4,1,1,'#c8c0a0')}
  else{for(let j=0;j<3;j++){F(px,py+j*3,10,2,'#8a6a44');F(px,py+j*3,10,1,'#a8845a')}F(px+2,py,1,8,'#3a2a1a')}}
 /* chimney if there is a furnace or fire inside */
 for(const k of r.cells){const o=ob[k];if(o&&(o.t=='furnace'||o.t=='fire'||o.t=='fplace')){const px=(k%W-r.x0)*T+4,py=(((k/W)|0)-r.y0)*T-4;F(px,py,7,9,'#6a5a50');F(px,py,7,2,'#3a3028');break}}
 return cv}
function zDrawRoofs(){if(inD||!ZR.length)return;const ptx=Math.floor(P.x/T),pty=Math.floor(P.y/T),pi=pty*W+ptx,now=performance.now(),dt=Math.min(.05,(now-(zDrawRoofs.t||now))/1000);zDrawRoofs.t=now;
 for(const r of ZR){const sx=r.x0*T-cam.x,sy=r.y0*T-cam.y,w=(r.x1-r.x0+1)*T,h=(r.y1-r.y0+1)*T;if(sx>VW/ZM+20||sy>VH/ZM+20||sx+w<-20||sy+h<-20)continue;
  let inside=r.cells.has(pi)||r.walls.has(pi);if(!inside&&net)for(const p of net.peers){const q=p.presence;if(q&&!q.i&&isFinite(q.x)){const k=Math.floor(q.y/T)*W+Math.floor(q.x/T);if(r.cells.has(k)&&false)inside=true}}
  const ta=(inside||(typeof zHam=='function'&&zHam()))?0:1;r.a+=(ta-r.a)*Math.min(1,dt*8);if(r.a<.02)continue;if(!r.cv)r.cv=zRoofCanvas(r);
  g.globalAlpha=r.a*.22;g.drawImage(r.cv,Math.round(sx+4),Math.round(sy+3));g.globalCompositeOperation='source-over';g.globalAlpha=r.a;
  /* shadow first (darkened copy), then the roof */
  g.save();g.globalAlpha=r.a*.25;g.filter='brightness(0)';g.drawImage(r.cv,Math.round(sx+4),Math.round(sy+3));g.restore();g.globalAlpha=r.a;g.drawImage(r.cv,Math.round(sx),Math.round(sy));g.globalAlpha=1}}
function zUnderRoof(x,y){if(inD||!ZR.length)return false;const k=y*W+x;for(const r of ZR)if((r.cells.has(k)||r.walls.has(k))&&r.a>.5)return true;return false}

/* ---------- bandits (mutant slot 'd'), robots ('r') ---------- */
MUHP.d=14;MUHP.r=30;
const ZBG={pistol:{rt:1.4,n:1,sp:.06,v:180,d:5},revolver:{rt:1.8,n:1,sp:.03,v:200,d:8},shotgun:{rt:2.2,n:4,sp:.22,v:170,d:4},smg:{rt:.45,n:1,sp:.14,v:180,d:3}};
const ZNICK={hu:['a Hiéna','Rozsdafog','a Kígyó','Láncos','a Hamvas','Vasmarok','a Vörös','Csonka','a Holló','Tetves'],en:['the Hyena','Rustfang','the Snake','Chains','the Ashen','Ironfist','the Red','Stumpy','the Raven','Lousy']};
const ZFN=['Bence','Marci','Kati','Zoli','Tibor','Jóska','Edit','Dénes','Feri','Pista','Gabi','Laci','Ildi','Sanyi'],ZLN=['Fekete','Rozsdás','Vörös','Kígyós','Hamvas','Láncos','Szürke','Vas','Hollós','Csonka','Sánta','Kormos'];
function zLook(seed,boss){let a=(seed>>>0)||7;const r=n=>{a=(a*1664525+1013904223)>>>0;return a%n};return''+r(5)+r(6)+r(7)+zpk2([7,7,1,0,3],r)+zpk2([0,1,2,5],r)+zpk2([0,2,3,5,6],r)}
function zpk2(arr,r){return arr[r(arr.length)]}
function zHash(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function zMkBandit(x,y,o){o=o||{};const z=mkMut('d',x,y);z.hp=z.mx=o.boss?46:14;z.gun=o.gun||zpk(['pistol','pistol','revolver','shotgun','smg']);z.hx=o.hx!=null?o.hx:x;z.hy=o.hy!=null?o.hy:y;z.hq=o.hq;z.t=1+Math.random()*2;if(o.boss){z.zb=1;z.nm=o.nm;z.bid=o.bid}if(o.raid)z.raid=1;z.al=o.al||0;return z}
function zMkRobot(x,y,o){const z=mkMut('r',x,y);z.hp=z.mx=30;z.hx=x;z.hy=y;z.t=1.5;if(o&&o.guard)z.guard=1;return z}
function zBandit(z,dt,pls){const q=nearP(z.x,z.y,pls),dx=q.x-z.x,dy=q.y-z.y,d=Math.hypot(dx,dy)||1;z.a-=dt;z.mf=Math.max(0,(z.mf||0)-dt);
 if(z.kx){z.x+=z.kx*dt*.5;z.kx*=.8;z.ky*=.8;if(Math.abs(z.kx)<2)z.kx=0}
 if(z.cap){if(d>260){z.x=q.x-dx/d*30;z.y=q.y-dy/d*30;return}if(d>24){const s=Math.min(95,d*2.2);mv(z,dx/d*s*dt,dy/d*s*dt,4);z.mv=1;z.an=(z.an||0)+dt*8}else z.mv=0;z.fx=dx/d;z.fy=dy/d;return}
 if(z.sur>0){z.sur-=dt;z.mv=0;z.fx=dx/d;z.fy=dy/d;if(z.sur<=0){z.sur=0;z.al=12;z.hp=Math.max(z.hp,z.mx*.3);say(ZB((z.nm||'A bandita')+' felpattant és újra fegyvert ragadott!',(z.nm||'The bandit')+' jumped up and grabbed a gun again!'))}return}
 if(z.zb&&!z.sur0&&z.hp<z.mx*.28&&z.hp>0){z.sur0=1;z.sur=25;z.mv=0;say(ZB(z.nm+' eldobja a fegyvert: „Jól van, jól van! Megadom magam!” — bilinccsel (E) élve beviheted.',z.nm+' throws the gun down: “All right, all right! I give up!” — cuff him (E) to take him in alive.'));return}
 const ag=(z.al>0||z.raid)?340:190;if(z.al>0)z.al-=dt;
 if(d>ag){z.t2=(z.t2||0)-dt;if(z.raid&&ZS.camp){const cx=ZS.camp.x*T+8,cy=ZS.camp.y*T+8,ex=cx-z.x,ey=cy-z.y,ed=Math.hypot(ex,ey)||1;if(ed>40){mv(z,ex/ed*40*dt,ey/ed*40*dt,4);z.mv=1;z.an=(z.an||0)+dt*7;z.fx=ex/ed;z.fy=ey/ed}else z.mv=0;return}
  if(z.t2<=0||z.tx==null){z.t2=2+Math.random()*4;if(Math.random()<.4){z.tx=null;z.mv=0;return}const a=Math.random()*6.28,r=Math.random()*5*T;z.tx=z.hx+Math.cos(a)*r;z.ty=z.hy+Math.sin(a)*r}
  if(z.tx==null){z.mv=0;return}const ex=z.tx-z.x,ey=z.ty-z.y,ed=Math.hypot(ex,ey);if(ed<4){z.tx=null;z.mv=0;return}const[ba,bb]=mv(z,ex/ed*22*dt,ey/ed*22*dt,4);if(ba&&bb)z.tx=null;z.mv=1;z.an=(z.an||0)+dt*6;z.fx=ex/ed;z.fy=ey/ed;return}
 if(!z.seen){z.seen=1;for(const o of zs)if(o!==z&&o.mu=='d'&&Math.hypot(o.x-z.x,o.y-z.y)<200)o.al=Math.max(o.al||0,8);if(!zs.some(o=>o!==z&&o.mu=='d'&&o.lt>0&&Math.hypot(o.x-z.x,o.y-z.y)<220))zShout(z)}
 z.al=Math.max(z.al||0,4);const want=z.gun=='shotgun'?55:z.gun=='smg'?85:110;let vx=0,vy=0;z.st=(z.st||0)-dt;if(z.st<=0){z.st=1+Math.random()*1.6;z.sd=Math.random()<.5?1:-1}
 if(d>want+25){vx=dx/d;vy=dy/d}else if(d<want-25){vx=-dx/d;vy=-dy/d}vx+=-dy/d*z.sd*.7;vy+=dx/d*z.sd*.7;const l=Math.hypot(vx,vy)||1,sp=z.zb?40:46;mv(z,vx/l*sp*dt,vy/l*sp*dt,4);z.mv=1;z.an=(z.an||0)+dt*8;z.fx=dx/d;z.fy=dy/d;
 z.t-=dt;if(z.t<=0&&d<250){const G=ZBG[z.gun]||ZBG.pistol;z.t=G.rt*(.8+Math.random()*.7);if(z.zb)z.t*=.8;zFire(z,q.x,q.y,G)}
 if(d<13&&z.a<=0){if(q.me)hurtP(6);else if(net)net.r.emit('hurt',6,q.id);z.a=1}}
function zFire(z,tx,ty,G){const dx=tx-z.x,dy=ty-z.y,d=Math.hypot(dx,dy)||1,a=Math.atan2(ty-6-(z.y-8),dx);for(let k=0;k<G.n;k++)ebShoot(z.x+dx/d*8,z.y-8+dy/d*8,a+(Math.random()-.5)*G.sp*2,G.v,G.d*(DF().dm||1),4);z.mf=.09;
 try{const v=Math.max(.15,1-d/320);sfx(()=>{sxN(.14,'lowpass',2600*v+400,300,.7,.35*v);sxT('square',150,60,.09,.12*v)})}catch(e){}}
function zShout(z){const L=zhu()?['Ott van! Szedjétek le!','Friss hús!','Ez a mi területünk!','Tűz!','Le a fegyverrel, haver!']:['There! Take him down!','Fresh meat!','This is our turf!','Fire!','Drop it, pal!'];z.line=zpk(L);z.lt=2.5}
function zRobot(z,dt,pls){const q=nearP(z.x,z.y,pls),dx=q.x-z.x,dy=q.y-z.y,d=Math.hypot(dx,dy)||1;z.a-=dt;z.mf=Math.max(0,(z.mf||0)-dt);if(z.kx){z.x+=z.kx*dt*.3;z.kx*=.8;z.ky*=.8;if(Math.abs(z.kx)<2)z.kx=0}
 const ag=z.al>0?320:210;if(z.al>0)z.al-=dt;if(d>ag){z.mv=0;z.sc=(z.sc||0)+dt;return}
 let vx=0,vy=0;if(d>120){vx=dx/d;vy=dy/d}else if(d<70){vx=-dx/d;vy=-dy/d}mv(z,vx*30*dt,vy*30*dt,5);z.mv=vx||vy?1:0;z.an=(z.an||0)+dt*5;z.fx=dx/d;z.fy=dy/d;
 z.t-=dt;if(z.t<=0&&d<240){z.t=1.5+Math.random()*.6;const a=Math.atan2(q.y-6-(z.y-14),dx);ebShoot(z.x,z.y-14,a,230,7*(DF().dm||1),5);z.mf=.12;try{sfx(()=>{sxT('sawtooth',1400,300,.2,.06*Math.max(.2,1-d/300))})}catch(e){}}
 if(d<14&&z.a<=0){if(q.me)hurtP(10);else if(net)net.r.emit('hurt',10,q.id);z.a=1.2}}
{const mt130=muTick;muTick=function(z,dt,pls){if(z.mu=='d')return zBandit(z,dt,pls);if(z.mu=='r')return zRobot(z,dt,pls);return mt130(z,dt,pls)}}
{const md130=mutDeath;mutDeath=function(z){if(z.mu=='d'||z.mu=='r'){try{xpKill(z)}catch(e){}try{zDeath(z)}catch(e){console.error(e)}return}return md130(z)}}
function zDeath(z){const L=(k,n)=>addLoot({x:z.x+(Math.random()-.5)*12,y:z.y+(Math.random()-.5)*8,k,n});
 if(z.mu=='r'){L('iron',2);L('gold',zri(1,2));L('cell',zri(2,4));if((z.guard&&!ZS.laserGot)||Math.random()<.06){L('laser',1);ZS.laserGot=1}say(ZB('A robot szikrázva összeomlik.','The robot collapses in a shower of sparks.'));for(let k=0;k<12;k++)parts.push({x:z.x,y:z.y-10,vx:(Math.random()-.5)*90,vy:-Math.random()*70,l:.5,c:k%2?'#8af8ff':'#ffe08a'});return}
 L('a9',zri(2,7));if(Math.random()<.4)L('canned',1);if(Math.random()<.4)L('cloth',zri(1,2));if(Math.random()<.3)L('iron',zri(1,2));if(Math.random()<.08)L(z.gun&&GUN[z.gun]?z.gun:'pistol',1);if(Math.random()<.12)L('cuffs',1);
 if(z.zb){L('dtag',1);L(z.gun&&GUN[z.gun]?z.gun:'revolver',1);ZS.tagFor=z.bid;say(ZB(z.nm+' holtan. Az azonosítója a földön — vidd Kovács őrmesternek.',z.nm+' is dead. The dog tag is on the ground — take it to Sergeant Kovács.'))}
 if(z.raid)ZS.raid.k=(ZS.raid.k|0)+1;ZS.kills=(ZS.kills|0)+1;const h=ZS.hq.find(q=>q.id===z.hq);if(h){h.dead=(h.dead|0)+1;h.t=day+time}}
/* drawing */
{const dm130=drawMut;drawMut=function(z){if(z.mu=='d')return zDrawBandit(z);if(z.mu=='r')return zDrawRobot(z);return dm130(z)}}
function zDrawBandit(z){const x=z.x-cam.x,y=z.y-cam.y;if(x<-30||y<-40||x>VW/ZM+30||y>VH/ZM+40)return;const lk=z.lk||(z.lk=zLook(zHash(z.id),z.zb)),fx=isFinite(z.fx)?z.fx:(z.vx>=0?1:-1),fy=isFinite(z.fy)?z.fy:0;
 if(z.sur>0||z.cap){g.save();g.translate(0,3);}
 drawChar(x,y,chOf(lk),z.mv?1+Math.floor(z.an||0)%4:0,fx,fy,1,{});
 /* bandana over the mouth, red for the gang */
 const back=fy<-.45&&Math.abs(fy)>=Math.abs(fx);if(!back){const side=Math.abs(fx)>.55&&Math.abs(fx)>Math.abs(fy);if(side)Q(Math.round(x)+(fx>0?0:-4),Math.round(y)-14,5,2,z.zb?'#1a1a1a':'#a82a20');else Q(Math.round(x)-3,Math.round(y)-14,6,2,z.zb?'#1a1a1a':'#a82a20')}
 if(z.sur>0||z.cap){g.restore();Q(Math.round(x)-4,Math.round(y)-22,2,4,'#c89a70');Q(Math.round(x)+2,Math.round(y)-22,2,4,'#c89a70');if(z.cap){Q(Math.round(x)-3,Math.round(y)-7,6,2,'#8a9096');Q(Math.round(x)-1,Math.round(y)-8,2,1,'#c8ccd0')}}
 else try{heldItem(x,y,fx,fy,z.gun||'pistol',0);if(z.mf>0){const hp=handPos(x,y,fx,fy);Q(hp[0]+fx*12-1,hp[1]-2+fy*8,3,3,'#fff2a0')}}catch(e){}
 if(z.zb){noTr=true;txt(z.nm||'?',x,y-27,z.cap?'#9be07d':'#ff8a6a','center');noTr=false}
 if(z.lt>0){z.lt-=1/60;noTr=true;g.font=fnt(0,7);const w=Math.ceil(g.measureText(z.line).width)+6;Q(x-w/2,y-42,w,11,'rgba(20,10,8,.85)');Q(x-w/2,y-42,w,1,'#c83a2a');txt(z.line,x,y-34,'#f0d0c0','center');noTr=false}
 if(z.sur>0&&!z.cap&&Math.hypot(z.x-P.x,z.y-P.y)<40){noTr=true;txt(ZB((inv.cuffs>0?'E: bilincs':'Nincs bilincsed!'),(inv.cuffs>0?'E: cuff':'No handcuffs!')),x,y+12,inv.cuffs>0?'#ffd84a':'#ff8a6a','center');noTr=false}}
function zDrawRobot(z){const x=Math.round(z.x-cam.x),y=Math.round(z.y-cam.y),t=performance.now(),w=Math.floor(t/200)%2,bob=z.mv?w:0,f=(isFinite(z.fx)?z.fx:1)>=0?1:-1;
 Q(x-9,y-1,18,3,'rgba(0,0,0,.35)');/* treads */Q(x-8,y-5,6,5,'#2a2c2e');Q(x+2,y-5,6,5,'#2a2c2e');for(let i=0;i<3;i++){Q(x-8+i*2+w,y-4,1,3,'#4a4c4e');Q(x+2+i*2+w,y-4,1,3,'#4a4c4e')}
 /* body: rounded 50s chrome */Q(x-7,y-19-bob,14,14,'#8a9098');Q(x-7,y-19-bob,14,2,'#c8ced6');Q(x-7,y-7-bob,14,2,'#5a6068');Q(x-5,y-16-bob,10,6,'#3a4048');for(let i=0;i<4;i++)Q(x-4+i*2,y-15-bob,1,4,(Math.floor(t/150)+i)%3?'#ffb04a':'#6a3a10');
 Q(x-10,y-17-bob,3,8,'#6a7078');Q(x+7,y-17-bob,3,8,'#6a7078');Q(x+7*f+(f>0?0:-3),y-12-bob,4,2,'#c8ced6');
 /* dome head */Q(x-5,y-26-bob,10,7,'#a8b0b8');Q(x-4,y-27-bob,8,2,'#d8dee4');Q(x-3,y-24-bob,6,3,'#1a1e22');Q(x-2+f,y-23-bob,3,1,z.mf>0?'#ffffff':'#ff3a2a');Q(x,y-32-bob,1,5,'#8a9098');Q(x-1,y-34-bob,3,2,Math.floor(t/400)%2?'#ff3a2a':'#5a1a14');
 if(z.mf>0){g.fillStyle='rgba(140,250,255,.4)';g.fillRect(x+f*8-3,y-17-bob,6,6)}}
/* fewer infected-specific reactions: fire scares zombies, not bandits — the zombie loop already skips mutants */

/* ---------- the camp: sheriff, bounty board, prison ---------- */
function zFindCamp(){const G=new Map();for(const n of NPCS){if(n.zr)continue;const k=Math.round(n.hx/T)+','+Math.round(n.hy/T);G.set(k,(G.get(k)||0)+1)}let best=null,bs=-1e9;
 for(const[k,c]of G){const[x,y]=k.split(',').map(Number);const d=Math.hypot(x-SX,y-SY),s=c*10-d*.15;if(s>bs){bs=s;best={x,y}}}return best}
function zFreeNear(cx,cy,r0,r1){for(let r=r0;r<=r1;r++)for(let k=0;k<16;k++){const a=k/16*6.283,x=Math.round(cx+Math.cos(a)*r),y=Math.round(cy+Math.sin(a)*r),i=y*W+x;if(x<2||y<2||x>=W-2||y>=H-2)continue;const m=map[i];if((m==0||m==2||m==4||m==14)&&!ob[i]&&!ob[i+W])return[x,y]}return null}
function zSheriffAt(x,y){NPCS.push({x:x*T+8,y:y*T+8,hx:x*T+8,hy:y*T+8,wr:2,c:'134302',nm:ZB('Kovács őrmester','Sergeant Kovács'),zr:'sheriff',sx:'m',tr:0,g:0,kn:0,fr:0})}
function zSetupCamp(){if(ZS.camp&&NPCS.some(n=>n.zr=='sheriff'))return;if(ZS.camp){const s=zFreeNear(ZS.camp.bx!=null?ZS.camp.bx:ZS.camp.x,(ZS.camp.by!=null?ZS.camp.by:ZS.camp.y)+1,0,4)||[ZS.camp.x,ZS.camp.y];zSheriffAt(s[0],s[1]);return}const c=zFindCamp();if(!c)return;ZS.camp=c;
 const b=zFreeNear(c.x+2,c.y-2,1,5);if(b){ob[b[1]*W+b[0]]={t:'zboard',hp:999};ZS.camp.bx=b[0];ZS.camp.by=b[1]}
 const k=zFreeNear(c.x-3,c.y+1,1,6);if(k){ob[k[1]*W+k[0]]={t:'zcage',hp:999,n:0};ZS.camp.kx=k[0];ZS.camp.ky=k[1]}
 const s=zFreeNear(b?b[0]:c.x,b?b[1]+1:c.y,0,3)||[c.x,c.y];zSheriffAt(s[0],s[1])}
/* the sheriff wears a star */
{const dn130=drawNPC;drawNPC=function(n){const r=dn130(n);if(n.zr=='sheriff'){const x=n.x-cam.x,y=n.y-cam.y,bk=(n.fy||1)<-.45;if(!bk){Q(Math.round(x)+(n.fx>0?0:-3),Math.round(y)-10,3,3,'#ffd84a');Q(Math.round(x)+(n.fx>0?1:-2),Math.round(y)-9,1,1,'#fff6c8')}}else if(n.zr=='varga'||n.zr=='halmos'||n.zr=='res'||n.zr=='lili'){const x=n.x-cam.x,y=n.y-cam.y;if(n.zr=='halmos')Q(Math.round(x)-1,Math.round(y)-10,2,4,'#c83a2a');if(n.zr=='varga')Q(Math.round(x)-4,Math.round(y)-11,8,1,'#d8b020')}return r}}

if(typeof assignJobs105=='function'){const aj130=assignJobs105;assignJobs105=function(...a){const r=aj130.apply(this,a);for(const n of NPCS)if(n.zr){delete n.job;delete n.stx;delete n.sty}return r}}
/* ---------- bounties ---------- */
function zBtyGen(){const L=[],hq=ZS.hq.filter(h=>!h.gone),used=new Set();if(!hq.length)return L;for(let i=0;i<3;i++){let id,h,fn,ln,nk,tries=0;do{id='b'+Math.random().toString(36).slice(2,7);h=zHash(id);fn=ZFN[h%ZFN.length];ln=ZLN[(h>>>5)%ZLN.length];nk=(h>>>9)%ZNICK.hu.length;tries++}while(tries<20&&(used.has(fn)||used.has(ln)||used.has('n'+nk)||ZNICK.hu[nk].toLowerCase().includes(ln.toLowerCase().slice(0,4))));used.add(fn);used.add(ln);used.add('n'+nk);
  const q=hq[(h>>>3)%hq.length],lvl=1+(i==2?1:0)+(day>8?1:0);L.push({id,nm:ln+' '+fn,nk,hq:q.id,lvl,rd:{diamond:1+lvl,a9:6+lvl*2},ra:{diamond:3+lvl*2,medkit:1,a9:10},crime:(h>>>13)%6})}return L}
const ZCRIME={hu:['karavánt fosztott ki','lelőtt egy vízhordót','gyerekeket tartott fogva','felgyújtotta a déli tábort','gyógyszert lopott a kórházból','embereket adott el a bunker-csempészeknek'],en:['robbed a caravan','shot a water carrier','held children captive','burned the southern camp','stole medicine from the hospital','sold people to the bunker smugglers']};
function zBtyName(b){return b.nm+' „'+ZNICK[zhu()?'hu':'en'][b.nk]+'”'}
function zHq(id){return ZS.hq.find(h=>h.id===id)}
function zBtyTick(){const a=ZS.bty.act;if(!a)return;if(a.st=='hunt'){const h=zHq(a.hq);if(!h)return;const px=inD&&OW?OW.x:P.x,py=inD&&OW?OW.y:P.y,d=Math.hypot(h.x*T+8-px,h.y*T+8-py);
  if(!inD&&d<420&&!zs.some(z=>z.zb&&z.bid===a.id)){const bx=h.x*T+8,by=h.y*T+8;zs.push(zMkBandit(bx+zri(-20,20),by+zri(-10,20),{boss:1,nm:a.nm,bid:a.id,hq:h.id,gun:a.lvl>2?'smg':a.lvl>1?'shotgun':'revolver',hx:bx,hy:by}));for(let k=0;k<1+a.lvl;k++)zs.push(zMkBandit(bx+zri(-40,40),by+zri(-30,30),{hq:h.id,hx:bx,hy:by}));if(!a.seen){a.seen=1;say(ZB(a.nm+' itt rejtőzik. Élve többet ér — de élve nem adja olcsón magát.',a.nm+' hides here. Alive is worth more — but he won\'t come quietly.'))}}
  if(zs.some(z=>z.zb&&z.bid===a.id&&z.cap))a.st='escort'}
 if(a.st=='escort'&&!zs.some(z=>z.zb&&z.bid===a.id&&z.cap)&&!(inv.dtag>0))a.st='hunt';if(inv.dtag>0&&ZS.tagFor===a.id)a.st='tag'}
function zBtyTarget(){const a=ZS.bty.act;if(!a)return null;if(a.st=='escort'||a.st=='tag'){const s=NPCS.find(n=>n.zr=='sheriff');return s?[s.x,s.y,ZB('Kovács őrmester','Sgt. Kovács')]:null}const h=zHq(a.hq);return h?[h.x*T+8,h.y*T+8,a.nm]:null}
function zTurnIn(){const a=ZS.bty.act;if(!a)return null;const cap=zs.find(z=>z.zb&&z.bid===a.id&&z.cap&&Math.hypot(z.x-P.x,z.y-P.y)<90);let alive=false;
 if(cap){alive=true;zs.splice(zs.indexOf(cap),1);ZS.pris.push({nm:a.nm,d:day});const c=ZS.camp&&ob[ZS.camp.ky*W+ZS.camp.kx];if(c&&c.t=='zcage')c.n=(c.n|0)+1}else if(inv.dtag>0&&ZS.tagFor===a.id){inv.dtag--;ZS.tagFor=null}else return null;
 const rw=alive?a.ra:a.rd;for(const k in rw){inv[k]=(inv[k]|0)+rw[k]}ZS.done++;ZS.rep+=alive?15:8;if(alive)ZS.karma+=1;ZS.bty.act=null;ZS.bty.L=ZS.bty.L.filter(b=>b.id!==a.id);try{gainXp(alive?120:70)}catch(e){}try{fanfare112()}catch(e){snd('craft')}
 return{alive,rw}}
function zRewTxt(rw){return Object.entries(rw).map(([k,n])=>n+' '+tr(LBL[k]||k).toLowerCase()).join(', ')}
/* cuffing a surrendered boss */
function zTryCuff(){for(const z of zs){if(z.mu!='d'||!(z.sur>0)||z.cap)continue;if(Math.hypot(z.x-P.x,z.y-P.y)>34)continue;if(!(inv.cuffs>0)){say(ZB('Nincs bilincsed! A barkácsasztalnál készíthetsz (acélrúd + drót), vagy Kovácstól kaphatsz.','You have no handcuffs! Make them at a crafting table (steel bar + wire), or get some from Kovács.'));return true}
  inv.cuffs--;z.cap=1;z.sur=0;z.al=0;z.lt=0;snd('craft');say(ZB('Megbilincselted: '+(z.nm||'a bandita')+'. Kísérd be a táborba Kovács őrmesterhez — szorosan jön utánad.','You cuffed '+(z.nm||'the bandit')+'. Escort him to Sergeant Kovács at the camp — he follows close behind.'));return true}return false}

/* ---------- hideouts ---------- */
const ZCLR={tree:1,rock:1,bush:1,flax:1,grass:1,tgrass:1,shrub:1,flower:1,flowers:1,cactus:1,bones:1,rubble:1,paper:1,tire:1,junk:1,trash:1,stump:1,log:1,mushroom:1,reed:1};
function zGenHideouts(){if(ZS.hq.length)return;const want=4,got=[];const homes=NPCS.map(n=>[n.hx/T,n.hy/T]);
 for(let a=0;a<16000&&got.length<want;a++){const rl=a>8000?.6:1,x=12+Math.floor(R()*(W-24)),y=12+Math.floor(R()*(H-24)),b=bm[y*W+x]|0;if(b==3)continue;if(Math.hypot(x-SX,y-SY)<36*rl)continue;if(got.some(q=>Math.hypot(q[0]-x,q[1]-y)<50*rl))continue;if(homes.some(h=>Math.hypot(h[0]-x,h[1]-y)<26*rl))continue;
  try{const rc=locReactor();if(rc&&Math.hypot(x-rc.x,y-rc.y)<RR+10)continue}catch(e){}let ok=true;const e0=el?el[y*W+x]:0;for(let yy=y-4;yy<=y+4&&ok;yy++)for(let xx=x-5;xx<=x+5&&ok;xx++){const i=yy*W+xx,m=map[i];if(!(m==0||m==2||m==4||m==14)||(el&&el[i]!==e0))ok=false;else if(ob[i]&&!ZCLR[ob[i].t])ok=false;try{if(inAnyBld(xx*T+8,yy*T+8))ok=false}catch(e){}}if(!ok)continue;
  for(let yy=y-4;yy<=y+4;yy++)for(let xx=x-5;xx<=x+5;xx++){const i=yy*W+xx;ob[i]=null;if(Math.hypot(xx-x,(yy-y)*1.2)<4.6)map[i]=2}
  const P_=(dx,dy,o)=>{ob[(y+dy)*W+x+dx]=o};P_(-3,-2,{t:'ztent',hp:999});P_(2,-3,{t:'ztent',hp:999});P_(0,0,{t:'fbarrel',hp:99});P_(1,-1,{t:'zflag',hp:999});P_(-1,2,{t:'zstash',hp:999,it:null});
  for(const[dx,dy]of[[-4,1],[-4,2],[4,1],[4,0],[3,3],[-2,3]])P_(dx,dy,{t:'zsand',hp:60});
  const id='h'+got.length;ZS.hq.push({id,x,y,dead:0,t:0});got.push([x,y])}}
function zHqTick(dt){if(PEACE()||creative||inD)return;const pls=players();for(const h of ZS.hq){if(h.gone){if(day-(h.cl|0)>=5){h.gone=0;h.dead=0;for(let yy=h.y-4;yy<=h.y+4;yy++)for(let xx=h.x-5;xx<=h.x+5;xx++){const o=ob[yy*W+xx];if(o&&o.t=='zstash')o.op=0}}else continue}const hx=h.x*T+8,hy=h.y*T+8,near=pls.some(p=>Math.hypot(p.x-hx,p.y-hy)<460);if(!near){h.sp=0;continue}if(h.sp)continue;h.sp=1;
  const now=day+time;if(h.dead>0&&h.t&&now-h.t>1.5){h.dead=Math.max(0,h.dead-Math.floor((now-h.t)/1.5));h.t=now}
  const alive=zs.filter(z=>z.mu=='d'&&z.hq===h.id).length,want=Math.max(0,Math.min(5,2+Math.floor(day/4))-(h.dead|0));for(let k=alive;k<want;k++){const a=Math.random()*6.28,r=Math.random()*60;zs.push(zMkBandit(hx+Math.cos(a)*r,hy+Math.sin(a)*r,{hq:h.id,hx,hy}))}}}
/* roaming gangs on the roads, more as the days pass */
let ZROAM=40;
function zRoamTick(dt){if(PEACE()||creative||inD||day<2)return;ZROAM-=dt;if(ZROAM>0)return;ZROAM=90+Math.random()*120;if(zs.filter(z=>z.mu=='d').length>=6)return;if(Math.random()>.45)return;
 const pls=players(),cp=pls[Math.floor(Math.random()*pls.length)],a=Math.random()*6.28,x=cp.x+Math.cos(a)*SPR109(),y=cp.y+Math.sin(a)*SPR109();if(blocked(x,y,5))return;const n=2+(day>6?1:0);for(let k=0;k<n;k++)zs.push(zMkBandit(x+k*14,y+(k%2)*10,{hx:x,hy:y}))}
/* the stash in a cleared hideout */
function zStashLoot(){return{a9:zri(6,14),canned:zri(1,3),cloth:zri(1,3),bandage:zri(1,2),iron_ingot:zri(1,3),diamond:zri(0,2),cuffs:Math.random()<.5?1:0,[zpk(['pistol','revolver','shotgun','smg'])]:Math.random()<.4?1:0}}

/* ---------- robots at the plant ---------- */
function zRobotTick(dt){if(PEACE()||creative||inD)return;let rc=null;try{rc=locReactor()}catch(e){}if(!rc)return;const cx=rc.x*T+8,cy=rc.y*T+8,pls=players(),near=pls.some(p=>Math.hypot(p.x-cx,p.y-cy)<RR*T*1.1);if(!near)return;
 ZS.rob.t-=dt;const n=zs.filter(z=>z.mu=='r').length,want=(dk0()>.5?4:2)+(STORY&&STORY.z&&ZS.st>=2?1:0);if(ZS.rob.t<=0&&n<want){ZS.rob.t=40+Math.random()*40;for(let k=0;k<20;k++){const a=Math.random()*6.28,r=(.3+Math.random()*.5)*RR*T,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;if(!blocked(x,y,6)&&pls.every(p=>Math.hypot(p.x-x,p.y-y)>180)){zs.push(zMkRobot(x,y));break}}}}

/* ---------- camp raids: every fourth night the gangs come for the camp ---------- */
function zRaidTick(){if(PEACE()||creative||!ZS.camp||inD)return;const night=dk0()>.55;if(day>=3&&day%4==3&&night&&ZS.raid.d!==day){ZS.raid={d:day,k:0,n:0,on:1};const n=3+Math.min(3,Math.floor(day/6)),cx=ZS.camp.x*T+8,cy=ZS.camp.y*T+8;
  for(let k=0;k<n;k++)for(let t=0;t<30;t++){const a=Math.random()*6.28,r=230+Math.random()*90,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;if(!blocked(x,y,5)){zs.push(zMkBandit(x,y,{raid:1,hx:cx,hy:cy}));ZS.raid.n++;break}}
  if(Math.hypot(P.x-cx,P.y-cy)<900)say(ZB('Lövések a tábor felől! A banditák rajtaütöttek a táboron — segíts megvédeni!','Gunshots from the camp! Bandits are raiding it — help defend it!'))}
 if(ZS.raid.on){const left=zs.filter(z=>z.raid).length;if(ZS.raid.n&&left==0){ZS.raid.on=0;if(ZS.raid.k>0){ZS.rep+=10;ZS.karma+=1;inv.diamond=(inv.diamond|0)+2;inv.canned=(inv.canned|0)+2;say(ZB('Visszavertétek a rajtaütést! A tábor hálás: +2 műtárgy, +2 konzerv.','The raid is beaten back! The camp is grateful: +2 artifacts, +2 tins.'));try{fanfare112()}catch(e){}}}
  else if(!night&&left){for(let i=zs.length-1;i>=0;i--)if(zs[i].raid)zs.splice(i,1);ZS.raid.on=0;say(ZB('A banditák hajnalra elvonultak a tábor alól — vittek, amit tudtak.','By dawn the bandits left the camp — taking what they could carry.'))}}}

/* ---------- the dialogue panel for drones, terminals, bunker people, memories, endings ---------- */
function zDlg(name,text,opts,kind,lk){ZDLG={name,text,opts:opts||[[ZB('Rendben','All right'),null]],sel:0,t0:performance.now(),kind:kind||'npc',lk};K.KeyW=K.KeyA=K.KeyS=K.KeyD=K.ArrowUp=K.ArrowDown=K.ArrowLeft=K.ArrowRight=false;try{snd('ui')}catch(e){}}
function zPick(i){const d=ZDLG;if(!d)return;const o=d.opts[i];if(!o||o[2]===false)return;ZDLG=null;try{snd('ui')}catch(e){}if(o[1])o[1]()}
function zDlgRect(){const w=Math.min(380,VW-20),x=(VW-w)/2;g.font=fnt(0,8);const lines=zWrap(ZDLG.text,w-58),h=30+lines.length*10+ZDLG.opts.length*12;return{x,y:VH-h-14,w,h,lines}}
function zWrap(s,w){const out=[];let line='';for(const word of String(s).split(' ')){const t=line?line+' '+word:word;if(g.measureText(t).width>w&&line){out.push(line);line=word}else line=t}if(line)out.push(line);return out}
function zDrawDlg(){const d=ZDLG;if(!d)return;noTr=true;const r=zDlgRect(),now=performance.now();Q(r.x-2,r.y-2,r.w+4,r.h+4,d.kind=='drone'?'#3a6a7a':d.kind=='memo'?'#6a4a8a':d.kind=='term'?'#2a5a3a':'#2a2218');Q(r.x,r.y,r.w,r.h,d.kind=='memo'?'rgba(20,12,28,.95)':'rgba(14,16,14,.95)');
 /* portrait */const px=r.x+8,py=r.y+8;Q(px,py,36,36,'#1a1e1a');if(d.kind=='drone'){const b=Math.sin(now/200)*2;Q(px+8,py+14+b,20,8,'#8a9098');Q(px+12,py+11+b,12,4,'#c8ced6');Q(px+15,py+16+b,6,3,'#1a1e22');Q(px+17,py+17+b,2,1,Math.floor(now/300)%2?'#ff3a2a':'#ffb04a');Q(px+2,py+9+b,12,1,'rgba(200,220,230,.6)');Q(px+22,py+9+b,12,1,'rgba(200,220,230,.6)')}
 else if(d.kind=='term'){Q(px+4,py+6,28,20,'#0a1a10');for(let i=0;i<4;i++)Q(px+7,py+9+i*4,(8+((now/200+i*5)|0)%14),2,'#6aff8a');Q(px+10,py+28,16,4,'#3a3e42')}
 else if(d.kind=='memo'){const a=.5+.5*Math.sin(now/200);Q(px+6,py+4,24,28,'rgba(200,160,240,'+(.3+.3*a).toFixed(2)+')');Q(px+10,py+8,16,20,'#efe4fa');for(let i=0;i<4;i++)Q(px+12,py+11+i*4,12,1,'#6a4a8a')}
 else if(d.lk){try{g.save();drawChar(px+18-0,py+33,chOf(d.lk),0,0,1,1.6,{});g.restore()}catch(e){}}
 else{Q(px+12,py+8,12,14,'#c89a70');Q(px+10,py+22,16,12,'#5a5a4a')}
 txt(d.name,r.x+52,r.y+12,d.kind=='drone'?'#8af8ff':d.kind=='memo'?'#c8a0f0':'#ffd84a');g.font=fnt(0,8);g.textAlign='left';g.fillStyle='#e8e4d8';const n=Math.floor((now-d.t0)/16);let left=n;r.lines.forEach((l,i)=>{if(left<=0)return;g.fillText(l.slice(0,left),r.x+52,r.y+25+i*10);left-=l.length+1});
 const oy=r.y+28+r.lines.length*10;d.opts.forEach((o,i)=>{const y=oy+i*12,on=d.sel==i,dis=o[2]===false;if(on&&!dis)Q(r.x+48,y-1,r.w-56,11,'rgba(255,216,74,.18)');txt((i+1)+'. '+o[0],r.x+54,y+8,dis?'#5a6050':on?'#ffd84a':'#c8d0b8')});noTr=false}
addEventListener('keydown',e=>{if(!ZDLG||state!='play')return;const c=e.code,n=ZDLG.opts.length;let used=true;
 if(c=='ArrowUp'||c=='KeyW')ZDLG.sel=(ZDLG.sel+n-1)%n;else if(c=='ArrowDown'||c=='KeyS')ZDLG.sel=(ZDLG.sel+1)%n;else if(/^Digit[1-9]$/.test(c)){const i=+c.slice(5)-1;if(i<n)zPick(i)}
 else if(c=='KeyE'||c=='Enter'||c=='Space'){if(!e.repeat){if(performance.now()-ZDLG.t0<350)return;zPick(ZDLG.sel)}}else if(c=='Escape'){ZDLG=null}else used=false;if(used){e.stopImmediatePropagation();e.preventDefault()}},true);
C.addEventListener('mousedown',e=>{if(!ZDLG||state!='play')return;try{sc(e)}catch(_){}const r=zDlgRect(),oy=r.y+28+r.lines.length*10;e.stopImmediatePropagation();e.preventDefault();if(ms.y>=oy-2&&ms.x>=r.x&&ms.x<r.x+r.w){const i=Math.floor((ms.y-oy+2)/12);if(i>=0&&i<ZDLG.opts.length)zPick(i)}},true);
C.addEventListener('mousemove',()=>{if(!ZDLG)return;try{const r=zDlgRect(),oy=r.y+28+r.lines.length*10,i=Math.floor((ms.y-oy+2)/12);if(i>=0&&i<ZDLG.opts.length)ZDLG.sel=i}catch(e){}});
{const up130d=update;update=function(dt){if(ZDLG){K.KeyW=K.KeyA=K.KeyS=K.KeyD=K.ArrowUp=K.ArrowDown=K.ArrowLeft=K.ArrowRight=false;mdown=false}return up130d(dt)}}

/* ===================== ZÓNA 2100 story mode ===================== */
const ZINTRO=[['ZÓNA 2100','ZONE 2100'],['Egy erdő szélén ébredsz. 2100 van — csak ennyit tudsz biztosan.','You wake at the edge of a forest. It is 2100 — that much you know.'],['A karodon sérült azonosító: „ERŐMŰ-BONTÁSI PROGRAM · 4. MŰSZAK”. A név olvashatatlan.','On your arm, a damaged badge: “PLANT DECOMMISSIONING · SHIFT 4”. The name is unreadable.'],['Tíz éve robbant fel az atomerőmű a bontás közben. A mágneses mezőgenerátor tartja vissza a sugárzást — azóta ez a Zóna.','Ten years ago the nuclear plant blew up during decommissioning. A magnetic field generator holds back the radiation — ever since, this is the Zone.'],['Odakint a háború még tart. Idebent a Bunker-7 kapui zárva, a táborok éheznek, a bandák vadásznak.','Outside, the war goes on. In here, Bunker-7 stays shut, the camps starve and the gangs hunt.'],['Élj túl. Aztán derítsd ki, ki vagy.','Survive. Then find out who you are.']];
const ZNOTES=[['Sérült munkahelyi azonosító: „ERŐMŰ-BONTÁSI PROGRAM · 4. MŰSZAK · B. …” A név olvashatatlan, a fénykép rólad készült.','A damaged staff badge: “PLANT DECOMMISSIONING · SHIFT 4 · B. …” The name is unreadable, the photo is of you.'],
 ['Gyűrött lista: „Bunker-7 — beengedettek.” Sok név. Az egyik áthúzva, mellette: „mérnök — veszélyes”.','A crumpled list: “Bunker-7 — admitted.” Many names. One is crossed out, with a note: “engineer — dangerous”.'],
 ['Rádiónapló: „A bontást két héttel előrehozták, Halmos igazgató utasítására. A biztonsági ellenőrzést elhalasztották.”','Radio log: “Decommissioning was brought forward two weeks on Director Halmos’ orders. The safety check was postponed.”'],
 ['Fosztogatónapló: „Láttam a mérnököt a robbanás után. Kisétált a romokból, mintha semmi baja. A drónok követték.”','A looter’s diary: “I saw the engineer after the blast. Walked out of the ruins like nothing happened. The drones followed.”'],
 ['Műszaknapló, a TE kézírásoddal: „Figyelmeztettem őket. A mező gyengül. Ha most bontunk, minden elszabadul.”','A shift log, in YOUR handwriting: “I warned them. The field is weakening. If we dismantle now, everything breaks loose.”'],
 ['Megfakult fénykép: te és egy kislány a bunker kapuja előtt. A hátulján: „Apa, gyere haza. — Lili”','A faded photo: you and a little girl at the bunker gate. On the back: “Dad, come home. — Lili”']];
const ZRADIO=[['…itt Bunker-7, a nyugalom szigete. Minden lakónk biztonságban. A Zóna ideiglenes állapot.','…this is Bunker-7, the island of calm. All our residents are safe. The Zone is a temporary condition.'],['…zene következik: a Holnap Dala, előadja az Atomos Kórus…','…and now music: the Song of Tomorrow, by the Atomic Choir…'],['…felhívás: a vízszűrők cseréje kötelező. Halmos igazgató köszöni a fegyelmet.','…notice: changing the water filters is mandatory. Director Halmos thanks you for your discipline.'],['…a karantén határa lezárva. Aki kint maradt, legyen türelmes. Nemsokára… — recsegés —','…the quarantine border is closed. Those outside, be patient. Soon… — static —'],['…Lili, ha hallasz… a tornyot valaki megjavította. Talán ő az.','…Lili, if you can hear me… someone fixed the tower. Maybe it’s him.']];
const zSt=()=>ZS.st|0,zHas=(k,n)=>(inv[k]|0)>=n,zTake=c=>{for(const k in c)inv[k]-=c[k]},zCost=c=>Object.entries(c).every(([k,n])=>zHas(k,n)),zCostTxt=c=>Object.entries(c).map(([k,n])=>n+' '+tr(LBL[k]||k).toLowerCase()).join(', ');
const ZTOWER={iron_ingot:3,glass:2,gold:2},ZPLATES={iron_ingot:5};
const ZACT=[
 {n:['A Zóna','The Zone'],radio:[{k:'think',t:['Füst száll fel valahol. Ahol füst van, ott emberek is lehetnek. Ahol emberek, ott baj is.','Smoke rises somewhere. Where there is smoke there may be people. Where there are people, there is trouble.']}],
  steps:[
   {id:'gather',b:{k:'think',t:['Fa és kő. A Zóna nem ad semmit ingyen.','Wood and stone. The Zone gives nothing for free.']},t:['Gyűjts fát','Gather wood'],h:['Kattints egy fára (tartsd nyomva)','Click a tree (hold)'],p:()=>[Math.min(10,inv.wood|0),10]},
   {id:'fire',b:{k:'memo',t:['Tűz. Egy pillanatra egy vezérlőterem jut eszedbe: villogó lámpák, valaki a nevedet kiabálja.','Fire. For a moment you remember a control room: flashing lights, someone shouting your name.']},t:['Rakj tábortüzet','Build a campfire'],h:['Készítés (C) → Tábortűz, tedd le és gyújtsd meg','Craft (C) → Campfire, place it and light it'],c:()=>!!stNear(o=>o.t=='fire'&&o.on,8)},
   {id:'shelter',b:{k:'think',t:['Négy fal, egy ajtó, fölötte tető. Itt talán megérem a reggelt.','Four walls, a door, a roof above. Maybe I’ll see the morning here.']},t:['Építs zárt helyiséget (a tető magától jön)','Build a closed room (the roof comes by itself)'],h:['Falak és ajtó körbe — vagy egy faház','Walls and a door all around — or a cabin'],c:()=>ZR.length>0||!!stNear(o=>o.t=='cabin',12)},
   {id:'camp',b:{k:'think',t:['Palánk, sátrak, tűzhordó — és emberek, akik nem jutottak be a bunkerbe.','A palisade, tents, a fire barrel — and people who never made it into the bunker.']},t:['Keresd meg a túlélők táborát','Find the survivors’ camp'],h:['Kövesd a nyilat','Follow the arrow'],c:()=>!!ZS.camp&&!inD&&Math.hypot(ZS.camp.x*T-P.x,ZS.camp.y*T-P.y)<9*T,to:()=>ZS.camp?[ZS.camp.x*T+8,ZS.camp.y*T+8]:null}]},
 {n:['A Tábor Törvénye','The Law of the Camp'],radio:[{k:'think',t:['A Zónában nincs törvény. Csak az van, amit az emberek megtartanak.','There is no law in the Zone. Only what people choose to keep.']}],
  steps:[
   {id:'sheriff',t:['Beszélj Kovács őrmesterrel','Talk to Sergeant Kovács'],h:['Csillag a mellén. E: beszélgetés','A star on his chest. E: talk'],c:()=>!!ZS.met.sheriff,to:()=>{const s=NPCS.find(n=>n.zr=='sheriff');return s?[s.x,s.y]:null}},
   {id:'bounty',b:{k:'think',t:['Élve vagy holtan. A Zónában ez a különbség mindennél többet ér.','Dead or alive. In the Zone, that difference is worth more than anything.']},t:['Teljesíts egy vérdíjat','Complete a bounty'],h:['Vérdíj: Kovácsnál. Élve: bilincs (E), majd kísérd be','Bounties: from Kovács. Alive: cuff (E) and escort him'],c:()=>ZS.done>=1,to:()=>{const t=zBtyTarget();return t?[t[0],t[1]]:null}},
   {id:'glass',b:{k:'memo',t:['Homok, hő, üveg. Ugyanígy tanultuk az egyetemen. Te tanítottad… vagy tanultad? Mérnök voltál.','Sand, heat, glass. Just like at university. Did you teach it… or learn it? You were an engineer.']},t:['Olvassz 2 üveget','Melt 2 glass'],h:['Ásóval homok (sivatag, part), kemencében szénnel','Dig sand (desert, shore), smelt it with coal'],p:()=>[Math.min(2,inv.glass|0),2]},
   {id:'drones',b:{k:'think',t:['Drónok. Három, körbe-körbe. Mintha várnának valakire.','Drones. Three of them, circling. As if they were waiting for someone.']},t:['Keresd meg a Bunker-7 drónjait','Find the drones of Bunker-7'],h:['Közelíts a bunker kapujához, E: beszélj a drónnal','Approach the bunker gate, E: talk to a drone'],c:()=>!!ZS.met.drone,to:()=>ZS.bunker?[ZS.bunker.x*T+8,ZS.bunker.y*T+8]:null}]},
 {n:['Bunker-7','Bunker-7'],radio:[],
  steps:[
   {id:'plates',t:['Vigyél 5 acélrudat a drónoknak','Bring 5 steel bars to the drones'],h:['Vasat olvassz kemencében, aztán E a drónnál','Smelt iron in a furnace, then E at a drone'],c:()=>zSt()>=1,to:()=>ZS.bunker?[ZS.bunker.x*T+8,ZS.bunker.y*T+8]:null},
   {id:'tower',b:{k:'radio',t:['…kkhh… itt Bunker-7… a jel helyreállt… köszönjük, ismeretlen… vagy mégsem ismeretlen?','…kkhh… this is Bunker-7… signal restored… thank you, stranger… or not a stranger?']},t:['Javítsd meg az adótornyot','Repair the radio tower'],h:['3 acélrúd, 2 üveg, 2 elektronika — E a tornyon','3 steel bars, 2 glass, 2 electronics — E on the tower'],c:()=>zSt()>=2,to:()=>ZS.tower?[ZS.tower.x*T+8,ZS.tower.y*T+8]:null},
   {id:'box',b:{k:'note',t:['A doboz kijelzője még él. A felvételen a TE hangod: „Itt a 4. műszak. A mező gyengül, a bontást le kell állítani… Halmos igazgató, ne nyomja meg—” Robaj. Csend.','The box’s display is still alive. On the recording, YOUR voice: “Shift 4 here. The field is weakening, stop the decommissioning… Director Halmos, don’t press—” A roar. Silence.']},t:['Hozd el a fekete dobozt az erőműből','Fetch the black box from the plant'],h:['A reaktor körül — robotok őrzik. Gázálarc!','Around the reactor — robots guard it. Gas mask!'],c:()=>(inv.zbox|0)>0||zSt()>=4,to:()=>ZS.box?[ZS.box.x*T+8,ZS.box.y*T+8]:null},
   {id:'gate',t:['Vidd a dobozt a drónokhoz — vagy tartsd meg','Take the box to the drones — or keep it'],h:['E a drónnál: döntened kell','E at a drone: you must decide'],c:()=>zSt()>=4,to:()=>ZS.bunker?[ZS.bunker.x*T+8,ZS.bunker.y*T+8]:null}]},
 {n:['A Mélyben','In the Depths'],radio:[{k:'radio',t:['…figyelem, lakók: a főkapu tíz év után kinyílt. Maradjanak a szállásukon. Az igazgató mindent kézben tart.','…attention, residents: the main gate has opened for the first time in ten years. Stay in your quarters. The director has everything under control.']}],
  steps:[
   {id:'enter',t:['Lépj be a Bunker-7-be','Enter Bunker-7'],h:['A nyitott páncélkapu: E','The open blast door: E'],c:()=>ZBK,to:()=>ZS.bunker?[ZS.bunker.x*T+8,ZS.bunker.y*T+8]:null},
   {id:'lili',t:['Keresd meg, ki vár odalent','Find who is waiting down there'],h:['A lakószinten, a hidropónikus kert mellett','On the living level, by the hydroponic garden'],c:()=>!!ZS.met.lili},
   {id:'halmos',t:['Beszélj Halmos igazgatóval','Talk to Director Halmos'],h:['A parancsnoki szint, a folyosó végén. Gyűjts emlékeket: '+'',''],c:()=>!!ZS.end}]}];
/* swap the story the old machinery runs: winter or the Zone */
let ZSACT0=null,ZINTRO0=null;
function zSwap(){const want=STORY&&STORY.z?1:0;if(want===ZSWAP)return;if(!ZSACT0){ZSACT0=SACT.slice();ZINTRO0=INTRO.slice()}SACT.length=0;INTRO.length=0;if(want){SACT.push(...ZACT);INTRO.push(...ZINTRO)}else{SACT.push(...ZSACT0);INTRO.push(...ZINTRO0)}ZSWAP=want}
function zEndLines(){const e=ZEND[ZS.end]||ZEND.B,h=zhu(),k=ZS.karma|0,tone=k>=8?ZB('Akik ismertek, jó emberként emlegetnek.','Those who knew you speak of a good person.'):k>=3?ZB('Akik ismertek, azt mondják: tisztességes voltál.','Those who knew you say you were decent.'):ZB('Akik ismertek, nem sokat beszélnek rólad.','Those who knew you don’t say much about you.');
 return[...e[h?1:2],tone,'',h?'VÉGE':'THE END',h?'Köszönjük, hogy játszottál!':'Thank you for playing!']}
const ZEND={A:[['A KAPUK NYITVA','THE GATES ARE OPEN'],['Bunker-7 kapui tíz év után kitárultak.','A táborok népe beköltözött, a raktárak fél év alatt kiürültek —','de senki nem maradt kint egyedül.','Lili a kapuban áll, és mindenkinek elmondja a neved.'],['The gates of Bunker-7 opened after ten years.','The camps moved in; the stores ran dry within half a year —','but no one was left outside alone.','Lili stands at the gate and tells everyone your name.']],
 B:[['A CSEND ÁRA','THE PRICE OF SILENCE'],['Maradtál. Meleg ágy, tiszta víz, Lili a közeledben.','Halmos tovább vezet, a titok veled marad.','Néha éjjel kimész a kapuhoz,','és nézed a táborok tüzeit a folyón túl.'],['You stayed. A warm bed, clean water, Lili close by.','Halmos still leads; the secret stays with you.','Some nights you walk out to the gate','and watch the camp fires across the river.']],
 C:[['A ZÓNA LÉLEGZIK','THE ZONE BREATHES'],['A generátor elhallgatott. A Vörös erdő lassan elszürkül, aztán kizöldül.','A fertőzöttek egy utolsó éjszakán rohamra indultak — és hajnalra eltűntek.','A karantén határán a katonák leeresztik a fegyvert.','Most először: tavasz a Zónában.'],['The generator went silent. The Red Forest greys, then turns green.','The infected made one last charge in the night — and were gone by dawn.','At the quarantine line the soldiers lower their rifles.','For the first time: spring in the Zone.']],
 D:[['ÚJ REND','A NEW ORDER'],['Varga és az emberei melléd álltak. Halmos a saját börtönében ül.','A bunker most a te szabályaid szerint él:','a kapu nyitva a dolgozóknak, zárva a fosztogatóknak.','A Zóna először hall egy hangot, ami nem hazudik.'],['Varga and his people stood with you. Halmos sits in his own cell.','The bunker lives by your rules now:','the gate open to workers, shut to looters.','For the first time the Zone hears a voice that does not lie.']]};
ZEND.A[1]=ZEND.A[1];for(const k in ZEND){const e=ZEND[k];ZEND[k]=[e[0],[e[0][0],...e[1]],[e[0][1],...e[2]]]}

/* ---------- placing the story in the world ---------- */
function zSpot(fn,tries){for(let a=0;a<(tries||5000);a++){const x=10+Math.floor(Math.random()*(W-20)),y=10+Math.floor(Math.random()*(H-20));if(fn(x,y))return[x,y]}return null}
function zFlat(x,y,rx,ry){const e0=el?el[y*W+x]:0;for(let yy=y-ry;yy<=y+ry;yy++)for(let xx=x-rx;xx<=x+rx;xx++){if(xx<2||yy<2||xx>=W-2||yy>=H-2)return false;const i=yy*W+xx,m=map[i];if(!(m==0||m==2||m==4||m==12||m==14)||(el&&el[i]!==e0))return false;if(ob[i]&&!ZCLR[ob[i].t])return false;if((bm[i]|0)==3)return false;try{if(inAnyBld(xx*T+8,yy*T+8))return false}catch(e){}}return true}
function zStoryWorld(){let rc=null;try{rc=locReactor()}catch(e){}const homes=NPCS.map(n=>[n.hx/T,n.hy/T]),far=(x,y,d)=>Math.hypot(x-SX,y-SY)>=d,awayR=(x,y,d)=>!rc||Math.hypot(x-rc.x,y-rc.y)>=d;
 /* Bunker-7: a concrete face with the blast door, far from where you woke */
 let b=null,bs=-1e9;for(let a=0;a<30000;a++){const x=10+Math.floor(Math.random()*(W-20)),y=10+Math.floor(Math.random()*(H-20)),i=y*W+x;if(map[i]!=0||(bm[i]|0)==3||(bm[i]|0)==1)continue;const dS=Math.hypot(x-SX,y-SY);if(dS<30)continue;const dR=rc?Math.hypot(x-rc.x,y-rc.y):99,dH=Math.min(99,...homes.map(h=>Math.hypot(h[0]-x,h[1]-y))),dQ=Math.min(99,...ZS.hq.map(h=>Math.hypot(h.x-x,h.y-y)));
  const sc=Math.min(dR-RR-12,40)*2+Math.min(dS,85)-(dH<24?80:0)-(dQ<24?60:0);if(sc<=bs)continue;if(!zFlat(x,y,6,5))continue;bs=sc;b=[x,y]}
 if(b){const[x,y]=b;for(let yy=y-5;yy<=y+5;yy++)for(let xx=x-6;xx<=x+6;xx++){const i=yy*W+xx;ob[i]=null}for(let yy=y+1;yy<=y+5;yy++)for(let xx=x-3;xx<=x+3;xx++)map[yy*W+xx]=2;
  for(let xx=x-6;xx<=x+6;xx++){const ax=Math.abs(xx-x);if(ax>=3){ob[y*W+xx]={t:'zcon',hp:999};ob[(y-1)*W+xx]={t:'zcon',hp:999};ob[(y-2)*W+xx]={t:'zcon',hp:999}}else{if(ax)ob[y*W+xx]={t:'zinv',hp:999};ob[(y-1)*W+xx]={t:'zinv',hp:999};ob[(y-2)*W+xx]={t:'zinv',hp:999}}}
  ob[y*W+x]={t:'zblast',hp:999};ob[(y+2)*W+x-4]={t:'zbulb',hp:999};ob[(y+2)*W+x+4]={t:'zbulb',hp:999};ZS.bunker={x,y}}
 /* the radio tower on open ground between you and the bunker */
 const tw=zSpot((x,y)=>far(x,y,30)&&b&&Math.hypot(x-b[0],y-b[1])>25&&Math.hypot(x-b[0],y-b[1])<70&&zFlat(x,y,2,2),8000)||zSpot((x,y)=>zFlat(x,y,2,2));
 if(tw){const[x,y]=tw;for(let yy=y-2;yy<=y+2;yy++)for(let xx=x-2;xx<=x+2;xx++)ob[yy*W+xx]=null;ob[y*W+x]={t:'ztower',hp:999,fixed:0};ZS.tower={x,y}}
 /* the black box near the plant */
 if(rc){const bx=zSpot((x,y)=>{const d=Math.hypot(x-rc.x,y-rc.y);return d>8&&d<RR*.55&&!ob[y*W+x]&&map[y*W+x]!=1&&map[y*W+x]!=5&&!blocked(x*T+8,y*T+8,4)},6000);if(bx){ob[bx[1]*W+bx[0]]={t:'zbox',hp:999};ZS.box={x:bx[0],y:bx[1]}}}
 /* six memories */
 const spots=[[SX,SY,6,14],ZS.camp?[ZS.camp.x,ZS.camp.y,5,10]:null,ZS.hq[0]?[ZS.hq[0].x,ZS.hq[0].y,2,5]:null,ZS.tower?[ZS.tower.x,ZS.tower.y,3,7]:null,rc?[rc.x,rc.y,RR*.4,RR*.8]:null,ZS.bunker?[ZS.bunker.x,ZS.bunker.y+4,4,9]:null];
 let n=0;for(const s of spots){const order=[0,1,3,2,4,5][n];n++;let p=null;if(s)p=zSpot((x,y)=>{const d=Math.hypot(x-s[0],y-s[1]);return d>=s[2]&&d<=s[3]&&!ob[y*W+x]&&(map[y*W+x]==0||map[y*W+x]==2||map[y*W+x]==4)&&!blocked(x*T+8,y*T+8,4)},4000);if(!p)p=zSpot((x,y)=>!ob[y*W+x]&&map[y*W+x]==0&&far(x,y,20));if(p)ob[p[1]*W+p[0]]={t:'znote',hp:999,n:order}}}
function zStart(){if(ZS.camp&&Math.hypot(ZS.camp.x-SX,ZS.camp.y-SY)>80){const c=ZS.camp;for(const[k1,k2]of[['bx','by'],['kx','ky']])if(c[k1]!=null){const o=ob[c[k2]*W+c[k1]];if(o&&(o.t=='zboard'||o.t=='zcage'))ob[c[k2]*W+c[k1]]=null}for(let i=NPCS.length-1;i>=0;i--)if(NPCS[i].zr=='sheriff')NPCS.splice(i,1);ZS.camp=null}
 zSetupCamp();zStoryWorld();ZS.zm=1}
function zNearCamp(x,y){let best=1e9;for(const n of NPCS){if(n.zr)continue;const d=Math.hypot(n.hx/T-x,n.hy/T-y);if(d<best)best=d}return best>=22&&best<=60}

/* ---------- drones ---------- */
function zDrones(){const b=ZS.bunker;if(!b||!STORY||!STORY.z||inD)return[];const t=performance.now()/1000,cx=b.x*T+8,cy=(b.y+4)*T;return[0,1,2].map(k=>{const a=t*(.25+k*.07)+k*2.1,r=70+k*18;return{x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r*.6,k}})}
function zDrawDrones(){const D=zDrones();if(!D.length)return;const t=performance.now();for(const d of D){const x=Math.round(d.x-cam.x),y=Math.round(d.y-cam.y),b=Math.round(Math.sin(t/300+d.k)*2);if(x<-30||y<-40||x>VW/ZM+30||y>VH/ZM+40)continue;
  Q(x-6,y+10,12,3,'rgba(0,0,0,.25)');Q(x-8,y-20+b,16,6,'#8a9098');Q(x-6,y-23+b,12,3,'#c8ced6');Q(x-3,y-17+b,6,3,'#1a1e22');Q(x-1,y-16+b,2,1,Math.floor(t/300+d.k)%2?'#ff3a2a':'#ffb04a');
  const rp=Math.floor(t/40)%2;Q(x-14,y-23+b,10,1,rp?'rgba(220,230,240,.7)':'rgba(220,230,240,.3)');Q(x+4,y-23+b,10,1,rp?'rgba(220,230,240,.3)':'rgba(220,230,240,.7)');Q(x-9,y-22+b,1,3,'#5a6068');Q(x+8,y-22+b,1,3,'#5a6068');
  if(Math.hypot(d.x-P.x,d.y-P.y)<120){g.fillStyle='rgba(255,80,60,.10)';g.beginPath();g.moveTo(x,y-14+b);g.lineTo(P.x-cam.x-10,P.y-cam.y+4);g.lineTo(P.x-cam.x+10,P.y-cam.y+4);g.closePath();g.fill()}}
 const near=D.some(d=>Math.hypot(d.x-P.x,d.y-P.y)<48);if(near&&!ZDLG&&!TALK){noTr=true;txt(ZB('E: beszélj a drónnal','E: talk to the drone'),P.x-cam.x,P.y-cam.y-30,'#8af8ff','center');noTr=false}}
function zNearDrone(){return zDrones().some(d=>Math.hypot(d.x-P.x,d.y-P.y)<48)}
function zTalkDrone(){const V='BUNKER-7',s=zSt();ZS.met.drone=1;
 if(s==0)zDlg(V,ZB('„Azonosítatlan személy. Állj meg.” Kattogás. „…Arcfelismerés: EGYEZÉS. Érdekes. A kapu zárva marad. Ha hasznos akarsz lenni: hozz 5 acélrudat.”','“Unidentified person. Halt.” Clicking. “…Face recognition: MATCH. Interesting. The gate stays shut. If you want to be useful: bring 5 steel bars.”'),[
  [ZB('Itt van 5 acélrúd','Here are 5 steel bars'),()=>{zTake(ZPLATES);ZS.st=1;inv.cell=(inv.cell|0)+10;try{fanfare112()}catch(e){}zDlg(V,ZB('„Elfogadva. +10 energiacella. Következő feladat: az adótorony elnémult. Javítsd meg: '+zCostTxt(ZTOWER)+'.”','“Accepted. +10 energy cells. Next task: the radio tower has gone silent. Repair it: '+zCostTxt(ZTOWER)+'.”'),null,'drone')},zCost(ZPLATES)],
  [ZB('Ki vagyok én? Ismertek?','Who am I? Do you know me?'),()=>zDlg(V,ZB('„Az adat zárolt. Az arcod nem.”','“The data is locked. Your face is not.”'),null,'drone')],[ZB('Elmegyek','I’m leaving'),null]],'drone');
 else if(s==1)zDlg(V,ZB('„Az adótorony még mindig hallgat. Kell hozzá: '+zCostTxt(ZTOWER)+'.”','“The radio tower is still silent. It needs: '+zCostTxt(ZTOWER)+'.”'),[[ZB('Úton vagyok','On my way'),null]],'drone');
 else if(s==2)zDlg(V,ZB('„A torony újra sugároz. Szép munka, mérnök.” Szünet. „Most valami nehezebb: az erőmű romjai között van egy fekete doboz. Hozd el. És ne hallgasd meg.”','“The tower broadcasts again. Nice work, engineer.” A pause. “Now something harder: among the ruins of the plant lies a black box. Bring it. And don’t listen to it.”'),[[ZB('Miért mondtad, hogy mérnök?','Why did you call me engineer?'),()=>zDlg(V,ZB('„Elszóltam magam. Hozd a dobozt.”','“A slip of the tongue. Bring the box.”'),null,'drone')],[ZB('Indulok','On my way'),()=>{ZS.st=3}]],'drone');
 else if(s==3)zDlg(V,inv.zbox>0?ZB('„A fekete doboz. Add át.”','“The black box. Hand it over.”'):ZB('„Hol a fekete doboz? Az erőműnél, a reaktor körül.”','“Where is the black box? At the plant, around the reactor.”'),[
  [ZB('Átadom','Hand it over'),()=>{inv.zbox--;ZS.st=4;ZS.kept=0;inv.cell=(inv.cell|0)+20;snd('door');zDlg(V,ZB('„Köszönjük. A kapu nyitva. Az igazgató látni akar.” A páncélkapu mögött megmozdul valami.','“Thank you. The gate is open. The director wants to see you.” Something moves behind the blast door.'),null,'drone')},inv.zbox>0],
  [ZB('Megtartom. Előbb beszélni akarok valakivel.','I keep it. I want to talk to someone first.'),()=>{ZS.st=4;ZS.kept=1;ZS.karma+=1;snd('door');zDlg(V,ZB('„…Ahogy akarod. Az igazgató úgyis látni akar. A kapu nyitva.”','“…As you wish. The director wants to see you anyway. The gate is open.”'),null,'drone')},inv.zbox>0],[ZB('Még nincs meg','Not yet'),null]],'drone');
 else zDlg(V,ZB('„A kapu nyitva. Lépj be.”','“The gate is open. Step inside.”'),null,'drone')}
function zFixTower(o){if(o.fixed){zDlg(ZB('Adótorony','Radio tower'),ZB('A torony zümmög. A rádió adását időnként hallod.','The tower hums. Now and then you hear its broadcast.'),null,'term');return}
 if(!(STORY&&STORY.z)||zSt()<1){say(ZB('Egy elnémult adótorony. A kábelek el vannak vágva.','A silent radio tower. The cables have been cut.'));return}
 if(!zCost(ZTOWER)){say(ZB('A javításhoz kell: '+zCostTxt(ZTOWER),'To repair it you need: '+zCostTxt(ZTOWER)));snd('click');return}
 zTake(ZTOWER);o.fixed=1;ZS.st=Math.max(ZS.st,2);ZS.radio=1;ZS.rt=40;snd('craft');try{fanfare112()}catch(e){}zDlg(ZB('Adótorony','Radio tower'),ZB('Felbúg a torony, a rádióból recsegve megszólal egy hang. Térj vissza a drónokhoz.','The tower hums to life, a voice crackles out of the radio. Return to the drones.'),null,'term')}
function zReadNote(o,i){const n=o.n|0;ob[i]=null;if(!ZS.notes.includes(n))ZS.notes.push(n);try{snd('pick')}catch(e){}zDlg(ZB('Emlék','Memory')+' ('+ZS.notes.length+'/6)',ZNOTES[n][zhu()?0:1],[[ZB('Tovább','Continue'),null]],'memo')}
function zTakeBox(o,i){if(zs.some(z=>z.mu=='r'&&z.guard&&z.hp>0&&Math.hypot(z.x-P.x,z.y-P.y)<200)){say(ZB('A robotok őrzik a dobozt — előbb intézd el őket!','The robots guard the box — deal with them first!'));return}ob[i]=null;inv.zbox=(inv.zbox|0)+1;if(!ZS.notes.includes(4))ZS.notes.push(4);ZS.box=null;try{fanfare112()}catch(e){snd('craft')}
 RADIO.push({k:'note',t:ZACT[2].steps[2].b.t})}
/* the robots that guard the box show up when you come close */
function zBoxGuard(){if(!ZS.box||ZS.boxg||inD)return;const bx=ZS.box.x*T+8,by=ZS.box.y*T+8;if(Math.hypot(bx-P.x,by-P.y)>260)return;ZS.boxg=1;for(let k=0;k<3;k++){const a=k*2.1,x=bx+Math.cos(a)*40,y=by+Math.sin(a)*30;zs.push(zMkRobot(blocked(x,y,6)?bx:x,blocked(x,y,6)?by:y,{guard:1}))}say(ZB('Kattogás, zümmögés: robotok kapcsolnak be a doboz körül!','Clicking, humming: robots switch on around the box!'))}
/* the radio after the tower is fixed */
function zRadioTick(dt){if(!ZS.radio||!STORY||!STORY.z||STORY.done)return;ZS.rt=(ZS.rt||60)-dt;if(ZS.rt<=0){ZS.rt=120+Math.random()*90;RADIO.push({k:'radio',t:zpk(ZRADIO)})}}

/* ---------- inside Bunker-7 ---------- */
let ZNPC0=null;
function zGenBunker(){loot=[];map=new Uint8Array(W*H).fill(5);ob=new Array(W*H).fill(null);deer=[];zs=[];const room=(x,y,w,h)=>{for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)map[yy*W+xx]=16},O=(x,y,o)=>{ob[y*W+x]=o};
 /* level 1: security (bottom), level 2: living (middle), level 3: command (top) */
 room(40,70,16,9);room(46,58,4,12);room(36,44,24,14);room(46,34,4,10);room(40,24,16,10);
 O(48,78,{t:'zbexit'});for(const[x,y]of[[41,71],[54,71],[41,77],[54,77],[37,45],[58,45],[37,56],[58,56],[41,25],[54,25],[41,32],[54,32]])O(x,y,{t:'zbulb',hp:999});
 O(42,72,{t:'zterm',k:'sec',hp:999});for(let i=0;i<4;i++)O(44+i,71,{t:'zlock',hp:999});O(52,73,{t:'table',hp:10});O(53,73,{t:'chair',hp:10});
 for(let i=0;i<5;i++){O(37+i*2,46,{t:'bed',hp:10,r:0})}for(let i=0;i<4;i++)O(37+i*2,52,{t:'zplant',hp:999});for(let i=0;i<4;i++)O(37+i*2,54,{t:'zplant',hp:999});O(55,48,{t:'table',hp:10});O(56,48,{t:'chair',hp:10});O(54,48,{t:'chair',hp:10});O(57,52,{t:'shelf',hp:10});
 O(48,27,{t:'zgen',hp:999});O(42,28,{t:'zterm',k:'arch',hp:999});O(54,28,{t:'zterm',k:'gate',hp:999});O(51,30,{t:'zterm',k:'gen',hp:999});O(44,31,{t:'table',hp:10});
 for(const[x,y]of[[48,69],[48,57],[48,43],[48,33]]){}return{ex:[48,77]}}
function zBunkerNpcs(){const L=[],add=(zr,nm,x,y,c,sx)=>L.push({x:x*T+8,y:y*T+8,hx:x*T+8,hy:y*T+8,wr:zr=='res'?4:1,c,nm,zr,sx,tr:0,g:0,kn:1,fr:0});
 add('varga',ZB('Varga, biztonsági főnök','Varga, head of security'),50,74,'240720','m');add('lili','Lili',45,50,'050530','f');add('res',ZB('Lakó','Resident'),41,49,'313140','f');add('res',ZB('Lakó','Resident'),53,53,'121220','m');add('res',ZB('Lakó','Resident'),57,46,'342210','m');
 add('halmos',ZB('Halmos igazgató','Director Halmos'),48,30,'045751','m');return L}
function zEnterBunker(){if(!creative&&(zSt()<4||!(STORY&&STORY.z))){zTalkDrone();return}OW={map,ob,deer,zs,loot,x:P.x,y:P.y};inD=true;fishing=null;sit=null;curSub=false;curRx=0;LSx=null;try{curOf=null}catch(e){}
 let M=MINES.zb7;if(M&&M.map&&M.ob){map=M.map;ob=M.ob;zs=[];loot=M.loot||[];deer=[]}else{zGenBunker();M=MINES.zb7={mined:{},map,ob,zs:[],loot,left:0}}curMine=M;curM='zb7';
 P.x=48*T+8;P.y=76*T+8;P.fx=0;P.fy=-1;P.cd=.8;ZBK=true;ZNPC0=NPCS;NPCS=ZS.bn&&ZS.bn.length?ZS.bn:(ZS.bn=zBunkerNpcs());snd('door');
 if(!ZS.met.inside){ZS.met.inside=1;zDlg('Bunker-7',ZB('Meleg levegő, zümmögő lámpák, fertőtlenítőszag. Tíz év óta nem érezted magad ilyen biztonságban — és ilyen idegennek.','Warm air, humming lamps, the smell of disinfectant. You haven’t felt this safe in ten years — or this much a stranger.'),null,'term')}else say('Bunker-7')}
function zLeaveFix(){if(!ZBK)return;ZBK=false;if(ZNPC0){ZS.bn=NPCS;NPCS=ZNPC0;ZNPC0=null}}
{const lv130=leave;leave=function(...a){const was=ZBK;zLeaveFix();const r=lv130.apply(this,a);if(was){say(ZB('Kint vagy. A Zóna szaga megcsap.','You are outside. The smell of the Zone hits you.'));try{if(ZS.bunker){P.x=ZS.bunker.x*T+8;P.y=(ZS.bunker.y+2)*T+8}}catch(e){}}return r}}
{const dk130=dark;dark=function(){if(ZBK)return Math.min(.35,dk130());return dk130()}}
{const tx130=txt;txt=function(s,x,y,c,al){if(ZBK&&inD&&(s==='Mine'||s==='Bánya')&&x===6&&y===56)s='Bunker-7';return tx130(s,x,y,c,al)}}
const zPL=a=>a[Math.floor(Math.random()*a.length)];
function zTalkBunker(n){const lk=n.c;
 if(n.zr=='varga')return zDlg(n.nm,ZB('„Szóval te vagy az. A mérnök. Halmos a parancsnoki szinten vár, a folyosó végén.” Halkabban: „Sokan nem értenek vele egyet. Ha egyszer választanod kell… gondolj ránk is.”','“So it’s you. The engineer. Halmos is waiting on the command level, end of the corridor.” Quieter: “Many here disagree with him. If you ever have to choose… think of us too.”'),[[ZB('Megjegyeztem','Noted'),()=>{ZS.met.varga=1}]],'npc',lk);
 if(n.zr=='lili')return zDlg('Lili',ZS.met.lili?ZB('„Apa… ugye most már maradsz?”','“Dad… you’re staying now, right?”'):ZB('„…Apa? APA! Azt mondták, meghaltál! Azt mondták, te robbantottad fel az erőművet!”','“…Dad? DAD! They said you were dead! They said you blew up the plant!”'),[[ZB('Nem én voltam, Lili.','It wasn’t me, Lili.'),()=>{ZS.met.lili=1;ZS.karma+=1;zDlg('Lili',ZB('„Tudom. Mindig tudtam.” Megölel. „Halmos hazudik mindenkinek. Csináld helyre, apa.”','“I know. I always knew.” She hugs you. “Halmos lies to everyone. Make it right, Dad.”'),null,'npc',lk)}],[ZB('Majd elmagyarázom.','I’ll explain later.'),()=>{ZS.met.lili=1}]],'npc',lk);
 if(n.zr=='res')return zDlg(n.nm,zPL([ZB('„Odakint tényleg ennyire rossz? Halmos szerint igen.”','“Is it really that bad outside? Halmos says so.”'),ZB('„A hidropónikus kert az egyetlen zöld, amit tíz éve láttam.”','“The hydroponic garden is the only green I’ve seen in ten years.”'),ZB('„A kapu tíz éve nem nyílt ki. Miattad most igen.”','“The gate hasn’t opened in ten years. Now it has, because of you.”')]),null,'npc',lk);
 if(n.zr=='halmos')return zHalmos(n)}
function zSupport(){return !!((ZS.karma|0)>=6||(ZS.rep|0)>=40||(ZS.met.varga&&(ZS.karma|0)>=2))}
function zHalmos(n){const know=ZS.notes.length>=4||ZS.kept,sup=zSupport(),lk=n.c,opts=[];
 if(know)opts.push([ZB('„Te siettetted a bontást. Te ölted meg őket.”','“You rushed the decommissioning. You killed them.”'),()=>zDlg(n.nm,ZB('„Döntenem kellett! A bunker energiát akart, a bontás határidőt. Te figyelmeztettél, igen. Én nem hallgattam rád. Most mit akarsz?”','“I had to decide! The bunker wanted power, the decommissioning a deadline. You warned me, yes. I didn’t listen. So what do you want now?”'),zEndOpts(sup),'npc',lk)]);
 else opts.push([ZB('„Mi történt az erőműben?”','“What happened at the plant?”'),()=>zDlg(n.nm,ZB('„Baleset. Tragikus baleset. Ne bolygasd.” (Gyűjts több emléket: '+ZS.notes.length+'/6)','“An accident. A tragic accident. Let it rest.” (Collect more memories: '+ZS.notes.length+'/6)'),null,'npc',lk)]);
 opts.push([ZB('Később','Later'),null]);zDlg(n.nm,ZB('„Hát visszajöttél. A mérnök, akit mindenki halottnak hitt.” Fáradtan mosolyog. „Ülj le. Beszéljünk úgy, mint két ember, aki túl sokat tud.”','“So you came back. The engineer everyone thought was dead.” A tired smile. “Sit down. Let’s talk like two people who know too much.”'),opts,'npc',lk)}
function zEndOpts(sup){return[[ZB('„Kinyitom a kapukat. Mindenki bejöhet.”','“I’m opening the gates. Everyone can come in.”'),()=>zEnding('A')],[ZB('„Hallgatok. Lili miatt maradok.”','“I’ll keep quiet. I’m staying for Lili.”'),()=>zEnding('B')],
 [ZB('„Leállítom a mezőgenerátort. A Zóna meggyógyul.”','“I’m shutting the field generator down. The Zone will heal.”')+(ZS.notes.length>=4?'':ZB(' (kevés az emléked)',' (too few memories)')),()=>zEnding('C'),ZS.notes.length>=4],
 [sup?ZB('„Mostantól én vezetem a bunkert.”','“From now on, I run the bunker.”'):ZB('„Átveszem az irányítást.” (kevés a támogatód)','“I’m taking over.” (not enough support)'),()=>zEnding('D'),sup]]}
function zEnding(k){ZS.end=k;ZDLG=null;try{gainXp(500)}catch(e){}try{if(STORY&&STORY.z&&!STORY.done){STORY.act=SACT.length-1;STORY.step=SACT[STORY.act].steps.length-1;stFinale()}}catch(e){console.error(e)}}
function zTerminal(o){const k=o.k;
 if(k=='arch'){if(!ZS.notes.includes(2))ZS.notes.push(2);return zDlg(ZB('Archívum','Archive'),ZB('Belső jelentés: „A 4. műszak mérnöke írásban kérte a bontás leállítását. A kérelmet Halmos igazgató elutasította.” Alatta a te aláírásod.','Internal report: “The shift 4 engineer requested in writing that decommissioning be halted. Director Halmos rejected the request.” Below it, your signature.'),null,'term')}
 if(k=='gen')return zDlg(ZB('Mezőgenerátor','Field generator'),ZS.notes.length>=4?ZB('A vezérlőpult ismerős: a te kódod még mindig működik. A generátor leállítása visszafordíthatatlan.','The console is familiar: your code still works. Shutting the generator down cannot be undone.'):ZB('Ismeretlen vezérlőpult. Nem tudod, mit csinálsz vele. (Gyűjts több emléket.)','An unfamiliar console. You don’t know what you’re doing. (Collect more memories.)'),ZS.notes.length>=4&&!ZS.end?[[ZB('Leállítom','Shut it down'),()=>zEnding('C')],[ZB('Még nem','Not yet'),null]]:null,'term');
 if(k=='gate')return zDlg(ZB('Főkapu','Main gate'),ZB('Kapuvezérlés: „KÜLSŐ HOZZÁFÉRÉS — ZÁRVA”.','Gate control: “EXTERNAL ACCESS — LOCKED”.'),ZS.end?null:[[ZB('Kinyitom mindenki előtt','Open it to everyone'),()=>zEnding('A')],[ZB('Vissza','Back'),null]],'term');
 if(k=='sec')return zDlg(ZB('Biztonsági terminál','Security terminal'),ZB('Kamerakép: a tábor, a drónok útvonala. Egy mappa: „MÉRNÖK — FELKUTATANDÓ. NEM BÁNTANI.”','Camera feed: the camp, the drones’ route. A folder: “ENGINEER — LOCATE. DO NOT HARM.”'),null,'term')}

/* ---------- the sheriff talks through the camp conversation menu ---------- */
{const to130=talkOpts;talkOpts=function(){const n=TALK&&TALK.n;if(!n||n.zr!='sheriff')return to130();const a=ZS.bty.act,L=[];
 if(a&&(a.st=='escort'||a.st=='tag'))L.push({k:'zturn',l:ZB('Leadom: ','Hand in: ')+a.nm});
 L.push({k:'zboard',l:ZB('Mutasd a vérdíjakat','Show me the bounties')});if(ZS.pris.length)L.push({k:'zpris',l:ZB('Kihallgatom a foglyokat','Interrogate the prisoners')});
 if(!ZS.cuffs)L.push({k:'zcuffs',l:ZB('Kellene bilincs','I need handcuffs')});L.push({k:'news',l:ZB('Mi újság a Zónában?','What\'s new in the Zone?')},{k:'bye',l:ZB('Viszlát!','Goodbye!')});return L}}
{const tp130=talkPick;talkPick=function(i){const n=TALK&&TALK.n;if(!n||n.zr!='sheriff')return tp130(i);const o=talkOpts()[i];if(!o)return;TALK.sel=i;
 if(o.k=='zboard'){talkClose('');zBoard();return}
 if(o.k=='zcuffs'){ZS.cuffs=1;inv.cuffs=(inv.cuffs|0)+2;snd('pick');talkSay(ZB('Tessék, kettő. Élve többet érnek, és a bunker sem veheti el tőlünk az igazságtételt. Ha elfogy, a barkácsasztalnál csinálhatsz: acélrúd meg drót.','Here, two. They\'re worth more alive, and the bunker can\'t take justice away from us. If you run out, make more at a crafting table: a steel bar and wire.'));return}
 if(o.k=='zturn'){const r=zTurnIn();if(!r){talkSay(ZB('Hol van? Élve: hozd ide megbilincselve. Holtan: hozd az azonosítóját.','Where is he? Alive: bring him here in cuffs. Dead: bring me the dog tag.'));return}
  talkSay((r.alive?ZB('Élve! Ezt nevezem. A ketrecbe vele — majd a tábor ítél. ','Alive! That\'s what I call work. Into the cage with him — the camp will judge. '):ZB('Halott. Kár — de egy gonddal kevesebb. ','Dead. A pity — but one less worry. '))+ZB('A jutalmad: ','Your reward: ')+zRewTxt(r.rw)+'.');return}
 if(o.k=='zpris'){const p=ZS.pris.find(q=>!q.t)||ZS.pris[ZS.pris.length-1];p.t=1;ZS.karma+=0;talkSay(ZB('(A ketrec felé biccent.) ','(He nods toward the cage.) ')+p.nm+': '+zInterro());return}
 return tp130(i)}}
function zInterro(){const L=[];if(STORY&&STORY.z){if(!ZS.notes.includes(3))L.push(ZB('„Jól van, beszélek… A rejtekhelyünkön van egy napló. A mérnökről szól. Rólad.”','“All right, I\'ll talk… There\'s a diary at our hideout. About the engineer. About you.”'));if(zSt()<3)L.push(ZB('„Az erőműnél robotok őrzik a dobozt. Lézerrel lőnek. Vigyél sok kötszert.”','“Robots guard the box at the plant. They shoot lasers. Bring plenty of bandages.”'));L.push(ZB('„Halmos. Ő tehet mindenről. Mi csak túlélni akartunk.”','“Halmos. It\'s all his fault. We just wanted to survive.”'))}
 L.push(ZB('„A bandák a vízért ölnek. Aki a kutakat tartja, az a Zóna ura.”','“The gangs kill for water. Whoever holds the wells rules the Zone.”'),ZB('„Minden negyedik éjjel jövünk a táborért. Mindig.”','“We come for the camp every fourth night. Always.”'),ZB('„Engedj ki, és megmondom, hol a rejtekládánk.” (Nem engeded ki.)','“Let me out and I\'ll tell you where our stash is.” (You don\'t.)'));return zPL(L)}
{const ng132=npcGreet;npcGreet=function(n){if(n&&n.zr=='sheriff'){if(!ZS.met.sheriff){ZS.met.sheriff=1;return ZB('Kovács őrmester. Régen rendőr, most… ami maradt belőle. A Zónában nincs törvény, csak mi vagyunk. A táblán vérdíjak: élve dupla, holtan is fizetek.','Sergeant Kovács. Used to be police, now… what\'s left of it. There\'s no law in the Zone, only us. Bounties on the board: double if alive, I pay for dead too.')}
 return zpk(ZS.bty.act?[ZB('Na, megvan már '+ZS.bty.act.nm+'?','So, got '+ZS.bty.act.nm+' yet?'),ZB('Ne állj meg, a bandák sem állnak meg.','Don\'t stop — the gangs don\'t.')]:[ZB('Új vérdíjak a táblán. Érdekel?','New bounties on the board. Interested?'),ZB('Csendes nap. Gyanúsan csendes.','A quiet day. Suspiciously quiet.'),ZB('Te megint. Jó. Akad munka.','You again. Good. There\'s work.')])}return ng132(n)}}
function zBoard(){if(!ZS.bty.L.length)ZS.bty.L=zBtyGen();const a=ZS.bty.act,opts=[];
 if(a){opts.push([ZB('Feladom: ','Give up: ')+a.nm,()=>{ZS.bty.act=null;for(let i=zs.length-1;i>=0;i--)if(zs[i].bid===a.id&&!zs[i].cap)zs[i].zb=0;say(ZB('Lemondtál a vérdíjról.','You gave up the bounty.'))}],[ZB('Rendben','All right'),null]);
  return zDlg(ZB('Vérdíjtábla','Bounty board'),ZB('Most őt keresed: ','You are hunting: ')+zBtyName(a)+' — '+ZCRIME[zhu()?'hu':'en'][a.crime]+'. '+ZB('Élve: ','Alive: ')+zRewTxt(a.ra)+'. '+ZB('Holtan: ','Dead: ')+zRewTxt(a.rd)+'.',opts,'term')}
 for(const b of ZS.bty.L)opts.push([zBtyName(b)+' · '+'★'.repeat(b.lvl),()=>{ZS.bty.act=Object.assign({},b,{st:'hunt'});say(ZB('Elvállaltad: '+b.nm+'. Kövesd a piros nyilat a rejtekhelyéig.','Bounty taken: '+b.nm+'. Follow the red arrow to the hideout.'));snd('craft')}]);
 opts.push([ZB('Később','Later'),null]);const b0=ZS.bty.L[0];zDlg(ZB('Vérdíjtábla — KÖRÖZÉS','Bounty board — WANTED'),ZB('Élve vagy holtan. Élve dupla jutalom, és a tábor ítélkezik. ','Dead or alive. Alive pays double, and the camp passes judgement. ')+ZS.bty.L.map(b=>b.nm+': '+ZCRIME[zhu()?'hu':'en'][b.crime]).join('; ')+'.',opts,'term')}
function zCage(o){const n=ZS.pris.length;if(!n)return zDlg(ZB('Börtönketrec','Prison cage'),ZB('Üres. Kovács szerint nem sokáig.','Empty. Kovács says not for long.'),null,'term');zDlg(ZB('Börtönketrec','Prison cage'),ZB('Foglyok: ','Prisoners: ')+ZS.pris.map(p=>p.nm).join(', ')+'.',[[ZB('Kihallgatom az egyiket','Interrogate one'),()=>zDlg(zpk(ZS.pris).nm,zInterro(),null,'npc')],[ZB('Adok nekik egy konzervet','Give them a tin'),()=>{inv.canned--;ZS.karma+=1;say(ZB('Megosztottad velük az ételed. Valaki halkan megköszöni.','You shared your food. Someone quietly says thanks.'))},inv.canned>0],[ZB('Megyek','Leave'),null]],'term')}

/* ---------- E: drones, cuffs, bunker people ---------- */
{const ce130=carE;carE=function(){if(state=='play'&&!drv&&!rid){try{if(zTryCuff())return true;if(!inD&&zNearDrone()){zTalkDrone();return true}
  if(ZBK){let b=null,bd=30;for(const n of NPCS){const d=Math.hypot(n.x-P.x,n.y-P.y);if(d<bd){bd=d;b=n}}if(b){b.st=6;b.fx=Math.sign(P.x-b.x);zTalkBunker(b);return true}}}catch(e){console.error(e)}}return ce130()}}
{const uo130=useObj;useObj=function(n){const o=n&&n.o;if(!o)return uo130(n);const i=n.ty*W+n.tx;try{
 if(o.t=='zboard'){zBoard();return}if(o.t=='zcage'){zCage(o);return}
 if(o.t=='zstash'){if(o.op){say(ZB('Üres. Valaki már kifosztotta — te.','Empty. Someone already looted it — you.'));return}const h=ZS.hq.find(q=>Math.hypot(q.x-n.tx,q.y-n.ty)<6);if(h&&zs.some(z=>z.mu=='d'&&z.hq===h.id&&z.hp>0&&!z.cap&&Math.hypot(z.x-P.x,z.y-P.y)<260)){say(ZB('A banditák még itt vannak — előbb tisztítsd meg a rejtekhelyet!','The bandits are still here — clear the hideout first!'));return}
  o.op=1;if(h){h.gone=1;h.cl=day}const L=zStashLoot(),got=[];for(const k in L){const v=L[k]|0;if(v<=0)continue;inv[k]=(inv[k]|0)+v;if(DMAX[k])du[k]=DMAX[k];if(TOOL[k])givehb(k);got.push(v+' '+tr(LBL[k]||k).toLowerCase())}snd('craft');try{gainXp(60)}catch(e){}say(ZB('A rejtekláda tartalma: ','The stash holds: ')+got.join(', '));
  if(h)say(ZB('A rejtekhely kiürült. Egy darabig nyugalom lesz erre.','The hideout is cleared. It will be quiet here for a while.'));return}
 if(o.t=='zblast'){zEnterBunker();return}if(o.t=='ztower'){zFixTower(o);return}if(o.t=='zbox'){zTakeBox(o,i);return}if(o.t=='znote'){zReadNote(o,i);return}
 if(o.t=='zterm'){zTerminal(o);return}if(o.t=='zgen'){zTerminal({k:'gen'});return}if(o.t=='zbexit'){leave();return}
 if(o.t=='zlock'){if(o.op){say(ZB('Üres szekrény.','An empty locker.'));return}o.op=1;const k=zpk(['bandage','canned','a9','cloth','cell','medkit']),v=k=='a9'?6:1;inv[k]=(inv[k]|0)+v;snd('pick');say(ZB('A szekrényben: ','In the locker: ')+v+' '+tr(LBL[k]||k).toLowerCase());return}
 }catch(e){console.error(e)}return uo130(n)}}

/* ---------- per frame ---------- */
let ZCT=0;
{const up130=update;update=function(dt){const r=up130(dt);if(state!='play')return r;try{zSwap();
 if(STORY&&STORY.z&&!ZS.zm&&!STORY.intro){zStart()}
 zRoomTick(dt);const host=!net||net.isHost||net.dead;
 if(host){zHqTick(dt);zRoamTick(dt);zRobotTick(dt);zRaidTick();zBtyTick();if(STORY&&STORY.z)zBoxGuard();
  if(ZS.bty.d<=day-2||!ZS.bty.L.length){ZS.bty.L=zBtyGen().concat([]);ZS.bty.d=day}}
 else{/* a guest: bandits near you shoot at you too */for(const z of zs){if((z.mu!='d'&&z.mu!='r')||z.hp<=0||z.sur||z.cap)continue;const d=Math.hypot(z.x-P.x,z.y-P.y);if(d>230)continue;z._ct=(z._ct==null?1+Math.random():z._ct)-dt;if(z._ct<=0){if(z.mu=='r'){z._ct=1.7;ebShoot(z.x,z.y-14,Math.atan2(P.y-6-(z.y-14),P.x-z.x),230,7,5)}else{const G=ZBG.pistol;z._ct=G.rt*1.3;zFire(z,P.x,P.y,G)}}}}
 zRadioTick(dt);
 /* the camp gets a sheriff if an old save has none */
 if(!inD&&host){ZCT-=dt;if(ZCT<=0){ZCT=5;if(!NPCS.some(n=>n.zr=='sheriff'))zSetupCamp()}}
 }catch(e){console.error(e)}return r}}
{const dr130=drawRoofs;drawRoofs=function(){const r=dr130();try{zDrawRoofs();zDrawDrones()}catch(e){console.error(e)}return r}}
{const hd130=hud;hud=function(){const r=hd130.apply(this,arguments);if(state!='play')return r;try{
 if(!inD&&!view&&ZS.bty.act&&!(GMODE==3)){const t=zBtyTarget();if(t)arrow112(t[0],t[1],'#ff6a5a',t[2])}
 if(ZS.raid&&ZS.raid.on&&!inD){noTr=true;const left=zs.filter(z=>z.raid).length;txt(ZB('RAJTAÜTÉS A TÁBORON — banditák: ','CAMP RAID — bandits: ')+left,VW/2,30,'#ff8a6a','center');noTr=false}
 zDrawDlg()}catch(e){console.error(e);noTr=false}return r}}
/* camp people talk about the Zone */
{const nn130=npcNews;npcNews=function(n){if(n.zr)return nn130(n);if(Math.random()<.4){const L=[ZB('Banditák a déli úton. Kovács őrmester vérdíjat tűzött ki rájuk.','Bandits on the southern road. Sergeant Kovács put a bounty on them.'),ZB('A bunker drónjai mindent látnak. Mindent.','The bunker drones see everything. Everything.'),ZB('Minden negyedik éjjel jönnek a bandák. Ha itt vagy, segíts.','The gangs come every fourth night. If you\'re here, help.'),ZB('Ablak kéne? A parton annyi a homok, amennyit akarsz. A kemence meg nem kérdez.','Need a window? There\'s all the sand you want on the shore. The furnace asks no questions.'),ZB('Négy fal, egy ajtó, fölötte tető. Ennyi kell, hogy reggel is felébredj.','Four walls, a door, a roof overhead. That\'s all it takes to wake up in the morning.'),ZB('Az erőmű felől éjjel kattogást hallani. Aki odament, azt mondja: a fém járkál.','You hear clicking from the plant at night. Those who went say the metal walks.')];return zpk(L)}return nn130(n)}}

/* ---------- new game, save, load ---------- */
{const in130=init;init=function(...a){ZS=zNew();ZR=[];ZRH=-1;ZBK=false;ZDLG=null;ZNPC0=null;const r=in130.apply(this,a);try{zGenHideouts();zSetupCamp()}catch(e){console.error(e)}return r}}
{const sv130=save;save=function(){let r;if(ZBK&&ZNPC0){const b=NPCS;NPCS=ZNPC0;ZS.bn=b;try{r=sv130.apply(this,arguments)}finally{NPCS=b}}else r=sv130.apply(this,arguments);try{const sh=(ZBK&&ZNPC0?ZNPC0:NPCS).find(n=>n.zr=='sheriff');ZS.sh=sh?{hx:sh.hx,hy:sh.hy}:null;localStorage.setItem(SKEY()+'_z130',JSON.stringify(ZS))}catch(e){}return r}}
{const ld130=load;load=function(){ZBK=false;ZNPC0=null;ZDLG=null;const r=ld130.apply(this,arguments);try{const d=JSON.parse(localStorage.getItem(SKEY()+'_z130')||'null');if(d&&d.v){ZS=Object.assign(zNew(),d);if(ZS.sh){const n=NPCS.find(q=>q.hx===ZS.sh.hx&&q.hy===ZS.sh.hy);if(n){n.zr='sheriff';n.nm=ZB('Kovács őrmester','Sergeant Kovács')}}}else{ZS=zNew();if(r){zGenHideouts();zSetupCamp()}}ZR=[];ZRH=-1;ZSWAP=-1;zSwap()}catch(e){console.error(e)}return r}}

/* ---------- Mad Max: bolt scrap armour and spikes onto a car ---------- */
LBL.zarmor=LBLX.zarmor='Scrap car armour';HU.unshift(['Scrap car armour','Roncspáncél autóra'],['scrap car armour','roncspáncél autóra']);if(!NEWK.includes('zarmor'))NEWK.push('zarmor');if(inv.zarmor==null)inv.zarmor=0;
REC.push(['zarmor','Scrap car armour',{iron_ingot:4,iron:6}]);
{const ic130b=icon2;icon2=function(k,x,y){if(k=='zarmor'){const S=(a,b,w,h,c)=>Q(x+a,y+b,w,h,c);S(3,6,14,10,'#6a6c6a');S(3,6,14,2,'#9a9c98');for(let i=0;i<4;i++){S(4+i*3,3,2,3,'#c8ccd0')}S(5,9,3,3,'#8a4a20');S(12,11,3,2,'#8a4a20');S(4,8,1,1,'#2a2a2a');S(15,8,1,1,'#2a2a2a');S(4,14,1,1,'#2a2a2a');S(15,14,1,1,'#2a2a2a');return true}return ic130b(k,x,y)}}
{const up130c=update;update=function(dt){const r=up130c(dt);try{if(drv&&!drv.arm&&inv.zarmor>0){inv.zarmor--;drv.arm=1;snd('craft');say(ZB('Felcsavaroztad a roncspáncélt: tüskék elöl, lemezek oldalt. Gázolj!','You bolted on the scrap armour: spikes up front, plates on the sides. Floor it!'))}
 if(drv&&drv.arm&&drv.v>70)for(const z of zs){if(z.boss||z.hp<=0)continue;if(Math.hypot(z.x-P.x,z.y-P.y)<24){z.hp-=dt*40;z.kx=drv.dx*220;z.ky=drv.dy*220}}}catch(e){}return r}}
{const hp130=hurtP;hurtP=function(n){if(drv&&drv.arm)n*=.45;return hp130(n)}}
{const dc130=drawCar;drawCar=function(c,x,y,rim){const r=dc130(c,x,y,rim);if(c&&c.arm){try{g.save();g.translate(Math.round(x),Math.round(y-4));g.rotate([0,Math.PI/2,Math.PI,-Math.PI/2][c.f&3]);const L=(typeof CARL!='undefined'?CARL:42),Wd=(typeof CARW!='undefined'?CARW:24),hw=Wd/2,hl=L/2;
 for(let i=0;i<5;i++){const sx=-hw+2+i*(Wd-4)/4;Q(sx-1,-hl-4,2,4,'#c8ccd0');Q(sx-1,-hl-5,1,1,'#eef0f2')}Q(-hw,-hl-1,Wd,2,'#4a4c4a');
 Q(-hw-2,-hl+14,3,L-24,'#5a5c58');Q(hw-1,-hl+14,3,L-24,'#5a5c58');for(let k=0;k<3;k++){Q(-hw-2,-hl+16+k*6,1,1,'#2a2a2a');Q(hw+1,-hl+16+k*6,1,1,'#2a2a2a')}Q(-hw+4,-hl+15,5,3,'rgba(140,70,30,.7)');Q(hw-9,hl-14,4,2,'rgba(140,70,30,.7)');
 Q(-hw+3,-hl+7,Wd-6,1,'#3a3c3a');Q(-hw+3,-hl+10,Wd-6,1,'#3a3c3a');g.restore()}catch(e){try{g.restore()}catch(_){}}}return r}}
/* help pages */
try{TUT.en.push(['Zone 2100','Build walls and a door all around: the room is recognised and gets a patched roof by itself.','Dig sand with a shovel in the desert or on a shore, melt it into glass in the furnace (coal).','Sergeant Kovács in the camp has bounties: cuff a surrendered boss (E) and escort him, or bring the dog tag.','Bandits shoot back. Robots guard the plant — the laser rifle runs on energy cells. Scrap armour turns a car into a ram.']);
 TUT.hu.push(['Zóna 2100','Húzz falat és ajtót körbe: a helyiséget a játék felismeri, és magától foltozott tetőt kap.','Ásóval homokot ássz a sivatagban vagy a parton, a kemencében (szénnel) üveg lesz belőle.','Kovács őrmesternél a táborban vérdíjak vannak: a megadó vezért bilincseld meg (E) és kísérd be, vagy hozd az azonosítóját.','A banditák visszalőnek. Az erőművet robotok őrzik — a lézerpuska energiacellával megy. A roncspáncéltól az autó faltörő kos lesz.'])}catch(e){}

/* ---------- the hammer: with it in hand you are building — knock out anything you built, swap wall pieces, rotate ---------- */
LBL.hammer=LBLX.hammer='Hammer';HU.unshift(['Hammer','Kalapács'],['hammer','kalapács']);if(!NEWK.includes('hammer'))NEWK.push('hammer');if(inv.hammer==null)inv.hammer=0;
REC.push(['hammer','Hammer',{wood:2,iron:1}]);try{HAND.hammer=1}catch(e){}TOOL.hammer=1;DMAX.hammer=9999;
{const ic130h=icon2;icon2=function(k,x,y){if(k=='hammer'){const S=(a,b,w,h,c)=>Q(x+a,y+b,w,h,c);S(9,6,2,12,'#7a5636');S(9,6,1,12,'#9a7448');S(5,3,10,4,'#7a7e84');S(5,3,10,1,'#b8bcc2');S(4,4,2,2,'#5a5e64');S(14,3,2,3,'#5a5e64');return true}return ic130h(k,x,y)}}
const ZSWAPT=['wall','sblock','gwin','door'],ZNOHAM={cabin:1,stash:1,zblast:1,zinv:1,zcon:1,zboard:1,zcage:1,ztower:1,zbox:1,znote:1,zterm:1,zbexit:1,zgen:1};
const zHam=()=>HB[hb]=='hammer'&&inv.hammer>0&&state=='play';
function zHamTarget(){if(mtx<0||mty<0||mtx>=W||mty>=H)return null;const i=mty*W+mtx,o=ob[i];if(!o||ZNOHAM[o.t]||!PL[o.t])return null;if(o.pm!=null||o.fw)return null;if(Math.hypot(mtx*T+8-P.x,mty*T+8-P.y)>64)return null;return{i,o}}
function zHamHit(shift){const t=zHamTarget();if(!t){say(ZB('Kalapáccsal a saját építményeidet bonthatod és alakíthatod át','With the hammer you can take apart and rework what you built'));return}const{i,o}=t;
 if(o.it&&Object.values(o.it).some(v=>v>0)){say(ZB('Előbb ürítsd ki','Empty it first'));return}
 if(shift&&ZSWAPT.includes(o.t)){const cur=ZSWAPT.indexOf(o.t);for(let k=1;k<ZSWAPT.length;k++){const nt=ZSWAPT[(cur+k)%ZSWAPT.length];if((inv[nt]|0)>0){inv[nt]--;inv[o.t]=(inv[o.t]|0)+1;ob[i]={t:nt,hp:nt=='sblock'?30:10,r:o.r|0,pb:1,...(nt=='door'?{open:false}:{})};try{if(nt=='door'&&typeof doorOrient=='function')doorOrient(i)}catch(e){}snd('craft');hit(mtx*T+8,mty*T+8,'#c8b48a');say(ZB('Átépítve: ','Rebuilt as: ')+tr(LBL[nt]).toLowerCase());return}}
  say(ZB('Nincs nálad más falelem a cseréhez (fal, kőtömb, üvegablak, ajtó)','You have no other wall piece to swap in (wall, stone block, glass window, door)'));return}
 if(!canAdd(o.t)&&!(inv[o.t]>0)){fullMsg();return}ob[i]=null;inv[o.t]=(inv[o.t]|0)+1;try{givehb(o.t)}catch(e){}snd('hit');for(let k=0;k<6;k++)parts.push({x:mtx*T+8,y:mty*T+6,vx:(Math.random()-.5)*70,vy:-Math.random()*50,l:.45,c:k%2?'#8a6a40':'#c8b48a'});say(ZB('Kiütve: ','Knocked out: ')+tr(LBL[o.t]||o.t).toLowerCase()+ZB(' — visszakerült a táskádba',' — back in your bag'))}
{const ac130h=act;act=function(){if(zHam()){if(!edge||P.cd>0)return;P.cd=.18;try{zHamHit(!!K.ShiftLeft)}catch(e){console.error(e)}return}return ac130h()}}
{const hd130h=hud;hud=function(){const r=hd130h.apply(this,arguments);try{if(zHam()&&!invOpen&&!book&&!ZDLG&&!TALK){const t=zHamTarget();noTr=true;const s=t?(ZB('Katt: kiüt','Click: knock out')+(ZSWAPT.includes(t.o.t)?ZB('   Shift+katt: csere','   Shift+click: swap'):'')+((ROTT[t.o.t]||ROT1[t.o.t])?ZB('   R: forgat','   R: rotate'):'')):ZB('ÉPÍTŐ MÓD — célozz egy építményedre','BUILD MODE — aim at something you built');g.font=fnt(0,8);const w=Math.ceil(g.measureText(s).width)+10;Q(VW/2-w/2,38,w,12,'rgba(0,0,0,.72)');Q(VW/2-w/2,38,w,1,'#ffd84a');txt(s,VW/2,47,'#ffe08a','center');noTr=false}}catch(e){noTr=false}return r}}
{const dr130h=drawRoofs;drawRoofs=function(){const r=dr130h();try{if(zHam()){const t=zHamTarget();if(t){const x=mtx*T-cam.x,y=mty*T-cam.y,a=.5+.3*Math.sin(performance.now()/150);g.strokeStyle='rgba(255,216,74,'+a.toFixed(2)+')';g.lineWidth=1;g.strokeRect(Math.round(x)+.5,Math.round(y)-9.5,15,25)}}}catch(e){}return r}}
try{TUT.hu[TUT.hu.length-1].push('Kalapács a kézben = építő mód: katt kiüti, Shift+katt kicseréli a falelemet, R forgat.');TUT.en[TUT.en.length-1].push('Hammer in hand = build mode: click knocks out, Shift+click swaps the wall piece, R rotates.')}catch(e){}

/* ---------- the journal remembers the Zone too ---------- */
{const zd132=zDlg;zDlg=function(name,text,opts,kind,lk){try{if(typeof jnTalk=='function'&&kind!='memo')jnTalk(name,text,kind=='drone'||kind=='term'?'radio':'npc')}catch(e){}return zd132(name,text,opts,kind,lk)}}
{const rn132=zReadNote;zReadNote=function(o,i){const n=o.n|0;const r=rn132(o,i);try{if(typeof jnFind=='function')jnFind('znote'+n,'Emlék '+(n+1)+'/6','Memory '+(n+1)+'/6',ZNOTES[n][0],ZNOTES[n][1])}catch(e){}return r}}
if(typeof JNDX!='undefined'){JNDX.push(()=>{if(inD)return null;const tx=P.x/T,ty=P.y/T;
 if(ZS.hq.some(h=>Math.hypot(h.x-tx,h.y-ty)<12))return['zhq','Banditarejtek','Bandit hideout','Sátrak, homokzsák, fekete zászló. Ahol ilyet látsz, ott fegyver is van — és rejtekláda, ha kitisztítod.','Tents, sandbags, a black banner. Where you see this there are guns — and a stash, if you clear it.'];
 if(ZS.camp&&Math.hypot(ZS.camp.x-tx,ZS.camp.y-ty)<10)return['zcamp','Kovács őrmester tábora','Sergeant Kovács’ camp','Itt még van törvény: vérdíjtábla, börtönketrec, és egy ember, aki nem adja fel. Élve dupla a jutalom.','There is still law here: a bounty board, a prison cage, and a man who won’t give up. Alive pays double.'];
 if(ZS.bunker&&Math.hypot(ZS.bunker.x-tx,ZS.bunker.y-ty)<14)return['zbunker','Bunker-7','Bunker-7','Betonfal, páncélkapu, körülötte drónok. Tíz éve senki nem jött ki innen — és senkit nem engedtek be.','A concrete wall, a blast door, drones circling. For ten years no one came out — and no one was let in.'];
 if(ZS.tower&&Math.hypot(ZS.tower.x-tx,ZS.tower.y-ty)<10)return['ztower','Az adótorony','The radio tower','Elvágott kábelek, néma antenna. Ha újra sugároz, a bunker is meghallja.','Cut cables, a silent antenna. If it broadcasts again, the bunker will hear.'];
 if(zs.some(z=>z.mu=='r'&&Math.hypot(z.x-P.x,z.y-P.y)<220))return['zrobot','Gépek az erőműnél','Machines at the plant','Lánctalpon gurulnak, egy piros szemmel néznek, és nem tévesztenek célt. Energiacellát hordanak magukban.','They roll on tracks, watch with one red eye, and rarely miss. They carry energy cells inside.'];
 return null},()=>ZBK?['zinside','Bunker-7 belülről','Inside Bunker-7','Meleg, tiszta levegő, zümmögő lámpák. Három szint: biztonsági, lakó, parancsnoki. Itt laknak, akiket beengedtek.','Warm, clean air, humming lamps. Three levels: security, living, command. Those who were let in live here.']:null)}
if(typeof JNQX!='undefined')JNQX.push(L=>{const a=ZS.bty.act;if(a){jnHead(L,ZB('Vérdíj','Bounty'),'#8a2a18');jnText(L,zBtyName(a),{b:1,c:'#2a1a10'});jnText(L,ZCRIME[zhu()?'hu':'en'][a.crime]+'.',{in:4});
  jnText(L,(a.st=='escort'?ZB('▸ Kísérd be Kovács őrmesterhez','▸ Escort him to Sergeant Kovács'):a.st=='tag'?ZB('▸ Vidd az azonosítót Kovácsnak','▸ Take the dog tag to Kovács'):ZB('▸ Keresd meg a rejtekhelyén','▸ Find him at his hideout')),{in:4,b:1});jnText(L,ZB('Élve: ','Alive: ')+zRewTxt(a.ra)+' · '+ZB('Holtan: ','Dead: ')+zRewTxt(a.rd),{in:4,sz:7,c:'#6a5a40'})}
 if(ZS.done||ZS.pris.length){jnText(L,ZB('Teljesített vérdíjak: ','Bounties done: ')+ZS.done+(ZS.pris.length?ZB(' · foglyok: ',' · prisoners: ')+ZS.pris.map(p=>p.nm).join(', '):''),{sz:7,c:'#6a5a40'})}
 if(ZS.raid&&ZS.raid.on)jnText(L,ZB('‼ Rajtaütés a táboron — segíts!','‼ The camp is being raided — help!'),{b:1,c:'#a82a18'});
 if(STORY&&STORY.z&&ZS.notes.length)jnText(L,ZB('Emlékek: ','Memories: ')+ZS.notes.length+'/6',{sz:7,c:'#6a4a8a'})});

/* the washed-out gloom is no longer switched on by the Zone; an earlier build turned it on by itself, so switch it back off once */
try{if(!localStorage.getItem('z_mood_off')){localStorage.setItem('z_mood_off','1');if(MOOD){MOOD=0;mdSave()}}}catch(e){}

/* creative palette: bandits and robots too */
try{CRP.cr_band=['Bandit','Bandita',(x,y)=>zs.push(zMkBandit(x,y,{}))];CRP.cr_robot=['Robot','Robot',(x,y)=>zs.push(zMkRobot(x,y))];for(const k of['cr_band','cr_robot']){LBL[k]=LBLX[k]=CRP[k][0];HU.unshift([CRP[k][0],CRP[k][1]],[CRP[k][0].toLowerCase(),CRP[k][1].toLowerCase()]);if(inv[k]==null)inv[k]=0}}catch(e){}
