/* ===== z315: first-person (3D) view in Pripjaty ===== */
/* no wild horse herds in the dead city */
{const hg=hrsGen219;hrsGen219=function(){if(PRI){HRS219=[];HID219=1;MNT219=null;return}return hg.apply(this,arguments)}}
{const up=update;update=function(dt){up(dt);if(PRI&&HRS219.length&&state=='play')HRS219=[]}}
/* landmarks and signs get their own upright planes in the 3D view: the wheel (it keeps turning), the park arch and every Cyrillic sign, readable from the front */
const SP3={psign:{L:0,R:0,T:0,bk:0,y:1.35}},TL3=new Map();
{const bo=v3BuildObjs;v3BuildObjs=function(ch){bo.apply(this,arguments);
 try{if(!PRI)return;const x0=ch.cx*GQS,y0=ch.cy*GQS;
  for(let y=0;y<GQS;y++)for(let x=0;x<GQS;x++){const tx=x0+x,ty=y0+y,o=ob[ty*W+tx];if(!o||!SP3[o.t])continue;
   const sp=SP3[o.t],s=v3Sprite(o,tx,ty),fw=o.fw||1,fh=o.fh||1;
   for(const m of ch.og.children.slice())if(m.material===s.mat||(m.geometry&&m.geometry===s.gm))ch.og.remove(m);
   const cw=fw*T+sp.L+sp.R,chh=fh*T+sp.T,key=tx+','+ty;let e=TL3.get(key);
   if(!e||e.cv.width!==cw){const cv=document.createElement('canvas');cv.width=cw;cv.height=chh;const tex=v3Tex(cv),mat=new THREE.MeshLambertMaterial({map:tex,alphaTest:o.t=='psign'?.5:.06,side:THREE.FrontSide});if(o.t!='psign'){tex.generateMipmaps=false;tex.minFilter=THREE.LinearFilter;tex.magFilter=THREE.NearestFilter}e={cv,tex,mat,t:0};TL3.set(key,e)}
   e.o=o;e.tx=tx;e.ty=ty;e.L=sp.L;e.Tm=sp.T;e.wh=o.t=='pwheel';v3Paint(e.cv,tx*T-sp.L,ty*T-sp.T,()=>{drawObj(o,tx*T,ty*T)});e.tex.needsUpdate=true;
   const wu=cw/16,hu=chh/16,by=v3H(tx,ty)+(o.t=='psign'?(o.hy!=null?o.hy:sp.y):sp.y),mk=(z,ry)=>{const ge=new THREE.PlaneGeometry(wu,hu);ge.translate(ry?-(wu/2-sp.L/16):wu/2-sp.L/16,hu/2,0);const m=new THREE.Mesh(ge,e.mat);m.position.set(tx+(ry?fw:0),by,z);m.rotation.y=ry?Math.PI:0;m.castShadow=false;m.receiveShadow=false;ch.og.add(m);return m};
   mk(ty+fh+.03,0);if(sp.bk&&!(o.hy>=1))mk(ty-.03,1)}
 }catch(er){console.warn('sp3',er)}}}
/* the winter haze is thick, but the landmarks have to show through it; a blizzard still closes in */
{const vl=v3Light;v3Light=function(tg){vl.apply(this,arguments);if(PRI&&!inD&&wea!=2&&V3.S.fog){V3.S.fog.near*=1.7;V3.S.fog.far*=2.2}}}
