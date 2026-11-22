/* ===== z319: Pripjaty has no top-down view any more — only a 2.5D first-person (FPS) and a 2.5D third-person (TPS) view; X (or the round button) switches between them ===== */
let TPS=false;try{TPS=localStorage.getItem('pxc_tps')=='1'}catch(e){}
const tpsOn=()=>!!(PRI&&TPS&&typeof fvA=='function'&&fvA());
function tpsSet(v){TPS=!!v;try{localStorage.setItem('pxc_tps',TPS?'1':'0')}catch(e){}
 const h=LANG=='hu';try{say(TPS?(h?'Harmadik személyű nézet (TPS)':'Third-person view (TPS)'):(h?'Belső nézet (FPS)':'First-person view (FPS)'))}catch(e){}}
/* never top-down: the view button and X only change between FPS and TPS */
{const ft=fvToggle;fvToggle=function(){if(!PRI)return ft.apply(this,arguments);if(!FPV||!fvCan()){FPV=true;return}tpsSet(!TPS)}}
{const up=update;update=function(dt){up(dt);if(PRI&&state=='play'&&!FPV&&typeof THREE!='undefined'&&typeof V3!='undefined'&&V3&&V3.ok)FPV=true}}
addEventListener('keydown',e=>{if(e.code!='KeyX'||e.repeat||!PRI||state!='play'||e.ctrlKey||e.altKey||e.metaKey)return;
 const a=document.activeElement;if(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName))return;if(!fvA()||fvUI())return;fvToggle()},true);
/* the camera: behind and a bit above the player, over the right shoulder, pulled in by walls */
{const fc=fvCam;fvCam=function(){const tg=fc.apply(this,arguments),c=V3.cam;FV.eye=FV.eye||new THREE.Vector3();FV.eye.copy(c.position);
 if(!tpsOn()){FV.tpD=null;return tg}
 const yaw=FV.yaw,fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw),px=P.x/T,pz=P.y/T,D=2.0,SH=.95;
 let ok=.35;for(let t=.35;t<=D;t+=.12){const k=t/D,x=px-fx*t+rx*SH*k,z=pz-fz*t+rz*SH*k;if(blocked(x*T,z*T,3))break;ok=t}
 const dt=FV.dt||.016;if(FV.tpD==null)FV.tpD=ok;FV.tpD+=(ok-FV.tpD)*Math.min(1,dt*(ok<FV.tpD?18:4));const d=FV.tpD,k=d/D;
 c.position.set(px-fx*d+rx*SH*k,FV.eye.y+.14*k+.06,pz-fz*d+rz*SH*k);c.rotation.set(-.07,yaw,0);
 if(Math.abs(c.fov-74)>.01){c.fov=74;c.updateProjectionMatrix()}return tg}}
/* aiming: what lies under the crosshair is the target; shots leave the player's eyes toward it */
{const fa=fvAim;fvAim=function(){if(!tpsOn())return fa.apply(this,arguments);const c=V3.cam;c.updateMatrixWorld();const p0=c.position.clone(),q0=c.quaternion.clone(),
  dir=new THREE.Vector3(0,0,-1).applyQuaternion(q0),tg=p0.clone().addScaledVector(dir,(FV.tpD||2)+12);
  c.position.copy(FV.eye);c.lookAt(tg);try{return fa.apply(this,arguments)}finally{c.position.copy(p0);c.quaternion.copy(q0)}}}
/* the player is a 2.5D sprite seen from behind */
{const dp=drawP;drawP=function(){if(!tpsOn())return dp.apply(this,arguments);const fx=P.fx,fy=P.fy;P.fx=0;P.fy=-1;try{return dp.apply(this,arguments)}finally{P.fx=fx;P.fy=fy}}}
{const fw=fvWeapon;fvWeapon=function(){if(PRI&&TPS)return;return fw.apply(this,arguments)}}
/* show the sprite and a blob shadow only while the frame is rendered */
{const vd=v3Draw;v3Draw=function(){try{if(V3&&V3.R&&!V3.R._tp){const R=V3.R,r0=R.render;R.render=function(s,c){let e=null;
   try{if(s===V3.S&&tpsOn()){e=V3.ents.get('P');if(e&&e.m){e.m.visible=true;e.m.castShadow=false}
     if(!FV.psh){const m=new THREE.Mesh(new THREE.CircleGeometry(.42,14),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.32,depthWrite:false,fog:false}));m.rotation.x=-Math.PI/2;m.renderOrder=2;V3.S.add(m);FV.psh=m}
     FV.psh.visible=true;FV.psh.position.set(P.x/T,v3HW(P.x,P.y)+.03,P.y/T)}else if(FV.psh)FV.psh.visible=false}catch(x){}
   try{return r0.apply(this,arguments)}finally{if(e&&e.m)e.m.visible=false}};R._tp=1}}catch(e){}
  return vd.apply(this,arguments)}}
