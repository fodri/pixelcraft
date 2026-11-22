/* ===== z311: switch off the survival-mode world events that do not belong in Pripjaty (camp, scientists, wanderers, hordes, adventures, old reactor) ===== */
function priNoSurv(){try{CMP218=null}catch(e){}try{SCI104={none:1}}catch(e){}}
{const f=priFinish;priFinish=function(r){const o=f.apply(this,arguments);priNoSurv();return o}}
{const al=priAfterLoad;priAfterLoad=function(){al.apply(this,arguments);priNoSurv()}}
for(const nm of['hordeTick','advTick','setlSpawnWanderer','hordeMorning']){try{const f=eval(nm);eval(nm+'=function(){if(PRI)return;return f.apply(this,arguments)}')}catch(e){console.warn('noSurv',nm,e)}}
try{const lr=locReactor;locReactor=function(){return PRI?null:lr.apply(this,arguments)}}catch(e){}
{const st=sporeTick;sporeTick=function(dt){if(PRI&&PRI.hz&&PRI.suit>0)sporeMsgT=60;return st.apply(this,arguments)}}
function priNoSurv2(){try{OPL200=true}catch(e){}try{PUBW[wseed+'|'+W]=1}catch(e){}try{L206=true}catch(e){}try{RVL194=true}catch(e){}}
{const f=priNoSurv;priNoSurv=function(){f();priNoSurv2()}}
