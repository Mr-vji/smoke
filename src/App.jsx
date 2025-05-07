import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";
import { Loader } from "@react-three/drei";

function App() {
   return (
      <>
         <Leva collapsed={true} />
         <Loader />
         <Canvas shadows camera={{ position: [0, 3, 15], fov: 30 }}>
            <Experience />
         </Canvas>
      </>
   );
}

export default App;
