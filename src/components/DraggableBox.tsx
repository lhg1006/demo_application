'use client'

import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

const DraggableBox: React.FC = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentBox, setCurrentBox] = useState<Box | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    setCurrentBox({ x: startX, y: startY, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !currentBox) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    setCurrentBox({
      x: Math.min(currentBox.x, endX),
      y: Math.min(currentBox.y, endY),
      width: Math.abs(endX - currentBox.x),
      height: Math.abs(endY - currentBox.y),
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentBox) return;
    setBoxes([...boxes, currentBox]);
    setIsDrawing(false);
    setCurrentBox(null);
  };

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const removeBox = (index: number) => {
    setBoxes(boxes.filter((_, i) => i !== index));
  };

  return (
    <div
      style={styles.container}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <button onClick={startDrawing}>박스 생성 시작</button>
      {boxes.map((box, index) => (
        <Rnd
          key={index}
          style={styles.box}
          size={{ width: box.width, height: box.height }}
          position={{ x: box.x, y: box.y }}
          onDragStop={(e, d) => {
            const newBoxes = [...boxes];
            newBoxes[index] = { ...newBoxes[index], x: d.x, y: d.y };
            setBoxes(newBoxes);
          }}
        >
          <div style={styles.text}>
            박스 {index + 1}
            <button onClick={() => removeBox(index)} style={styles.closeButton}>X</button>
          </div>
        </Rnd>
      ))}
      {currentBox && (
        <div
          style={{
            ...styles.box,
            width: currentBox.width,
            height: currentBox.height,
            left: currentBox.x,
            top: currentBox.y,
            position: 'absolute',
          }}
        />
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    width: '100%',
    height: '500px',
    border: '1px solid #ccc',
  },
  box: {
    border: '2px dashed #fff',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  text: {
    fontSize: '16px',
    color: '#fff',
    position: 'relative',
  },
  closeButton: {
    marginLeft: '10px',
    cursor: 'pointer',
    color: '#fff',
  }
};

export default DraggableBox;