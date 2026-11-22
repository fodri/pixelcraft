/* ===== z303: the map of Pripjaty — a fixed, hand-planned city (320 x 320 tiles): forest, river, the south checkpoint, the avenue, the main street,
   panel-block slabs you can walk into floor by floor, the amusement park with the ferris wheel, the central square ===== */
const PRIST=[160,291];
var PRB=null;
const pIn=(x,y)=>x>=1&&y>=1&&x<W-1&&y<H-1;
const pT=(x,y,m)=>{if(pIn(x,y))map[y*W+x]=m};
const pO=(x,y,o)=>{if(pIn(x,y))ob[y*W+x]=o};
function pzRect(x,y,w,h,m){for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)pT(xx,yy,m)}
function pClr(x,y,w,h){for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)if(pIn(xx,yy))ob[yy*W+xx]=null}
function pBm(x,y,w,h,b){for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)if(pIn(xx,yy))bm[yy*W+xx]=b}
const pFree=(x,y)=>pIn(x,y)&&!ob[y*W+x];
/* the grid of streets (x, y, width) */
const PRS={ew:[[98,4],[140,8],[186,4],[224,4]],ns:[[112,4],[204,4]],ave:[156,8,148,262],ring:[[66,4],[250,4]],x0:66,x1:254,y0:58,y1:262};
function priBuild(){
 const r=prRng(PRIS);W=H=320;
 map=new Uint8Array(W*H);ob=new Array(W*H).fill(null);bm=new Uint8Array(W*H);el=new Uint8Array(W*H);holes=new Map();
 ISC=[[W>>1,H>>1,0]];BLD=[];CARS=[];NPCS.length=0;zs=[];deer=[];loot=[];arrs=[];try{corpses.length=0}catch(e){}MINES={};try{TOWNS105.length=0}catch(e){}
 PRB={slabs:[],places:{},floors:{},npc:{},zones:[]};
 /* ----- ground: grass with forest thickening away from the city ----- */
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x,dx=(x-160)/112,dy=(y-160)/118,d=Math.hypot(dx,dy),wob=ns(x*.3,y*.3,8)*.2;
  const rv=x>=286+Math.round(ns(y*.15,3,5)*9-4);
  if(rv){map[i]=x>=292+Math.round(ns(y*.15,3,5)*9-4)?1:2;continue}
  const pt=Math.max(.02,Math.min(.62,(d-.84+wob)*.95+.03));
  const v=r();if(v<pt)ob[i]={t:'tree',hp:6};else if(v<pt+.03)ob[i]={t:r()<.5?'bush':'shrub',b:0,r:0};else if(v<pt+(d<.9?.06:.12))ob[i]={t:'tgrass'};}
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(x<8||y<8||x>=W-8||y>=H-8){const i=y*W+x;if(map[i]==0)ob[i]={t:'tree',hp:6}}}
 /* ----- streets: asphalt with a worn sidewalk; everything in the way is cleared ----- */
 const road=(x,y,w,h)=>{pzRect(x-2,y-2,w+4,h+4,14);pClr(x-2,y-2,w+4,h+4);};
 const asph=(x,y,w,h)=>{pzRect(x,y,w,h,3);pClr(x,y,w,h)};
 for(const[y,w]of PRS.ew)road(PRS.x0,y,PRS.x1-PRS.x0,w);for(const[x,w]of PRS.ns)road(x,PRS.y0,w,PRS.y1-PRS.y0);road(PRS.ave[0],PRS.ave[2],PRS.ave[1],PRS.ave[3]-PRS.ave[2]);for(const[x,w]of PRS.ring)road(x,PRS.y0,w,PRS.y1-PRS.y0);
 for(const[y,w]of PRS.ew)asph(PRS.x0,y,PRS.x1-PRS.x0,w);for(const[x,w]of PRS.ns)asph(x,PRS.y0,w,PRS.y1-PRS.y0);asph(PRS.ave[0],PRS.ave[2],PRS.ave[1],PRS.ave[3]-PRS.ave[2]);for(const[x,w]of PRS.ring)asph(x,PRS.y0,w,PRS.y1-PRS.y0);
 /* the road in from the south checkpoint */
 road(158,262,4,40);asph(158,262,4,40);
 /* the checkpoint yard */
 pzRect(138,276,44,22,14);pClr(138,276,44,22);
 priRoadLife(r);
 priBlocks(r);
 priCheckpoint(r);
 priPark(r);
 priPlaza(r);
 priLandmarks(r);
 priFinish(r);
}
/* road marks, wrecks, grass pushing through the asphalt */
DRAWX.plane=function(o,x,y){if(o.v)W_(x+7,y+2,2,5,o.c||'#c8c0a0');else W_(x+2,y+7,5,2,o.c||'#c8c0a0')};
DRAWX.pcrack=function(o,x,y){W_(x+3,y+4,1,4,'#2a2c2e');W_(x+4,y+8,3,1,'#2a2c2e');W_(x+7,y+8,1,4,'#2a2c2e');W_(x+9,y+11,3,1,'#2a2c2e');W_(x+11,y+3,1,3,'#2a2c2e')};
function priRoadLife(r){
 const dash=(x0,y0,x1,y1,vert)=>{for(let k=0;;k+=3){const x=vert?x0:x0+k,y=vert?y0+k:y0;if(vert?y>y1:x>x1)break;if(pIn(x,y)&&!ob[y*W+x]&&map[y*W+x]==3)ob[y*W+x]={t:'plane',v:vert?1:0}}};
 for(const[y,w]of PRS.ew){dash(PRS.x0,y+Math.floor(w/2)-(w>4?0:0),PRS.x1,y,false)}
 for(const[x,w]of PRS.ns)dash(x+Math.floor(w/2),PRS.y0,x,PRS.y1,true);dash(PRS.ave[0]+3,PRS.ave[2],0,PRS.ave[3],true);dash(160,262,0,300,true);
 /* grass and cracks pushing through */
 for(let y=PRS.y0;y<PRS.y1+40;y++)for(let x=PRS.x0;x<PRS.x1;x++){const i=y*W+x;if(map[i]!=3||ob[i])continue;const v=r();if(v<.035)ob[i]={t:'tgrass'};else if(v<.06)ob[i]={t:'pcrack'};else if(v<.068)ob[i]={t:'bush',b:0,r:0}}
 /* abandoned cars on the streets */
 const cars=[];for(const[y,w]of PRS.ew)for(let x=PRS.x0+6;x<PRS.x1-6;x+=9+Math.floor(r()*20)){if(r()<.55)cars.push([x,y+(r()<.5?0:w-1)])}
 for(const[x,w]of PRS.ns)for(let y=PRS.y0+6;y<PRS.y1-6;y+=10+Math.floor(r()*22)){if(r()<.5)cars.push([x+(r()<.5?0:w-1),y])}
 for(let y=PRS.ave[2]+6;y<PRS.ave[3]-6;y+=11+Math.floor(r()*18))if(r()<.6)cars.push([PRS.ave[0]+(r()<.5?0:7),y]);
 for(const[x,y]of cars){if(pFree(x,y)&&map[y*W+x]==3)ob[y*W+x]={t:'wreck',r:Math.floor(r()*4),hp:30}}
 /* wide street lamps */
 for(const[y,w]of PRS.ew)for(let x=PRS.x0+4;x<PRS.x1;x+=14){const yy=y-1;if(pFree(x,yy))ob[yy*W+x]={t:'slamp',b:r()<.5?1:0,fk:r()<.3?1:0}}
}
function priBlocks(r){
 const slabs=[[169,66],[169,81],[77,192],[77,208],[121,192],[169,192],[169,208],[77,232],[77,246],[121,232],[121,246],[214,232],[214,246]];
 for(const[x,y]of slabs){pzClr(x-2,y-2,34,17);pzSlab(x,y,4+Math.floor(r()*2),r)}
 /* yards: benches, playgrounds, garages, a scatter of junk */
 for(const[x,y]of slabs){const yx=x+2+Math.floor(r()*20),yy=y+PRL.h+1;if(pFreeAny(yx,yy+1))setFP({t:'bench',hp:10,r:0,on:true},yx,yy+1,2,1)}
 priYard(r)}
function pzClr(x,y,w,h){pClr(x,y,w,h)}
function priYard(r){
 /* playgrounds */
 const pg=[[100,214],[143,214],[188,214],[100,252],[143,252]];
 for(const[x,y]of pg){pzRect(x,y,7,6,0);pClr(x,y,7,6);for(let i=0;i<5;i++){const k=['psw2','pslide','psand','pcrnd','psw2'][i];pO(x+(i%3)*2,y+Math.floor(i/3)*3,{t:k})}}
}
function priCheckpoint(r){
 const cx=160;
 /* the barrier and the guard booth on the road south of the town */
 pO(cx-3,284,{t:'hpad',k:1});
 for(const x of[156,157,162,163]){pO(x,285,{t:'sbag',hp:20})}
 pO(cx-2,285,{t:'pflag'});pO(cx+2,285,{t:'pbanner',k:0});
 /* the contractor's hut (west) and the equipment shed (east) */
 const hut=(x,y,w,h,rf)=>{shell(x,y,w,h,'sblock',12,{win:1});pO(x+Math.floor(w/2),y+h-1,{t:'door',open:false});BLD.push({x,y,w,h,rf:rf||'house',c:2});};
 hut(143,278,11,9);hut(167,278,11,9);
 PRB.places.hutW={x:143,y:278,w:11,h:9};PRB.places.hutE={x:167,y:278,w:11,h:9};
 /* inside the contractors' hut: a board, a table, a stove, bunks */
 setFP({t:'bed',hp:10,r:0,on:true},145,280,1,2);setFP({t:'bed',hp:10,r:0,on:true},146,280,1,2);pO(149,280,{t:'stove'});pO(150,281,{t:'pot'});pO(148,284,{t:'mtab',k:1});pO(147,284,{t:'ochair',r:3});pO(149,284,{t:'ochair',r:1});pO(152,280,{t:'cabinet'});pO(152,283,{t:'counter',k:1});
 PRB.places.board={x:151,y:285};
 for(let x=145;x<153;x+=3)ob[278*W+x]=ob[278*W+x]&&ob[278*W+x].t=='win'?ob[278*W+x]:ob[278*W+x];
 /* the store shed: crates, lockers */
 pO(170,280,{t:'rcrate',hp:99});pO(171,280,{t:'rcrate',hp:99});pO(173,280,{t:'cabinet'});pO(174,280,{t:'cabinet'});pO(175,282,{t:'counter',k:1});pO(170,284,{t:'tire'},0);
 PRB.places.shop={x:174,y:284};
 /* some sandbags, a watchtower, fences either side of the road */
 for(let x=138;x<182;x++){if(x>=156&&x<=163)continue;if(pFree(x,276))pO(x,276,{t:'fence',hp:60});if(pFree(x,297)&&r()<.6)pO(x,297,{t:'fence',hp:60})}
 for(const x of[139,180])pO(x,278,{t:'tower',s:1,hp:99});
}
function priFinish(r){
 for(let i=0;i<W*H;i++){if(map[i]==3&&ob[i]&&ob[i].t=='tree')ob[i]=null}
 PRB.cx=160;PRB.cy=160;
 /* keep the start free */
 pClr(PRIST[0]-2,PRIST[1]-2,5,5);
}
function priOpening(){try{say(prT('Pripjaty, 1986. Mintha megállt volna az idő.','Pripjat, 1986. As if time had stopped.'))}catch(e){}}
