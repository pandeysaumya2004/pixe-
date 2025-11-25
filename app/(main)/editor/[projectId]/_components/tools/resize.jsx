// // // "use client";

// // // import React, { useState } from "react";
// // // import { useCanvas } from "@/context/context";
// // // import { api } from "@/convex/_generated/api";
// // // import { useMutation } from "convex/react";

// // // const ASPECT_RATIOS = [
// // //   { name: "Instagram Story", ratio: [9, 16], label: "9:16" },
// // //   { name: "Instagram Post", ratio: [1, 1], label: "1:1" },
// // //   { name: "Youtube Thumbnail", ratio: [16, 9], label: "16:9" },
// // //   { name: "Portrait", ratio: [2, 3], label: "2:3" },
// // //   { name: "Facebook Cover", ratio: [851, 315], label: "2.7:1" },
// // //   { name: "Twitter Header", ratio: [3, 1], label: "3:1" }
// // // ];

// // // const ResizeControls = ({ project }) => {
// // //   const { canvasEditor, processingMessage, setProcessingMessage } = useCanvas();

// // //   const [newWidth, setNewWidth] = useState(project?.width || 800);
// // //   const [newHeight, setNewHeight] = useState(project?.height || 600);
// // //   const [lockAspectRatio, setLockAspectRatio] = useState(true);
// // //   const [selectedPreset, setSelectedPreset] = useState(null);

// // //   // ONLY THIS LINE CHANGED (useMutation instead of useConvexMutation)
// // //   const updateProject = useMutation(api.projects.updateProject);

// // //   if (!canvasEditor || !project) {
// // //     return (
// // //       <div className="p-4">
// // //         <p className="text-white/70 text-sm">Canvas not ready</p>
// // //       </div>
// // //     );
// // //   }

// // //   const hasChanges =
// // //     newWidth !== project.width || newHeight !== project.height;

// // //   return (
// // //     <div className="space">
// // //       <div className="bg-slate-700/30 rounded-lg p-3">
// // //         <h4 className="text-sm font-medium text-white mb-2">Current Size</h4>
// // //         <div className="text-xs text-white/70">
// // //           {project.width} × {project.height} pixels
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ResizeControls;
// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Expand, Lock, Unlock, Monitor } from "lucide-react";
// // import { useCanvas } from "@/context/context";
// // import { useConvexMutation } from "@/hooks/use-convex-query";
// // import { api } from "@/convex/_generated/api";

// // // Common aspect ratios
// // const ASPECT_RATIOS = [
// //   { name: "Instagram Story", ratio: [9, 16], label: "9:16" },
// //   { name: "Instagram Post", ratio: [1, 1], label: "1:1" },
// //   { name: "Youtube Thumbnail", ratio: [16, 9], label: "16:9" },
// //   { name: "Portrait", ratio: [2, 3], label: "2:3" },
// //   { name: "Facebook Cover", ratio: [851, 315], label: "2.7:1" },
// //   { name: "Twitter Header", ratio: [3, 1], label: "3:1" },
// // ];

// // export function ResizeControls({ project }) {
// //   const { canvasEditor, processingMessage, setProcessingMessage } = useCanvas();
// //   const [newWidth, setNewWidth] = useState(project?.width || 800);
// //   const [newHeight, setNewHeight] = useState(project?.height || 600);
// //   const [lockAspectRatio, setLockAspectRatio] = useState(true);
// //   const [selectedPreset, setSelectedPreset] = useState(null);

// //   const {
// //     mutate: updateProject,
// //     data,
// //     isLoading,
// //   } = useConvexMutation(api.projects.updateProject);

// //   useEffect(() => {
// //     if (!isLoading && data) {
// //       window.location.reload();
// //     }
// //   }),
// //     [data, isLoading];

// //   // Calculate dimensions for aspect ratio based on original canvas size
// //   const calculateAspectRatioDimensions = (ratio) => {
// //     if (!project) return { width: project.width, height: project.height };

// //     const [ratioW, ratioH] = ratio;
// //     const originalArea = project.width * project.height;

// //     // Calculate new dimensions maintaining the same area approximately
// //     const aspectRatio = ratioW / ratioH;
// //     const newHeight = Math.sqrt(originalArea / aspectRatio);
// //     const newWidth = newHeight * aspectRatio;

// //     return {
// //       width: Math.round(newWidth),
// //       height: Math.round(newHeight),
// //     };
// //   };

// //   // Handle width change with aspect ratio lock
// //   const handleWidthChange = (value) => {
// //     const width = parseInt(value) || 0;
// //     setNewWidth(width);

// //     if (lockAspectRatio && project) {
// //       const ratio = project.height / project.width;
// //       setNewHeight(Math.round(width * ratio));
// //     }
// //     setSelectedPreset(null);
// //   };

// //   // Handle height change with aspect ratio lock
// //   const handleHeightChange = (value) => {
// //     const height = parseInt(value) || 0;
// //     setNewHeight(height);

// //     if (lockAspectRatio && project) {
// //       const ratio = project.width / project.height;
// //       setNewWidth(Math.round(height * ratio));
// //     }
// //     setSelectedPreset(null);
// //   };

// //   // Apply aspect ratio preset
// //   const applyAspectRatio = (aspectRatio) => {
// //     const dimensions = calculateAspectRatioDimensions(aspectRatio.ratio);
// //     setNewWidth(dimensions.width);
// //     setNewHeight(dimensions.height);
// //     setSelectedPreset(aspectRatio.name);
// //   };

// //   // Calculate viewport scale to fit canvas in container
// //   const calculateViewportScale = () => {
// //     const container = canvasEditor.getElement().parentNode;
// //     if (!container) return 1;
// //     const containerWidth = container.clientWidth - 40;
// //     const containerHeight = container.clientHeight - 40;
// //     const scaleX = containerWidth / newWidth;
// //     const scaleY = containerHeight / newHeight;
// //     return Math.min(scaleX, scaleY, 1);
// //   };

// //   // Apply canvas resize
// //   const handleApplyResize = async () => {
// //     if (
// //       !canvasEditor ||
// //       !project ||
// //       (newWidth === project.width && newHeight === project.height)
// //     ) {
// //       return;
// //     }

// //     setProcessingMessage("Resizing canvas...");

// //     try {
// //       // Resize the canvas
// //       canvasEditor.setWidth(newWidth);
// //       canvasEditor.setHeight(newHeight);

// //       // Calculate and apply viewport scale
// //       const viewportScale = calculateViewportScale();

// //       canvasEditor.setDimensions(
// //         {
// //           width: newWidth * viewportScale,
// //           height: newHeight * viewportScale,
// //         },
// //         { backstoreOnly: false }
// //       );

// //       canvasEditor.setZoom(viewportScale);
// //       canvasEditor.calcOffset();
// //       canvasEditor.requestRenderAll();

// //       // Update project in database
// //       await updateProject({
// //         projectId: project._id,
// //         width: newWidth,
// //         height: newHeight,
// //         canvasState: canvasEditor.toJSON(),
// //       });
// //     } catch (error) {
// //       console.error("Error resizing canvas:", error);
// //       alert("Failed to resize canvas. Please try again.");
// //     } finally {
// //       setProcessingMessage(null);
// //     }
// //   };

// //   if (!canvasEditor || !project) {
// //     return (
// //       <div className="p-4">
// //         <p className="text-white/70 text-sm">Canvas not ready</p>
// //       </div>
// //     );
// //   }

// //   const hasChanges = newWidth !== project.width || newHeight !== project.height;

// //   return (
// //     <div className="space-y-6">
// //       {/* Current Size Display */}
// //       <div className="bg-slate-700/30 rounded-lg p-3">
// //         <h4 className="text-sm font-medium text-white mb-2">Current Size</h4>
// //         <div className="text-xs text-white/70">
// //           {project.width} × {project.height} pixels
// //         </div>
// //       </div>

// //       {/* Manual Size Input */}
// //       <div className="space-y-4">
// //         <div className="flex items-center justify-between mb-2">
// //           <h3 className="text-sm font-medium text-white">Custom Size</h3>
// //           <Button
// //             variant="ghost"
// //             size="sm"
// //             onClick={() => setLockAspectRatio(!lockAspectRatio)}
// //             className="text-white/70 hover:text-white p-1"
// //           >
// //             {lockAspectRatio ? (
// //               <Lock className="h-4 w-4" />
// //             ) : (
// //               <Unlock className="h-4 w-4" />
// //             )}
// //           </Button>
// //         </div>

// //         <div className="grid grid-cols-2 gap-3">
// //           <div>
// //             <label className="text-xs text-white/70 mb-1 block">Width</label>
// //             <Input
// //               type="number"
// //               value={newWidth}
// //               onChange={(e) => handleWidthChange(e.target.value)}
// //               min="100"
// //               max="5000"
// //               className="bg-slate-700 border-white/20 text-white"
// //             />
// //           </div>
// //           <div>
// //             <label className="text-xs text-white/70 mb-1 block">Height</label>
// //             <Input
// //               type="number"
// //               value={newHeight}
// //               onChange={(e) => handleHeightChange(e.target.value)}
// //               min="100"
// //               max="5000"
// //               className="bg-slate-700 border-white/20 text-white"
// //             />
// //           </div>
// //         </div>

// //         <div className="flex items-center justify-between text-xs">
// //           <span className="text-white/70">
// //             {lockAspectRatio ? "Aspect ratio locked" : "Free resize"}
// //           </span>
// //         </div>
// //       </div>

// //       {/* Aspect Ratio Presets */}
// //       <div className="space-y-3">
// //         <h3 className="text-sm font-medium text-white">Aspect Ratios</h3>
// //         <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
// //           {ASPECT_RATIOS.map((aspectRatio) => {
// //             const dimensions = calculateAspectRatioDimensions(
// //               aspectRatio.ratio
// //             );
// //             return (
// //               <Button
// //                 key={aspectRatio.name}
// //                 variant={
// //                   selectedPreset === aspectRatio.name ? "default" : "outline"
// //                 }
// //                 size="sm"
// //                 onClick={() => applyAspectRatio(aspectRatio)}
// //                 className={`justify-between h-auto py-2 ${
// //                   selectedPreset === aspectRatio.name
// //                     ? "bg-cyan-500 hover:bg-cyan-600"
// //                     : "text-left"
// //                 }`}
// //               >
// //                 <div>
// //                   <div className="font-medium">{aspectRatio.name}</div>
// //                   <div className="text-xs opacity-70">
// //                     {dimensions.width} × {dimensions.height} (
// //                     {aspectRatio.label})
// //                   </div>
// //                 </div>
// //                 <Monitor className="h-4 w-4" />
// //               </Button>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* New Size Preview */}
// //       {hasChanges && (
// //         <div className="bg-slate-700/30 rounded-lg p-3">
// //           <h4 className="text-sm font-medium text-white mb-2">
// //             New Size Preview
// //           </h4>
// //           <div className="text-xs text-white/70">
// //             <div>
// //               New Canvas: {newWidth} × {newHeight} pixels
// //             </div>
// //             <div className="text-cyan-400">
// //               {newWidth > project.width || newHeight > project.height
// //                 ? "Canvas will be expanded"
// //                 : "Canvas will be cropped"}
// //             </div>
// //             <div className="text-white/50 mt-1">
// //               Objects will maintain their current size and position
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Apply Button */}
// //       <Button
// //         onClick={handleApplyResize}
// //         disabled={!hasChanges || processingMessage}
// //         className="w-full"
// //         variant="primary"
// //       >
// //         <Expand className="h-4 w-4 mr-2" />
// //         Apply Resize
// //       </Button>

// //       {/* Instructions */}
// //       <div className="bg-slate-700/30 rounded-lg p-3">
// //         <p className="text-xs text-white/70">
// //           <strong>Resize Canvas:</strong> Changes canvas dimensions.
// //           <br />
// //           <strong>Aspect Ratios:</strong> Smart sizing based on your current
// //           canvas.
// //           <br />
// //           Objects maintain their size and position.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }
// // export default ResizeControls;







// "use client";

// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Expand, Lock, Unlock, Monitor } from "lucide-react";
// import { useCanvas } from "@/context/context";
// import { useConvexMutation } from "@/hooks/use-convex-query";
// import { api } from "@/convex/_generated/api";

// const ASPECT_RATIOS = [
//   { name: "Instagram Story", ratio: [9, 16], label: "9:16" },
//   { name: "Instagram Post", ratio: [1, 1], label: "1:1" },
//   { name: "Youtube Thumbnail", ratio: [16, 9], label: "16:9" },
//   { name: "Portrait", ratio: [2, 3], label: "2:3" },
//   { name: "Facebook Cover", ratio: [851, 315], label: "2.7:1" },
//   { name: "Twitter Header", ratio: [3, 1], label: "3:1" },
// ];

// export function ResizeControls({ project }) {
//   const { canvasEditor, processingMessage, setProcessingMessage } = useCanvas();

//   const canvasReady = canvasEditor && project;

//   const [newWidth, setNewWidth] = useState(project?.width || 800);
//   const [newHeight, setNewHeight] = useState(project?.height || 600);
//   const [lockAspectRatio, setLockAspectRatio] = useState(true);
//   const [selectedPreset, setSelectedPreset] = useState(null);

//   const {
//     mutate: updateProject,
//     data,
//     isLoading,
//   } = useConvexMutation(api.projects.updateProject);

//   useEffect(() => {
//     if (!isLoading && data) {
//       window.location.reload();
//     }
//   }, [data, isLoading]);

//   const calculateAspectRatioDimensions = (ratio) => {
//     if (!project) return { width: newWidth, height: newHeight };

//     const [ratioW, ratioH] = ratio;
//     const originalArea = project.width * project.height;

//     const aspectRatio = ratioW / ratioH;
//     const newHeightCalc = Math.sqrt(originalArea / aspectRatio);
//     const newWidthCalc = newHeightCalc * aspectRatio;

//     return {
//       width: Math.round(newWidthCalc),
//       height: Math.round(newHeightCalc),
//     };
//   };

//   const handleWidthChange = (value) => {
//     const width = parseInt(value) || 0;
//     setNewWidth(width);

//     if (lockAspectRatio && project) {
//       const ratio = project.height / project.width;
//       setNewHeight(Math.round(width * ratio));
//     }
//     setSelectedPreset(null);
//   };

//   const handleHeightChange = (value) => {
//     const height = parseInt(value) || 0;
//     setNewHeight(height);

//     if (lockAspectRatio && project) {
//       const ratio = project.width / project.height;
//       setNewWidth(Math.round(height * ratio));
//     }
//     setSelectedPreset(null);
//   };

//   const applyAspectRatio = (aspectRatio) => {
//     const dimensions = calculateAspectRatioDimensions(aspectRatio.ratio);
//     setNewWidth(dimensions.width);
//     setNewHeight(dimensions.height);
//     setSelectedPreset(aspectRatio.name);
//   };

//   const calculateViewportScale = () => {
//     if (!canvasEditor) return 1;

//     const container = canvasEditor.getElement().parentNode;
//     if (!container) return 1;

//     const containerWidth = container.clientWidth - 40;
//     const containerHeight = container.clientHeight - 40;

//     const scaleX = containerWidth / newWidth;
//     const scaleY = containerHeight / newHeight;

//     return Math.min(scaleX, scaleY, 1);
//   };

//   const handleApplyResize = async () => {
//     if (!canvasReady) return;

//     if (newWidth === project.width && newHeight === project.height) return;

//     setProcessingMessage("Resizing canvas...");

//     try {
//       canvasEditor.setWidth(newWidth);
//       canvasEditor.setHeight(newHeight);

//       const viewportScale = calculateViewportScale();

//       canvasEditor.setDimensions(
//         {
//           width: newWidth * viewportScale,
//           height: newHeight * viewportScale,
//         },
//         { backstoreOnly: false }
//       );

//       canvasEditor.setZoom(viewportScale);
//       canvasEditor.calcOffset();
//       canvasEditor.requestRenderAll();

//       await updateProject({
//         projectId: project._id,
//         width: newWidth,
//         height: newHeight,
//         canvasState: canvasEditor.toJSON(),
//       });
//     } catch (error) {
//       console.error("Error resizing canvas:", error);
//       alert("Failed to resize canvas. Please try again.");
//     } finally {
//       setProcessingMessage(null);
//     }
//   };

//   const hasChanges =
//     project && (newWidth !== project.width || newHeight !== project.height);

//   return (
//     <div className="space-y-6">
//       <div className="bg-slate-700/30 rounded-lg p-3">
//         <h4 className="text-sm font-medium text-white mb-2">Current Size</h4>
//         <div className="text-xs text-white/70">
//           {project?.width} × {project?.height} pixels
//         </div>
//       </div>

//       <div className="space-y-4">
//         <div className="flex items-center justify-between mb-2">
//           <h3 className="text-sm font-medium text-white">Custom Size</h3>
//           <Button
//             variant="ghost"
//             size="sm"
//             disabled={!canvasReady}
//             onClick={() => setLockAspectRatio(!lockAspectRatio)}
//             className="text-white/70 hover:text-white p-1"
//           >
//             {lockAspectRatio ? (
//               <Lock className="h-4 w-4" />
//             ) : (
//               <Unlock className="h-4 w-4" />
//             )}
//           </Button>
//         </div>

//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="text-xs text-white/70 mb-1 block">Width</label>
//             <Input
//               type="number"
//               value={newWidth}
//               onChange={(e) => handleWidthChange(e.target.value)}
//               min="100"
//               max="5000"
//               disabled={!canvasReady}
//               className="bg-slate-700 border-white/20 text-white"
//             />
//           </div>
//           <div>
//             <label className="text-xs text-white/70 mb-1 block">Height</label>
//             <Input
//               type="number"
//               value={newHeight}
//               onChange={(e) => handleHeightChange(e.target.value)}
//               min="100"
//               max="5000"
//               disabled={!canvasReady}
//               className="bg-slate-700 border-white/20 text-white"
//             />
//           </div>
//         </div>

//         <div className="flex items-center justify-between text-xs">
//           <span className="text-white/70">
//             {lockAspectRatio ? "Aspect ratio locked" : "Free resize"}
//           </span>
//         </div>
//       </div>

//       <div className="space-y-3">
//         <h3 className="text-sm font-medium text-white">Aspect Ratios</h3>
//         <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
//           {ASPECT_RATIOS.map((aspectRatio) => {
//             const dimensions = calculateAspectRatioDimensions(
//               aspectRatio.ratio
//             );

//             return (
//               <Button
//                 key={aspectRatio.name}
//                 variant={
//                   selectedPreset === aspectRatio.name ? "default" : "outline"
//                 }
//                 size="sm"
//                 disabled={!canvasReady}
//                 onClick={() => applyAspectRatio(aspectRatio)}
//                 className={`justify-between h-auto py-2 ${
//                   selectedPreset === aspectRatio.name
//                     ? "bg-cyan-500 hover:bg-cyan-600"
//                     : "text-left"
//                 }`}
//               >
//                 <div>
//                   <div className="font-medium">{aspectRatio.name}</div>
//                   <div className="text-xs opacity-70">
//                     {dimensions.width} × {dimensions.height} (
//                     {aspectRatio.label})
//                   </div>
//                 </div>
//                 <Monitor className="h-4 w-4" />
//               </Button>
//             );
//           })}
//         </div>
//       </div>

//       {hasChanges && (
//         <div className="bg-slate-700/30 rounded-lg p-3">
//           <h4 className="text-sm font-medium text-white mb-2">
//             New Size Preview
//           </h4>
//           <div className="text-xs text-white/70">
//             <div>
//               New Canvas: {newWidth} × {newHeight} pixels
//             </div>
//             <div className="text-cyan-400">
//               {newWidth > project.width || newHeight > project.height
//                 ? "Canvas will be expanded"
//                 : "Canvas will be cropped"}
//             </div>
//             <div className="text-white/50 mt-1">
//               Objects will maintain their current size and position
//             </div>
//           </div>
//         </div>
//       )}

//       <Button
//         onClick={handleApplyResize}
//         disabled={!canvasReady || !hasChanges || processingMessage}
//         className="w-full"
//         variant="primary"
//       >
//         <Expand className="h-4 w-4 mr-2" />
//         Apply Resize
//       </Button>

//       <div className="bg-slate-700/30 rounded-lg p-3">
//         <p className="text-xs text-white/70">
//           <strong>Resize Canvas:</strong> Changes canvas dimensions.
//           <br />
//           <strong>Aspect Ratios:</strong> Smart sizing based on your current
//           canvas.
//           <br />
//           Objects maintain their size and position.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ResizeControls;



"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Expand, Lock, Unlock, Monitor } from "lucide-react";
import { useCanvas } from "@/context/context";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";

// Aspect ratio presets
const ASPECT_RATIOS = [
  { name: "Instagram Story", ratio: [9, 16], label: "9:16" },
  { name: "Instagram Post", ratio: [1, 1], label: "1:1" },
  { name: "Youtube Thumbnail", ratio: [16, 9], label: "16:9" },
  { name: "Portrait", ratio: [2, 3], label: "2:3" },
  { name: "Facebook Cover", ratio: [851, 315], label: "2.7:1" },
  { name: "Twitter Header", ratio: [3, 1], label: "3:1" },
];

export function ResizeControls({ project }) {
  const { canvasEditor, processingMessage, setProcessingMessage } = useCanvas();

  const [newWidth, setNewWidth] = useState(project?.width || 800);
  const [newHeight, setNewHeight] = useState(project?.height || 600);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState(null);

  const { mutate: updateProject, data, isLoading } = useConvexMutation(
    api.projects.updateProject
  );

  useEffect(() => {
    if (!isLoading && data) {
      window.location.reload();
    }
  }, [data, isLoading]);

  const canvasReady = canvasEditor && project;

  // -------------------------------
  // Aspect Ratio helper
  // -------------------------------
  const calculateAspectRatioDimensions = (ratio) => {
    if (!project) return { width: newWidth, height: newHeight };

    const [rW, rH] = ratio;
    const originalArea = project.width * project.height;

    const aspect = rW / rH;
    const heightCalculated = Math.sqrt(originalArea / aspect);
    const widthCalculated = heightCalculated * aspect;

    return {
      width: Math.round(widthCalculated),
      height: Math.round(heightCalculated),
    };
  };

  // -------------------------------
  // Input change handlers
  // -------------------------------
  const handleWidthChange = (value) => {
    const width = parseInt(value) || 0;
    setNewWidth(width);

    if (lockAspectRatio && project) {
      const ratio = project.height / project.width;
      setNewHeight(Math.round(width * ratio));
    }

    setSelectedPreset(null);
  };

  const handleHeightChange = (value) => {
    const height = parseInt(value) || 0;
    setNewHeight(height);

    if (lockAspectRatio && project) {
      const ratio = project.width / project.height;
      setNewWidth(Math.round(height * ratio));
    }

    setSelectedPreset(null);
  };

  // -------------------------------
  // Apply aspect ratio preset
  // -------------------------------
  const applyAspectRatio = (preset) => {
    const dimensions = calculateAspectRatioDimensions(preset.ratio);
    setNewWidth(dimensions.width);
    setNewHeight(dimensions.height);
    setSelectedPreset(preset.name);
  };

  // -------------------------------
  // Correct viewport scale calculation
  // -------------------------------
  const calculateViewportScale = () => {
    if (!canvasEditor) return 1;

    const container = canvasEditor.getElement().parentNode;
    if (!container) return 1;

    const containerWidth = container.clientWidth - 40;
    const containerHeight = container.clientHeight - 40;

    const scaleX = containerWidth / newWidth;
    const scaleY = containerHeight / newHeight;

    return Math.min(scaleX, scaleY, 1);
  };

  // -------------------------------
  // APPLY RESIZE (fixed version)
  // -------------------------------
  const handleApplyResize = async () => {
    if (!canvasReady) return;

    if (newWidth === project.width && newHeight === project.height) return;

    setProcessingMessage("Resizing canvas...");

    try {
      // 1️⃣ Update actual fabric canvas size
      canvasEditor.setWidth(newWidth);
      canvasEditor.setHeight(newHeight);

      // 2️⃣ Calculate zoom AFTER resizing
      const viewportScale = calculateViewportScale();
      canvasEditor.setZoom(viewportScale);

      canvasEditor.requestRenderAll();

      // 3️⃣ Save new data
      await updateProject({
        projectId: project._id,
        width: newWidth,
        height: newHeight,
        canvasState: canvasEditor.toJSON(),
      });
    } catch (err) {
      console.error("Resize error:", err);
      alert("Failed to resize canvas.");
    } finally {
      setProcessingMessage(null);
    }
  };

  // -------------------------------
  const hasChanges =
    project &&
    (newWidth !== project.width || newHeight !== project.height);

  // ------------------------------- UI -------------------------------
  return (
    <div className="space-y-6">
      {/* Current Size */}
      <div className="bg-slate-700/30 rounded-lg p-3">
        <h4 className="text-sm font-medium text-white mb-2">Current Size</h4>
        <div className="text-xs text-white/70">
          {project?.width} × {project?.height} pixels
        </div>
      </div>

      {/* Custom Size */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-white">Custom Size</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLockAspectRatio(!lockAspectRatio)}
            className="text-white/70 hover:text-white p-1"
          >
            {lockAspectRatio ? <Lock /> : <Unlock />}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-white/70">Width</label>
            <Input
              type="number"
              value={newWidth}
              onChange={(e) => handleWidthChange(e.target.value)}
              className="bg-slate-700 border-white/20 text-white"
            />
          </div>

          <div>
            <label className="text-xs text-white/70">Height</label>
            <Input
              type="number"
              value={newHeight}
              onChange={(e) => handleHeightChange(e.target.value)}
              className="bg-slate-700 border-white/20 text-white"
            />
          </div>
        </div>
      </div>

      {/* Aspect Ratio Presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white">Aspect Ratios</h3>

        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
          {ASPECT_RATIOS.map((preset) => {
            const dims = calculateAspectRatioDimensions(preset.ratio);

            return (
              <Button
                key={preset.name}
                variant={
                  selectedPreset === preset.name ? "default" : "outline"
                }
                className={`flex justify-between h-auto py-2 ${
                  selectedPreset === preset.name
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : ""
                }`}
                onClick={() => applyAspectRatio(preset)}
              >
                <div>
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-xs opacity-70">
                    {dims.width} × {dims.height} ({preset.label})
                  </div>
                </div>
                <Monitor className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      </div>

      {/* Preview */}
      {hasChanges && (
        <div className="bg-slate-700/30 rounded-lg p-3">
          <h4 className="text-sm font-medium text-white mb-2">
            New Size Preview
          </h4>

          <div className="text-xs text-white/70">
            <div>New Canvas: {newWidth} × {newHeight} pixels</div>

            <div className="text-cyan-400">
              {newWidth > project.width || newHeight > project.height
                ? "Canvas will be expanded"
                : "Canvas will be cropped"}
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleApplyResize}
        disabled={!hasChanges || processingMessage}
        className="w-full"
      >
        <Expand className="h-4 w-4 mr-2" />
        Apply Resize
      </Button>
    </div>
  );
}

export default ResizeControls;
