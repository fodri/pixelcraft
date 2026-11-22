set -e
OUT=/home/claude/zona-pc/index.html
cp /home/claude/pixelcraft/index.html $OUT
python3 - <<'PYEOF'
p='/home/claude/zona-pc/index.html';s=open(p,encoding='utf8').read()
s=s.replace("g.fillText('PixelCRAFT',VW/2+2,76);g.fillStyle=fcol('#d8e4c8');g.fillText('PixelCRAFT',VW/2,74);","g.fillText('PRIPJATY 1986',VW/2+2,76);g.fillStyle=fcol('#d8e4c8');g.fillText('PRIPJATY 1986',VW/2,74);",1)
s=s.replace("txt('The spores took the cities. The forest took the rest.',VW/2,94,'#8fa07f','center');","txt('The Zone stopped in 1986. You are just a guest.',VW/2,94,'#8fa07f','center');",1)
open(p,'w',encoding='utf8').write(s)
PYEOF
for f in /home/claude/work/zb/z3*.js; do python3 /home/claude/work/zb/insz.py $OUT $f; done
cd /home/claude/zona-pc && node -e "const s=require('fs').readFileSync('index.html','utf8');const m=[...s.matchAll(/<script>([\s\S]*?)<\/script>/g)];for(const x of m){try{new Function(x[1])}catch(e){console.log('ERR',e.message);process.exit(1)}}console.log('built')"
