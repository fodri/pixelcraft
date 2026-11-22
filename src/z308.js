/* ===== z308: the people of the checkpoint, the quartermaster, contracts, kills pay ===== */
const PRC=[
 {k:'kill',n:4,rub:120,r:[162,146,205,187],h:['Első nap: a Központi tér','First day: the Central Square'],d:['Tisztítsd meg a Központi teret. Legalább négy „Ő”-t kell kiiktatnod. Ne fuss, ne kiabálj, és ne nézz túl sokáig a szemükbe.','Clear the Central Square of at least four of Them.']},
 {k:'fetch',n:4,rub:160,r:[77,107,106,128],h:['Univermag: a csomagok','Univermag: the parcels'],d:['Az Univermag raktárában négy lezárt csomag maradt a „Május 1.” ünnepre. Hozd el mind a négyet — a ládák az üzlet falai mellett vannak.','Four sealed parcels remain in the department store. Bring them all.']},
 {k:'kill',n:6,rub:260,r:[212,102,248,130],h:['Kórház: kiürítés','Hospital: clearing'],d:['A kórházban még dolgoznak. Vagyis… ők azt hiszik. Kell hat „Ő” a folyosókról.','Clear six of Them from the hospital corridors.']},
 {k:'fetch',n:3,rub:220,r:[77,153,108,174],h:['Iskola: a naplók','School: the logbooks'],d:['Az iskolában három osztálynapló maradt. Valaki szerint „még mindig vannak jelenléti ívek”. Hozd el őket.','Retrieve three class logbooks from the school.']},
 {k:'kill',n:7,rub:300,r:[116,102,203,138],h:['Vidámpark: a kerék alatt','Amusement park: under the wheel'],d:['A vidámpark nem nyílt meg 1986. május 1-jén. Valami mégis forog a kerék alatt. Tisztítsd meg a parkot — hét „Ő”.','Clear the amusement park — seven of Them.']},
 {k:'kill',n:6,rub:280,r:[212,152,248,180],h:['Szálloda: a vendégek','Hotel: the guests'],d:['A Polesszje-szálló vendégei nem mentek el. Hat „Ő” a szobákban.','The hotel guests never left. Six of Them in the rooms.']},
 {k:'visit',n:1,rub:450,at:[106,116],h:['A Vörös Erdő pereme','Edge of the Red Forest'],d:['Vegyél mintát a Vörös Erdő szélén (nyugat-északnyugat). Szkafander kell, és friss szűrő. Ha túl hangos a Geiger — fordulj vissza.','Take a sample at the edge of the Red Forest. Suit and a fresh filter required.']}];
function priPeople(){
 const q=prRng(PRIS+5);NPCS.length=0;
 const mk=(tx,ty,nm,pri,o)=>{const n=Object.assign({x:tx*T+8,y:ty*T+8,hx:tx*T+8,hy:ty*T+8,wr:0,c:lookFor('m',q),nm,tr:0,g:0,kn:0,sx:'m',pri,job:'x'},o||{});NPCS.push(n);return n};
 mk(148,283,'Vaszilij Pavlics','qm');mk(172,283,'Gyenyiszov','boss',{hz:true,hzc:1});
 mk(158,283,'Őr','guard',{hz:true,hzc:2});mk(162,283,'Őr','guard',{hz:true,hzc:2});
 const V=[[160,248,'Tyimofej'],[186,172,'Szása'],[121,196,'Anyiszja'],[140,100,'Gyima']];for(const[x,y,nm]of V)mk(x,y,nm,'vet',{wr:3,hz:true,hzc:Math.floor(q()*4),sx:q()<.3?'f':'m'})}
{const f=priFinish;priFinish=function(r){const o=f.apply(this,arguments);try{priPeople()}catch(e){console.warn('people',e)}return o}}
/* ---------- the talk system ---------- */
const PVET=[['Ők nem szeretik a hangos zajt. De a csöndet még kevésbé.','They hate loud noise. Silence even more.'],['A kerék kilenc perc alatt fordul körbe. Én számoltam. Régen.','The wheel takes nine minutes. I counted. Long ago.'],['Ne vegyél le a maszkot a Vörös Erdő szélén. Még ha hívnak is.','Never take the mask off at the Red Forest. Even if they call.'],['Május elsején nyitott volna a park. Néha még hallom a zenét.','The park was to open on May first. Sometimes I still hear the music.'],['A panelházakban a hetedik emelet a legrosszabb. Nem tudom, miért.','The seventh floor is the worst in the panel blocks. I don\'t know why.'],['A házakban még ott vannak a naptárak. Mind április 26.','The calendars are still there. All say April 26.']];
function priTalkOpts(n){const hu=LANG=='hu',pg=TALK.pg|0,o=[],L=(k,h,e)=>o.push({k,l:hu?h:(e||h)});
 if(n.pri=='qm'){if(pg==0){L('shop','Vásárlás','Shop');L('look',PRI.cust?'Szkafander és kinézet':'Szkafander (a prológus után)','Suit and looks');L('news','Mi újság?','What\'s new?');L('bye','Viszlát!','Goodbye!')}
  else if(pg==1){L('b_filt','Szűrő — '+PCOST.filt+' rubel','Filter — '+PCOST.filt);L('b_patch','Szkafander-javítás — '+PCOST.patch,'Suit patch — '+PCOST.patch);L('b_tonic','Sugárellenes tabletta — '+PCOST.tonic,'Anti-rad pills — '+PCOST.tonic);L('b_food','Konzerv + víz — '+(PCOST.canned+PCOST.bottle),'Canned food + water — '+(PCOST.canned+PCOST.bottle));L('back','Vissza','Back')}
  else if(pg==2){L('hz',PRI.hz?'Szkafander levétele':'Szkafander felvétele',PRI.hz?'Take off the suit':'Put on the suit');L('hzc','Szín: '+HZP[PRI.hzc|0].n[0],'Colour: '+HZP[PRI.hzc|0].n[1]);L('sh','Ruha színe','Shirt colour');L('pn','Nadrág színe','Trousers colour');L('more','Tovább…','More…')}
  else{L('hs','Hajstílus','Hair style');L('hc','Hajszín','Hair colour');L('sk','Bőrszín','Skin');L('ac','Kiegészítő','Accessory');L('back','Vissza','Back')}}
 else if(n.pri=='boss'){L('job',PRI.q.on?'Aktuális megbízás':'Munka kérése','Work');if(PRI.q.on)L('rep','Jelentés','Report');L('where','Mi ez a hely?','What is this place?');L('who','Kik „Ők”?','Who are They?');L('bye','Viszlát!','Goodbye!')}
 else{L('news','Mi újság?','What\'s new?');L('where','Hol vagyunk?','Where are we?');L('bye','Viszlát!','Goodbye!')}
 return o}
{const to=talkOpts;talkOpts=function(){if(PRI&&TALK&&TALK.n&&TALK.n.pri)return priTalkOpts(TALK.n);return to.apply(this,arguments)}}
{const ng=npcGreet;npcGreet=function(n){if(PRI&&n&&n.pri){const hu=LANG=='hu';n.kn=1;TALK&&(TALK.pg=0);
  if(n.pri=='qm')return hu?['Hé, újonc! Én vagyok Vaszilij Pavlics, az intéző. Szűrő, tabletta, kopott szkafander — nálam minden van. A pénz kell, a ruha kell.','Á, te vagy az új. Ne feledd: a szűrő nem örök.']:['Hey, rookie! I\'m Vasily Pavlovich, the quartermaster. Filters, pills, worn suits — I have it all.'];
  if(n.pri=='boss')return hu?['Gyenyiszov. A megbízó. Itt senki nem kérdez, honnan jöttél — csak azt, hogy mit hozol. Tisztítás, szállítás, mérés. Jó pénzért bármi.','Megint te. Van munka, ha bírod.']:['Denisov. The contractor. Nobody asks where you came from here — only what you bring.'];
  if(n.pri=='guard')return hu?['Az Övezet 1986-ban megállt. Te csak vendég vagy.','Ne menj a Vörös Erdőbe szkafander nélkül.']:['The Zone stopped in 1986. You are just a guest.'];
  return PVET[Math.floor(Math.random()*PVET.length)].slice(hu?0:1,hu?1:2)}return ng.apply(this,arguments)}}
function priTalkPick(i){const o=talkOpts()[i];if(!o)return;const n=TALK.n,hu=LANG=='hu',S=(h,e)=>talkSay(hu?h:(e||h));snd('ui');TALK.sel=i;const k=o.k;
 if(k=='bye'){talkClose(hu?['Vigyázz magadra, stalker.','Csöndben járj.']:['Take care, stalker.']);return}
 if(k=='back'){TALK.pg=n.pri=='qm'&&TALK.pg==3?2:0;S('Mit szeretnél?','What would you like?');return}
 if(k=='shop'){TALK.pg=1;S('Mire van szükséged? Kész pénz, rubel.','What do you need? Cash, roubles.');return}
 if(k=='look'){if(!PRI.cust){S('Még nem. Előbb fejezd be az első munkát — utána átalakíthatod a felszerelésed.','Not yet. Finish your first job, then you can customise your gear.');return}TALK.pg=2;S('Mit igazítsunk?','What shall we adjust?');return}
 if(k=='more'){TALK.pg=3;S('Még valami?','Anything else?');return}
 const buy=(c,fn,msg)=>{if(PRI.rub<c){S('Nincs elég rubeled.','Not enough roubles.');return}PRI.rub-=c;fn();snd('pick');S(msg[0],msg[1])};
 if(k=='b_filt')return buy(PCOST.filt,()=>{PRI.filt=100;PRI.w1=0},['Friss szűrő a szkafanderben.','A fresh filter is in.']);
 if(k=='b_patch')return buy(PCOST.patch,()=>{PRI.suit=100;PRI.w0=0},['Összefoltoztam a szkafandert.','Patched up the suit.']);
 if(k=='b_tonic')return buy(PCOST.tonic,()=>{inv.tonic=(inv.tonic||0)+1},['Egy tabletta. Ne edd éhgyomorra.','One pill. Not on an empty stomach.']);
 if(k=='b_food')return buy(PCOST.canned+PCOST.bottle,()=>{inv.canned=(inv.canned||0)+1;inv.bottle=(inv.bottle||0)+1},['Konzerv és víz.','Canned food and water.']);
 if(k=='hz'){PRI.hz=!PRI.hz;S(PRI.hz?'Felvetted a szkafandert.':'Levetted a szkafandert. A Geiger tovább szól.','Suit on.');return}
 if(k=='hzc'){PRI.hzc=((PRI.hzc|0)+1)%HZP.length;S('Új szín: '+HZP[PRI.hzc].n[0],'New colour');return}
 if(['sh','pn','hs','hc','sk','ac'].includes(k)){chStep(CHK.indexOf(k),1);S('Rendben.','Done.');return}
 if(k=='news'){const a=PVET[Math.floor(Math.random()*PVET.length)];S(a[0],a[1]);return}
 if(k=='where'){S('Pripjaty. Az atomváros: 1970-ben alapították, 1986. április 26-án kiürítették. Az óra megállt — te csak vendég vagy.','Pripyat: founded 1970, evacuated April 26, 1986. The clock stopped.');return}
 if(k=='who'){S('Ők. Ne mondj mást. Nem zombik és nem emberek — vagy már nem. Ők voltak a lakók, a vendégek, a gyerekek. Ők nem fáradnak el.','They. Don\'t call them anything else.');return}
 if(k=='job'){if(PRI.q.on){S(priCDesc(),priCDesc());return}if(PRI.q.i>=PRC.length){S('Mára nincs több munka. Holnap talán… talán nem.','No more work for now.');return}priStartC(PRI.q.i);S('Itt a megbízás: '+priCDesc(),'Here is your job: '+priCDesc());return}
 if(k=='rep'){if(!PRI.q.on){S('Nincs mit jelenteni.','Nothing to report.');return}if(!PRI.q.ready){S('Még nem végeztél. '+priCProg(),'Not done yet. '+priCProg());return}priFinishC();S('Szép munka. Fizetés: kész pénz. '+(PRI.cust&&PRI.q.i==1?'Vaszilijnál most már átöltözhetsz, és személyre szabhatod a felszerelésed.':''),'Good work. Paid.');return}}
{const tp=talkPick;talkPick=function(i){if(PRI&&TALK&&TALK.n&&TALK.n.pri)return priTalkPick(i);return tp.apply(this,arguments)}}
/* ---------- contracts ---------- */
function priCDesc(){const c=PRC[PRI.q.i];if(!c)return'';return(LANG=='hu'?c.h[0]+' — '+c.d[0]:c.h[1]+' — '+c.d[1])+' ('+c.rub+(LANG=='hu'?' rubel)':' rub)')}
function priCProg(){const c=PRC[PRI.q.i];if(!c)return'';if(c.k=='kill'){const left=zs.filter(z=>z.pq==PRI.q.i+1).length;return(LANG=='hu'?'Még ':'Left: ')+left+(LANG=='hu'?' „Ő” van hátra.':' of Them remain.')}return(PRI.q.got|0)+' / '+PRI.q.tot}
function priFreeSpot(x0,y0,x1,y1,tiles,away){for(let t=0;t<600;t++){const x=x0+Math.floor(Math.random()*(x1-x0+1)),y=y0+Math.floor(Math.random()*(y1-y0+1)),i=y*W+x;if(ob[i]||!tiles.includes(map[i]))continue;if(away&&Math.hypot(x*T+8-P.x,y*T+8-P.y)<T*9)continue;return[x,y]}return null}
function priStartC(i){const c=PRC[i];PRI.q.on=1;PRI.q.ready=0;PRI.q.got=0;PRI.q.tot=c.n;PRI.q.i=i;
 if(c.k=='kill'){let n=0;const[x0,y0,x1,y1]=c.r;for(const z of zs)if(z.x>=x0*T&&z.x<=(x1+1)*T&&z.y>=y0*T&&z.y<=(y1+1)*T){z.pq=i+1;z.st79=1;n++}
  for(let t=0;n<c.n&&t<60;t++){const s=priFreeSpot(x0,y0,x1,y1,[0,14,16,12,3],true);if(!s)break;const v=[0,0,1,2,3,4][Math.floor(Math.random()*6)];zs.push({id:nid(),x:s[0]*T+8,y:s[1]*T+8,hp:VHP[v]||6,a:0,t:0,vx:0,vy:0,z:1,v,pri:1,st79:1,pq:i+1});n++}
  PRI.q.tot=n}
 else if(c.k=='fetch'){const[x0,y0,x1,y1]=c.r;for(let k=0;k<c.n;k++){const s=priFreeSpot(x0,y0,x1,y1,[16,12,14],false);if(s)ob[s[1]*W+s[0]]={t:'pparcel',pq:i+1}}}
 else if(c.k=='visit'){let[x,y]=c.at;for(let r=0;r<12;r++){let ok=0;for(let dy=-r;dy<=r&&!ok;dy++)for(let dx=-r;dx<=r&&!ok;dx++){const xx=x+dx,yy=y+dy,j=yy*W+xx;if(xx>1&&yy>1&&xx<W-2&&yy<H-2&&!ob[j]&&map[j]==0){ob[j]={t:'pparcel',pq:i+1,s:1};ok=1}}if(ok)break}}
 try{priSave()}catch(e){}}
function priFinishC(){const c=PRC[PRI.q.i];PRI.rub+=c.rub;PRI.rep=(PRI.rep||0)+1;PRI.q.on=0;PRI.q.ready=0;PRI.q.i++;if(PRI.q.i>=1)PRI.cust=1;
 try{TQ112.push({title:LANG=='hu'?'Megbízás teljesítve':'Contract complete',sub:'+'+c.rub+(LANG=='hu'?' rubel':' rub'),col:'#d8c040'})}catch(e){}snd('pick');try{priSave()}catch(e){}}
DRAWX.pparcel=function(o,x,y){pShadow(x+2,y+12,12,3);W_(x+3,y+5,10,8,'#7a5a34');W_(x+3,y+5,10,1,'#a07a4a');W_(x+3,y+9,10,1,'#4a3418');W_(x+7,y+5,2,8,'#c8b890');if(o.s){W_(x+4,y+2,8,3,'#46503e');W_(x+6,y+1,4,2,'#b6ff40')}else{try{pStar(pSX(x+8),pSY(y+7),2,PGOLD)}catch(e){}}};
INT.pparcel=1;NMX.pparcel='parcel';
{const u=useObj;useObj=function(n){if(PRI&&n&&n.o&&n.o.t=='pparcel'){const i=n.ty*W+n.tx,o=n.o,c=PRC[(o.pq||1)-1];if(!PRI.q.on||PRI.q.i!=(o.pq||1)-1){say(LANG=='hu'?'Valaki csomagja. Nem a te dolgod — most nem.':'Someone else\'s parcel.');return}ob[i]=null;PRI.q.got=(PRI.q.got|0)+1;snd('pick');
  say(c.k=='visit'?(LANG=='hu'?'Mintát vettél a talajból. A Geiger sír.':'You took a soil sample. The Geiger screams.'):(LANG=='hu'?'Felvetted: '+PRI.q.got+' / '+PRI.q.tot:'Picked up: '+PRI.q.got+' / '+PRI.q.tot));if(PRI.q.got>=PRI.q.tot)PRI.q.ready=1;if(c.k=='visit')P.inf=Math.min(100,(P.inf||0)+6);return}return u.apply(this,arguments)}}
/* ---------- progress tick, kill money, objective on the HUD ---------- */
var PQK=new Map();
{const up=update;update=function(dt){up(dt);if(!PRI||state!='play')return;
 const cur=new Map();for(const z of zs)if(z.pri)cur.set(z.id,[z.x,z.y]);
 for(const[id,p]of PQK)if(!cur.has(id)&&Math.hypot(p[0]-P.x,p[1]-P.y)<260){PRI.kill=(PRI.kill|0)+1;const g_=3+Math.floor(Math.random()*5);PRI.rub+=g_;try{TQ112.push({title:'+'+g_+(LANG=='hu'?' rubel':' rub'),sub:LANG=='hu'?'Ők — egy kevesebb':'One of Them less',col:'#c8b860'})}catch(e){}}
 PQK=cur;
 if(PRI.q.on&&!PRI.q.ready){const c=PRC[PRI.q.i];if(c&&c.k=='kill'){const lf=zs.filter(z=>z.pq==PRI.q.i+1).length;PRI.q.left=lf;if(lf==0&&(PRI.t0||0)>3){PRI.q.ready=1}}}
 if(PRI.q.ready&&!PRI.q.said){PRI.q.said=1;say(LANG=='hu'?'A feladat kész — jelentsd Gyenyiszovnak a keleti bódéban.':'Done — report to Denisov.')}if(!PRI.q.ready)PRI.q.said=0}}
{const h0=hud;hud=function(){const r=h0.apply(this,arguments);try{if(PRI&&state=='play'&&!tut)priObj()}catch(e){}return r}}
function priObj(){const hu=LANG=='hu',x=VW-102,y=58;noTr=true;const c=PRC[PRI.q.i];let t1,t2;
 if(PRI.q.on&&c){t1=(hu?c.h[0]:c.h[1]);t2=PRI.q.ready?(hu?'Jelentsd Gyenyiszovnak':'Report to Denisov'):priCProg()}else if(PRI.q.i<PRC.length){t1=hu?'Nincs aktív megbízás':'No active contract';t2=hu?'Gyenyiszov, keleti bódé':'Talk to Denisov (east hut)'}else{t1=hu?'Minden munka kész':'All jobs done';t2=''}
 g.font=fnt(0,9);const w=Math.min(VW-10,Math.max(96,Math.ceil(g.measureText(t1).width)+10,Math.ceil(g.measureText(t2||'').width)+10));Q(VW-4-w,y,w,t2?24:13,'rgba(10,12,8,.58)');txt(t1,VW-w+1,y+10,'#d8c890');if(t2)txt(t2,VW-w+1,y+20,PRI.q.ready?'#b6ff40':'#9aa08a');noTr=false}

/* after loading: the contract's survivors come back (zombies are not saved with the world) */
{const al=priAfterLoad;priAfterLoad=function(){al.apply(this,arguments);try{if(PRI.q&&PRI.q.on&&!PRI.q.ready){const i=PRI.q.i,c=PRC[i];if(c&&c.k=='kill'){const have=zs.filter(z=>z.pq==i+1).length,need=(PRI.q.left!=null?PRI.q.left:PRI.q.tot)-have,[x0,y0,x1,y1]=c.r;for(let n=0;n<need;n++){const s=priFreeSpot(x0,y0,x1,y1,[0,14,16,12,3],true);if(!s)break;const v=[0,0,1,2,3,4][Math.floor(Math.random()*6)];zs.push({id:nid(),x:s[0]*T+8,y:s[1]*T+8,hp:VHP[v]||6,a:0,t:0,vx:0,vy:0,z:1,v,pri:1,st79:1,pq:i+1})}}}PRI.t0=0}catch(e){console.warn('after load',e)}}}
