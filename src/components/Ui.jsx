import { Text } from "@react-three/drei"; // For text rendering

export const Ui = () => {
   return (
      <main className="fixed inset-0 flex flex-col p-4 pointer-events-none">
         <div className="flex flex-1 items-center justify-center text-yellow-500">
            <div className="flex-1 relative h-full">
               {/* Replace section tags with 3D objects */}
               <mesh>
                  <Text
                     fontSize={1}
                     color="white"
                     anchorX="center"
                     anchorY="middle"
                  >
                     iPhone 15 Pro Max
                  </Text>
               </mesh>

               <mesh position={[0, -2, 0]}>
                  <Text
                     fontSize={2}
                     color="white"
                     anchorX="center"
                     anchorY="middle"
                  >
                     Titanium
                  </Text>
               </mesh>

               <mesh position={[0, -4, 0]}>
                  <Text
                     fontSize={1}
                     color="white"
                     anchorX="center"
                     anchorY="middle"
                  >
                     New titanium body
                  </Text>
               </mesh>

               <mesh position={[0, -6, 0]}>
                  <Text
                     fontSize={1}
                     color="white"
                     anchorX="center"
                     anchorY="middle"
                  >
                     Professional camera
                  </Text>
               </mesh>

               <mesh position={[0, -8, 0]}>
                  <Text
                     fontSize={1}
                     color="white"
                     anchorX="center"
                     anchorY="middle"
                  >
                     Action button
                  </Text>
               </mesh>
            </div>
         </div>
      </main>
   );
};
