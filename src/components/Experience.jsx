import {
   Environment,
   Gltf,
   Html,
   OrbitControls,
   Stage,
} from "@react-three/drei";
import { Smoke } from "./Smoke";
import { Ui } from "./Ui";
import { Modell } from "../Modell";
import { useFrame, useThree } from "@react-three/fiber";

export const Experience = () => {
   const viewport = useThree((state) => state.viewport);

   return (
      <>
         <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(3 * Math.PI) / 6}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            minDistance={2}
            maxDistance={20}
            rotateSpeed={0.2}
            zoomSpeed={0.5}
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
