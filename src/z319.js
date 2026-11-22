/* ===== z319: Pripjaty has no top-down view — a 2.5D first-person (FPS) and a 2.5D third-person (TPS) view; X (or the round button) switches between them. TPS: orbit camera over the right shoulder (looks up and down), a direction-aware animated sprite ===== */
let TPS=false;try{TPS=localStorage.getItem('pxc_tps')=='1'}catch(e){}
const tpsOn=()=>!!(PRI&&TPS&&typeof fvA=='function'&&fvA());
function tpsSet(v){TPS=!!v;try{localStorage.setItem('pxc_tps',TPS?'1':'0')}catch(e){}
 const h=LANG=='hu';try{say(TPS?(h?'Harmadik személyű nézet (TPS)':'Third-person view (TPS)'):(h?'Belső nézet (FPS)':'First-person view (FPS)'))}catch(e){}}
/* never top-down: the view button and X only change between FPS and TPS */
{const ft=fvToggle;fvToggle=function(){if(!PRI)return ft.apply(this,arguments);if(!FPV||!fvCan()){FPV=true;return}tpsSet(!TPS)}}
{const up=update;update=function(dt){up(dt);if(PRI&&state=='play'&&!FPV&&typeof THREE!='undefined'&&typeof V3!='undefined'&&V3&&V3.ok)FPV=true}}
addEventListener('keydown',e=>{if(e.code!='KeyX'||e.repeat||!PRI||state!='play'||e.ctrlKey||e.altKey||e.metaKey)return;
 const a=document.activeElement;if(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName))return;if(!fvA()||fvUI())return;fvToggle()},true);
const TPA={dir:'b',ph:0,lean:0,run:0,t:0,D:2.0};
/* which way the sprite faces, relative to the camera: away when walking forward, toward you when backing up, sideways when strafing */
function tpaDir(){const mx=FV.mvx||0,my=FV.mvy||0;if(Math.hypot(mx,my)<.1)return;
 const yaw=FV.yaw,f=mx*-Math.sin(yaw)+my*-Math.cos(yaw),s=mx*Math.cos(yaw)+my*-Math.sin(yaw),af=Math.abs(f),as=Math.abs(s);let d=TPA.dir;
 if(d=='b'||d=='f'){if(as>af*1.4)d=s>0?'r':'l';else d=f>=0?'b':'f'}else{if(af>as*1.4)d=f>=0?'b':'f';else d=s>0?'r':'l'}TPA.dir=d}
/* the camera: orbits the player's head — behind, a little above, over the right shoulder — pulled in by walls */
{const fc=fvCam;fvCam=function(){const tg=fc.apply(this,arguments),c=V3.cam;FV.eye=FV.eye||new THREE.Vector3();FV.eye.copy(c.position);
 if(!tpsOn()){FV.tpD=null;return tg}
 const dt=FV.dt||.016,yaw=FV.yaw,p=Math.max(-1.05,Math.min(1.05,FV.pitch||0)),cp=Math.cos(p),sp=Math.sin(p),
  fx=-Math.sin(yaw)*cp,fy=sp,fz=-Math.cos(yaw)*cp,rx=Math.cos(yaw),rz=-Math.sin(yaw),px=P.x/T,pz=P.y/T,run=(FV.spd>78&&K.ShiftLeft)?1:0;
 TPA.run+=(run-TPA.run)*Math.min(1,dt*4);const D=2.0+.3*TPA.run,SH=.95;
 let ok=.35;for(let t=.35;t<=D;t+=.12){const k=t/D,x=px-fx*t+rx*SH*k,z=pz-fz*t+rz*SH*k;if(blocked(x*T,z*T,3))break;ok=t}
 if(FV.tpD==null)FV.tpD=ok;FV.tpD+=(ok-FV.tpD)*Math.min(1,dt*(ok<FV.tpD?18:4));const d=FV.tpD,k=d/D,
  cx=px-fx*d+rx*SH*k,cz=pz-fz*d+rz*SH*k;let cy=FV.eye.y-fy*d+.12*k;const gr=v3HW(cx*T,cz*T)+.22;if(cy<gr)cy=gr;
 c.position.set(cx,cy,cz);c.rotation.set(p-.03,yaw,0);const fov=72+6*TPA.run;if(Math.abs(c.fov-fov)>.01){c.fov=fov;c.updateProjectionMatrix()}return tg}}
/* aiming: what lies under the crosshair is the target; shots leave the player's eyes toward it */
{const fa=fvAim;fvAim=function(){if(!tpsOn())return fa.apply(this,arguments);const c=V3.cam;c.updateMatrixWorld();const p0=c.position.clone(),q0=c.quaternion.clone(),
  dir=new THREE.Vector3(0,0,-1).applyQuaternion(q0),tg=p0.clone().addScaledVector(dir,(FV.tpD||2)+12);
  c.position.copy(FV.eye);c.lookAt(tg);try{return fa.apply(this,arguments)}finally{c.position.copy(p0);c.quaternion.copy(q0)}}}
/* the player is a 2.5D sprite: it faces the way it moves relative to the view */
{const dp=drawP;drawP=function(){if(!tpsOn())return dp.apply(this,arguments);tpaDir();const fx=P.fx,fy=P.fy,d=TPA.dir;P.fx=d=='l'?-1:d=='r'?1:0;P.fy=d=='b'?-1:d=='f'?1:0;try{return dp.apply(this,arguments)}finally{P.fx=fx;P.fy=fy}}}
{const fw=fvWeapon;fvWeapon=function(){if(PRI&&TPS)return;return fw.apply(this,arguments)}}
/* show the sprite and a blob shadow only while the frame is rendered; the sprite leans into a strafe and kicks back when firing */
{const vd=v3Draw;v3Draw=function(){try{if(V3&&V3.R&&!V3.R._tp){const R=V3.R,r0=R.render;R.render=function(s,c){let e=null;
   try{if(s===V3.S&&tpsOn()&&!(typeof CNS!="undefined"&&CNS.on)){e=V3.ents.get('P');const dt=FV.dt||.016;
     if(e&&e.m){e.m.visible=true;e.m.castShadow=false;const mv=Math.hypot(FV.mvx||0,FV.mvy||0)>.1,tl=(TPA.dir=='r'?-.07:TPA.dir=='l'?.07:0)*(mv?1:0)-(TPA.run>.4?.03:0);TPA.lean+=(tl-TPA.lean)*Math.min(1,dt*9);
      const kick=P.cd>0?Math.min(1,P.cd/.45):0;e.m.rotation.z=TPA.lean;e.m.scale.y*=1+(!mv?Math.sin(performance.now()/620)*.006:0)-kick*.03;e.m.scale.x*=1+kick*.02}
     if(!FV.psh){const m=new THREE.Mesh(new THREE.CircleGeometry(.42,14),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.32,depthWrite:false,fog:false}));m.rotation.x=-Math.PI/2;m.renderOrder=2;V3.S.add(m);FV.psh=m}
     FV.psh.visible=true;FV.psh.position.set(P.x/T,v3HW(P.x,P.y)+.03,P.y/T)}else if(FV.psh)FV.psh.visible=false}catch(x){}
   try{if(s===V3.S&&PRI&&fvOn())tiltEnts()}catch(x){}
   try{return r0.apply(this,arguments)}finally{if(e&&e.m)e.m.visible=false}};R._tp=1}}catch(e){}
  return vd.apply(this,arguments)}}
/* sprites lean back from a camera that is above them (and forward when it is below), so they are never seen foreshortened */
function tiltEnts(){const cam=V3.cam;for(const[k,e]of FV.ent){const m=e.m;if(!m||!m.visible)continue;if(m.rotation.order!=='YXZ')m.rotation.order='YXZ';
 const dx=cam.position.x-m.position.x,dz=cam.position.z-m.position.z,h=Math.hypot(dx,dz)||1,el=Math.atan2(cam.position.y-(m.position.y+.7),h);m.rotation.x=Math.max(-.9,Math.min(.9,-el*.85))}}
