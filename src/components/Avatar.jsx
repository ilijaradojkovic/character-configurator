import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLTFExporter } from "three-stdlib";
import { Asset } from "./Asset";
import { setDownload } from "../store/CustomizationStore";

export const Avatar = ({ ...props }) => {
  const group = useRef();
  const dispatch=useDispatch()
  const { nodes } = useGLTF("./models/Armature.glb");
  const { animations } = useFBX("./models/Idle.fbx");
   const customization = useSelector(state => state.customization.customization)
  const { actions } = useAnimations(animations, group);


  useEffect(() => {
    function download() {
      const exporter = new GLTFExporter();
      exporter.parse(
        group.current,
        function (result) {
          save(
            new Blob([result], { type: "application/octet-stream" }),
            `avatar_${+new Date()}.glb`
          );
        },
        function (error) {
          console.error(error);
        },
        { binary: true }
      );
    }

    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link); // Firefox workaround, see #6594

    function save(blob, filename) {
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
    dispatch(setDownload(download));
  }, []);

  useEffect(() => {
    actions["mixamo.com"]?.play();
  }, [actions]);


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature"  rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {Object.keys(customization).map(
            (key) =>
            {
              console.log(customization[key])
            
             return  customization[key].asset?.model && (
                <Suspense key={customization[key].asset.model}>
                  <Asset
                    categoryName={key}
                    url={
                      customization[key].asset.model
                    }
                    skeleton={nodes.Plane.skeleton}
                  />
                </Suspense>
              )
            }
          )}
        </group>
      </group>
    </group>
  );
};