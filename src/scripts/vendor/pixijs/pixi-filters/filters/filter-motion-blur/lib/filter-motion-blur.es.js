/*!
 * @pixi/filter-motion-blur - v2.6.1
 * Compiled Thu, 03 May 2018 14:20:43 UTC
 *
 * @pixi/filter-motion-blur is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import{ObservablePoint,Point,Filter}from"pixi.js";var vertex="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",fragment="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uVelocity;\nuniform int uKernelSize;\nuniform float uOffset;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\n// Notice:\n// the perfect way:\n//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);\n// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.\n// So use uKernelSize directly.\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    vec2 velocity = uVelocity / filterArea.xy;\n    float offset = -uOffset / length(uVelocity) - 0.5;\n    int k = uKernelSize - 1;\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n        vec2 bias = velocity * (float(i) / float(k) + offset);\n        color += texture2D(uSampler, vTextureCoord + bias);\n    }\n    gl_FragColor = color / float(uKernelSize);\n}\n",MotionBlurFilter=function(e){function t(t,i,o){void 0===t&&(t=[0,0]),void 0===i&&(i=5),void 0===o&&(o=0),e.call(this,vertex,fragment),this.uniforms.uVelocity=new Float32Array(2),this._velocity=new ObservablePoint(this.velocityChanged,this),this.velocity=t,this.kernelSize=i,this.offset=o}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var i={velocity:{configurable:!0},offset:{configurable:!0}};return t.prototype.apply=function(e,t,i,o){var n=this.velocity,r=n.x,l=n.y;this.uniforms.uKernelSize=0!==r||0!==l?this.kernelSize:0,e.applyFilter(this,t,i,o)},i.velocity.set=function(e){Array.isArray(e)?this._velocity.set(e[0],e[1]):(e instanceof Point||e instanceof ObservablePoint)&&this._velocity.copy(e)},i.velocity.get=function(){return this._velocity},t.prototype.velocityChanged=function(){this.uniforms.uVelocity[0]=this._velocity.x,this.uniforms.uVelocity[1]=this._velocity.y},i.offset.set=function(e){this.uniforms.uOffset=e},i.offset.get=function(){return this.uniforms.uOffset},Object.defineProperties(t.prototype,i),t}(Filter);export{MotionBlurFilter};
//# sourceMappingURL=filter-motion-blur.es.js.map