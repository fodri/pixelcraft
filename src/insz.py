import re,sys
p=sys.argv[1];s=open(p,encoding='utf8').read()
m=open(sys.argv[2],encoding='utf8').read()
names=re.findall(r'^(?:const|let|var) ([A-Za-z_][A-Za-z0-9_]*)',m,re.M)+re.findall(r'^function ([A-Za-z_][A-Za-z0-9_]*)\(',m,re.M)
for n in names:
    if re.search(r'\b(function|let|const|var) '+n+r'\b',s): print('CLASH',n,sys.argv[2]); sys.exit(1)
a='\n(function loop(n){';assert s.count(a)==1
s=s.replace(a,'\n'+m+a)
open(p,'w',encoding='utf8').write(s);print('ok',sys.argv[2])
