/* ===== z317: the first-person view is a 2.5D (DOOM-style) one: low-res pixels, turn left-right only, no looking up/down, no jumping, crouching or sliding, no sun shadows or lens flare ===== */
const PRES=1280;
const prRatio=()=>Math.min(1,PRES/Math.max(1,C.clientWidth));
{const vd=v3Draw;v3Draw=function(){try{if(V3&&V3.R){const R=V3.R;
   if(PRI&&!R._p25){R._gp=R.getPixelRatio;R._sp=R.setPixelRatio;
     R.setPixelRatio=function(r){this._rq=r;if(PRI&&fvA())r=prRatio();return this._sp.call(this,r)};
     R.getPixelRatio=function(){return(PRI&&fvA()&&this._rq!=null)?this._rq:this._gp.call(this)};R._p25=1;V3.w=-1}
   else if(!PRI&&R._p25){R.setPixelRatio=R._sp;R.getPixelRatio=R._gp;R._p25=0;V3.w=-1}
   if(R._p25&&PRI&&fvA()){const want=prRatio();if(Math.abs(R._gp.call(R)-want)>.004){R._sp.call(R,want);V3.w=-1}}}}catch(e){}
  return vd.apply(this,arguments)}}
{const ff=fvFrame;fvFrame=function(){if(PRI){FV.pitch=Math.max(-1.05,Math.min(1.05,FV.pitch));FV.bob=0;FV.vy=0;FV.hz=0;FV.cr=0;FV.slide=0;FV.fl=0;FV.flW=0}ff.apply(this,arguments)}}
{const fs=fvShadows;fvShadows=function(on){return fs.call(this,on&&!PRI)}}
{const t0=toast112;toast112=function(a,b){if(PRI&&/FPS/.test(String(a)))b=LANG=='hu'?'Egér / nyilak: fordulás · W A S D: mozgás · Shift: futás · X: FPS / TPS nézet':'Mouse / arrows: turn · WASD: move · Shift: run · X: FPS / TPS view';return t0.call(this,a,b)}}
