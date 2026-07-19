"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCanvas } from "@/context/context";
import { Palette } from "lucide-react";

export default function BackgroundTool() {
  const { canvasEditor } = useCanvas();
  const [color, setColor] = useState("#0f172a");

  useEffect(() => {
    if (!canvasEditor) return;
    const current = canvasEditor.backgroundColor || "#0f172a";
    setColor(current);
  }, [canvasEditor]);

  if (!canvasEditor) {
    return (
      <div className="p-4 text-white">
        <p className="text-sm text-white/70">Canvas not ready yet</p>
      </div>
    );
  }

  const applyBackground = () => {
    if (!canvasEditor.set) {
      canvasEditor.backgroundColor = color;
    } else {
      canvasEditor.set("backgroundColor", color);
    }
    canvasEditor.requestRenderAll();
  };

  const clearBackground = () => {
    if (!canvasEditor.set) {
      canvasEditor.backgroundColor = "";
    } else {
      canvasEditor.set("backgroundColor", "");
    }
    canvasEditor.requestRenderAll();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="h-5 w-5 text-white" />
        <h2 className="text-xl font-semibold text-white">Background</h2>
      </div>
      <p className="text-sm text-white/70">Change the canvas background color.</p>

      <div>
        <label className="text-sm text-white/80">Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 rounded-md border border-white/10 bg-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Button onClick={applyBackground} className="w-full">
          Apply Background
        </Button>
        <Button variant="secondary" onClick={clearBackground} className="w-full">
          Clear Background
        </Button>
      </div>

      <div className="rounded-lg bg-slate-700/30 p-3 text-sm text-white/70">
        Use this tool to give your canvas a solid backdrop or reset it to transparent.
      </div>
    </div>
  );
}
