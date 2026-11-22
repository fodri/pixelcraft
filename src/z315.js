/* ===== z315: the 3D first-person view is not ready for Pripjaty yet — the demo stays in the top-down view ===== */
{const fc=fvCan;fvCan=function(){return !PRI&&fc.apply(this,arguments)}}
/* no wild horse herds in the dead city */
{const hg=hrsGen219;hrsGen219=function(){if(PRI){HRS219=[];HID219=1;MNT219=null;return}return hg.apply(this,arguments)}}
{const up=update;update=function(dt){up(dt);if(PRI&&HRS219.length&&state=='play')HRS219=[]}}
