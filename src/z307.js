/* ===== z307: the hazmat suit, radiation field, Geiger gauge, customising ===== */
var HZN=null;
const HZP=[{n:['Sárga','Yellow'],c:['#c9b23c','#e8d878','#8a7620']},{n:['Olajzöld','Olive'],c:['#6a7a3a','#8a9a52','#46522a']},{n:['Szürke','Grey'],c:['#8e9094','#b4b6ba','#5e6064']},{n:['Narancs','Orange'],c:['#c8641e','#e88a3a','#8a3e10']}];
HZP.forEach((p,i)=>{TP['hz'+i]=p.c});TP.hzb=['#2a2a26','#46463e','#141412'];
{const dc=drawChar;drawChar=function(x,y,c,w,fx,fy,s,e){let pk=null;if(PRI){if(c===CH&&PRI.hz)pk=PRI.hzc|0;else if(HZN)pk=HZN.hzc|0}
 if(pk!=null){const k='hz'+pk;e=Object.assign({},e||{},{h:k,c:k,l:k,b:'hzb',m:true})}return dc.call(this,x,y,c,w,fx,fy,s,e)}}
{const dn=drawNPC;drawNPC=function(n){HZN=n.hz?n:null;try{return dn.apply(this,arguments)}finally{HZN=null}}}
{const pn=priNew;priNew=function(){const o=pn.apply(this,arguments);o.hz=true;o.hzc=0;o.rub=40;o.v=2;o.q={on:0,i:0,ready:0,got:0,tot:0};o.cust=0;o.pro=0;return o}}
/* ---------- the radiation field ---------- */
function priZone(tx,ty){if(tx>=272)return 'river';if(tx<110&&ty<118)return 'rf';return 'town'}
function priRadAt(tx,ty){let r=.06+Math.max(0,(150-ty)/150)*.22;const z=priZone(tx,ty);
 if(z=='rf'){const d=Math.min(1,Math.hypot(tx-50,ty-50)/80);r=2.0+(1-d)*5.5}else if(z=='river')r=.22;
 if(PRB&&PRB.hot)for(const h of PRB.hot){const d=Math.hypot(tx-h.x,ty-h.y);if(d<h.r)r+=h.s*Math.pow(1-d/h.r,2)}return r}
function priHot(){const q=prRng(PRIS+77),L=[];
 for(let k=0;k<24;k++){let x,y,t=0;do{x=30+Math.floor(q()*240);y=30+Math.floor(q()*250);t++}while(t<60&&map[y*W+x]!=3&&map[y*W+x]!=14&&map[y*W+x]!=0);L.push({x,y,r:4+Math.floor(q()*5),s:1.4+q()*4})}
 L.push({x:159,y:122,r:7,s:1.6},{x:93,y:166,r:6,s:2.4},{x:230,y:110,r:5,s:2.2});return L}
{const f=priFinish;priFinish=function(r){const o=f.apply(this,arguments);PRB.hot=priHot();return o}}
function priAfterLoad(){PRB={slabs:[],places:{},floors:{},npc:{},zones:[]};PRB.hot=priHot();PAT=0;PQK=new Map()}
{const sr=sporeRate;sporeRate=function(){if(!PRI)return sr();if(creative)return 0;if(inC)return 0;if(inD)return .05+(curOf&&curOf.f>curOf.n?.12:0);return priRadAt(P.x/T|0,P.y/T|0)}}
{const st=sporeTick;sporeTick=function(dt){if(!PRI)return st(dt);const a=P.inf||0;st(dt);const b=P.inf||0,d=b-a;
 if(d>0&&PRI.hz&&PRI.suit>0){const prot=PRI.filt>0?.9:.6;P.inf=a+d*(1-prot);PRI.suit=Math.max(0,PRI.suit-d*.9);if(PRI.filt>0)PRI.filt=Math.max(0,PRI.filt-d*1.2);
  if(PRI.suit<=0&&!PRI.w0){PRI.w0=1;say(LANG=='hu'?'A szkafander elszakadt — már nem véd!':'The suit is torn — it no longer protects!')}
  if(PRI.filt<=0&&!PRI.w1){PRI.w1=1;say(LANG=='hu'?'A szűrő kifogyott. Cserélni kell!':'The filter is spent. Replace it!')}}
 if(PRI.suit>20)PRI.w0=0;if(PRI.filt>20)PRI.w1=0}}
/* ---------- gauge ---------- */
{const h0=hud;hud=function(){const r=h0.apply(this,arguments);try{if(PRI&&state=='play'&&!tut)priGauge()}catch(e){}return r}}
function priGauge(){const hu=LANG=='hu',x=VW-102,y=4,rate=P.rate||0,lv=rate<.5?0:rate<2?1:rate<5?2:3,col=['#8ad060','#d8c840','#e88a30','#e03a2a'][lv];
 noTr=true;Q(x,y,98,50,'rgba(10,12,8,.62)');Q(x,y,98,1,'#46503e');Q(x,y+49,98,1,'#2a3024');
 g.font=fnt(0,9);txt((hu?'SUGÁR ':'RAD ')+(rate*.4).toFixed(2)+' mSv/h',x+5,y+11,col);
 const bar=(yy,v,c,lab)=>{Q(x+5,yy,60,4,'#1a1c16');Q(x+5,yy,Math.round(60*Math.max(0,Math.min(1,v/100))),4,c);g.font=fnt(0,7);txt(lab,x+69,yy+5,'#9aa08a')};
 bar(y+16,P.inf||0,(P.inf||0)>45?'#e03a2a':'#b6ff40',hu?'dózis':'dose');
 bar(y+25,PRI.hz?PRI.suit:0,PRI.suit>30?'#d8c840':'#e88a30',hu?'ruha':'suit');
 bar(y+34,PRI.hz?PRI.filt:0,'#6ab0d8',hu?'szűrő':'filter');
 g.font=fnt(0,8);txt(PRI.rub+(hu?' rubel':' rub'),x+5,y+47,'#e8d890');noTr=false}
/* ---------- the quartermaster: shop, suit, looks ---------- */
const PCOST={filt:30,patch:45,tonic:35,canned:12,bottle:6,ammo:18,gas:15,batt:20};
function priShopLine(k){return PCOST[k]}
