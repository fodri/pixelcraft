/* ===== z313: an Eastern-European look — Cyrillic signs, street plates, the city stele, birches, Ukrainian/Russian names ===== */
const PSIGNC=[['#a8241c','#f0d060','#6a1410'],['#e8e0c0','#2a3a22','#8a8468'],['#2a5a98','#f4f4f0','#163a66'],['#9a9c9a','#2a2c2e','#6a6c6a'],['#2e5a3c','#e8e4c0','#1a3a24']];
function pFitTxt(s,cx,cy,col,sz,maxw){g.save();let z=sz;g.font='bold '+z+'px "DejaVu Sans",Arial,sans-serif';while(z>5&&g.measureText(s).width>maxw){z--;g.font='bold '+z+'px "DejaVu Sans",Arial,sans-serif'}g.textAlign='center';g.fillStyle=col;g.fillText(s,cx,cy);g.restore()}
BIG.psign=function(o,x,y){const w=(o.fw||1)*T,h=(o.fh||1)*T,c=PSIGNC[o.k|0]||PSIGNC[0],sx=pSX(x),sy=pSY(y);
 W_(x,y,w,h,'#1c1c1e');W_(x+1,y+1,w-2,h-2,c[0]);W_(x+1,y+1,w-2,1,'rgba(255,255,255,.22)');W_(x+1,y+h-2,w-2,1,c[2]);W_(x+3,y+3,1,1,'#3a3a3a');W_(x+w-4,y+3,1,1,'#3a3a3a');
 const lines=String(o.tx||'').split('|');
 if(lines.length==1)pFitTxt(lines[0],sx+w/2,sy+h/2+3.5,c[1],h>20?13:9,w-8);
 else{pFitTxt(lines[0],sx+w/2,sy+h/2-1,c[1],h>20?14:9,w-8);pFitTxt(lines[1],sx+w/2,sy+h-5,c[1],7,w-8)}};
SOLID.psign=1;SOLID.p_psign=1;NMX.psign='sign';NMX.pbirch='birch';
function pSign(x,y,w,h,tx,k){setFP({t:'psign',tx,k},x,y,w,h)}
/* birches: white trunks, black marks, bare thin branches under snow */
DRAWX.pbirch=function(o,x,y){const h=hs(x*.13,y*.17),tx=x+7,lean=h<.3?-1:h>.7?1:0;pShadow(x+2,y+13,12,3);
 for(let j=0;j<30;j++){const dx=Math.round(lean*j/14);W_(tx+dx,y+14-j,2,1,'#e6e4da');W_(tx+dx+1,y+14-j,1,1,'#b8b6ac')}
 for(const j of[2,6,10,13,18,22,26]){const dx=Math.round(lean*j/14);W_(tx+dx,y+14-j,2,1,'#2a2a28');if(j%3==0)W_(tx+dx+(j&1?-1:2),y+14-j,1,1,'#2a2a28')}
 const br=(j,len,dir)=>{for(let k=0;k<len;k++)W_(tx+Math.round(lean*j/14)+(dir>0?2:-1)+dir*k,y+14-j-Math.floor(k*.7),1,1,'#7a766a')};
 br(20,9,-1);br(24,10,1);br(16,7,1);br(27,6,-1);br(12,6,-1);br(29,4,1);
 for(const[a,b]of[[-6,-16],[-3,-14],[5,-20],[8,-16],[-8,-9]])W_(tx+a,y+b+10,3,1,'#eef3f8')};
STYSKIP.pbirch=1;SOLID.pbirch=1;SOLID.p_pbirch=1;
/* the ground-floor signs of the big buildings, street plates, the stele — placed once after the map is built */
function priSigns(){const r=prRng(PRIS+31);
 const row=(x,y,w,h,tx,k)=>{for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++){const o=ob[yy*W+xx];if(o&&(o.t=='door'||o.t=='oup'||o.t=='odn'))return}pSign(x,y,w,h,tx,k)};
 const face=(x,y,w,h,L,R_,kL,kR)=>{const hx=x+Math.floor(w/2),wy=y+h-1;if(L)row(hx-8,wy,5,1,L,kL);if(R_)row(hx+4,wy,5,1,R_,kR)};
 face(118,152,36,28,'ЭНЕРГЕТИК','ДВОРЕЦ КУЛЬТУРЫ',0,0);
 face(76,152,34,24,'ШКОЛА №3','УЧИТЬСЯ!',4,0);
 face(76,106,32,24,'УНИВЕРМАГ','ПРИПЯТЬ',1,1);
 face(214,104,32,24,'МСЧ-126','БОЛЬНИЦА',4,4);
 face(214,154,32,24,'ПОЛЕСЬЕ','ГОСТИНИЦА',0,2);
 face(216,196,30,18,'ДЕТСКИЙ САД','«КЛЮЧИК»',1,1);
 /* checkpoint huts */
 row(168,286,3,1,'ШТАБ',0);row(144,286,3,1,'СКЛАД',2);
 /* the city stele on the road in from the south */
 for(let yy=265;yy<268;yy++)for(let xx=165;xx<172;xx++)ob[yy*W+xx]=null;pSign(165,266,7,2,'ПРИПЯТЬ|1970',3);
 /* street plates on the north pavements of the crossings */
 const EW=['ПР. ЛЕНИНА','УЛ. КУРЧАТОВА','УЛ. ЭНТУЗИАСТОВ','УЛ. ДРУЖБЫ НАРОДОВ'],NS=['УЛ. ГЕРОЕВ СТАЛИНГРАДА','БУЛЬВАР СТРОИТЕЛЕЙ'];
 let k=0;for(const[y,w]of PRS.ew)for(const[x,ww]of PRS.ns){const px=x-6,py=y-1;if(px<4)continue;let ok=true;for(let xx=px;xx<px+5;xx++)if(ob[py*W+xx]||map[py*W+xx]!=14)ok=false;if(ok)pSign(px,py,5,1,EW[k%EW.length],2);k++}
 k=0;for(const[x,w]of PRS.ns)for(const[y,ww]of PRS.ew){const px=x+w+1,py=y-1;let ok=true;for(let xx=px;xx<px+5;xx++)if(ob[py*W+xx]||map[py*W+xx]!=14)ok=false;if(ok)pSign(px,py,5,1,NS[k%NS.length],2);k++}
 /* birches replace a third of the trees outside the red forest */
 for(let i=0;i<W*H;i++){const o=ob[i];if(o&&o.t=='tree'){const x=i%W,y=(i/W)|0;if(!(x<110&&y<118)&&hs(x*.31,y*.27)<.38)ob[i]={t:'pbirch',hp:6}}}}
{const f=priFinish;priFinish=function(r){const o=f.apply(this,arguments);try{priSigns()}catch(e){console.warn('signs',e)}return o}}
/* Ukrainian and Russian names for the people of the Zone */
{const nm={'Vaszilij Pavlics':'Vaszil Pavlovics','Gyenyiszov':'Gyenyiszov','Tyimofej':'Bohdan','Szása':'Olekszandr','Anyiszja':'Szvitlana','Gyima':'Mikola'};
 const f=priPeople;priPeople=function(){f.apply(this,arguments);for(const n of NPCS)if(nm[n.nm])n.nm=nm[n.nm]}}
