import Fragement from './fragment.glsl';
import Vertex from './vertex.glsl';

export default {
	uniforms: {
    "tDiffuse": { type: "t", value: null },
		"time":     { type: "f", value: 0.0 },
		"amount":   { type: "f", value: 0.5 },
		"size":     { type: "f", value: 4.0 }
  },
  vertexShader: Vertex,
  fragmentShader: Fragement
}
