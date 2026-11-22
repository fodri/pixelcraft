/* ===== z305: the amusement park, the central square and the big public buildings (palace of culture, school, department store, hospital, hotel, kindergarten) ===== */
function priPark(r){
 const x0=116,y0=102,x1=203,y1=138;
 /* the park: grass, paved paths, a fence all round with the main gate in the south */
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const i=y*W+x;map[i]=0;ob[i]=r()<.05?{t:'tree',hp:6}:r()<.05?{t:'bush',b:0,r:0}:r()<.1?{t:'tgrass'}:null}
 const path=(ax,ay,bx,by)=>{const dx=Math.sign(bx-ax),dy=Math.sign(by-ay);let x=ax,y=ay;for(let k=0;k<400;k++){for(let u=0;u<2;u++){pT(x+(dy?u:0),y+(dx?u:0),14);pO(x+(dy?u:0),y+(dx?u:0),null)}if(x==bx&&y==by)break;if(x!=bx)x+=dx;else y+=dy}};
 path(159,139,159,106);path(122,121,198,121);path(122,121,122,132);path(198,121,198,132);path(122,132,196,132);path(140,121,140,110);path(178,121,178,110);
 /* the plaza of the wheel */
 pzRect(150,112,20,16,14);pClr(150,112,20,16);
 /* fence */
 for(let x=x0;x<=x1;x++){if(x>=157&&x<=161)continue;pO(x,y1+1<H?y1:y1,{t:'fence',hp:60});pO(x,y0,{t:'fence',hp:60})}for(let y=y0;y<=y1;y++){pO(x0,y,{t:'fence',hp:60});pO(x1,y,{t:'fence',hp:60})}
 /* gate: two pillars and the arch with the red star */
 pClr(156,135,8,4);pzRect(155,135,9,4,14);setFP({t:'pgate'},156,137,1,1);pO(162,137,{t:'ppil'});
 pO(155,138,{t:'pflag'});pO(164,138,{t:'pbanner',k:0});
 /* the ferris wheel, carousel, bumper cars, swings, kiosk */
 pClr(150,125,12,5);setFP({t:'pwheel',ph:.4},158,126,3,2);PRB.places.wheel={x:159,y:121};
 pClr(126,122,5,4);setFP({t:'pcar2'},127,123,3,2);
 pClr(170,122,8,6);setFP({t:'pbump'},171,123,6,4);
 pClr(183,124,6,4);setFP({t:'pswing'},184,125,3,2);
 pClr(139,131,4,3);setFP({t:'pkiosk'},140,130,2,2);
 pClr(176,106,8,4);setFP({t:'pbill',k:2},177,106,4,2);
 /* benches, lamp posts, the shooting gallery, trash */
 const bn=[[148,124],[168,124],[134,128],[186,119],[130,114],[190,112]];for(const[x,y]of bn){pClr(x,y,2,1);setFP({t:'bench',hp:10,r:0,on:true},x,y,2,1)}
 for(const[x,y]of[[152,118],[166,118],[152,130],[166,130],[140,126],[178,126]])pO(x,y,{t:'slamp',b:1,fk:r()<.5?1:0});
 for(const[x,y]of[[146,132],[172,132],[132,119]])pO(x,y,{t:'trash',hp:99});
 for(const[x,y]of[[119,124],[196,124]])pO(x,y,{t:'pframe'});
 /* pavilions: ticket booth & shooting gallery as small shells */
 const hut=(x,y,w,h,c)=>{shell(x,y,w,h,'sblock',12,{win:1});pO(x+Math.floor(w/2),y+h-1,{t:'door',open:false});BLD.push({x,y,w,h,rf:'prk',c});for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)bm[yy*W+xx]=3};
 pClr(146,107,8,6);hut(146,107,8,6,1);pO(148,109,{t:'counter',k:1});pO(150,109,{t:'cabinet'});pO(152,110,{t:'pdoll',k:0});
 pClr(124,106,9,6);hut(124,106,9,6,1);pO(126,108,{t:'counter',k:1});pO(128,108,{t:'rcrate',hp:99});pO(130,108,{t:'cabinet'});
 /* the "they" in the park */
 for(const[x,y]of[[150,110],[170,112],[130,120]])pzZ(x,y,0);
 /* a monument by the east gate and a red banner row along the fence */
 for(let x=122;x<198;x+=14)if(pFree(x,y1-1))pO(x,y1-1,{t:'pbanner',k:r()<.5?0:1});
}
function priPlaza(r){
 const x0=164,y0=148,x1=203,y1=185;
 pzRect(x0,y0,x1-x0+1,y1-y0+1,14);pClr(x0,y0,x1-x0+1,y1-y0+1);
 /* checker of darker slabs */
 for(let y=y0+2;y<=y1-2;y+=4)for(let x=x0+2;x<=x1-2;x+=4)pzRect(x,y,2,2,3);
 pzRect(172,157,24,18,0);pClr(172,157,24,18);
 for(let y=157;y<175;y++)for(let x=172;x<196;x++){const o=r();if(o<.06)pO(x,y,{t:"tgrass"})}
 setFP({t:'pmon'},182,160,3,3);PRB.places.monument={x:183,y:162};
 for(const[x,y]of[[176,158],[188,158],[176,172],[188,172],[172,166],[194,166]])pO(x,y,{t:'pflag'});
 for(const[x,y]of[[168,152],[198,152],[168,182],[198,182]]){pO(x,y,{t:'slamp',b:1,fk:r()<.5?1:0})}
 for(const[x,y]of[[166,156],[200,156],[166,178],[200,178]]){pClr(x,y,2,1);setFP({t:'bench',hp:10,r:0,on:true},x,y,2,1)}
 pClr(168,148,4,2);setFP({t:'pbill',k:0},168,148,4,2);pClr(190,184,4,2);setFP({t:'pbill',k:3},190,184,4,2);
 for(const[x,y]of[[171,163],[195,163],[181,175]])pO(x,y,{t:'pbust'});
 pClr(165,176,3,2);setFP({t:'pkiosk'},165,176,2,2);
 pClr(158,148,4,3);setFP({t:'pbusst'},156,150,3,2);
}
/* ---------- buildings with a corridor and rooms ---------- */
function pzFurn(theme,x,y,w,h,up,r){const at=(u,v)=>[x+u,up?y+h-1-v:y+v];const put=(u,v,o)=>{const[X,Y]=at(u,v);if(X>=x&&X<x+w&&Y>=y&&Y<y+h&&pFreeAny(X,Y))ob[Y*W+X]=o};const fp=(u,v,o,fw,fh)=>{const[X,Y]=at(u,v);const ax=X,ay=up&&fh>1?Y-fh+1:Y;if(ax+fw<=x+w&&ay>=y&&ay+fh<=y+h){let ok=1;for(let yy=0;yy<fh;yy++)for(let xx=0;xx<fw;xx++)if(!pFreeAny(ax+xx,ay+yy))ok=0;if(ok)setFP(o,ax,ay,fw,fh)}};
 const decal=(k)=>{const wy=y-1;const X=x+Math.floor(w/2),o=ob[wy*W+X];if(o&&(o.t=='twall'||o.t=='sblock'))o.dec=k};
 const far=h-1;
 if(theme=='class'){decal(r()<.8?5:2);for(let v=1;v<far;v+=2)for(let u=1;u<w-1;u+=2){put(u,v,{t:'desk'});put(u,v-1,{t:'ochair',r:up?0:2})}put(0,far,{t:'desk'});put(w-1,far,{t:'cabinet'});if(r()<.5)put(w-1,1,{t:'pgasm'})}
 else if(theme=='ward'){decal(r()<.5?4:3);for(let u=0;u<w-1;u+=3)fp(u,Math.max(0,h-2),{t:'bed',hp:10,r:0,on:true},1,2);put(w-1,0,{t:'cabinet'});put(w-1,far,{t:'bshelf'});if(r()<.5)put(1,0,{t:'fridge'})}
 else if(theme=='office'){decal(r()<.5?0:3);put(1,far,{t:'desk'});put(1,Math.max(0,far-1),{t:'ochair',r:up?0:2});put(w-1,far,{t:'cabinet'});put(w-1,Math.max(0,far-1),{t:'bshelf'});if(w>4)put(3,far,{t:'copier'})}
 else if(theme=='kinder'){decal(r()<.5?2:4);for(let u=0;u<w-1;u+=2)put(u,far,{t:'pcot'});put(1,1,{t:'pdoll',k:0});put(w-2,1,{t:'pdoll',k:1});put(Math.floor(w/2),Math.max(0,far-1),{t:'mtab',k:1});for(let u=1;u<w-1;u+=3)if(r()<.7)put(u,0,{t:'pdoll',k:Math.floor(r()*3)})}
 else if(theme=='hotel'){decal(r()<.6?2:1);fp(0,Math.max(0,h-2),{t:'bed',hp:10,r:0,on:true},1,2);fp(1,Math.max(0,h-2),{t:'bed',hp:10,r:0,on:true},1,2);put(w-1,far,{t:'tv'});put(w-1,0,{t:'cabinet'});put(Math.floor(w/2),Math.max(0,far-1),{t:'mtab',k:1})}
 else if(theme=='canteen'){for(let u=1;u<w-1;u+=3)for(let v=1;v<h;v+=2){put(u,v,{t:'mtab',k:1});put(u-1,v,{t:'ochair',r:3});put(u+1,v,{t:'ochair',r:1})}put(0,far,{t:'counter',k:2});put(1,far,{t:'stove'})}
 else if(theme=='lib'){decal(3);for(let u=0;u<w;u+=2)put(u,far,{t:'bshelf'});for(let u=1;u<w-1;u+=3)put(u,Math.floor(far/2),{t:'mtab',k:1})}
 if(r()<.3)put(Math.floor(r()*w),Math.floor(r()*h),{t:'papers'})}
function pzBuilding(x,y,w,h,rf,themes,r,opt){opt=opt||{};
 pClr(x-2,y-2,w+4,h+5);shell(x,y,w,h,'sblock',16,{win:1});for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)bm[yy*W+xx]=3;
 const cy=y+Math.floor(h/2),hx=x+Math.floor(w/2);
 /* partitions along the corridor, doors, front doors */
 for(let xx=x+1;xx<x+w-1;xx++){pO(xx,cy-1,{t:'twall',hp:120});pO(xx,cy+1,{t:'twall',hp:120})}
 const rooms=[];const rw=opt.rw||7;
 const row=(ya,yb,xa,xb,up)=>{const n=Math.max(1,Math.round((xb-xa+1)/rw)),wd=(xb-xa+1)/n;for(let k=0;k<n;k++){const a=Math.round(xa+k*wd),b=Math.round(xa+(k+1)*wd)-1;if(k>0)for(let yy=ya;yy<=yb;yy++)pO(a-1,yy,{t:'twall',hp:120});rooms.push({x:k>0?a:a,y:ya,w:(k>0?b-a+1:b-a+1)-(k<n-1?1:0),h:yb-ya+1,up,dx:a+Math.floor(((k<n-1?b-1:b)-a)/2)})}};
 row(y+1,cy-2,x+1,x+w-2,true);
 /* south rooms: left and right of a 3-wide hall */
 row(cy+2,y+h-2,x+1,hx-2,false);row(cy+2,y+h-2,hx+2,x+w-2,false);
 for(const rm of rooms){const ty=rm.up?cy-1:cy+1;pO(rm.dx,ty,{t:'door',open:false});pzFurn(themes[Math.floor(r()*themes.length)],rm.x,rm.y,Math.max(2,rm.w),rm.h,rm.up,r)}
 /* the hall in front: floor, front door, lobby things */
 for(let yy=cy+2;yy<y+h-1;yy++)for(let xx=hx-1;xx<=hx+1;xx++){pO(xx,yy,null)}
 for(let xx=hx-1;xx<=hx+1;xx++)pO(xx,cy+1,null);
 pO(hx,y+h-1,{t:'door',open:false});pO(hx-1,y+h-1,{t:'win',hp:200,open:false});pO(hx+1,y+h-1,{t:'win',hp:200,open:false});
 pO(hx-1,y+h-3,{t:'pbust'});pO(hx+1,y+h-3,{t:'pbust'});
 for(let xx=x+3;xx<x+w-2;xx+=6)if(pFreeAny(xx,cy))ob[cy*W+xx]={t:'fix',fk:r()<.4?1:0};
 for(let xx=x+2;xx<x+w-2;xx+=9)if(pFreeAny(xx,cy))ob[cy*W+xx]={t:'pbanner',k:r()<.5?0:1};
 /* steps and banners outside */
 pzRect(hx-2,y+h,5,2,14);pClr(hx-2,y+h,5,2);pO(hx-3,y+h,{t:'pflag'});pO(hx+3,y+h,{t:'pbanner',k:0});
 BLD.push({x,y,w,h,rf,sd:1});
 /* the "they" inside */
 const nz=opt.z||3;for(let q=0,t=0;q<nz&&t<100;t++){const X=x+2+Math.floor(r()*(w-4)),Y=y+1+Math.floor(r()*(h-2));if(ob[Y*W+X]||map[Y*W+X]!=16)continue;pzZ(X,Y,[0,0,1,2,3,4][Math.floor(r()*6)]);q++}}
/* an open-plan hall: department store / palace hall */
function pzHall(x,y,w,h,rf,r,kind){pClr(x-2,y-2,w+4,h+5);shell(x,y,w,h,'sblock',16,{win:1});for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)bm[yy*W+xx]=3;
 const hx=x+Math.floor(w/2);pO(hx,y+h-1,{t:'door',open:false});pO(hx+1,y+h-1,{t:'door',open:false});
 for(let xx=hx-3;xx<=hx+4;xx+=1)if(xx!=hx&&xx!=hx+1&&pFreeAny(xx,y+h-1)&&xx%2)ob[(y+h-1)*W+xx]={t:'win',hp:200,open:false};
 if(kind=='store'){
  for(let yy=y+3;yy<y+h-5;yy+=3)for(let xx=x+3;xx<x+w-3;xx++){if(xx%7==0)continue;if(r()<.9)pO(xx,yy,{t:'gshelf',k:(xx+yy)%3})}
  for(let xx=x+2;xx<x+w-2;xx+=3)pO(xx,y+h-3,{t:'counter',k:1});pO(x+1,y+h-3,{t:'cart'});pO(x+w-2,y+h-4,{t:'cart'});
  for(let yy=y+1;yy<y+3;yy++)for(let xx=x+1;xx<x+w-1;xx+=2)pO(xx,yy,{t:'rcrate',hp:99});
  for(let xx=x+3;xx<x+w-3;xx+=8){const o=ob[y*W+xx];if(o&&o.t=='sblock')o.dec=1}}
 else if(kind=='palace'){
  const sx=x+3,sw=w-6;pzRect(x+1,y+1,w-2,5,12);for(let xx=x+1;xx<x+w-1;xx++){const o=ob[y*W+xx];if(o&&o.t=='sblock'&&(xx-x)%3!=1)o.dec=13;pO(xx,y+1,null)}
  for(let xx=x+2;xx<x+w-2;xx+=4)pO(xx,y+1,{t:'pframe'});pO(hx,y+3,{t:'pbust'});pO(x+2,y+4,{t:'pbanner',k:0});pO(x+w-3,y+4,{t:'pbanner',k:1});
  for(let yy=y+8;yy<y+h-5;yy+=2)for(let xx=x+3;xx<x+w-3;xx+=3){if(xx>=hx-1&&xx<=hx+1)continue;if(r()<.9)setFP({t:'bench',hp:10,r:0,on:true},xx,yy,2,1)}
  for(let xx=x+2;xx<x+w-2;xx+=8)pO(xx,y+h-3,{t:'pcal'})}
 for(let xx=x+3;xx<x+w-2;xx+=7)for(let yy=y+4;yy<y+h-3;yy+=7)if(pFreeAny(xx,yy))ob[yy*W+xx]={t:'fix',fk:r()<.4?1:0};
 pzRect(hx-2,y+h,6,2,14);pClr(hx-2,y+h,6,2);pO(hx-3,y+h,{t:'pflag'});pO(hx+4,y+h,{t:'pbanner',k:0});
 BLD.push({x,y,w,h,rf,sd:1});
 const nz=kind=='palace'?5:4;for(let q=0,t=0;q<nz&&t<100;t++){const X=x+2+Math.floor(r()*(w-4)),Y=y+2+Math.floor(r()*(h-4));if(ob[Y*W+X]||map[Y*W+X]!=16)continue;pzZ(X,Y,[0,0,1,2,3,4][Math.floor(r()*6)]);q++}}
function priLandmarks(r){
 pzHall(118,152,36,28,'prc',r,'palace');PRB.places.palace={x:136,y:166};
 pzBuilding(76,152,34,24,'prs',['class','class','class','office','lib'],r,{rw:7,z:4});PRB.places.school={x:93,y:166};
 pzHall(76,106,32,24,'prm',r,'store');PRB.places.store={x:92,y:118};
 pzBuilding(214,104,32,24,'prh',['ward','ward','ward','office'],r,{rw:7,z:4});PRB.places.hospital={x:230,y:114};
 pzBuilding(214,154,32,24,'prx',['hotel','hotel','hotel','canteen'],r,{rw:6,z:3});PRB.places.hotel={x:230,y:166};
 pzBuilding(216,196,30,18,'prk',['kinder','kinder','canteen'],r,{rw:7,z:3});PRB.places.kinder={x:230,y:206};
}
