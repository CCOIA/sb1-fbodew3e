import { useMemo } from 'react';
import * as THREE from 'three';

export function useTexture(type: string) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    if (!context) return null;

    // Create different noise patterns based on type
    switch (type) {
      case 'noise-1':
        createCloudsTexture(context);
        break;
      case 'noise-2':
        createTectonicTexture(context);
        break;
      case 'noise-3':
        createDesertTexture(context);
        break;
      case 'noise-4':
        createIceTexture(context);
        break;
      default:
        createBasicTexture(context);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [type]);
}

function createCloudsTexture(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(1, '#a8a8a8');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  
  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = Math.random() * 2;
    
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.2})`;
    ctx.fill();
  }
}

function createTectonicTexture(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#2d3436';
  ctx.fillRect(0, 0, 256, 256);
  
  for (let i = 0; i < 20; i++) {
    const x1 = Math.random() * 256;
    const y1 = Math.random() * 256;
    const x2 = x1 + (Math.random() - 0.5) * 100;
    const y2 = y1 + (Math.random() - 0.5) * 100;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#74b9ff';
    ctx.lineWidth = Math.random() * 4 + 1;
    ctx.stroke();
  }
}

function createDesertTexture(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(0, 0, 256, 256);
  gradient.addColorStop(0, '#fdcb6e');
  gradient.addColorStop(1, '#e17055');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  
  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
    ctx.fillRect(x, y, 2, 2);
  }
}

function createIceTexture(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#81ecec';
  ctx.fillRect(0, 0, 256, 256);
  
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = Math.random() * 20 + 5;
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createBasicTexture(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#dfe6e9';
  ctx.fillRect(0, 0, 256, 256);
}