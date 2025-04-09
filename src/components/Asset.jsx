import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

export const Asset = ({ url, categoryName, skeleton }) => {
  const { scene } = useGLTF(url);
  const customization = useSelector(
    (state) => state.customization.customization
  );
  const assetColor = customization[categoryName].color;
  const skin = useSelector((state) => state.customization.skin);

  useEffect(() => {
    console.log(scene);
  }, [scene]);

  const attachedItems = useMemo(() => {
    const items = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        items.push({
          geometry: child.geometry,
          material: child.material.name.includes("Skin_")
            ? skin
            : child.material,
            morphTargetDictionary:child.morphTargetDictionary,
            morphTargetInfluences:child.morphTargetInfluences
        });
      }
    });
    return items;
  }, [scene]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material?.name.includes("Color_")) {
          child.material.color.set(assetColor);
        }
      }
    });
  }, [assetColor, scene]);

  return attachedItems.map((item, index) => (
    <skinnedMesh
      key={index}
      geometry={item.geometry}
      material={item.material}
      skeleton={skeleton}
      castShadow
      receiveShadow
      morphTargetDictionary={item.morphTargetDictionary}
      morphTargetInfluences={item.morphTargetInfluences}
    />
  ));
};
