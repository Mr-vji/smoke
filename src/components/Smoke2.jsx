import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import { useControls } from "leva";

export const Smoke2 = () => {
   const geometryRef = useRef();
   const MyShaderRef = useRef();
   const smoke = useRef();

   const planeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64);
   planeGeometry.scale(1.5, 6, 1.5);
   planeGeometry.translate(0, 0.5, 0);

   const perlineTexture = useTexture("/models/textures/noiseTexture.png");
   perlineTexture.wrapS = THREE.RepeatWrapping;
   perlineTexture.wrapT = THREE.RepeatWrapping;

   const [wire, setWire] = useState(false);
   const { smokeWireframe, speed } = useControls("Smoke Wireframe", {
      smokeWireframe: { value: wire, onChange: (value) => setWire(value) },
      speed: { value: 0.006, min: -0.006, max: 0.006, step: 0.001 },
   });

   useFrame((_, delta) => {
      MyShaderRef.current.uTime += delta;
   });

   return (
      <>
         <mesh
            geometry={planeGeometry}
            position={[2, 2.5, 4]}
            rotation={[0.8, 0, 0]}
            scale={0.3}
            ref={geometryRef}
         >
            <myShader
               ref={MyShaderRef}
               uPerlinTexture={perlineTexture}
               side={THREE.DoubleSide}
               wireframe={wire}
               transparent={true}
               depthWrite={false}
            />
         </mesh>
      </>
   );
};

const MyShader = shaderMaterial(
   //    ____________________________________________________
   {
      uColor: new THREE.Color(0xffffff),
      uPerlinTexture: null,
      uTime: null,
   },

   //    ____________________________________________________

   /* glsl */ `
   
   varying vec2 vUv;
   uniform float uTime;
   uniform sampler2D uPerlinTexture;

   vec2 rotate2D(vec2 value, float angle)
{
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}

   
   void main() {
      vec3 newPosition = position;
      

      float twistPerlin = texture(
        uPerlinTexture,
        vec2(0.5, uv.y * 0.2 - uTime * 0.006)
    ).r;
      
      float angle = twistPerlin * 8.0;
      newPosition.xz = rotate2D(newPosition.xz , angle);

      vec2 windOffset = vec2(
         texture(uPerlinTexture, vec2(0.25 , uTime * 0.006)).r - 0.5,
         texture(uPerlinTexture, vec2(0.75 , uTime * 0.006)).r - 0.5
      );
          
      windOffset *= pow(uv.y, 2.0 )* 10.0;
      newPosition.xz += windOffset;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      vUv = uv;
   }
   `,
   //    ____________________________________________________

   /* glsl */ `
   
   uniform float uTime;
   uniform vec3 uColor;
   uniform sampler2D uPerlinTexture;

   varying vec2 vUv;

   
   
   void main() {

      //amimate the texture coordinates
      vec2 smokeUv = vUv;
      smokeUv.x *= 0.5;
      smokeUv.y *= 0.3;
      smokeUv.y -= uTime * 0.03;
      
      float smoke = texture(uPerlinTexture, smokeUv).r;

      smoke = smoothstep(0.4, 1.0, smoke);

      smoke *= smoothstep(0.0, 0.1, vUv.x);
      smoke *= smoothstep(1.0, 0.9, vUv.x);
      smoke *= smoothstep(0.0, 0.0, vUv.y);
      smoke *= smoothstep(1.0, 0.1, vUv.y);
    
      // gl_FragColor = vec4(1.0);
      gl_FragColor = vec4(1.0, 1.0, 1.0, smoke);
      
      #include <tonemapping_fragment>
      #include <colorspace_fragment>

   }
`
   //    ____________________________________________________
);

extend({ MyShader });
