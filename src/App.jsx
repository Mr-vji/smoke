import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
   return (
      <Canvas shadows camera={{ position: [0, 3, 15], fov: 30 }}>
         <Experience />
      </Canvas>
   );
}

export default App;
