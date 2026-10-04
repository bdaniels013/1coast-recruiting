export * from './three-realistic-v4.js';
import {AnchorTexture} from './three-realistic-v4.js';
export class AnchorDataTexture extends AnchorTexture{
constructor(data,width,height,format=1023,type=1015){super(null);this.isDataTexture=true;this.image={data,width,height};this.format=format;this.type=type;this.magFilter=1003;this.minFilter=1003;this.generateMipmaps=false;this.flipY=false;this.unpackAlignment=1;}}
