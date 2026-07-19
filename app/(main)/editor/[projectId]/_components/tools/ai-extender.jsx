"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useCanvas } from "@/context/context";
import { Maximize2 } from "lucide-react";

export default function AIExtenderTool() {
  const { canvasEditor } = useCanvas();

  if (!canvasEditor) {
    return (
      <div className="p-4 text-white">
        <p className="text-sm text-white/70">Canvas not ready yet</p>
      </div>
    );
  }

  const extendCanvas = () => {
    const width = canvasEditor.getWidth();
    const height = canvasEditor.getHeight();
    canvasEditor.setWidth(width + 200);
    canvasEditor.setHeight(height + 200);
    canvasEditor.calcOffset();
    canvasEditor.requestRenderAll();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Maximize2 className="h-5 w-5 text-white" />
        <h2 className="text-xl font-semibold text-white">AI Image Extender</h2>
      </div>
      <p className="text-sm text-white/70">Extend the canvas boundaries for more design space.</p>

      <Button onClick={extendCanvas} className="w-full">
        Extend Canvas by 200px
      </Button>

      <div className="rounded-lg bg-slate-700/30 p-3 text-sm text-white/70">
        This tool expands the canvas so you can add more content around your image.
      </div>
    </div>
  );
}
