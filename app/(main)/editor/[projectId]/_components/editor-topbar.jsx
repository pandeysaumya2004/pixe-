// // "use client"

// // import { Button } from '@/components/ui/button';
// // import { ArrowLeft, Crop, Expand, Maximize2, Palette, Sliders, Text } from 'lucide-react';
// // import { useRouter } from 'next/navigation';
// // import { useCanvas } from "@/context/context";
// // import { usePlanAccess } from "@/hooks/use-plan-access";
// // import React ,{useState}from 'react'

// //   const TOOLS = [
// //   {
// //     id: "resize",
// //     label: "Resize",
// //     icon: Expand,
// //     isActive: true,
// //   },
// //   {
// //     id: "crop",
// //     label: "Crop",
// //     icon: Crop,
// //   },
// //   {
// //     id: "adjust",
// //     label: "Adjust",
// //     icon: Sliders,
// //   },
// //   {
// //     id: "text",
// //     label: "Text",
// //     icon: Text,
// //   },
// //   {
// //     id: "background",
// //     label: "AI Background",
// //     icon: Palette,
// //     proOnly: true,
// //   },
// //   {
// //     id: "ai_extender",
// //     label: "AI Image Extender",
// //     icon: Maximize2,
// //     proOnly: true,
// //   },
// //   {
// //     id: "ai_edit",
// //     label: "AI Editing",
// //     proOnly: true,
// //   },
// // ];

// // const EditorTopbar = ({project}) => {
// //   const router = useRouter();
// //   const [showUpgradeModal, setShowUpgradeModal] = useState();
// //   const [restrictedTool, setRestrictedTool] = useState(null);

// //   const { activeTool, onToolChange, canvasEditor } = useCanvas();
// //   const {hasAccess, canExport, isFree } = usePlanAccess();

// //   const handleBackToDashboard = () => {
// //     router.push("/dashboard");
// //   }

// //   const handleToolChange = (toolId) => {};

// //   return (
// //     <>
// //     <div className="border-b px-6 py-3">
// //       <div className="flex items-center justify-between mb-4">
// //         <Button
// //          variant="ghost"
// //          size="sm"
// //          onClick={handleBackToDashboard}
// //          className="text-white hover:text-grey-300">
// //          <ArrowLeft className="h-4 w-4 mr-2"/>
// //          All Projects
// //         </Button>
// //         <h1 className="font-extrabold capitalize">{project.title}</h1>

// //         <div>Right Actions</div>


// //       </div>




// //     </div>
    
    
// //     </>
// //   )


// //   return <div> EditorTopbar</div>
// // }

// // export default EditorTopbar



// "use client";

// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Crop, Expand, Maximize2, Palette, Sliders, Text,Lock } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useCanvas } from "@/context/context";
// import { usePlanAccess } from "@/hooks/use-plan-access";
// import React, { useState } from "react";

// const TOOLS = [
//   { id: "resize", label: "Resize", icon: Expand, isActive: true },
//   { id: "crop", label: "Crop", icon: Crop },
//   { id: "adjust", label: "Adjust", icon: Sliders },
//   { id: "text", label: "Text", icon: Text },
//   { id: "background", label: "AI Background", icon: Palette, proOnly: true },
//   { id: "ai_extender", label: "AI Image Extender", icon: Maximize2, proOnly: true },
//   { id: "ai_edit", label: "AI Editing", proOnly: true },
// ];

// const EditorTopbar = ({ project }) => {
//   const router = useRouter();
//   const [showUpgradeModal, setShowUpgradeModal] = useState();
//   const [restrictedTool, setRestrictedTool] = useState(null);

//   const { activeTool, onToolChange, canvasEditor } = useCanvas();
//   const { hasAccess, canExport, isFree } = usePlanAccess();

//   const handleBackToDashboard = () => {
//     router.push("/dashboard");
//   };

//   const handleToolChange = (toolId) => {};

//   return (
//     <>
//       <div className="border-b px-6 py-3">
//         <div className="flex items-center justify-between mb-4">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={handleBackToDashboard}
//             className="text-white hover:text-gray-300" // ✅ fixed spelling
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             All Projects
//           </Button>

//           <h1 className="font-extrabold capitalize">{project.title}</h1>

//           <div>Right Actions</div>
//         </div>
//         <div className="flex item-center justify-between">
//           <div className="flex item-center gap-2">
//             {TOOLS.map((tool) => {
//               const Icon = tool.icon;
//               const isActive = activeTool === tool.id;
//               const hasToolAccess = hasAccess(tool.id);

//               return (
//                 <Button
//                 key={tool.id}
//                   variant={isActive ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => handleToolChange(tool.id) }>
//                     <Icon className="h-4 w-4" />
//                     {tool.label}
//                     {tool.proOnly && !hasToolAccess && (
//                       <Lock className="h-3 w-3 text-amber-400"/>
//                     )}

                  
//                 </Button>

//               )
//             })}

//           </div>
//         </div>





//       </div>
//     </>
//   );
// };

// export default EditorTopbar;



"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Crop, Expand, Maximize2, Palette, Sliders, Text, Lock, RotateCcw, RotateCw } from "lucide-react"; // ✅ added Lock
import { useRouter } from "next/navigation";
import { useCanvas } from "@/context/context";
import { usePlanAccess } from "@/hooks/use-plan-access";
import React, { useState } from "react";
import { UpgradeModal } from "@/components/upgrade-modal";

const TOOLS = [
  { id: "resize", label: "Resize", icon: Expand, isActive: true },
  { id: "crop", label: "Crop", icon: Crop },
  { id: "adjust", label: "Adjust", icon: Sliders },
  { id: "text", label: "Text", icon: Text },
  { id: "background", label: "AI Background", icon: Palette, proOnly: true },
  { id: "ai_extender", label: "AI Image Extender", icon: Maximize2, proOnly: true },
  { id: "ai_edit", label: "AI Editing", proOnly: true },
];

const EditorTopbar = ({ project }) => {
  const router = useRouter();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [restrictedTool, setRestrictedTool] = useState(null);

  const { activeTool, onToolChange, canvasEditor } = useCanvas();
  const { hasAccess, canExport, isFree } = usePlanAccess();

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const handleToolChange = (toolId) => {
    if (!hasAccess(toolId)){
      setRestrictedTool(toolId);
      setShowUpgradeModal(true);
      return;
    }
    onToolChange(toolId);
    
  };

  return (
    <>
      <div className="border-b px-6 py-3">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToDashboard}
            className="text-white hover:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Projects
          </Button>

          <h1 className="font-extrabold capitalize">{project.title}</h1>

          <div>Right Actions</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;

              // Skip tools without valid icon
              if (!Icon) return null;

              const isActive = activeTool === tool.id;
              const hasToolAccess = hasAccess(tool.id);

              return (
                <Button
                  key={tool.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleToolChange(tool.id)}
                  className={`gap-2 relative ${
                    isActive
                    ? "bg-blue-600 tex-white hover:bg-blue-700"
                    : "text-white hover:text-gray-300 hover:bg"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tool.label}
                  {tool.proOnly && !hasToolAccess && (
                    <Lock className="h-3 w-3 text-amber-400" />
                  )}
                </Button>
              );
            })}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-white">
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" className="text-white">
              <RotateCw className="h-4 w-4"/>

            </Button>



          </div>
        </div>
      </div>
      <UpgradeModal
      isOpen={showUpgradeModal}
      onClose={() => {
        setShowUpgradeModal(false);
        setRestrictedTool(null);
      }}
      restrictedTool={restrictedTool}
      reason={
        restrictedTool === "export" ? "Free plan is limited to 20 exports per month. Upgrade to Pro for unlimited exports." : undefined
      }

      

      
      
      />

    </>
  );
};

export default EditorTopbar;
