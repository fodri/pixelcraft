/* ===== z314: survival of a hard winter — body heat, frozen weapons, cold waves and blizzards, filter failure (tunnel vision), mechanical Geiger dial, tube night vision, hand gas burner ===== */
{const pn=priNew;priNew=function(){const o=pn.apply(this,arguments);o.heat=100;o.nv=0;o.nvT=100;o.tv=0;o.gas=6;o.cw=0;o.cwT=120;return o}}
{const sc=seaColdTick;seaColdTick=function(){if(PRI)return;return sc.apply(this,arguments)}}
function priFrostAt(tx,ty){let f=0;if(PRB&&PRB.frost)for(const q of PRB.frost){const d=Math.hypot(tx-q.x,ty-q.y);if(d<q.r)f+=q.s*(1-d/q.r)}return f}
function priHeatTick(dt){const night=dk0()>.5,blz=wea==2&&!inD;let d;
 if(inD)d=curOf&&curOf.k=='bkr'?4:.22;
 else if(inAnyBld(P.x,P.y))d=.18;
 else{let dr=.15+(night?.08:0)+(blz?.2:0)+(PRI.cw>0?.34:0);dr+=priFrostAt(P.x/T|0,P.y/T|0)*1.1;if(PRI.hz&&PRI.suit>0)dr*=.6;d=-dr}
 if(!inD&&nearWarm(90))d=3.4;
 PRI.heat=Math.max(0,Math.min(100,PRI.heat+d*dt));
 if(PRI.heat<=0&&!creative){P.hp-=dt*1.1;P.hurt=Math.max(P.hurt||0,.08)}
 const lv=PRI.heat<20?2:PRI.heat<40?1:0;if(lv>(PRI.hl|0)){PRI.hl=lv;say(lv==2?(LANG=='hu'?'A zárszerkezet ráfagyott! Melegedj vagy használd a gázégőt (Y).':'The action is freezing up! Warm up or use the burner (Y).'):(LANG=='hu'?'A kezed elgémberedett — lassabban tudsz tüzelni.':'Your hands are stiffening — slower to fire.'))}else if(lv<(PRI.hl|0))PRI.hl=lv;
 const f=PRI.heat<20?1.9:PRI.heat<40?1.4:1;for(const k in GUN){if(GUN[k].rt0==null)GUN[k].rt0=GUN[k].rt;GUN[k].rt=GUN[k].rt0*f}
 /* cold waves */
 PRI.cwT-=dt;if(PRI.cwT<=0){if(PRI.cw>0){PRI.cw=0;PRI.cwT=150+Math.random()*180}else{PRI.cw=34;PRI.cwT=34;if(!inD)say(LANG=='hu'?'Fagyhullám érkezik! Menj fedezékbe vagy tűz mellé.':'A cold wave is rolling in! Find cover or a fire.')}}
 /* filter failure */
 const bad=P.rate>.6&&!inD&&(!PRI.hz||PRI.filt<=0||PRI.suit<=0);PRI.tv+=((bad?1:0)-PRI.tv)*Math.min(1,dt*1.4);if(PRI.tv>.6&&!creative){P.hp-=dt*.7;if(!PRI.cgh||PRI.cgh<=0){PRI.cgh=3+Math.random()*3;snd('hurt');say(LANG=='hu'?'*köhögés* A szűrő nem véd — látótér beszűkül!':'*cough* No filter — your vision is closing in!')}}
 PRI.cgh=(PRI.cgh||0)-dt;
 /* night vision tube */
 if(PRI.nv){PRI.nvT=Math.max(0,PRI.nvT-dt*1.1);if(PRI.nvT<=0){PRI.nv=0;say(LANG=='hu'?'Az éjjellátó akkumulátora lemerült.':'The night-vision battery is flat.')}}else PRI.nvT=Math.min(100,PRI.nvT+dt*.35)}
{const up=update;update=function(dt){up(dt);if(PRI&&state=='play'&&!creative&&P.hp>0)try{priHeatTick(dt)}catch(e){}}}
{const ek=eatK;eatK=function(k){const r=ek.apply(this,arguments);if(PRI&&(k=='cooked'||k=='canned')){PRI.heat=Math.min(100,PRI.heat+16)}return r}}
addEventListener('keydown',e=>{if(!PRI||state!='play'||e.repeat||e.ctrlKey||e.metaKey||book||invOpen||stOpen||showMap||SFOC)return;
 if(e.code=='KeyZ'){if(PRI.nv){PRI.nv=0;snd('ui')}else if(PRI.nvT>8){PRI.nv=1;snd('ui');say(LANG=='hu'?'A csöves éjjellátó felmelegszik… zöld fény.':'The tube night-vision hums to life…')}else say(LANG=='hu'?'Az akkumulátor üres.':'Battery empty.')}
 if(e.code=='KeyY')priBurner()});
function priBurner(){if((PRI.gas|0)<=0){say(LANG=='hu'?'A gázpalack üres. Vaszilijnál töltheted.':'The gas bottle is empty.');return}PRI.gas--;PRI.heat=Math.min(100,PRI.heat+24);snd('pick');
 let melted=false;const px=P.x/T|0,py=P.y/T|0;for(let y=py-2;y<=py+2;y++)for(let x=px-2;x<=px+2;x++){const o=ob[y*W+x];if(o&&o.t=='plock'&&!o.open){o.open=1;melted=true;try{priLockOpen(x,y,o)}catch(e){}}}
 say(melted?(LANG=='hu'?'A jégbe fagyott zár megolvadt.':'The frozen lock melts.'):(LANG=='hu'?'Felmelegítetted a kezed a kézi gázégővel. Gáz: '+PRI.gas:'Warmed your hands. Gas: '+PRI.gas))}
function priLockOpen(){}
/* ---------- the mechanical dial ---------- */
priGauge=function(){const hu=LANG=='hu',x=VW-118,y=4,rate=P.rate||0,v=rate*.4,lv=rate<.5?0:rate<2?1:rate<5?2:3,col=['#8ad060','#d8c840','#e88a30','#e03a2a'][lv];
 noTr=true;Q(x,y,114,62,'rgba(10,12,8,.64)');Q(x,y,114,1,'#46503e');Q(x,y+61,114,1,'#2a3024');
 /* dial */
 const cx=x+30,cy=y+34,R=24,t=Math.max(0,Math.min(1,(Math.log10(Math.max(.005,v))+2)/4));
 g.save();g.fillStyle='#d8d0a8';g.beginPath();g.arc(cx,cy,R,Math.PI,0);g.lineTo(cx+R,cy+4);g.lineTo(cx-R,cy+4);g.closePath();g.fill();g.strokeStyle='#2a2418';g.lineWidth=2;g.stroke();
 g.lineWidth=3;for(const[a,b,c]of[[0,.45,'#5a9a3a'],[.45,.75,'#c8b030'],[.75,1,'#b83a2a']]){g.strokeStyle=c;g.beginPath();g.arc(cx,cy,R-4,Math.PI+a*Math.PI,Math.PI+b*Math.PI);g.stroke()}
 g.strokeStyle='#2a2418';g.lineWidth=1;for(let i=0;i<=10;i++){const a=Math.PI+i/10*Math.PI;g.beginPath();g.moveTo(cx+Math.cos(a)*(R-7),cy+Math.sin(a)*(R-7));g.lineTo(cx+Math.cos(a)*(R-(i%5?9:11)),cy+Math.sin(a)*(R-(i%5?9:11)));g.stroke()}
 const jit=(Math.random()-.5)*.05*Math.min(3,rate+.2),a=Math.PI+t*Math.PI+jit;g.strokeStyle='#a01810';g.lineWidth=1.6;g.beginPath();g.moveTo(cx,cy+2);g.lineTo(cx+Math.cos(a)*(R-3),cy+Math.sin(a)*(R-3));g.stroke();g.fillStyle='#2a2418';g.beginPath();g.arc(cx,cy+2,2.4,0,6.3);g.fill();g.restore();
 g.font=fnt(0,7);txt('mSv/h',cx,cy+3,'#4a4228','center');
 g.font=fnt(0,8);txt(v.toFixed(2),cx,y+58,col,'center');
 const bar=(yy,val,c,lab)=>{Q(x+62,yy,34,4,'#1a1c16');Q(x+62,yy,Math.round(34*Math.max(0,Math.min(1,val/100))),4,c);g.font=fnt(0,7);txt(lab,x+98,yy+5,'#9aa08a')};
 bar(y+8,P.inf||0,(P.inf||0)>45?'#e03a2a':'#b6ff40',hu?'dóz':'dose');
 bar(y+19,PRI.hz?PRI.suit:0,PRI.suit>30?'#d8c840':'#e88a30',hu?'ruha':'suit');
 bar(y+30,PRI.hz?PRI.filt:0,'#6ab0d8',hu?'szűr':'filt');
 bar(y+41,PRI.heat,PRI.heat<30?'#e0e8ff':'#e89a50',hu?'hő':'heat');
 g.font=fnt(0,7);txt(PRI.rub+(hu?' rubel':' rub')+' · '+(PRI.gas|0)+(hu?' gáz':' gas'),x+62,y+58,'#e8d890');noTr=false};
{const po=priObj;priObj=function(){const y0=VH;po.apply(this,arguments)}}
/* ---------- grade extras: frost edge, blizzard whiteout, filter tunnel vision, tube night vision ---------- */
{const pg=priGrade;priGrade=function(){pg.apply(this,arguments);if(!PRI||CLASSIC)return;const cw=g.canvas.width,ch=g.canvas.height,tp=T*(cw/VW)*ZM;g.save();g.setTransform(1,0,0,1,0,0);
 try{
  if(PRI.nv){g.globalCompositeOperation='multiply';g.fillStyle='rgb(120,255,150)';g.fillRect(0,0,cw,ch);g.globalCompositeOperation='lighter';g.fillStyle='rgba(18,70,28,'+(.22+dk0()*.3)+')';g.fillRect(0,0,cw,ch);g.globalCompositeOperation='source-over';
   g.fillStyle='rgba(0,0,0,.18)';for(let yy=0;yy<ch;yy+=3)g.fillRect(0,yy,cw,1)}
  if(wea==2&&!inD){const gr=g.createRadialGradient(cw/2,ch/2,tp*3.2,cw/2,ch/2,tp*10);gr.addColorStop(0,'rgba(214,222,232,0)');gr.addColorStop(1,'rgba(214,222,232,.9)');g.fillStyle=gr;g.fillRect(0,0,cw,ch)}
  if(PRI.cw>0&&!inD){g.fillStyle='rgba(210,225,245,.1)';g.fillRect(0,0,cw,ch)}
  const fr=Math.max(0,(40-PRI.heat)/40);if(fr>0){const gr=g.createRadialGradient(cw/2,ch/2,Math.min(cw,ch)*.3,cw/2,ch/2,Math.max(cw,ch)*.75);gr.addColorStop(0,'rgba(220,235,255,0)');gr.addColorStop(1,'rgba(220,235,255,'+(.6*fr)+')');g.fillStyle=gr;g.fillRect(0,0,cw,ch)}
  if(PRI.tv>.02){const gr=g.createRadialGradient(cw/2,ch/2,Math.min(cw,ch)*(.5-.34*PRI.tv),cw/2,ch/2,Math.max(cw,ch)*(.75-.2*PRI.tv));gr.addColorStop(0,'rgba(8,10,6,0)');gr.addColorStop(1,'rgba(8,10,6,'+(.97*PRI.tv)+')');g.fillStyle=gr;g.fillRect(0,0,cw,ch)}
 }finally{g.restore()}}}
