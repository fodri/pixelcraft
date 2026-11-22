/* ===== z304: panel blocks — 30 x 11 slabs with eight flats on every floor, a stair hall, a dead lift; the floors above are built when you climb ===== */
const PRL={w:30,h:11,cr:5,nP:[7,14,22],sP:[7,13,16,22],nF:[[1,6],[8,13],[15,21],[23,28]],sF:[[1,6],[8,12],[17,21],[23,28]],hall:[14,15]};
/* wall decals: posters on the faces of interior walls and on facades */
{const d=drawObj;drawObj=function(o,x,y){const r=d.apply(this,arguments);if(o&&o.dec!=null&&(o.t=='twall'||o.t=='sblock')){try{if(o.dec>=10){const k=o.dec-10;if(k==0){pStar(pSX(x+8),pSY(y+9),5,PGOLD)}else if(k==1){pHS(pSX(x+8),pSY(y+9),9,PGOLD)}else if(k==2){W_(x+2,y+3,12,9,PRED);pStar(pSX(x+8),pSY(y+8),3.5,PGOLD)}}else DRAWX.ppos({k:o.dec},x,y-1)}catch(e){}}return r}}
function pzZ(x,y,v){zs.push({id:nid(),x:x*T+8,y:y*T+8,hp:VHP[v]||6,a:0,t:0,vx:0,vy:0,z:1,v,pri:1,st79:1})}
/* flat furniture layouts: 3 rows, row 0 next to the door, row 2 at the far wall */
const PFL=[["....c.","b.t.NN","b...v."],["..c.t.","kb.b.N","kb.b.N"],["...o..","..tc.f","s.k..."],["....d.","ZZ..D.","ZZ.k.w"],["c.....","t.b.k.","..b.kv"],["..o..f","t..c.s","w.u..."]];
function priFlat(x,y,fw,fd,up,li,r,wreck){const L=PFL[li%PFL.length],mir=r()<.5;
 const at=(u,v)=>{const X=x+(mir?fw-1-u:u),Y=up?y+(fd-1-v):y+v;return[X,Y]};
 for(let v=0;v<fd;v++)for(let u=0;u<Math.min(fw,6);u++){let ch=L[v][u];if(ch=='.'||ch==' ')continue;if(r()<(wreck||.25)&&!'bNZu'.includes(ch)){continue}
  const[X,Y]=at(u,v);if(!pFreeAny(X,Y))continue;const i=Y*W+X;
  switch(ch){
   case 'b':if(v<fd-1&&L[v+1][u]=='b'){const[X2,Y2]=at(u,v+1);const yy=Math.min(Y,Y2);if(pFreeAny(X,yy)&&pFreeAny(X,yy+1))setFP({t:'bed',hp:10,r:0,on:true},X,yy,1,2)}break;
   case 'N':if(u<5&&L[v][u+1]=='N'){const[X2]=at(u+1,v);const xx=Math.min(X,X2);if(pFreeAny(xx,Y)&&pFreeAny(xx+1,Y))setFP({t:'sofa',hp:10,r:0,c:Math.floor(r()*4)},xx,Y,2,1)}break;
   case 'Z':ob[i]={t:'pcot'};break;case 'D':ob[i]={t:'pdoll',k:Math.floor(r()*3)};break;
   case 't':ob[i]={t:'mtab',k:1};break;case 'c':ob[i]={t:'ochair',r:up?2:0};break;case 'k':ob[i]={t:'cabinet'};break;case 'v':ob[i]={t:'tv'};break;
   case 'o':ob[i]={t:'stove'};break;case 'f':ob[i]={t:'fridge'};break;case 's':ob[i]={t:'sink'};break;case 'w':ob[i]={t:'wc'};break;case 'u':ob[i]={t:'tub'};break;case 'd':ob[i]={t:'desk'};break;case 'p':ob[i]={t:'pot'};break}}
 if(r()<.28){const[X,Y]=at(Math.floor(r()*fw),Math.floor(r()*fd));if(pFreeAny(X,Y))ob[Y*W+X]={t:r()<.6?'papers':'bones'}}}
function pFreeAny(x,y){return x>=1&&y>=1&&x<W-1&&y<H-1&&!ob[y*W+x]}
/* one floor of a slab, written into the current map at (x0,y0). world: the ground floor outdoors; f>0: an upper floor (separate map) */
function priFloor(x0,y0,f,rec,world,r){const L=PRL,w=L.w,h=L.h,top=!world&&f>rec.n;
 for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){const X=x0+xx,Y=y0+yy,i=Y*W+X,edge=xx==0||yy==0||xx==w-1||yy==h-1;
  if(top){map[i]=14;ob[i]=edge?{t:'rail'}:null;continue}
  map[i]=edge?3:16;ob[i]=null;if(world)bm[i]=3;
  if(edge){const corner=(xx==0||xx==w-1)&&(yy==0||yy==h-1);ob[i]={t:'sblock',hp:200};if(!corner&&(yy==0||yy==h-1)&&xx%3==1&&r()<.8)ob[i]={t:'win',hp:200,open:r()<.2};else if(yy==h-1&&!corner&&xx%5==2&&r()<.7&&world)ob[i].dec=10+Math.floor(r()*3)}}
 if(top){for(let k=0;k<5;k++){const X=x0+3+Math.floor(r()*(w-6)),Y=y0+2+Math.floor(r()*(h-4));if(pFreeAny(X,Y))ob[Y*W+X]={t:r()<.5?'acu':'antenna'}}
  /* the stair head that leads back down */{const X=x0+14,Y=y0+5;ob[Y*W+X]={t:'odn',b:rec._b,f}}return}
 const wall=(x,y)=>{ob[(y0+y)*W+x0+x]={t:'twall',hp:120}};
 /* partitions and doors */
 for(let xx=1;xx<w-1;xx++){wall(xx,4);wall(xx,6)}
 for(const c of L.nP)for(let yy=1;yy<=3;yy++)wall(c,yy);for(const c of L.sP)for(let yy=7;yy<=9;yy++)wall(c,yy);
 /* the hall: the open strip at columns 14-15 from the corridor to the front */
 for(const c of L.hall){ob[(y0+6)*W+x0+c]=null}
 const door=(x,y)=>{ob[(y0+y)*W+x0+x]={t:'door',open:false}};
 for(const[a,b]of L.nF)door(a+Math.floor((b-a)/2),4);for(const[a,b]of L.sF)door(a+Math.floor((b-a)/2),6);
 /* decals on the faces of the corridor-side walls */
 for(let xx=2;xx<w-2;xx++){const o=ob[(y0+4)*W+x0+xx];if(o&&o.t=='twall'&&r()<.28)o.dec=Math.floor(r()*5);const o2=ob[(y0+6)*W+x0+xx];if(o2&&o2.t=='twall'&&r()<.26)o2.dec=Math.floor(r()*5)}
 /* flats */
 const n=L.nF.length;let k=0;
 for(const[a,b]of L.nF){priFlat(x0+a,y0+1,b-a+1,3,true,(rec.sd+f*3+k++)%PFL.length,r,.2+(f?.1:0))}
 for(const[a,b]of L.sF){priFlat(x0+a,y0+7,b-a+1,3,false,(rec.sd+f*5+k++)%PFL.length,r,.2+(f?.1:0))}
 /* corridor lights */
 for(let xx=3;xx<w-2;xx+=6){const X=x0+xx,Y=y0+5;if(!ob[Y*W+X])ob[Y*W+X]={t:'fix',fk:r()<.4?1:0}}
 /* the stair hall: stairs up and down, the dead lift, the way out on the ground floor */
 const hx=x0+14,hy=y0+8,b=rec._b;
 if(world){ob[hy*W+hx]={t:'oup',n:rec.n,bw:w,bh:h,mi:0,sd:rec.sd,k:'pan',b:hy*W+hx,f:0};rec._b=hy*W+hx;ob[hy*W+hx+1]={t:'elev'};ob[(y0+h-1)*W+x0+14]={t:'door',open:false};ob[(y0+h-1)*W+x0+15]={t:'door',open:false}}
 else{ob[hy*W+hx]={t:'odn',b,f};if(f<rec.n)ob[hy*W+hx+1]={t:'oup',b,f};else ob[hy*W+hx+1]={t:'elev'};ob[(y0+8)*W+x0+14].f=f}
 /* the "they": a few per floor */
 if(!world){const nz=2+Math.floor(r()*3);for(let q=0,t=0;q<nz&&t<80;t++){const X=x0+2+Math.floor(r()*(w-4)),Y=y0+1+Math.floor(r()*(h-2));if(ob[Y*W+X]||map[Y*W+X]!=16)continue;const v=[0,0,1,2,3,4][Math.floor(r()*6)];pzZ(X,Y,v);q++}}}
{const go=genOF;genOF=function(rec,f){if(!rec||rec.k!='pan')return go.apply(this,arguments);loot=[];map=new Uint8Array(W*H).fill(5);ob=new Array(W*H).fill(null);deer=[];zs=[];priFloor(40,40,f,rec,false,R)}}
/* a slab on the map. x,y = top-left; floors above: n */
function pzSlab(x,y,n,r){const L=PRL;const rec={n,sd:Math.floor(r()*997),k:'pan',mi:0};priFloor(x,y,0,rec,true,r);BLD.push({x,y,w:L.w,h:L.h,rf:'prp',sd:1});PRB.slabs.push({x,y,n});
 /* the yard in front and behind: a path, a bench, junk */
 for(let xx=x+12;xx<x+18;xx++)for(let yy=y+L.h;yy<y+L.h+3;yy++){pT(xx,yy,14);pO(xx,yy,null)}
 for(let xx=x-1;xx<x+L.w+1;xx++){if(pIn(xx,y-1)&&!ob[(y-1)*W+xx]&&r()<.18)ob[(y-1)*W+xx]={t:'bush',b:0,r:0}}
 if(r()<.8)pO(x+10,y+L.h+2,{t:'trash',hp:99});if(r()<.7)pO(x+19,y+L.h+2,{t:'pflag'});}
