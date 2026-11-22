/* ===== z321: the rest of the scenery turns pixel-3D too — birches and tall grass are built from little cubes, every other leftover flat prop is extruded from its own sprite (pixel by pixel); only people, monsters and flat wall/ground decals stay flat ===== */
const PXM=new THREE.MeshLambertMaterial({vertexColors:true});
const PXSKIP={pdoll:1,bones:1,papers:1,pnote:1,pframe:1,pcal:1};
const PXFLAT={plane:1,hpad:1,pcrack:1};
const PXTHIN={pflag:1,pbanner:1};
const PXC=new Map();
function pxPix(s){let c=PXC.get(s.cv);if(c&&c.w===s.cv.width&&c.h===s.cv.height)return c;const cv=s.cv,w=cv.width,h=cv.height,d=cv.getContext('2d').getImageData(0,0,w,h).data,px=new Array(w*h).fill(null),cnt=new Map();let n=0,x0=999,x1=-1;
 for(let j=0;j<h;j++)for(let i=0;i<w;i++){const k=(j*w+i)*4;if(d[k+3]>=170){px[j*w+i]=new THREE.Color(d[k]/255,d[k+1]/255,d[k+2]/255);n++;if(i<x0)x0=i;if(i>x1)x1=i;const q=(d[k]>>4)+','+(d[k+1]>>4)+','+(d[k+2]>>4);cnt.set(q,(cnt.get(q)||0)+1)}}
 const pal=[...cnt.entries()].sort((a,b)=>b[1]-a[1]).slice(0,6).map(([q])=>{const t=q.split(',').map(v=>(+v*16+8)/255);return new THREE.Color(t[0],t[1],t[2])});
 c={w,h,px,n,bw:Math.max(1,x1-x0+1),pal};PXC.set(s.cv,c);return c}
/* a sprite pushed out into a slab of little cubes */
function pxExtrude(A,o,tx,ty,gy,s){const c=pxPix(s);if(!c.n||c.n>1800)return false;
 const u=1/16,dp=PXTHIN[o.t]?2:Math.max(2,Math.min(9,Math.round(c.bw*.55))),zc=ty+(o.fh||1)*.5,z0=zc-dp*u/2,z1=zc+dp*u/2,at=(i,j)=>(i>=0&&j>=0&&i<c.w&&j<c.h)?c.px[j*c.w+i]:null;
 for(let j=0;j<c.h;j++)for(let i=0;i<c.w;i++){const col=c.px[j*c.w+i];if(!col)continue;const x0=tx+i*u-1,x1=x0+u,y1=gy+(c.h-j)*u,y0=y1-u;
  fvFace(A,[x0,y1,z1],[x1,y1,z1],[x1,y0,z1],[x0,y0,z1],[0,0,1],col,.95);fvFace(A,[x1,y1,z0],[x0,y1,z0],[x0,y0,z0],[x1,y0,z0],[0,0,-1],col,.72);
  if(!at(i,j-1))fvFace(A,[x0,y1,z0],[x1,y1,z0],[x1,y1,z1],[x0,y1,z1],[0,1,0],col,1.1);
  if(!at(i-1,j))fvFace(A,[x0,y1,z0],[x0,y1,z1],[x0,y0,z1],[x0,y0,z0],[-1,0,0],col,.78);
  if(!at(i+1,j))fvFace(A,[x1,y1,z1],[x1,y1,z0],[x1,y0,z0],[x1,y0,z1],[1,0,0],col,.84)}
 return true}
/* road paint, helipad marks, cracks: the sprite laid flat on the ground */
function pxFlat(A,o,tx,ty,gy,s){const c=pxPix(s);if(!c.n)return false;const u=1/16,fh=o.fh||1,y=gy+.03;
 for(let j=0;j<c.h;j++)for(let i=0;i<c.w;i++){const col=c.px[j*c.w+i];if(!col)continue;const x0=tx+i*u-1,x1=x0+u,z1=ty+fh-(c.h-j-1)*u,z0=z1-u;fvFace(A,[x0,y,z0],[x1,y,z0],[x1,y,z1],[x0,y,z1],[0,1,0],col,1.12)}
 return true}
/* a bare winter birch: white trunk with dark marks, thin branches, a little snow */
function pxBirch(A,tx,ty,gy){const r=k=>aHash(tx*13+k,ty*7+k*3,91+k),cx=tx+.5+(r(1)-.5)*.35,cz=ty+.5+(r(2)-.5)*.35,Ht=4+r(3)*1.4,tw=.07+r(4)*.02,
  white=new THREE.Color(.9,.89,.84),dark=new THREE.Color(.1,.1,.1),br=new THREE.Color(.4,.35,.29),sn=new THREE.Color(.95,.97,1),lx=(r(5)-.5)*.05,lz=(r(6)-.5)*.05;
 let x=cx,z=cz,y=0;const seg=.5;
 while(y<Ht){const hh=Math.min(seg,Ht-y),k=y*7|0,sd=r(60+k)<.5?1:-1;fvCube(A,x-tw,gy+y,z-tw,x+tw,gy+y+hh,z+tw,white.clone().multiplyScalar(.93+r(70+k)*.12),null,false);
  if(r(80+k)<.75){const my=gy+y+.08+r(90+k)*.25;if(r(100+k)<.5)fvCube(A,x-tw*1.08,my,z+(sd>0?0:-tw*1.08),x+tw*1.08,my+.04+r(110+k)*.04,z+(sd>0?tw*1.08:0),dark,null,false);else fvCube(A,x+(sd>0?0:-tw*1.08),my,z-tw*1.08,x+(sd>0?tw*1.08:0),my+.04+r(120+k)*.04,z+tw*1.08,dark,null,false)}
  y+=hh;x+=lx*hh;z+=lz*hh}
 fvCube(A,x-tw*.8,gy+Ht,z-tw*.8,x+tw*.8,gy+Ht+.14,z+tw*.8,br,null,false);
 const nb=5+Math.floor(r(7)*3);for(let b=0;b<nb;b++){const a=r(130+b)*Math.PI*2,by=Ht*(.42+r(140+b)*.5),ca=Math.cos(a),sa=Math.sin(a),n=3+Math.floor(r(150+b)*2);let bx=cx+lx*by,bz=cz+lz*by,yy=by;
  for(let k=0;k<n;k++){const w=.035-k*.004;bx+=ca*.16;bz+=sa*.16;yy+=.1+(k>1?.06:0);fvCube(A,bx-w,gy+yy,bz-w,bx+w,gy+yy+.07,bz+w,br,null,false);
   if(r(160+b*5+k)<.4)fvCube(A,bx-w*1.4,gy+yy+.07,bz-w*1.4,bx+w*1.4,gy+yy+.1,bz+w*1.4,sn,null,false)}}}
/* a tuft of dry winter grass: bent blades, a few with snow on top */
function pxGrass(A,s,tx,ty,gy){const pal=pxPix(s).pal,r=k=>aHash(tx*17+k,ty*11+k*5,57+k),n=5+Math.floor(r(0)*4),sn=new THREE.Color(.93,.95,.98);if(!pal.length)return;
 for(let i=0;i<n;i++){const bx=tx+.12+r(i*3+1)*.76,bz=ty+.12+r(i*3+2)*.76,hh=.32+r(i*3+3)*.42,w=.04+r(i+50)*.012,col=pal[Math.floor(r(i+9)*pal.length)%pal.length].clone().multiplyScalar(.85+r(i+19)*.3),lean=(r(i+20)-.5)*.16,lz=(r(i+30)-.5)*.16;
  fvCube(A,bx-w,gy,bz-w,bx+w,gy+hh*.55,bz+w,col,null,false);fvCube(A,bx-w+lean,gy+hh*.55,bz-w+lz,bx+w+lean,gy+hh,bz+w+lz,col,null,false);
  if(r(i+40)<.3)fvCube(A,bx-w+lean,gy+hh,bz-w+lz,bx+w+lean,gy+hh+.035,bz+w+lz,sn,null,false)}}
/* called for every leftover flat sprite while a chunk is built */
function pxConv(ch,b,o,tx,ty){if(!ch._px||PXSKIP[o.t])return false;const A=ch._px,gy=b.y;
 if(o.t=='fix'){const y0=gy+1.8,c1=new THREE.Color(.86,.85,.78);fvCube(A,tx+.12,y0,ty+.4,tx+.88,y0+.06,ty+.6,c1,null,false);fvCube(A,tx+.16,y0-.012,ty+.43,tx+.84,y0,ty+.57,new THREE.Color(.98,.97,.88),null,false);return true}
 if(PXFLAT[o.t]){const s0=v3Sprite(o,tx,ty);return pxFlat(A,o,tx,ty,gy,s0)}
 if(o.t=='pbirch'){pxBirch(A,tx,ty,gy);return true}
 const s=v3Sprite(o,tx,ty);if(o.t=='tgrass'){pxGrass(A,s,tx,ty,gy);return true}
 return pxExtrude(A,o,tx,ty,gy,s)}
function pxFlush(ch){const A=ch._px;ch._px=null;if(!A||!A.P.length)return;const m=new THREE.Mesh(v3Geo(A.P,A.N,A.U,A.C),PXM);m.castShadow=false;m.receiveShadow=false;m.userData.px=1;ch.og.add(m)}
