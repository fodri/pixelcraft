/* ===== z310: the Red Forest — rust-red trees (a filter over the normal sprite) ===== */
{const d0=drawObj;drawObj=function(o,x,y){if(PRI&&o&&o.t=='tree'&&!inD&&x<110*T&&y<118*T){g.save();g.filter='sepia(1) saturate(4.2) hue-rotate(-38deg) brightness(.88)';try{return d0.apply(this,arguments)}finally{g.restore()}}return d0.apply(this,arguments)}}
