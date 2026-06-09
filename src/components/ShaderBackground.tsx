import React, { useEffect, useRef } from 'react';

export const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Vertex shader
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader
    const fsSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = uv - 0.5;
        p.x *= aspect;
        
        float t = u_time * 0.25;
        
        // Liquid blob movements
        vec2 b1 = vec2(sin(t * 0.6) * 0.35, cos(t * 0.4) * 0.25);
        float d1 = length(p - b1);
        
        vec2 b2 = vec2(cos(t * 0.5 + 1.2) * 0.4, sin(t * 0.7 + 1.8) * 0.3);
        float d2 = length(p - b2);
        
        vec2 b3 = vec2(sin(t * 0.4 - 2.0) * 0.3, cos(t * 0.8 - 0.8) * 0.4);
        float d3 = length(p - b3);
        
        float w1 = 1.0 / (d1 * d1 + 0.2);
        float w2 = 1.0 / (d2 * d2 + 0.3);
        float w3 = 1.0 / (d3 * d3 + 0.25);
        float sum = w1 + w2 + w3 + 0.001;
        
        // Distinctive custom colors
        vec3 c1 = vec3(0.06, 0.03, 0.14); // Deep violet glow
        vec3 c2 = vec3(0.0, 0.05, 0.12);  // Rich cyan depth
        vec3 c3 = vec3(0.1, 0.03, 0.08);  // Burgundy tint
        vec3 base = vec3(0.008, 0.006, 0.012); // Background deep dark
        
        vec3 finalColor = (w1 * c1 + w2 * c2 + w3 * c3) / sum;
        finalColor = mix(base, finalColor, 0.75);
        
        // Vignette
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(14.0 * vignette, 0.3), 0.0, 1.0);
        finalColor *= mix(0.75, 1.0, vignette);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Compile shader helper
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error: ', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error: ', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry (covers the whole canvas)
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');

    let animationFrameId: number;
    const startTime = Date.now();

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const render = () => {
      resizeCanvas();
      const elapsed = (Date.now() - startTime) / 1000;
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);

      gl.clearColor(0.01, 0.01, 0.01, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
      id="shader-canvas-ANIMATION_2"
    />
  );
};
