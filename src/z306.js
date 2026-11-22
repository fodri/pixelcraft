/* ===== z306: a drab, worn ground — plain grass (no jungle rosettes/twigs), dark cracked asphalt ===== */
{const p0=pats;pats=function(x){const r=p0(x);if(!r._G0){r._G0=r.G;r._G1=x.createPattern(texCanvas(['g0','g1','g3','g4','g0','g1','g3','g4','g5','g0','g1','g3','g0','g1'],6,3),'repeat')}r.G=PRI?r._G1:r._G0;return r}}
{const gt=gTile;gTile=function(tx,ty,now){gt(tx,ty,now);if(!PRI||inD||inC||tx<0||ty<0||tx>=W||ty>=H)return;if(map[ty*W+tx]!=3||bm[ty*W+tx]==3&&0)return;const px=tx*T,py=ty*T,h=hs(tx,ty);
  W_(px,py,T,T,'rgba(26,28,34,.62)');
  if(h>.55)W_(px+Math.floor(h*60)%11+1,py+Math.floor(h*97)%11+2,4+Math.floor(h*13)%5,1,'#1b1d22');
  if(h<.2){const a=Math.floor(h*130)%10+2;W_(px+a,py+3,1,6,'#202228');W_(px+a+1,py+8,2,1,'#202228')}
  if(h>.9)W_(px+5,py+6,3,2,'#585a58');
  if((tx*3+ty*7)%13==0)W_(px+3,py+11,9,1,'rgba(150,150,140,.18)')}}
{const f=priFinish;priFinish=function(r){const o=f.apply(this,arguments);try{GROUND.clear();GQC.clear&&0}catch(e){}return o}}
/* the tall landmark sprites are much larger than the sprite cache margins: draw them raw */
try{STYSKIP.pwheel=1;STYSKIP.pgate=1}catch(e){}
/* no berry bushes in the Zone: they look like a game, not like 1986 */
{const f=priFinish;priFinish=function(r){const o=f.apply(this,arguments);for(let i=0;i<W*H;i++){const q=ob[i];if(q&&(q.t=='bush'))ob[i]=null}try{GQC.clear&&0}catch(e){}return o}}
