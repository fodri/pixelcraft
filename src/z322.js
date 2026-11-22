/* ===== z322: co-op in Pripjaty — the game's own PeerJS rooms (Online co-op on the title screen), but the room is the same Pripjaty on both sides; name tags and the room code on screen ===== */
let PRCOOP=false;
{const in_=init;init=function(...a){if(!PRCOOP)return in_.apply(this,a);a[0]=PRIS;const r=in_.apply(this,a);try{priBuild();PRI=priNew();PRI.day0=day;priPlacePlayer()}catch(e){console.warn('coop init',e)}return r}}
{const go=goOnline;goOnline=async function(code){PRCOOP=true;try{await go.apply(this,arguments)}finally{PRCOOP=false}
  try{if(net&&state=='play'&&PRI&&!PRI.coopT){PRI.coopT=1;if(!net.isHost){P.x+=T*1.6;P.y+=T*.6}if(typeof plbBegin=='function')plbBegin();else priOpening()}}catch(e){console.warn('coop open',e)}}}
{const lg=lobbyGo;lobbyGo=function(){if(typeof lcode=='string'&&!lcode.length)lcode='P'+Math.random().toString(36).slice(2,6).toUpperCase().padEnd(4,'0');return lg.apply(this,arguments)}}
function coopTags(){noTr=true;try{
 for(const p of net.peers){const q=p.presence;if(!q||!isFinite(q.x)||!isFinite(q.y)||!peerSame(q))continue;const qx=isFinite(p.sx)?p.sx:q.x,qy=isFinite(p.sy)?p.sy:q.y,s=fvScr(qx,qy,2.25*FVU);if(!s)continue;fvTag(String(q.n||'?').slice(0,12),s[0],s[1],'#8fe0ff')}
 const hu=LANG=='hu',n=net.peers.length+1,t='CO-OP  '+net.code+'  ·  '+n+(hu?' játékos':' players');g.font=fnt(0,8);const w=Math.ceil(g.measureText(t).width)+10;Q(VW/2-w/2,VH-58,w,12,'rgba(12,10,8,.66)');txt(t,VW/2,VH-49,'#8fe0ff','center')}finally{noTr=false}}
{const h0=hud;hud=function(){const r=h0.apply(this,arguments);try{if(PRI&&net&&!net.dead&&state=='play'&&fvOn()&&!fvUI())coopTags()}catch(e){noTr=false}return r}}
