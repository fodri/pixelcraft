/* ===== z317: the first-person view is a 2.5D (DOOM-style) one: low-res pixels, turn left-right only, no looking up/down, no jumping, crouching or sliding, no sun shadows or lens flare ===== */
{const vd=v3Draw;v3Draw=function(){try{if(V3&&V3.R){const R=V3.R;
   if(PRI&&!R._p25){const rs=R.setSize;R._rs=rs;R.setSize=function(w,h,u){if(PRI&&fvA()){const k=Math.min(1,320/w);w=Math.max(1,Math.round(w*k));h=Math.max(1,Math.round(h*k))}return rs.call(this,w,h,u)};R._p25=1;R.setPixelRatio(1);V3.w=-1}
   else if(!PRI&&R._p25){R.setSize=R._rs;R._p25=0;V3.w=-1}}}catch(e){}
  return vd.apply(this,arguments)}}
{const ff=fvFrame;fvFrame=function(){if(PRI){FV.pitch=-.03;FV.vy=0;FV.hz=0;FV.cr=0;FV.slide=0;FV.fl=0;FV.flW=0}ff.apply(this,arguments)}}
{const fs=fvShadows;fvShadows=function(on){return fs.call(this,on&&!PRI)}}
{const t0=toast112;toast112=function(a,b){if(PRI&&/FPS/.test(String(a)))b=LANG=='hu'?'Egér / nyilak: fordulás · W A S D: mozgás · Shift: futás · F4: felülnézet':'Mouse / arrows: turn · WASD: move · Shift: run · F4: top-down';return t0.call(this,a,b)}}
