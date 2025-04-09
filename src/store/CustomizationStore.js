// store/customizationSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { MeshStandardMaterial } from "three";
import { color } from "three/webgpu";

export const DEFAULT_CAMERA_POSITION=[-1,1,5]
export const DEFAULT_TARGET_POSITION=[0,0,0]

const categories = [
  {
    id: 1,
    name: "Head",
    assets: [
      { id: 1, thumbnail: "./head/thumbnail/Head.001.png", model: "./head/Head.001.glb" },
      { id: 2, thumbnail: "./head/thumbnail/Head.002.png", model: "./head/Head.002.glb" },
      { id: 3, thumbnail: "./head/thumbnail/Head.003.png", model: "./head/Head.003.glb" },
      { id: 4, thumbnail: "./head/thumbnail/Head.004.png", model: "./head/Head.004.glb" },
    ],
    colors: ["#f5c6a5", "#e0ac69", "#c68642", "#b47c4d", "#a47148", "#916846"],
    removable: false,
    cameraPlacement: {position: [  -0.16766,  0.96057,  2.72066 ],target:[-0.1359,0.5175,-0.1467]},
  },
  {
    id: 2,
    name: "Hair",
    assets: [
      { id: 1, thumbnail: "./hair/thumbnail/Hair.001.png", model: "./hair/Hair.001.glb" },
      { id: 2, thumbnail: "./hair/thumbnail/Hair.002.png", model: "./hair/Hair.002.glb" },
      { id: 3, thumbnail: "./hair/thumbnail/Hair.003.png", model: "./hair/Hair.003.glb" },
      { id: 4, thumbnail: "./hair/thumbnail/Hair.004.png", model: "./hair/Hair.004.glb" },
      { id: 5, thumbnail: "./hair/thumbnail/Hair.005.png", model: "./hair/Hair.005.glb" },
      { id: 6, thumbnail: "./hair/thumbnail/Hair.006.png", model: "./hair/Hair.006.glb" },
      { id: 7, thumbnail: "./hair/thumbnail/Hair.007.png", model: "./hair/Hair.007.glb" },
      { id: 8, thumbnail: "./hair/thumbnail/Hair.008.png", model: "./hair/Hair.008.glb" },
      { id: 9, thumbnail: "./hair/thumbnail/Hair.009.png", model: "./hair/Hair.009.glb" },
      { id: 10,thumbnail: "./hair/thumbnail/Hair.010.png", model: "./hair/Hair.010.glb" },
      { id: 11,thumbnail: "./hair/thumbnail/Hair.011.png", model: "./hair/Hair.011.glb" },
    ],
    colors: [
      "#0B0B0B", // Black
      "#3B2F2F", // Dark Brown
      "#5C4033", // Brown
      "#A1866F", // Light Brown
      "#FFD700", // Golden Blonde
      "#F3E2A9", // Blonde
      "#F5F5DC", // Platinum Blonde
      "#D8CAB8", // Ash Blonde
      "#A52A2A", // Auburn
      "#B55239", // Red
      "#F4C2C2", // Strawberry Blonde
      "#B06500", // Ginger
      "#B6B6B4", // Gray
      "#C0C0C0", // Silver
      "#FFFFFF", // White
      "#3B9C9C", // Blue
      "#FFC0CB", // Pink
      "#800080", // Purple
      "#3CB371", // Green
      "#40E0D0", // Turquoise
      "#E6E6FA", // Lavender
      "#800020", // Burgundy
      "#FFD1DC", // Pastel Pink
      "#B76E79", // Rose Gold
      "#008080", // Teal
      "#A9746E", // Ombre base
      "#C89F81", // Balayage base
      "#F5DEB3", // Highlights
      "#954535", // Chestnut
      "#DDB67D", // Honey Blonde
    ],
    removable: false,
    cameraPlacement: { position: [ -2.4407,  1.3563,  2.8465 ],target:[0.00687,0.5819,-0.2284]},

  },
  {
    id: 3,
    name: "Eyes",
    assets: [
      { id: 1, thumbnail: "./eyes/thumbnail/Eyes.001.png", model: "./eyes/Eyes.001.glb" },
      { id: 2, thumbnail: "./eyes/thumbnail/Eyes.002.png", model: "./eyes/Eyes.002.glb" },
      { id: 3, thumbnail: "./eyes/thumbnail/Eyes.003.png", model: "./eyes/Eyes.003.glb" },
      { id: 4, thumbnail: "./eyes/thumbnail/Eyes.004.png", model: "./eyes/Eyes.004.glb" },
      { id: 5, thumbnail: "./eyes/thumbnail/Eyes.005.png", model: "./eyes/Eyes.005.glb" },
      { id: 6, thumbnail: "./eyes/thumbnail/Eyes.006.png", model: "./eyes/Eyes.006.glb" },
      { id: 7, thumbnail: "./eyes/thumbnail/Eyes.007.png", model: "./eyes/Eyes.007.glb" },
      { id: 8, thumbnail: "./eyes/thumbnail/Eyes.008.png", model: "./eyes/Eyes.008.glb" },
      { id: 9, thumbnail: "./eyes/thumbnail/Eyes.009.png", model: "./eyes/Eyes.009.glb" },
      { id: 10, thumbnail: "./eyes/thumbnail/Eyes.010.png", model: "./eyes/Eyes.010.glb" },
      { id: 11, thumbnail: "./eyes/thumbnail/Eyes.011.png", model: "./eyes/Eyes.011.glb" },
      { id: 12, thumbnail: "./eyes/thumbnail/Eyes.012.png", model: "./eyes/Eyes.012.glb" },
    ],
    colors: [],
    removable: false,

  },
  {
    id: 4,
    name: "Face",
    assets: [
      { id: 1, thumbnail: "./face/thumbnail/Face.001.png", model: "./face/Face.001.glb" },
      { id: 2, thumbnail: "./face/thumbnail/Face.002.png", model: "./face/Face.002.glb" },
      { id: 3, thumbnail: "./face/thumbnail/Face.003.png", model: "./face/Face.003.glb" },
      { id: 4, thumbnail: "./face/thumbnail/Face.004.png", model: "./face/Face.004.glb" },
      { id: 5, thumbnail: "./face/thumbnail/Face.005.png", model: "./face/Face.005.glb" },
      { id: 6, thumbnail: "./face/thumbnail/Face.006.png", model: "./face/Face.006.glb" },
      { id: 7, thumbnail: "./face/thumbnail/Face.007.png", model: "./face/Face.007.glb" },

    ],
    colors: [],
    removable: false,

  },
  {
    id: 5,
    name: "Eyebrows",
    assets: [
      {
        id: 1,
        thumbnail: "./eyebrow/thumbnail/EyeBrow.001.png",
        model: "./eyebrow/EyeBrow.001.glb",
      },
      {
        id: 2,
        thumbnail: "./eyebrow/thumbnail/EyeBrow.002.png",
        model: "./eyebrow/EyeBrow.002.glb",
      },
      {
        id: 3,
        thumbnail: "./eyebrow/thumbnail/EyeBrow.003.png",
        model: "./eyebrow/EyeBrow.003.glb",
      },
      {
        id: 4,
        thumbnail: "./eyebrow/thumbnail/EyeBrow.004.png",
        model: "./eyebrow/EyeBrow.004.glb",
      },
      {
        id: 5,
        thumbnail: "./eyebrow/thumbnail/EyeBrow.005.png",
        model: "./eyebrow/EyeBrow.005.glb",
      },
      {
        id: 6,
        thumbnail: "./eyebrow/thumbnail/EyeBrow.006.png",
        model: "./eyebrow/EyeBrow.006.glb",
      },
      {
        id: 7,
        thumbnail: "./eyebrow/thumbnail/EyeBrow.007.png",
        model: "./eyebrow/EyeBrow.007.glb",
      },
      {
        id: 8,
        thumbnail: "./eyebrow/thumbnail/EyeBrow.008.png",
        model: "./eyebrow/EyeBrow.008.glb",
      },
      {
        id: 9,
        thumbnail: "./eyebrow/thumbnail/EyeBrow.009.png",
        model: "./eyebrow/EyeBrow.009.glb",
      },
      {
        id: 10,
        thumbnail: "./eyebrow/thumbnail/EyeBrow.010.png",
        model: "./eyebrow/EyeBrow.010.glb",
      },
    ],
    colors: [],
    removable: true,

  },
  {
    id: 6,
    name: "Nose",
    assets: [
      { id: 1, thumbnail: "./nose/thumbnail/Nose.001.png", model: "./nose/Nose.001.glb" },
      { id: 2, thumbnail: "./nose/thumbnail/Nose.002.png", model: "./nose/Nose.002.glb" },
      { id: 3, thumbnail: "./nose/thumbnail/Nose.003.png", model: "./nose/Nose.003.glb" },
      { id: 4, thumbnail: "./nose/thumbnail/Nose.004.png", model: "./nose/Nose.004.glb" },
    ],
    colors: [],
    removable: false,

  },
  {
    id: 7,
    name: "Facial Hair",
    assets: [
      {
        id: 1,
        thumbnail: "./facialhair/thumbnail/FacialHair.001.png",
        model: "./facialhair/FacialHair.001.glb",
      },
      {
        id: 2,
        thumbnail: "./facialhair/thumbnail/FacialHair.002.png",
        model: "./facialhair/FacialHair.002.glb",
      },
      {
        id: 3,
        thumbnail: "./facialhair/thumbnail/FacialHair.003.png",
        model: "./facialhair/FacialHair.003.glb",
      },
      {
        id: 4,
        thumbnail: "./facialhair/thumbnail/FacialHair.004.png",
        model: "./facialhair/FacialHair.004.glb",
      },
      {
        id: 5,
        thumbnail: "./facialhair/thumbnail/FacialHair.005.png",
        model: "./facialhair/FacialHair.005.glb",
      },
      {
        id: 6,
        thumbnail: "./facialhair/thumbnail/FacialHair.006.png",
        model: "./facialhair/FacialHair.006.glb",
      },
      {
        id: 7,
        thumbnail: "./facialhair/thumbnail/FacialHair.007.png",
        model: "./facialhair/FacialHair.007.glb",
      },
    ],
    colors: [],
    removable: false,

  },
  {
    id: 8,
    name: "Glasses",
    assets: [
      {
        id: 1,
        thumbnail: "./glasses/thumbnail/Glasses.001.png",
        model: "./glasses/Glasses.001.glb",
      },
      {
        id: 2,
        thumbnail: "./glasses/thumbnail/Glasses.002.png",
        model: "./glasses/Glasses.002.glb",
      },
      {
        id: 3,
        thumbnail: "./glasses/thumbnail/Glasses.003.png",
        model: "./glasses/Glasses.003.glb",
      },
      {
        id: 4,
        thumbnail: "./glasses/thumbnail/Glasses.004.png",
        model: "./glasses/Glasses.004.glb",
      },
    ],
    colors:[],
    removable: false,

  },
  {
    id: 9,
    name: "Hat",
    assets: [
      { id: 1, thumbnail: "./hat/thumbnail/Hat.001.png", model: "./hat/Hat.001.glb" },
      { id: 2, thumbnail: "./hat/thumbnail/Hat.002.png", model: "./hat/Hat.002.glb" },
      { id: 3, thumbnail: "./hat/thumbnail/Hat.003.png", model: "./hat/Hat.003.glb" },
      { id: 4, thumbnail: "./hat/thumbnail/Hat.004.png", model: "./hat/Hat.004.glb" },
      { id: 5, thumbnail: "./hat/thumbnail/Hat.005.png", model: "./hat/Hat.005.glb" },
      { id: 6, thumbnail: "./hat/thumbnail/Hat.006.png", model: "./hat/Hat.006.glb" },
      { id: 7, thumbnail: "./hat/thumbnail/Hat.007.png", model: "./hat/Hat.007.glb" },
    ],
    colors:[],
    removable: false,

  },
  {
    id: 10,
    name: "Top",

    assets: [
      { id: 1, thumbnail: "./top/thumbnail/Top.001.png", model: "./top/Top.001.glb" },
      { id: 2, thumbnail: "./top/thumbnail/Top.002.png", model: "./top/Top.002.glb" },
      { id: 3, thumbnail: "./top/thumbnail/Top.003.png", model: "./top/Top.003.glb" },
    ],
    colors: [
      "#000000", // Black
      "#FFFFFF", // White
      "#808080", // Gray
      "#A9A9A9", // Dark Gray
      "#D3D3D3", // Light Gray
      "#C0C0C0", // Silver
      "#F5F5DC", // Beige
      "#DEB887", // Tan
      "#8B4513", // Saddle Brown
      "#654321", // Dark Brown
      "#A52A2A", // Brown
      "#800000", // Maroon
      "#B22222", // Firebrick
      "#FF0000", // Red
      "#FF6347", // Tomato
      "#FFA07A", // Light Salmon
      "#FF8C00", // Dark Orange
      "#FFA500", // Orange
      "#FFD700", // Gold
      "#FFFF00", // Yellow
      "#9ACD32", // Yellow Green
      "#32CD32", // Lime Green
      "#006400", // Dark Green
      "#2E8B57", // Sea Green
      "#00CED1", // Dark Turquoise
      "#4682B4", // Steel Blue
      "#1E90FF", // Dodger Blue
      "#0000FF", // Blue
      "#4B0082", // Indigo
      "#800080", // Purple
      "#DA70D6", // Orchid
      "#FF69B4", // Hot Pink
      "#FFC0CB", // Pink
      "#F0E68C", // Khaki
      "#BC8F8F", // Rosy Brown
      "#708090", // Slate Gray
    ],
    removable: false,
    cameraPlacement: { position:[  -2.0044,  0.42439,  3.97012],target:[-0.03577,-0.3408,0.01875] },

  },
  {
    id: 11,
    name: "Bottom",
    assets: [
      { id: 1, thumbnail: "./bottom/thumbnail/Bottom.001.png", model: "./bottom/Bottom.001.glb" },
      { id: 2, thumbnail: "./bottom/thumbnail/Bottom.002.png", model: "./bottom/Bottom.002.glb" },
      { id: 3, thumbnail: "./bottom/thumbnail/Bottom.003.png", model: "./bottom/Bottom.003.glb" },

    ],
    colors: [
      "#000000", // Black
      "#FFFFFF", // White
      "#808080", // Gray
      "#A9A9A9", // Dark Gray
      "#D3D3D3", // Light Gray
      "#C0C0C0", // Silver
      "#F5F5DC", // Beige
      "#DEB887", // Tan
      "#8B4513", // Saddle Brown
      "#654321", // Dark Brown
      "#A52A2A", // Brown
      "#800000", // Maroon
      "#B22222", // Firebrick
      "#FF0000", // Red
      "#FF6347", // Tomato
      "#FFA07A", // Light Salmon
      "#FF8C00", // Dark Orange
      "#FFA500", // Orange
      "#FFD700", // Gold
      "#FFFF00", // Yellow
      "#9ACD32", // Yellow Green
      "#32CD32", // Lime Green
      "#006400", // Dark Green
      "#2E8B57", // Sea Green
      "#00CED1", // Dark Turquoise
      "#4682B4", // Steel Blue
      "#1E90FF", // Dodger Blue
      "#0000FF", // Blue
      "#4B0082", // Indigo
      "#800080", // Purple
      "#DA70D6", // Orchid
      "#FF69B4", // Hot Pink
      "#FFC0CB", // Pink
      "#F0E68C", // Khaki
      "#BC8F8F", // Rosy Brown
      "#708090", // Slate Gray
    ],
    removable: false,
    cameraPlacement: {  position:[ 1.31022,  0.1770, 3.1628 ],target:[-0.09061,-0.8600,0.1094]},

  },
  {
    id: 12,
    name: "Shoe",
    assets: [
      { id: 1, thumbnail: "./shoe/thumbnail/Shoes.001.png", model: "./shoe/Shoes.001.glb" },
      { id: 2, thumbnail: "./shoe/thumbnail/Shoes.002.png", model: "./shoe/Shoes.002.glb" },
      { id: 3, thumbnail: "./shoe/thumbnail/Shoes.003.png", model: "./shoe/Shoes.003.glb" },
    ],
    colors: [
      "#000000", // Black
      "#FFFFFF", // White
      "#808080", // Gray
      "#A9A9A9", // Dark Gray
      "#D3D3D3", // Light Gray
      "#C0C0C0", // Silver
      "#F5F5DC", // Beige
      "#DEB887", // Tan
      "#8B4513", // Saddle Brown
      "#654321", // Dark Brown
      "#A52A2A", // Brown
      "#800000", // Maroon
      "#B22222", // Firebrick
      "#FF0000", // Red
      "#FF6347", // Tomato
      "#FFA07A", // Light Salmon
      "#FF8C00", // Dark Orange
      "#FFA500", // Orange
      "#FFD700", // Gold
      "#FFFF00", // Yellow
      "#9ACD32", // Yellow Green
      "#32CD32", // Lime Green
      "#006400", // Dark Green
      "#2E8B57", // Sea Green
      "#00CED1", // Dark Turquoise
      "#4682B4", // Steel Blue
      "#1E90FF", // Dodger Blue
      "#0000FF", // Blue
      "#4B0082", // Indigo
      "#800080", // Purple
      "#DA70D6", // Orchid
      "#FF69B4", // Hot Pink
      "#FFC0CB", // Pink
      "#F0E68C", // Khaki
      "#BC8F8F", // Rosy Brown
      "#708090", // Slate Gray
    ],
    removable: false,

  },
  // { id: 13, name: "Accessories", assets: [] },
];

const initialState = {
  categories,
  currentCategory: categories[0], // <-- ispravno sad
  customization: {},
  download: () => {},
  skin: new MeshStandardMaterial({ color: 0xf5c6a5, roughness: 1 }),
};

export const customizationSlice = createSlice({
  name: "customization",
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setAssetForCategory: (state, action) => {
      const { category, asset } = action.payload;
      state.customization[category.name].asset = asset;
    },

    setColorForCategory: (state, action) => {
      const { category, color } = action.payload;
      state.customization[category.name].color = color;
      if (state.currentCategory.name === "Head") {
        state.skin.color.set(color);
      }
    },
    initCustomization: (state) => {
      const customization = {};
      categories.forEach((category) => {
        customization[category.name] = {
          asset: category.assets[0],
          color: category.colors[0] || "",
        };
      });
      state.customization = customization;
    },
    setDownload: (state, action) => {
      state.download = action.payload;
    },
  },
});

export const {
  setCurrentCategory,
  setDownload,
  setAssetForCategory,
  initCustomization,
  setColorForCategory,
  updateSkin,
} = customizationSlice.actions;
