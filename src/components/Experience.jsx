import {
   Environment,
   Gltf,
   Html,
   OrbitControls,
   Stage,
} from "@react-three/drei";
import { Smoke } from "./Smoke";
import { useState } from "react";
import { useControls } from "leva";
import { Dish } from "./DIsh";
import { Ui } from "./Ui";

export const Experience = () => {
   return (
      <>
         <OrbitControls
            makeDefault
            minPolarAngle={Math.PI * 0.1 - 2} // don't allow straight up
            maxPolarAngle={Math.PI / 2 - 0.2}
            minDistance={6 * 2}
            maxDistance={40}
         />
         <Environment preset="city" />
         <directionalLight intensity={1} color={"white"} position={[0, 2, 3]} />

         <Stage adjustCamera={false}>
            <Dish scale={0.5} />
         </Stage>
         <group position={[0, 5, 1 / 3]} scale={2}>
            <Smoke />
         </group>
      </>
   );
};
