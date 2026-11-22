/* ===== z309: the prologue, 1986 notes, the places of the town, ambience, horror (atmosphere only) ===== */
{const jf=jnFind;jnFind=function(k){if(PRI&&!/^(lk_|p_)/.test(k))return;return jf.apply(this,arguments)}}
{const pp=priPlacePlayer;priPlacePlayer=function(){pp.apply(this,arguments);priKit()}}
function priKit(){inv.pistol=1;givehb('pistol');inv.a9=30;inv.axe=1;givehb('axe');inv.canned=2;inv.bottle=2;inv.tonic=1;try{givehb('canned')}catch(e){}}
/* ---------- prologue ---------- */
const PRL0=[['2070. november. Pripjaty. A város nyolcvannégy éve áll üresen — vagy legalábbis ezt mondják.','November 2070. Pripyat. The city has stood empty for eighty-four years — or so they say.'],
 ['Az első napom stalkerként. A megbízó fizet, ha tisztítok, szállítok vagy mérek. Jó pénzért bármi.','My first day as a stalker. The contractor pays for clearing, hauling, measuring. For good money, anything.'],
 ['Teljes szkafander, szűrő, Geiger-számláló. A számláló a jobb felső sarokban — ha sír, menj el onnan.','Full suit, filter, Geiger counter. The gauge is in the top right — when it screams, leave.'],
 ['Az ellenőrzőpont után minden megáll 1986-ban. Gyenyiszov a keleti bódéban vár. Ők a városban vannak: ne nézz túl sokáig a szemükbe.','Past the checkpoint everything is stuck in 1986. Denisov waits in the east hut. They are in the city: don\'t look them in the eye for too long.']];
{const up=update;update=function(dt){up(dt);if(!PRI||state!='play')return;PRI.t0=(PRI.t0||0)+dt;
 if(!PRI.pro&&PRI.t0>1.6&&!DLG&&!inD){PRI.pro=1;for(const l of PRL0)dlSay('memo',LANG=='hu'?'Napló':'Journal',LANG=='hu'?l[0]:l[1],null,'')}
 priAreaTick(dt);priAmbTick(dt)}}
/* ---------- places ---------- */
const PRPL=[['ck',[138,276,181,297],'Ellenőrzőpont','Checkpoint','A déli sorompó. Itt kap munkát és felszerelést, aki bemegy.','The south barrier. Work and gear for those who go in.'],
 ['sq',[164,148,203,185],'Központi tér','Central Square','Az emlékmű, a vörös zászlók — május elsejére készültek.','The monument, the red flags — all ready for the first of May.'],
 ['pk',[116,102,203,138],'Vidámpark','Amusement Park','Az óriáskerék soha nem forgott igazán. Mégis, a kabinok imbolyognak.','The wheel never really turned. Yet the cabins sway.'],
 ['pc',[118,152,153,179],'Kultúrpalota','Palace of Culture','Nagy csarnok, vörös csillag a falon. Valaki még mindig itt próbál.','A great hall, a red star on the wall. Someone is still rehearsing.'],
 ['sc',[76,152,109,175],'Iskola','School','Az osztálynaplók április 25-ig vannak kitöltve.','The class registers are filled in until April 25.'],
 ['st',[76,106,107,129],'Univermag','Department Store','Ünnepi áruk: a polcokon minden rendben, csak a vevők hiányoznak.','Festive goods: everything is on the shelves, only the customers are missing.'],
 ['ho',[214,104,245,127],'Kórház','Hospital','Itt kezdődött az első riadó. A folyosók még nem csendesek.','Where the first alarm began. The corridors are not quiet.'],
 ['ht',[214,154,245,177],'Polesszje szálló','Hotel Polissya','Vendégkönyv, kulcsok, bőröndök. Senki nem jelentkezett ki.','A guest book, keys, suitcases. Nobody checked out.'],
 ['kg',[216,196,245,213],'Óvoda','Kindergarten','Apró ágyak, babák. A legrosszabb hely a városban — nem tudni, miért.','Tiny beds, dolls. The worst place in town — nobody knows why.'],
 ['lk',[60,186,262,262],'Lakónegyed','Residential blocks','Panelházak, emeletről emeletre. Minden lakásban ott a naptár: április 26.','Panel blocks, floor upon floor. Every flat still has the calendar: April 26.']];
var PAT=0;
function priAreaTick(dt){PAT-=dt;if(PAT>0)return;PAT=.7;const tx=P.x/T|0,ty=P.y/T|0;let k=null;
 if(!inD){for(const a of PRPL)if(tx>=a[1][0]&&tx<=a[1][2]&&ty>=a[1][1]&&ty<=a[1][3]){k=a;break}
  if(!k&&priZone(tx,ty)=='rf')k=['rf',0,'Vörös Erdő','Red Forest','A fák rozsdavörösek. A Geiger egyfolytában sír. Ide csak szkafanderben.','Rust-red trees. The Geiger never stops.']}
 if(k&&!PRI.seen[k[0]]){PRI.seen[k[0]]=1;jnFind('p_'+k[0],k[2],k[3],k[4],k[5])}}
/* ---------- 1986 notes ---------- */
const PRN=[['Műszaklap — április 25.','Shift sheet — April 25','1986. április 25. Műszakvezető: a holnapi vizsgálatot elhalasztották. A „Vörös Csillag” klub próbája 18:00-kor. Ne felejtsétek: a május elsejei felvonuláshoz zászlók kellenek!'],
 ['Gyerek naplója','A child\'s diary','Apa azt mondta, május elsején kinyit a kerék. Már most hallom a zenét. Anya szerint csak a szél. Nem a szél.'],
 ['Hangosbemondó — április 27.','Loudspeaker — April 27','FIGYELEM! A lakosság szíves figyelmébe! A Városi Tanács határozata: mindenkit ideiglenesen kitelepítünk. Vigyenek magukkal iratokat és háromnapi élelmet. Az otthonaikat… rövid időn belül… elhagyják. (A hang itt elhallgat.)'],
 ['Újságkivágás','Newspaper clipping','„A szocializmus atomvárosa: vidám, fiatal, példamutató! Pripjaty lakói a párt vezetésével új életet építenek. Dicsőség a munkának!”'],
 ['Kórházi jegyzet','Hospital note','Április 26., reggel. Sürgősségi: szokatlan sérülések, hányás, bőrpír. Nem szabad pánikot kelteni. A jelentést a pártbizottságnak kell megküldeni.'],
 ['Vendégkönyv','Guest book','Április 26., szombat. A vendégek öt órakor lementek a lépcsőn, mind. Azóta egyet sem láttunk elmenni.'],
 ['Osztálynapló','Class register','Április 26., szombat. Nincs tanítás. A tanár szerint ritka tiszta idő. A gyerekek a tetőről nézték a fényt a távolban. Szép volt.'],
 ['Áruházi árlista','Store price list','Kenyér 25 kop. · Tej 30 kop. · Rádió „Gorizont” 189 rubel. A május elsejei kosarak a raktárban. Átvételig lezárni!'],
 ['Graffiti','Graffiti','NE NÉZZ VISSZA. Ők a falak mögött vannak, nem az árnyékban. — T.'],
 ['Fenntartási Hivatal — 2070','Maintenance Office — 2070','FIGYELMEZTETÉS: az Övezetben az idő nem múlik. A hivatalos nyilvántartás szerint a naptár április 26-nál áll. Ha találkozik velük: ne válaszoljon, ha a nevén szólítják.'],
 ['Cédula','Slip','Kedves lakó! A holnapi szubbotnik elmarad. A kerék átadása május 1-jén 10:00-kor. Mindenki jöjjön el — családdal!'],
 ['Stalker jegyzet','Stalker note','Az óriáskeréknél ne várj pontosan délben. Kilencet fordul, és mindig ugyanott áll meg, ahol senki nem áll.'],
 ['Rádióüzenet','Radio message','…ez a hangszóró-ellenőrzés… kérjük, őrizzék meg a nyugalmukat… kérjük… őrizzék… (statikus zaj, majd egy női hang számolni kezd).'],
 ['Óvodai lista','Kindergarten list','Csoport „Napocska”: Anyuka, Kolja, Lenocska, Mása, Vityka… A lista április 26-nál véget ér. A fekete ceruzával ráírva: „még itt vannak”.']];
DRAWX.pnote=function(o,x,y){pShadow(x+3,y+12,10,2);W_(x+3,y+4,10,9,'#d8cfa8');W_(x+3,y+4,10,1,'#f0e8c8');W_(x+5,y+6,6,1,'#6a6a5a');W_(x+5,y+8,5,1,'#6a6a5a');W_(x+5,y+10,6,1,'#6a6a5a');W_(x+10,y+4,3,3,PRED)};
INT.pnote=1;NMX.pnote='note';
{const u=useObj;useObj=function(n){if(PRI&&n&&n.o&&n.o.t=='pnote'){const o=n.o,d=PRN[(o.k|0)%PRN.length];dlSay('note',LANG=='hu'?d[0]:d[1],d[2],null,'');if(!PRI.read[o.k|0]){PRI.read[o.k|0]=1;try{jnFind('p_n'+(o.k|0),d[0],d[1],d[2],d[2])}catch(e){}}return}return u.apply(this,arguments)}}
{const f=priFinish;priFinish=function(r){const o=f.apply(this,arguments);const q=prRng(PRIS+9);let k=0;
 const rects=[[116,102,203,138],[164,148,203,185],[118,152,153,179],[76,152,109,175],[76,106,107,129],[214,104,245,127],[214,154,245,177],[216,196,245,213],[138,276,181,297],[143,278,153,286],[167,278,177,286]];
 for(const rc of rects){for(let c=0;c<3;c++){const t=(c==2&&q()<.5)?0:1;for(let a=0;a<80;a++){const x=rc[0]+Math.floor(q()*(rc[2]-rc[0]+1)),y=rc[1]+Math.floor(q()*(rc[3]-rc[1]+1)),i=y*W+x;if(ob[i]||![16,12,14,0].includes(map[i]))continue;ob[i]={t:'pnote',k:(k++)%PRN.length};break}}}
 return o}}
/* ---------- ambience: radio static, whispers, creaks — atmosphere only ---------- */
const PRH=[['Valahol egy hinta nyikorog. Pedig nincs szél.','Somewhere a swing creaks. There is no wind.'],['A kerék egy kicsit megmozdult. Biztos a szél.','The wheel moved a little. It must be the wind.'],['Valaki a nevedet suttogja a panelházban.','Someone whispers your name inside the block.'],['Az egyik ablakban mintha mozdult volna egy alak.','Something moved in one of the windows.'],['A Geiger egy pillanatra elhallgat. Ez rosszabb.','The Geiger falls silent for a moment. That is worse.'],['Hangosbemondó recseg a távolban: „…őrizzék meg a nyugalmukat…”','A loudspeaker crackles far away: "...remain calm..."'],['Gyerekkacaj. Aztán megint csönd.','Children laughing. Then silence again.']];
var PAM=25,PAMX=0;
function priNoise(dur,f0,qv,gain,pan){try{if(!AC||AC.state!='running')return;const n=Math.floor(AC.sampleRate*dur),b=AC.createBuffer(1,n,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n)*(.5+.5*Math.sin(i/90));const s=AC.createBufferSource();s.buffer=b;const fl=AC.createBiquadFilter();fl.type='bandpass';fl.frequency.value=f0;fl.Q.value=qv;const gn=AC.createGain();gn.gain.value=gain;let out=gn;if(AC.createStereoPanner){const p=AC.createStereoPanner();p.pan.value=pan;gn.connect(p);out=p}s.connect(fl);fl.connect(gn);out.connect(AC.destination);s.start()}catch(e){}}
function priAmbTick(dt){if(inD&&0)return;PAM-=dt;if(PAM>0)return;PAM=35+Math.random()*55;if(DLG||TALK)return;const k=Math.floor(Math.random()*PRH.length);
 if(k==5||k==4)priNoise(1.6,1800,3,.05,(Math.random()-.5)*1.4);else if(k==2||k==6)priNoise(2.2,420,1.5,.035,(Math.random()-.5)*1.8);else priNoise(.9,160,4,.04,(Math.random()-.5)*1.2);
 say(LANG=='hu'?PRH[k][0]:PRH[k][1])}
HU.unshift(['The Zone stopped in 1986. You are just a guest.','Az Övezet 1986-ban megállt. Te csak vendég vagy.']);
