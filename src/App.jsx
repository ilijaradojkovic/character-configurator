import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { UI } from "./components/Ui";
import Expirience from "./components/Expirience";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DEFAULT_CAMERA_POSITION, initCustomization } from "./store/CustomizationStore";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initCustomization());
  }, []);
  return (
    <>
      <UI />
      <Canvas
        camera={{
          position: DEFAULT_CAMERA_POSITION,
          fov:45
        }}
        shadows
      >
        <color attach="background" args={["#555"]} />
        <fog attach="fog" args={["#130f30", 10, 40]} />
        <group position-y={-1}>
          <Expirience />
        </group>
      </Canvas>
    </>
  );
}

export default App;
