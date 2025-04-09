import React from "react";
import { Avatar } from "./Avatar";
import {
  Backdrop,
  Environment,
  OrbitControls,
  SoftShadows,
} from "@react-three/drei";
import CameraManager from "./CameraManager";

export default function Expirience() {
  return (
    <>
      <CameraManager/>
      <Environment preset="sunset" environmentIntensity={0.3} />

      {/* <Backdrop scale={[50, 10, 5]} floor={1.5} receiveShadow position-z={-4}>
        <meshStandardMaterial color="#555" />
      </Backdrop> */}
      <mesh receiveShadow rotation-x={-Math.PI/2}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#333" roughness={0.85} />
      </mesh>

      <SoftShadows size={52} samples={16} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={2.2}
        castShadow
        shadow-mapWidth={2048}
        shadow-mapHeight={2048}
        shadow-bias={-0.0001}
      />

      <directionalLight position={[-5, 5, 5]} intensity={0.7} />


      <directionalLight position={[3, 3, -5]} intensity={6} color={"#ff3b3b"} />

      <directionalLight position={[-3, 3, -5]} intensity={8} color={"#3cb1ff"} />

      <Avatar />
    </>
  );
}
