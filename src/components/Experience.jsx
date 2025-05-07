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
import { Modell } from "../Modell";
import { Smoke2 } from "./Smoke2";

export const Experience = () => {
   return (
      <>
         <OrbitControls
            makeDefault
            // minPolarAngle={Math.PI * 0.1 - 2} // don't allow straight up
            // maxPolarAngle={Math.PI / 2 - 0.2}
            // minDistance={6 * 2}
            // maxDistance={40}
         />
         <Environment preset="city" />
         <directionalLight intensity={1} color={"white"} position={[0, 2, 3]} />

         <Stage>
            <Modell scale={0.02} />
         </Stage>
         <Smoke />
      </>
   );
};
