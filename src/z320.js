/* ===== z320: free look — no click needed: moving the mouse turns the view, the cursor is hidden over the picture, and pushing it to a screen edge keeps turning ===== */
const FLK={out:true,edge:0};
const FLK_V=e=>FLK.out?0:(e<-.9?(-e-.9)/.1:e>.96?(e-.96)/.04:0);
document.addEventListener('mouseleave',()=>{FLK.out=true});document.addEventListener('mouseenter',()=>{FLK.out=false});
addEventListener('blur',()=>{FLK.out=true});addEventListener('mousemove',()=>{FLK.out=false},true);
{const up=update;update=function(dt){
  if(PRI&&state=='play'&&!TCH.on&&typeof FV!='undefined'){FV.noLock=true;if(FV.lock)fvUnlock()}
  const r=up.apply(this,arguments);
  try{if(PRI&&state=='play'&&!TCH.on&&fvLive()){
    const ex=Math.max(-1,Math.min(1,(ms.x/VW-.5)*2)),a=FLK.out?0:Math.max(0,Math.abs(ex)-.84)/.16;FLK.edge=a;
    if(a>0)FV.yaw-=Math.sign(ex)*a*2.4*(dt||.016);
    const ey=Math.max(-1,Math.min(1,(ms.y/VH-.5)*2)),ay=FLK_V(ey);if(ay)FV.pitch=Math.max(-1.2,Math.min(1.2,FV.pitch-Math.sign(ey)*ay*1.5*(dt||.016)));
    const hide=!FLK.out&&ms.y>26&&ms.y<VH-40;if(C.style.cursor!==(hide?'none':''))C.style.cursor=hide?'none':''
  }else if(C.style.cursor==='none')C.style.cursor=''}catch(e){}
  return r}}
{const t0=toast112;toast112=function(a,b){if(PRI&&!TCH.on&&/FPS/.test(String(a)))b=LANG=='hu'?'Egér: szabad nézelődés (kattintás nélkül, a szélén tovább fordul) · W A S D: mozgás · Shift: futás · X: FPS / TPS':'Mouse: free look (no click needed, edges keep turning) · WASD: move · Shift: run · X: FPS / TPS';return t0.call(this,a,b)}}
