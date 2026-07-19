"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCanvas } from "@/context/context";
import { Textbox } from "fabric";
import { Type } from "lucide-react";

export default function TextTool() {
  const { canvasEditor } = useCanvas();
  const [text, setText] = useState("Hello world");
  const [color, setColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(48);
  const [selectedText, setSelectedText] = useState(null);

  useEffect(() => {
    if (!canvasEditor) return;

    const updateSelection = () => {
      const obj = canvasEditor.getActiveObject();
      if (
        obj &&
        (obj.type === "textbox" || obj.type === "i-text" || obj.type === "text")
      ) {
        setSelectedText(obj);
        setText(obj.text || "");
        setColor(obj.fill || "#ffffff");
        setFontSize(obj.fontSize || 48);
      } else {
        setSelectedText(null);
      }
    };

    canvasEditor.on("selection:created", updateSelection);
    canvasEditor.on("selection:updated", updateSelection);
    canvasEditor.on("selection:cleared", updateSelection);

    return () => {
      canvasEditor.off("selection:created", updateSelection);
      canvasEditor.off("selection:updated", updateSelection);
      canvasEditor.off("selection:cleared", updateSelection);
    };
  }, [canvasEditor]);

  const addText = () => {
    if (!canvasEditor || !text.trim()) return;

    const textbox = new Textbox(text.trim(), {
      left: canvasEditor.getWidth() / 2,
      top: canvasEditor.getHeight() / 2,
      originX: "center",
      originY: "center",
      fill: color,
      fontSize,
      selectable: true,
      editable: true,
      objectCaching: false,
    });

    canvasEditor.add(textbox);
    canvasEditor.setActiveObject(textbox);
    canvasEditor.requestRenderAll();
  };

  const updateSelectedText = () => {
    if (!selectedText || !canvasEditor) return;
    selectedText.set({
      text: text.trim() || "Text",
      fill: color,
      fontSize,
    });
    selectedText.setCoords();
    canvasEditor.requestRenderAll();
  };

  if (!canvasEditor) {
    return (
      <div className="p-4 text-white">
        <p className="text-sm text-white/70">Canvas not ready yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Type className="h-5 w-5 text-white" />
        <h2 className="text-xl font-semibold text-white">Text</h2>
      </div>
      <p className="text-sm text-white/70">Add editable text to the canvas.</p>

      <div className="space-y-3">
        <div>
          <label className="text-sm text-white/80">Text</label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-slate-700 border-white/20 text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-white/80">Font Size</label>
            <Input
              type="number"
              min="10"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value) || 48)}
              className="bg-slate-700 border-white/20 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-white/80">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded-md border border-white/10 bg-slate-700"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Button onClick={addText} className="w-full">
          Add Text
        </Button>
        {selectedText && (
          <Button variant="secondary" onClick={updateSelectedText} className="w-full">
            Update Selection
          </Button>
        )}
      </div>

      <div className="rounded-lg bg-slate-700/30 p-3 text-sm text-white/70">
        {selectedText ? (
          "Select a text object to update it from this pane."
        ) : (
          "Add text and edit it directly on the canvas."
        )}
      </div>
    </div>
  );
}
