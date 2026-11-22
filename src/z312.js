/* ===== z312: a permanent Eastern-European winter: snow on the ground, falling snow, a cold grey-blue grade ===== */
{const so=seasonIdx;seasonIdx=function(){return PRI?3:so.apply(this,arguments)}}
{const sw=seaWinter;seaWinter=function(){return PRI?!inD:sw.apply(this,arguments)}}
{const w0=weather;weather=function(){if(!PRI)return w0.apply(this,arguments);const c=cb;cb=1;try{return w0.apply(this,arguments)}finally{cb=c}}}
{const up=update;update=function(dt){up(dt);if(PRI&&state=='play'){PRI.wt=(PRI.wt||0)+dt;if(!inD)wea=Math.sin(PRI.wt/140)>.82?2:1;else wea=0}}}
/* snow cover that replaces the jungle-grass ground texture */
function priSnowTex(){const c=document.createElement('canvas');c.width=c.height=288;const x=c.getContext('2d'),r=prRng(7041);x.fillStyle='#dfe7ee';x.fillRect(0,0,288,288);
 for(let y=0;y<288;y+=2)for(let xx=0;xx<288;xx+=2){const a=Math.sin(xx/288*6.2832*3+Math.sin(y/288*6.2832*2)*1.7)*Math.sin(y/288*6.2832*4)*.5+.5,v=r();let col=null;
  if(a>.74)col='rgba(255,255,255,.6)';else if(a<.2)col='rgba(150,170,198,.3)';
  if(v<.05)col='rgba(168,184,206,.55)';else if(v<.08)col='rgba(250,252,255,.75)';
  if(col){x.fillStyle=col;x.fillRect(xx,y,2,2)}}
 for(let i=0;i<150;i++){const px=Math.floor(r()*284),py=Math.floor(r()*280);x.fillStyle=r()<.5?'#8d8b62':'#6e6a48';x.fillRect(px,py,1,3+Math.floor(r()*3));if(r()<.5)x.fillRect(px+2,py+1,1,3)}
 for(let i=0;i<26;i++){const px=Math.floor(r()*280),py=Math.floor(r()*284);x.fillStyle='rgba(88,76,56,.45)';x.fillRect(px,py,3,2)}
 return c}
{const p0=pats;pats=function(x){const r=p0(x);if(PRI){if(!r._G2)r._G2=x.createPattern(priSnowTex(),'repeat');r.G=r._G2}return r}}
/* snow on the pavements and a thin slush on the asphalt */
{const gt=gTile;gTile=function(tx,ty,now){gt(tx,ty,now);if(!PRI||inD||inC||tx<0||ty<0||tx>=W||ty>=H)return;const m=map[ty*W+tx];if(m!=3&&m!=14)return;const cov=m==14?.55:.2,px=tx*T,py=ty*T;
 for(let cy=0;cy<4;cy++)for(let cx=0;cx<4;cx++){const h=hs(tx*4+cx+.37,ty*4+cy+.71)*.6+hs(Math.floor((tx*4+cx)/3)+.2,Math.floor((ty*4+cy)/3)+.9)*.4;if(h<cov){const v=hs(tx*4+cx+5.1,ty*4+cy+2.3);W_(px+cx*4,py+cy*4,4,4,m==14?(v<.6?'#e4ebf1':'#d2dde7'):(v<.6?'rgba(196,206,218,.55)':'rgba(150,164,180,.45)'))}}}}
