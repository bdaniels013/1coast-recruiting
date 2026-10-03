from pathlib import Path
root = Path(__file__).resolve().parents[1]
source = (root / 'assets/index-BSg4T4Gh.js').read_text()
scene = (root / 'assets/image-journey-component.js.txt').read_text()
helper = '''
function AnchorPhotoFallback(){return c.jsxs("div",{className:"scene-fallback",children:[c.jsx("div",{className:"fallback-sky"}),c.jsx("div",{className:"fallback-coast"}),c.jsx("div",{className:"fallback-family"}),c.jsx("div",{className:"fallback-work"}),c.jsx("div",{className:"fallback-deep"})]})}
class AnchorSceneBoundary extends Y.Component{constructor(p){super(p);this.state={failed:false}}static getDerivedStateFromError(){return{failed:true}}render(){return this.state.failed?c.jsx(AnchorPhotoFallback,{}):this.props.children}}
function AnchorSafeScene(){const[ok]=Y.useState(()=>{try{const el=document.createElement("canvas");const gl=el.getContext("webgl2")||el.getContext("webgl");if(!gl)return false;gl.getExtension("WEBGL_lose_context")?.loseContext();return true}catch{return false}});return ok?c.jsx(AnchorSceneBoundary,{children:c.jsx(jg,{})}):c.jsx(AnchorPhotoFallback,{})}
'''
patches = {
 'function jg(){': scene+'\nfunction jg(){',
 'children:[c.jsx(Cg,{}),c.jsx(Eg,{})': 'children:[c.jsx(Cg,{}),c.jsx(AnchorImageJourney,{}),c.jsx(Eg,{})',
 'function Kg(){': helper+'\nfunction Kg(){',
 'children:c.jsx(jg,{})}),c.jsx("div",{className:"shade"': 'children:c.jsx(AnchorSafeScene,{})}),c.jsx("div",{className:"shade"',
 'new Mh({lerp:.09,wheelMultiplier:1,smoothWheel:!0})': 'new Mh({lerp:v?1:.09,wheelMultiplier:1,smoothWheel:!v})',
 'Q.scrollTo=(W,H)=>u.scrollTo(W,{duration:1.8,...H})': 'Q.scrollTo=(W,H)=>u.scrollTo(W,{duration:v?0:1.8,...H})',
 'u.scrollTo(H,{offset:0,duration:1.8})': 'u.scrollTo(H,{offset:0,duration:v?0:1.8})',
 'window.__journey={set:W=>': 'window.__journey={scrollTo:(target,options={})=>u.scrollTo(target,{duration:v?0:1.6,...options}),set:W=>',
}
for needle,replacement in patches.items():
 assert source.count(needle)==1, f'Original app changed: {needle}'
 source=source.replace(needle,replacement)
(root/'assets/index-experience-v3.js').write_text(source)
# Preserve existing dependency exports and expose only the texture constructor.
three=(root/'assets/three-B20PjNWu.js').read_text()
(root/'assets/three-image-v3.js').write_text(three+'\nexport{$t as AnchorImageTexture};\n')
source=source.replace('from"./three-B20PjNWu.js"','from"./three-image-v3.js"')
source='import {AnchorImageTexture} from "./three-image-v3.js";\n'+source
(root/'assets/index-experience-v3.js').write_text(source)
html=(root/'index.html').read_text()
html=html.replace('index-experience-v2.js','index-experience-v3.js').replace('index-BSg4T4Gh.js','index-experience-v3.js')
html=html.replace('three-B20PjNWu.js','three-image-v3.js')
html=html.replace('editorial-v2.css','journey-v3.css').replace('editorial-v2.js','journey-v3.js')
(root/'index.html').write_text(html)
print('Built original motion app with image depth environments.')
