from pathlib import Path
import subprocess,json,re,math
r=Path(__file__).resolve().parents[1]
s=(r/'assets/realistic-world.js.txt').read_text()
a=s.index('function districtData(');b=s.index('function districtFrondGeometry(',a)
for mobile in [False,True]:
 data=json.loads(subprocess.check_output(['node','-e',s[a:b]+f'console.log(JSON.stringify(districtData({str(mobile).lower()})));']))
 assert all(all(math.isfinite(v) for v in p['p']+p['s']+p['r']) for p in data)
 assert all(min(p['s'])>0 for p in data)
 for p in data:
  if p['kind'] in ['stucco','brick','siding','pavers','asphalt']:
   assert p['p'][1]-p['s'][1]/2>.33,p
 print(('Mobile' if mobile else 'Desktop'),len(data),'details: valid; foundations clear maximum waves')
 if not mobile:(r.parent/'district-data.json').write_text(json.dumps(data))
app=(r/'assets/index-realistic-v6.js').read_text()
keyjs=re.search(r'\$a=\[(.*?)\],tg=',app).group(1)
keys=json.loads(subprocess.check_output(['node','-e','console.log(JSON.stringify(['+keyjs+']));']))
clearance=[]
for a,b in zip(keys,keys[1:]):
 for i in range(1001):
  t=i/1000;t=t*t*(3-2*t);p=[x+(y-x)*t for x,y in zip(a['pos'],b['pos'])];z=p[2];u=max(0,min(1,(z-12)/15));g=-12 if z<12 else -12+14.8*u*u*(3-2*u) if z<27 else 2.8
  clearance.append(p[1]-max(.33,g))
assert min(clearance)>3
print('12,012 camera samples: minimum water/terrain clearance',round(min(clearance),2),'m')
orig=(r/'assets/index-BSg4T4Gh.js').read_text();a=orig.index('function Qg(');b=orig.index('function ',a+10);assert orig[a:b] in app
print('Jesus/people sequence preserved byte for byte')
for name in re.findall(r"\['(district-[^']+)'",s):assert (r/'assets/realistic'/name).is_file(),name
print('All district material assets present')
