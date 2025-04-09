import { CameraControls } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DEFAULT_CAMERA_POSITION, DEFAULT_TARGET_POSITION } from "../store/CustomizationStore";

export default function CameraManager() {
    const controls=useRef()
    const currentCategory = useSelector(state => state.customization.currentCategory)

    useEffect(()=>{
            if(currentCategory.cameraPlacement){
                controls.current.setLookAt(
                    ...currentCategory.cameraPlacement.position,
                    ...currentCategory.cameraPlacement.target,
                    true              
                  )
            }else{
                controls.current.setLookAt(
                    ...DEFAULT_CAMERA_POSITION,
                    ...DEFAULT_TARGET_POSITION,
                    true               
                 )
            }
    },[currentCategory])
  return (
    <CameraControls
        ref={controls}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
    //   minAzimuthAngle={-Math.PI / 4}
    //   maxAzimuthAngle={Math.PI / 4}
        minDistance={2}
        maxDistance={8}
    />
  );
}
