from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
s=(root/'assets/index-BSg4T4Gh.js').read_text()
world=(root/'assets/realistic-world.js.txt').read_text()
helper=(root/'scripts/build-journey.py').read_text().split("helper = '''",1)[1].split("'''",1)[0]
start=s.index('function jg(){');end=s.index('function zg(){',start)
canvas='''function jg(){const small=eg();return c.jsxs(Nh,{dpr:small?[1,1.25]:[1,1.6],shadows:true,gl:{antialias:true,alpha:false,powerPreference:"high-performance",stencil:false},camera:{fov:46,near:.08,far:6000,position:[40,820,-140]},style:{position:"absolute",inset:0,width:"100%",height:"100%"},onCreated:({gl})=>{gl.setClearColor("#04060a",1);gl.toneMapping=4;gl.toneMappingExposure=1.05;gl.shadowMap.type=2},children:[c.jsx(Cg,{}),c.jsx(RealisticJourneyWorld,{small})]})}'''
s=s[:start]+world+'\n'+canvas+s[end:]
patches={
'function Kg(){':helper+'\nfunction Kg(){',
'children:c.jsx(jg,{})}),c.jsx("div",{className:"shade"':'children:c.jsx(AnchorSafeScene,{})}),c.jsx("div",{className:"shade"',
'new Mh({lerp:.09,wheelMultiplier:1,smoothWheel:!0})':'new Mh({lerp:v?1:.09,wheelMultiplier:1,smoothWheel:!v})',
'Q.scrollTo=(W,H)=>u.scrollTo(W,{duration:1.8,...H})':'Q.scrollTo=(W,H)=>u.scrollTo(W,{duration:v?0:1.8,...H})',
'u.scrollTo(H,{offset:0,duration:1.8})':'u.scrollTo(H,{offset:0,duration:v?0:1.8})',
'window.__journey={set:W=>':'window.__journey={scrollTo:(target,options={})=>u.scrollTo(target,{duration:v?0:1.6,...options}),set:W=>',
'from"./three-B20PjNWu.js"':'from"./three-realistic-v5.js"'
}
for old,new in patches.items():
 assert s.count(old)==1,old
 s=s.replace(old,new)
keys=[([20,32,-60],-10,180),([6,12,6],-7,182),([12,6,22],-2,190),([14,3,12],-12,0),([14,1.2,12],-8,0),([14,-22,12],-4,20),([14,-26,12],0,24),([20,2,-10],-2,192),([10,2.8,15],-3,125),([3,2.7,15],-3,120)]
a=s.index('$a=[')+4;b=s.index('],tg=',a)
entries=s[a:b].split('},{')
for idx,(pos,pitch,yaw) in enumerate(keys,3):
 entries[idx]=re.sub(r'pos:\[[^]]+\],pitch:[^,]+,yaw:[^,]+',f'pos:{str(pos).replace(" ","")},pitch:{pitch},yaw:{yaw}',entries[idx])
s=s[:a]+'},{'.join(entries)+s[b:]
exports={'$t':'AnchorTexture','lp':'AnchorMaterial','Ie':'AnchorColor','Be':'AnchorFloat32','gd':'AnchorPMREM','du':'AnchorFog','ds':'AnchorDataTexture'}
three="""export * from './three-realistic-v4.js';
import {AnchorTexture} from './three-realistic-v4.js';
export class AnchorDataTexture extends AnchorTexture{
constructor(data,width,height,format=1023,type=1015){super(null);this.isDataTexture=true;this.image={data,width,height};this.format=format;this.type=type;this.magFilter=1003;this.minFilter=1003;this.generateMipmaps=false;this.flipY=false;this.unpackAlignment=1;}}
"""
(root/'assets/three-realistic-v5.js').write_text(three)
s='import {'+','.join(exports.values())+'} from "./three-realistic-v5.js";\n'+s
(root/'assets/index-realistic-v5.js').write_text(s)
html=(root/'index.html').read_text().replace('index-experience-v3.js','index-realistic-v5.js').replace('index-realistic-v4.js','index-realistic-v5.js').replace('index-realistic-v4-1.js','index-realistic-v5.js').replace('three-image-v3.js','three-realistic-v5.js').replace('three-realistic-v4.js','three-realistic-v5.js').replace('journey-v3.css','journey-v4.css')
(root/'index.html').write_text(html)
css=(root/'assets/journey-v3.css').read_text()+'''\n.fallback-sky::after{background:radial-gradient(circle at 40% 10%,transparent,#06101bcc 68%),url('./realistic/earth-day.jpg') center/cover;box-shadow:0 -8px 65px #6a9aa544,0 -2px 8px #b5dbe744;}\n'''
(root/'assets/journey-v4.css').write_text(css)
# The approved illustration sequence stays exactly as authored.
original=(root/'assets/index-BSg4T4Gh.js').read_text()
sequence=original[original.index('function Qg('):original.index('function ',original.index('function Qg(')+10)]
assert sequence in s
assert 'c.jsx(Eg,{})' not in canvas and 'AnchorImageJourney' not in s
print('Built complete replacement 3D environment; original people sequence preserved.')
