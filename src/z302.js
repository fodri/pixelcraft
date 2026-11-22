/* ===== z302: art for Pripjaty 1986 — red star, hammer and sickle, banners, billboards, the funfair (ferris wheel, carousel, bumper cars, swings),
   playground, kindergarten and school things, kiosks, monuments, panel-block roofs ===== */
function pStar(cx,cy,r,col){g.save();g.fillStyle=col;g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r,x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr;i?g.lineTo(x,y):g.moveTo(x,y)}g.closePath();g.fill();g.restore()}
function pHS(cx,cy,s,col){g.save();g.translate(cx,cy);g.strokeStyle=col;g.fillStyle=col;g.lineCap='butt';
 g.lineWidth=Math.max(1,s*.14);g.beginPath();g.arc(s*.02,s*.04,s*.34,Math.PI*.78,Math.PI*2.1);g.stroke();
 g.lineWidth=Math.max(1,s*.12);g.beginPath();g.moveTo(-s*.27,s*.22);g.lineTo(-s*.42,s*.42);g.stroke();
 g.lineWidth=Math.max(1,s*.12);g.beginPath();g.moveTo(-s*.26,-s*.3);g.lineTo(s*.26,s*.42);g.stroke();
 g.save();g.translate(-s*.2,-s*.22);g.rotate(Math.atan2(.72,.52)-Math.PI/2);g.fillRect(-s*.2,-s*.08,s*.4,s*.17);g.restore();g.restore()}
function pTxt(s,x,y,col,sz,al,sh){g.save();g.font='bold '+sz+'px "DejaVu Sans",Arial,sans-serif';g.textAlign=al||'left';if(sh!==0){g.fillStyle='rgba(0,0,0,.55)';g.fillText(s,x+1,y+1)}g.fillStyle=col;g.fillText(s,x,y);g.restore()}
const pSX=(x)=>Math.round(x-cam.x),pSY=(y)=>Math.round(y-cam.y);
const PRED='#a8241c',PRED2='#8a1c16',PGOLD='#e8c43a',PCONC='#8e9094',PCONC2='#6e7074';
function pShadow(x,y,w,h){W_(x,y,w,h,'rgba(0,0,0,.28)')}
/* register: solid, names */
const PSOL=['pcar2','pbump','pswing','pgate','ppil','pmon','pkiosk','pwheel','pbill','pbusst','pcot','pboard','pgasm','pslide','pframe','pcrane'];
for(const k of PSOL){SOLID[k]=1;SOLID['p_'+k]=1}
Object.assign(NMX,{pbanner:'banner',pflag:'red flag',ppos:'poster',pwheel:'ferris wheel',pcar2:'carousel',pbump:'bumper cars',pswing:'chain swing',pgate:'park gate',pmon:'monument',pkiosk:'kiosk',pbill:'billboard',pbusst:'bus stop',pcot:'cot',pdoll:'doll',pboard:'blackboard',pgasm:'gas masks',pcal:'calendar',pbust:'bust'});
/* ---- small things ---- */
DRAWX.pbanner=function(o,x,y){const k=o.k|0,t=performance.now(),w=Math.floor(t/380+x)%2;pShadow(x+2,y+13,12,3);W_(x+7,y-14,2,29,'#5a5a5a');W_(x+7,y-14,1,29,'#7a7a7a');W_(x+5,y-17,6,3,'#444');
 const bx=x+9,by=y-12;W_(bx,by,13,17+(w?0:1),k==2?'#8a3a30':PRED);W_(bx,by,13,1,k==2?'#a85a4a':'#c8402e');W_(bx,by+16,13,1,PRED2);
 const sx=pSX(bx+6.5),sy=pSY(by+8);if(k==1)pHS(sx,sy,10,PGOLD);else pStar(sx,sy,5,PGOLD)};
DRAWX.pflag=function(o,x,y){const t=performance.now(),w=Math.floor(t/260+x*.3)%2;pShadow(x+2,y+14,12,2);W_(x+7,y-18,2,33,'#6a6a6a');W_(x+7,y-18,1,33,'#8a8a8a');W_(x+9,y-17,16,10,PRED);W_(x+9,y-17,16,1,'#c8402e');W_(x+9+w,y-8,14,2,PRED2);try{pHS(pSX(x+14),pSY(y-12),5,PGOLD);pStar(pSX(x+10),pSY(y-14),2,PGOLD)}catch(e){}W_(x+6,y-20,4,2,PGOLD)};
DRAWX.ppos=function(o,x,y){const k=o.k|0;W_(x+2,y+2,12,13,'#2a2622');
 if(k==0){W_(x+3,y+3,10,11,PRED);pStar(pSX(x+8),pSY(y+8),4.3,PGOLD)}
 else if(k==1){W_(x+3,y+3,10,11,PRED);pHS(pSX(x+8),pSY(y+8),9,PGOLD)}
 else if(k==2){W_(x+3,y+3,10,11,'#d8cfa8');W_(x+3,y+3,10,3,PRED);W_(x+5,y+8,2,5,'#4a4a52');W_(x+8,y+7,2,6,'#6a4a3a');W_(x+10,y+9,2,4,'#3a4a5a');W_(x+4,y+7,8,1,'#8a7a5a')}
 else if(k==3){W_(x+3,y+3,10,11,'#c8c0a0');W_(x+4,y+5,8,1,'#8a7a5a');W_(x+4,y+8,6,1,'#8a7a5a');W_(x+5,y+10,5,1,'#8a7a5a');W_(x+10,y+4,2,2,PRED)}
 else{W_(x+3,y+3,10,11,'#ece6d4');W_(x+3,y+3,10,3,PRED);for(let r=0;r<4;r++)for(let c=0;c<5;c++)W_(x+4+c*2,y+7+r*2,1,1,'#6a6a6a');W_(x+8,y+9,3,3,'rgba(160,30,24,.55)');W_(x+9,y+10,1,1,'#a8241c')}};
DRAWX.pcal=function(o,x,y){W_(x+3,y+1,10,14,'#ece6d4');W_(x+3,y+1,10,4,PRED);W_(x+3,y+1,10,1,'#c8402e');for(let r=0;r<4;r++)for(let c=0;c<5;c++)W_(x+4+c*2,y+6+r*2,1,1,'#5a5a5a');W_(x+8,y+10,3,3,'rgba(160,30,24,.6)');W_(x+5,y+1,1,2,'#222');W_(x+10,y+1,1,2,'#222')};
DRAWX.pdoll=function(o,x,y){const k=o.k|0;W_(x+3,y+13,10,2,'rgba(0,0,0,.25)');const c=['#b8604a','#5a7a9a','#9a8a4a'][k%3];W_(x+5,y+6,6,7,c);W_(x+6,y+2,4,4,'#d8b898');W_(x+6,y+3,1,1,'#222');W_(x+9,y+3,1,1,'#222');W_(x+4,y+7,1,4,'#d8b898');W_(x+11,y+8,1,3,'#d8b898');W_(x+6,y+13,1,2,'#4a3a3a');W_(x+9,y+13,1,2,'#4a3a3a')};
DRAWX.pcot=function(o,x,y){W_(x+1,y+14,14,2,'rgba(0,0,0,.28)');W_(x+1,y+2,14,13,'#8a7a58');W_(x+2,y+3,12,11,'#b8b098');W_(x+2,y+3,12,4,'#d8d0b8');W_(x+2,y+8,12,1,'#8a7a58');for(let i=0;i<4;i++)W_(x+2+i*3,y+2,1,13,'#6a5a3a');W_(x+5,y+5,3,2,'#c8a888')};
DRAWX.pgasm=function(o,x,y){W_(x+1,y+13,14,2,'rgba(0,0,0,.3)');for(let i=0;i<7;i++){const a=(i*5)%4,b=(i*3)%3;W_(x+2+a*3,y+9-b*3,5,5,'#3a4034');W_(x+3+a*3,y+9-b*3,3,3,'#5a6050');W_(x+4+a*3,y+14-b*3,1,2,'#2a2e26');W_(x+3+a*3,y+10-b*3,1,1,'#aab8a0');W_(x+5+a*3,y+10-b*3,1,1,'#aab8a0')}};
DRAWX.pboard=function(o,x,y){W_(x,y+13,16,3,'rgba(0,0,0,.28)');W_(x,y+1,16,13,'#3a2a1a');W_(x+1,y+2,14,11,'#2a3a30');W_(x+3,y+5,7,1,'#d8d8c8');W_(x+3,y+8,9,1,'#d8d8c8');W_(x+2,y+14,12,1,'#a8a090')};
DRAWX.pbust=function(o,x,y){W_(x+2,y+13,12,3,'rgba(0,0,0,.3)');W_(x+3,y+9,10,6,PCONC2);W_(x+3,y+9,10,1,'#a8aaae');W_(x+5,y+2,6,8,'#aaaaa4');W_(x+5,y+2,6,1,'#c8c8c0');W_(x+6,y+4,1,1,'#555');W_(x+9,y+4,1,1,'#555');W_(x+6,y+8,4,2,'#9a9a94')};
DRAWX.pslide=function(o,x,y){W_(x+1,y+13,14,3,'rgba(0,0,0,.26)');W_(x+2,y+2,3,12,'#9a5a2a');W_(x+2,y+2,3,2,'#c88a3a');W_(x+5,y+5,9,3,'#b8baba');W_(x+11,y+8,4,3,'#b8baba');W_(x+5,y+5,9,1,'#e0e2e2')};
DRAWX.psw2=function(o,x,y){const t=performance.now(),s=Math.round(Math.sin(t/900+x)*2);W_(x+1,y+14,14,2,'rgba(0,0,0,.25)');W_(x+1,y,2,15,'#7a4a2a');W_(x+13,y,2,15,'#7a4a2a');W_(x+1,y,14,2,'#9a6a3a');W_(x+4+s,y+2,1,8,'#555');W_(x+11+s,y+2,1,8,'#555');W_(x+4+s,y+10,8,2,'#8a5a2a')};
DRAWX.psand=function(o,x,y){W_(x+1,y+3,14,12,'#6a4a2a');W_(x+2,y+4,12,10,'#c8b078');W_(x+5,y+7,2,2,'#b09858');W_(x+9,y+10,3,2,'#a88848');W_(x+4,y+11,2,1,'#d8c088')};
DRAWX.pcrnd=function(o,x,y){const t=performance.now(),a=t/3000;W_(x+1,y+14,14,2,'rgba(0,0,0,.25)');W_(x+2,y+3,12,12,'#4a4a4e');W_(x+3,y+4,10,10,'#6a6a70');for(let i=0;i<4;i++){const q=a+i*Math.PI/2;W_(x+8+Math.cos(q)*4-1,y+9+Math.sin(q)*4-1,3,3,'#b8603a')}W_(x+7,y+8,2,2,'#2a2a2a')};
DRAWX.ppil=function(o,x,y){W_(x,y+14,16,3,'rgba(0,0,0,.3)');W_(x+2,y-16,12,32,PCONC);W_(x+2,y-16,2,32,'#b0b2b6');W_(x+12,y-16,2,32,PCONC2);W_(x,y-18,16,4,'#a0a2a6');W_(x,y-18,16,1,'#c8cacc');try{pStar(pSX(x+8),pSY(y-6),4,PRED)}catch(e){}};
DRAWX.ppole=function(o,x,y){W_(x+6,y+14,4,2,'rgba(0,0,0,.3)');W_(x+7,y-26,2,40,'#5a4a38');W_(x+7,y-26,1,40,'#7a6a52');W_(x+1,y-22,14,2,'#4a3a2a');W_(x+3,y-17,10,2,'#4a3a2a');W_(x+1,y-23,1,2,'#cfd8d0');W_(x+14,y-23,1,2,'#cfd8d0')};
/* ---- billboard: red board with star, hammer and sickle and a slogan ---- */
const PSLOG=['СЛАВА ТРУДУ!','МИР · ТРУД · МАЙ','ПРИПЯТЬ','НАРОД И ПАРТИЯ — ЕДИНЫ!','ЛЕНИНСКИМ КУРСОМ'];
BIG.pbill=function(o,x,y){const k=(o.k|0)%PSLOG.length;W_(x+4,y+30,56,4,'rgba(0,0,0,.28)');W_(x+8,y+14,3,19,'#5a5a5e');W_(x+53,y+14,3,19,'#5a5a5e');W_(x+2,y-2,60,22,'#3a3a3e');W_(x+3,y-1,58,20,PRED);W_(x+3,y-1,58,1,'#c8402e');W_(x+3,y+18,58,1,PRED2);
 try{pStar(pSX(x+13),pSY(y+9),6,PGOLD);pHS(pSX(x+50),pSY(y+9),12,PGOLD);pTxt(PSLOG[k],pSX(x+32),pSY(y+12),'#f0d890',k==3?5:7,'center',0)}catch(e){}};
FPR.pbill=[4,2];
/* ---- park gate and arch ---- */
BIG.pgate=function(o,x,y){W_(x,y+14,16,3,'rgba(0,0,0,.3)');W_(x+2,y-14,12,30,PCONC);W_(x+2,y-14,2,30,'#b0b2b6');W_(x+12,y-14,2,30,PCONC2);W_(x,y-16,16,4,'#a0a2a6');
 /* the arch over the entrance, 5 tiles wide: red board with the star and the name */
 const ax=x+16,aw=80;W_(ax,y-26,aw,22,'#3a3a3e');W_(ax+1,y-25,aw-2,20,PRED);W_(ax+1,y-25,aw-2,1,'#c8402e');W_(ax+1,y-6,aw-2,1,PRED2);
 try{pStar(pSX(ax+10),pSY(y-15),7,PGOLD);pStar(pSX(ax+aw-10),pSY(y-15),7,PGOLD);pTxt('ПАРК',pSX(ax+aw/2),pSY(y-11),'#f4dc88',10,'center',0);pStar(pSX(x+8),pSY(y-3),3.5,PRED)}catch(e){}};
/* ---- ferris wheel: 9 tiles of sky, rusty yellow and red cabins, turning very slowly in the wind ---- */
BIG.pwheel=function(o,x,y){const t=performance.now(),R=60,cx=x+24,cy=y-72,sx=pSX(cx),sy=pSY(cy),rot=t/21000+(o.ph||0);
 W_(x-30,y+22,110,6,'rgba(0,0,0,.26)');
 g.save();g.lineCap='butt';
 /* A-frame legs */
 g.strokeStyle='#7a4a2a';g.lineWidth=4;g.beginPath();g.moveTo(sx-2,sy+2);g.lineTo(sx-34,sy+R+36);g.moveTo(sx+2,sy+2);g.lineTo(sx+38,sy+R+36);g.stroke();
 g.strokeStyle='#a8602e';g.lineWidth=1.5;g.beginPath();g.moveTo(sx-2,sy+2);g.lineTo(sx-32,sy+R+36);g.moveTo(sx+2,sy+2);g.lineTo(sx+36,sy+R+36);g.stroke();
 g.strokeStyle='#5a3a22';g.lineWidth=2;g.beginPath();g.moveTo(sx-22,sy+R*.62);g.lineTo(sx+22,sy+R*.62);g.moveTo(sx-28,sy+R*.88);g.lineTo(sx+28,sy+R*.88);g.stroke();
 /* rim */
 g.strokeStyle='#8a6a1a';g.lineWidth=4;g.beginPath();g.arc(sx,sy,R,0,Math.PI*2);g.stroke();g.strokeStyle='#d8b43a';g.lineWidth=2;g.beginPath();g.arc(sx,sy,R,0,Math.PI*2);g.stroke();
 g.strokeStyle='#a8882a';g.lineWidth=1.5;g.beginPath();g.arc(sx,sy,R*.7,0,Math.PI*2);g.stroke();
 /* spokes */
 g.strokeStyle='#8a5a30';g.lineWidth=1.2;for(let i=0;i<16;i++){const a=rot+i*Math.PI/8;g.beginPath();g.moveTo(sx,sy);g.lineTo(sx+Math.cos(a)*R,sy+Math.sin(a)*R);g.stroke()}
 /* cabins */
 for(let i=0;i<12;i++){const a=rot+i*Math.PI/6,bx=sx+Math.cos(a)*R,by=sy+Math.sin(a)*R,sw=Math.sin(t/1700+i*1.3)*.1;g.save();g.translate(bx,by);g.rotate(sw);
  g.strokeStyle='#4a4a4a';g.lineWidth=1;g.beginPath();g.moveTo(0,0);g.lineTo(0,4);g.stroke();
  const c=i%2?['#a8241c','#d8503a']:['#c8a22a','#ecca4a'];g.fillStyle='#2a2420';g.fillRect(-5,3,10,9);g.fillStyle=c[0];g.fillRect(-4,4,8,7);g.fillStyle=c[1];g.fillRect(-4,4,8,2);g.fillStyle='#3a4a52';g.fillRect(-3,7,6,3);g.restore()}
 /* hub */
 g.fillStyle='#4a3a2a';g.beginPath();g.arc(sx,sy,6,0,Math.PI*2);g.fill();g.fillStyle='#a8602e';g.beginPath();g.arc(sx,sy,3.4,0,Math.PI*2);g.fill();
 pStar(sx,sy-R-6,5,PRED);
 g.restore()};
/* ---- carousel, bumper cars, chain swing ---- */
BIG.pcar2=function(o,x,y){const t=performance.now(),sx=pSX(x+24),sy=pSY(y+10);W_(x-4,y+30,56,5,'rgba(0,0,0,.26)');
 g.save();g.fillStyle='#4a4a4e';g.beginPath();g.ellipse(sx,sy+16,28,9,0,0,Math.PI*2);g.fill();g.fillStyle='#7a6a58';g.beginPath();g.ellipse(sx,sy+14,26,8,0,0,Math.PI*2);g.fill();
 for(let i=0;i<6;i++){const a=t/4000+i*Math.PI/3,px=sx+Math.cos(a)*18,py=sy+14+Math.sin(a)*5.5;g.fillStyle='#6a6a6a';g.fillRect(px-.5,py-12,1,13);g.fillStyle=i%2?'#c8402e':'#d8c8a0';g.fillRect(px-2,py-5,5,4)}
 g.fillStyle='#5a5a5e';g.fillRect(sx-1.5,sy-14,3,28);
 for(let i=0;i<10;i++){const a0=-Math.PI+i*Math.PI/5;g.fillStyle=i%2?'#c8402e':'#e0d4b0';g.beginPath();g.moveTo(sx,sy-22);g.arc(sx,sy-8,28,a0+Math.PI*.0,a0+Math.PI/5+Math.PI*.0);g.closePath();g.fill()}
 g.fillStyle='#8a1c16';g.beginPath();g.ellipse(sx,sy-8,28,10,0,0,Math.PI*2);g.globalAlpha=.25;g.fill();g.globalAlpha=1;
 pStar(sx,sy-26,4,PGOLD);g.restore()};
BIG.pbump=function(o,x,y){W_(x+2,y+60,92,5,'rgba(0,0,0,.26)');W_(x+4,y+8,88,52,'#6a6a6e');W_(x+6,y+10,84,48,'#5a5a60');
 for(let i=0;i<6;i++){const cx=x+14+((i*29)%70),cy=y+18+((i*17)%34),c=['#c8402e','#d8b43a','#3a6a9a','#4a8a4a','#a8602e','#8a4a8a'][i];W_(cx,cy,10,7,'#1a1a1c');W_(cx+1,cy+1,8,5,c);W_(cx+2,cy+2,6,2,'rgba(255,255,255,.25)')}
 for(const px of[x+2,x+88]){W_(px,y-4,3,58,'#8a8a8e');W_(px,y-4,1,58,'#b0b0b4')}for(const py of[y-4,y+52])W_(x+2,py,90,3,'#7a7a7e');
 for(let i=0;i<10;i++)W_(x+3+i*9,y-4,5,6,i%2?PRED:'#d8c8a0');try{pTxt('АТТРАКЦИОН',pSX(x+48),pSY(y+4),'#f4dc88',6,'center',0)}catch(e){}};
BIG.pswing=function(o,x,y){const t=performance.now(),sx=pSX(x+24),sy=pSY(y+16);W_(x+2,y+34,44,4,'rgba(0,0,0,.26)');g.save();g.fillStyle='#4a4a50';g.fillRect(sx-2,sy-22,4,40);
 for(let i=0;i<8;i++){const a=t/2600+i*Math.PI/4,ex=sx+Math.cos(a)*22,ey=sy+4+Math.sin(a)*7+8;g.strokeStyle='#7a7a7a';g.lineWidth=1;g.beginPath();g.moveTo(sx,sy-18);g.lineTo(ex,ey-8);g.stroke();g.fillStyle=i%2?'#c8402e':'#d8b43a';g.fillRect(ex-2,ey-8,4,5)}
 g.fillStyle='#a8241c';g.beginPath();g.ellipse(sx,sy-18,16,5,0,0,Math.PI*2);g.fill();g.fillStyle='#c8402e';g.beginPath();g.ellipse(sx,sy-19,13,3.5,0,0,Math.PI*2);g.fill();g.restore()};
/* ---- monument: a concrete plinth with the red hammer and sickle ---- */
BIG.pmon=function(o,x,y){W_(x+2,y+40,44,5,'rgba(0,0,0,.3)');W_(x+2,y+28,44,14,PCONC2);W_(x+2,y+28,44,2,'#b0b2b6');W_(x+5,y+22,38,8,PCONC);W_(x+5,y+22,38,1,'#c0c2c6');
 W_(x+8,y-16,32,40,'#5a5a5e');W_(x+9,y-15,30,38,PRED);W_(x+9,y-15,30,1,'#c8402e');W_(x+9,y+22,30,1,PRED2);try{pStar(pSX(x+24),pSY(y-3),9,PGOLD);pHS(pSX(x+24),pSY(y+11),17,PGOLD)}catch(e){}};
BIG.pkiosk=function(o,x,y){W_(x+1,y+28,30,4,'rgba(0,0,0,.28)');W_(x+2,y+8,28,22,'#4a6a5a');W_(x+3,y+9,26,20,'#6a8a78');W_(x+3,y+9,26,3,'#8aaa98');W_(x+5,y+14,22,9,'#1c2a26');W_(x+6,y+15,20,7,'#3a4a44');for(let i=0;i<5;i++)W_(x+7+i*4,y+17,3,4,['#c8402e','#d8c8a0','#d8b43a','#c8402e','#d8c8a0'][i]);
 W_(x,y+4,32,5,PRED);W_(x,y+4,32,1,'#c8402e');W_(x+3,y+24,26,4,'#5a6a5e');try{pTxt('ПЕЧАТЬ',pSX(x+16),pSY(y+9),'#f4dc88',5,'center',0)}catch(e){}};
BIG.pbusst=function(o,x,y){W_(x+1,y+18,46,4,'rgba(0,0,0,.26)');W_(x+2,y-2,44,20,'#7a7e82');W_(x+3,y-1,42,4,'#a8aaae');W_(x+3,y+3,42,14,'#6a6e72');for(const px of[x+4,x+42])W_(px,y+3,2,16,'#4a4a4e');W_(x+6,y+4,36,12,'#3a4a50');W_(x+6,y+4,36,2,'#5a7078');W_(x+5,y-3,38,2,PRED);try{pStar(pSX(x+14),pSY(y+11),3.5,PRED);pHS(pSX(x+24),pSY(y+11),7,PGOLD);pStar(pSX(x+34),pSY(y+11),3.5,PRED)}catch(e){}};
BIG.pframe=function(o,x,y){W_(x+1,y+14,30,3,'rgba(0,0,0,.28)');W_(x,y+2,32,14,'#4a3a2a');W_(x+1,y+3,30,12,'#6a5a46');W_(x+2,y+4,28,10,'#2a2a28');W_(x+14,y+2,4,14,'#4a3a2a')};
/* ---- panel-block and landmark roofs ---- */
const PROOFS={prp:1,prc:1,prh:1,prs:1,prk:1,prm:1,prx:1};
{const rc=roofCanvas;roofCanvas=function(b,k){if(!(b&&PROOFS[b.rf]))return rc.apply(this,arguments);let cv=ROOFC.get(k);if(cv)return cv;cv=document.createElement('canvas');const w=b.w*T,h=(b.h-1)*T;cv.width=w+6;cv.height=h+6;const cg=cv.getContext('2d'),sg=g,sc=cam;g=cg;cam={x:0,y:0};
 try{const r=prRng((b.x*73856093)^(b.y*19349663)^b.w);const base=b.rf=='prp'?'#8c8e8e':b.rf=='prc'?'#9a9488':b.rf=='prh'?'#a4a49e':b.rf=='prs'?'#98968c':b.rf=='prk'?'#8a7e72':b.rf=='prm'?'#8e9088':'#868890';
  Q(0,0,w,h,base);for(let i=0;i<w*h/26;i++){const a=r(),c=r();Q(Math.floor(a*w),Math.floor(c*h),1,1,i%2?'rgba(255,255,255,.08)':'rgba(0,0,0,.1)')}
  for(let i=0;i<9;i++){const a=r(),c=r();Q(Math.floor(a*(w-30)),Math.floor(c*(h-14)),10+Math.floor(r()*26),5+Math.floor(r()*8),'rgba(60,70,50,.16)')}
  Q(0,0,w,3,'#aeb0b0');Q(0,h-3,w,3,'#6a6c6c');Q(0,0,3,h,'#a4a6a6');Q(w-3,0,3,h,'#6e7070');Q(3,3,w-6,1,'rgba(0,0,0,.3)');Q(3,3,1,h-6,'rgba(0,0,0,.25)');Q(3,h-4,w-6,1,'rgba(255,255,255,.14)');
  /* expansion seams every few tiles */
  for(let x=T*4;x<w-8;x+=T*4)Q(x,3,1,h-6,'rgba(0,0,0,.22)');
  if(b.rf=='prp'){ /* panel block: lift rooms, antennas, a slogan on the roof */
   const n=Math.max(2,Math.floor(w/(T*7)));for(let i=0;i<n;i++){const hx=T*3+i*Math.floor((w-T*6)/Math.max(1,n-1))-(n==1?0:0);Q(hx,h-28,18,14,'#6a6c70');Q(hx,h-28,18,2,'#9a9c9e');Q(hx+3,h-22,5,8,'#2a2c30')}
   for(let i=0;i<14;i++){const ax=10+Math.floor(r()*(w-20)),ay=8+Math.floor(r()*(h-40));Q(ax,ay,1,10,'#4a4a4a');Q(ax-4,ay,9,1,'#3a3a3a');Q(ax-3,ay+3,7,1,'#3a3a3a');Q(ax-2,ay+6,5,1,'#3a3a3a')}
   const s=PSLOG[(b.x+b.y)%3];pTxt(s,w/2,h/2+6,'#d8ccb0',14,'center',0);if(r()<.7)pStar(w-24,h/2,10,PRED);pStar(22,h/2,9,PRED);
   for(let i=0;i<4;i++){const ax=Math.floor(r()*(w-20))+8,ay=Math.floor(r()*(h-20))+8;Q(ax,ay,12,2,'rgba(40,30,20,.35)')}}
  else if(b.rf=='prc'){ /* palace of culture: a big star and the hall */
   Q(w/2-40,h/2-30,80,60,'#a8a29a');Q(w/2-40,h/2-30,80,2,'#c8c2ba');pStar(w/2,h/2,26,PRED);pStar(w/2,h/2,17,PGOLD);for(let i=0;i<8;i++)Q(8+i*Math.floor((w-24)/7),8,10,6,'#6a6a6e')}
  else if(b.rf=='prh'){Q(w/2-6,h/2-18,12,36,PRED);Q(w/2-18,h/2-6,36,12,PRED);Q(w/2-4,h/2-16,8,32,'#ece6d4');Q(w/2-16,h/2-4,32,8,'#ece6d4')}
  else if(b.rf=='prs'){pStar(w-26,h/2,12,PRED);Q(14,h/2-4,60,8,'#5a5c5c');pTxt('ШКОЛА',w/2,h/2+5,'#d8ccb0',11,'center',0)}
  else if(b.rf=='prk'){pStar(w/2,h/2,10,PRED);for(let i=0;i<5;i++)Q(12+i*(w-30)/4,8,8,8,'#c8a02a')}
  else if(b.rf=='prm'){Q(10,h/2-10,w-20,20,'#7a7c7a');pTxt('УНИВЕРМАГ',w/2,h/2+4,'#e8dcb8',12,'center',0);pStar(24,h/2,8,PRED);pStar(w-24,h/2,8,PRED)}
  else{pStar(w/2,h/2,12,PRED)}
  }finally{g=sg;cam=sc}ROOFC.set(k,cv);return cv}}
