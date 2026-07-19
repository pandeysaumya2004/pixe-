"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCanvas } from "@/context/context";
import { Sparkles } from "lucide-react";
import { Image, filters } from "fabric";

export default function AIEditTool() {
  const { canvasEditor } = useCanvas();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!canvasEditor) {
    return (
      <div className="p-4 text-white">
        <p className="text-sm text-white/70">Canvas not ready yet</p>
      </div>
    );
  }

  const image = canvasEditor.getObjects().find((obj) => obj.type === "image");

  const applyEnhancement = () => {
    if (!image) {
      alert("Please add or select an image first.");
      return;
    }

    setIsProcessing(true);

    try {
      image.filters = [
        new filters.Brightness({ brightness: 0.08 }),
        new filters.Contrast({ contrast: 0.12 }),
      ];
      image.applyFilters();
      canvasEditor.requestRenderAll();
    } catch (error) {
      console.error("Enhancement error:", error);
      alert("Failed to enhance image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetEnhancement = () => {
    if (!image) return;
    image.filters = [];
    image.applyFilters();
    canvasEditor.requestRenderAll();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-white" />
        <h2 className="text-xl font-semibold text-white">AI Editing</h2>
      </div>
      <p className="text-sm text-white/70">Enhance your image with a quick brightness/contrast boost.</p>

      <div className="space-y-2">
        <Button onClick={applyEnhancement} className="w-full" disabled={isProcessing}>
          {isProcessing ? "Enhancing…" : "Enhance Image"}
        </Button>
        <Button variant="secondary" onClick={resetEnhancement} className="w-full">
          Reset Enhancement
        </Button>
      </div>

      <div className="rounded-lg bg-slate-700/30 p-3 text-sm text-white/70">
        This is a simple enhancement tool. Select a raster image on the canvas and apply a quick visual boost.
      </div>
    </div>
  );
}
