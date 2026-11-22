set -e
OUT=${1:-/tmp/pubbuild/index.html}
mkdir -p $(dirname $OUT)
git -C /home/claude/pixelcraft show origin/main:index.html > $OUT
for f in /home/claude/work/zb/z3*.js; do python3 /home/claude/work/zb/insz.py $OUT $f; done
node -e "const s=require('fs').readFileSync('$OUT','utf8');const m=[...s.matchAll(/<script>([\s\S]*?)<\/script>/g)];for(const x of m){try{new Function(x[1])}catch(e){console.log('ERR',e.message);process.exit(1)}}console.log('built public',s.length)"
