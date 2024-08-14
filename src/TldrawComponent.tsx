import React, { useState, useCallback } from "react";
import { Tldraw, createShapeId, Editor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

interface TimelineEvent {
  date: Date;
  description: string;
}

export default function TldrawComponent() {
  const [inputText, setInputText] = useState<string>("");
  const [editor, setEditor] = useState<Editor | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const parseInput = (input: string): TimelineEvent[] => {
    const lines = input.split("\n").filter((line) => line.trim() !== "");
    const events: TimelineEvent[] = [];
    let currentDate: Date | null = null;

    for (const line of lines) {
      const dateMatch = line.match(/(\w+\s+\d+),\s+\d{4}:/);
      if (dateMatch) {
        currentDate = new Date(dateMatch[1] + ", " + new Date().getFullYear());
        let description = line.substring(dateMatch[0].length).trim();
        description = description.replace(/^\d{4}:\s*/, "");
        events.push({ date: currentDate, description });
      } else if (currentDate) {
        events[events.length - 1].description += " " + line.trim();
      }
    }

    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const generateTimeline = useCallback(() => {
    if (!editor) return;

    // Clear existing shapes
    editor.selectAll();
    const selectedIds = editor.getSelectedShapeIds();
    if (selectedIds.length > 0) {
      editor.deleteShapes(Array.from(selectedIds));
    }

    const events = parseInput(inputText);

    // Create timeline
    const startX = 100;
    const startY = 200;
    const itemWidth = 150;
    const itemHeight = 80;
    const spacing = 100;

    // Draw the horizontal line for the timeline using arrow type
    const timelineId = createShapeId();
    editor.createShape({
      id: timelineId,
      type: "arrow",
      props: {
        start: {
          x: startX,
          y: startY,
        },
        end: {
          x: startX + (events.length - 1) * (itemWidth + spacing),
          y: startY,
        },
        color: "black",
        bend: 0,
      },
    });

    events.forEach((event, i) => {
      // Create dot on the timeline
      const dotId = createShapeId();
      editor.createShape({
        id: dotId,
        type: "geo",
        x: startX + i * (itemWidth + spacing) - 5,
        y: startY - 5,
        props: {
          w: 10,
          h: 10,
          geo: "ellipse",
          fill: "solid",
          color: "black",
        },
      });

      // Determine the y-coordinate for the label (alternate above and below the timeline)
      const labelY = i % 2 === 0 ? startY - itemHeight - 20 : startY + 20;

      // Create label for the event using text shape
      const labelId = createShapeId();
      editor.createShape({
        id: labelId,
        type: "text",
        x: startX + i * (itemWidth + spacing) - itemWidth / 2,
        y: labelY,
        props: {
          text:
            event.date.toLocaleDateString() +
            "\n" +
            event.description.substring(0, 50) +
            "...",
          color: "black",
          font: "serif",
          size: "s",
        },
      });

      // Create line connecting dot to label
      const lineId = createShapeId();
      editor.createShape({
        id: lineId,
        type: "arrow",
        props: {
          start: {
            x: startX + i * (itemWidth + spacing),
            y: startY,
          },
          end: {
            x: startX + i * (itemWidth + spacing),
            y: labelY + (i % 2 === 0 ? itemHeight : 0),
          },
          color: "black",
          bend: 0,
        },
      });
    });
  }, [editor, inputText]);

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          rows={10}
          cols={50}
          style={{ marginRight: "10px" }}
        />
        <button onClick={generateTimeline}>Generate Timeline</button>
      </div>
      <div style={{ position: "fixed", width: "100vw", height: "80vh" }}>
        <Tldraw
          hideUi={true}
          onMount={(editor: Editor) => {
            setEditor(editor);
          }}
        />
      </div>
    </div>
  );
}
