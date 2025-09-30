import { useEffect, useRef, useState, useCallback } from 'react';

export const useVideoColorSampling = (videoRef, sampleRate = 100) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [averageColor, setAverageColor] = useState('#ffffff');
  const [invertedColor, setInvertedColor] = useState('#000000');

  // 初始化canvas
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64; // 小尺寸采样，提高性能
    canvas.height = 64;
    canvasRef.current = canvas;
    contextRef.current = canvas.getContext('2d');
  }, []);

  // RGB转十六进制
  const rgbToHex = useCallback((r, g, b) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }, []);

  // 计算反色
  const invertColor = useCallback((r, g, b) => {
    return {
      r: 255 - r,
      g: 255 - g,
      b: 255 - b
    };
  }, []);

  // 采样视频颜色
  const sampleVideoColor = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (!video || !canvas || !context || video.videoWidth === 0) {
      return;
    }

    try {
      // 将视频帧绘制到canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // 获取图像数据
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // 计算平均颜色
      let r = 0, g = 0, b = 0;
      const pixelCount = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      r = Math.floor(r / pixelCount);
      g = Math.floor(g / pixelCount);
      b = Math.floor(b / pixelCount);

      // 设置平均颜色
      const avgColor = rgbToHex(r, g, b);
      setAverageColor(avgColor);

      // 计算并设置反色
      const inverted = invertColor(r, g, b);
      const invertedHex = rgbToHex(inverted.r, inverted.g, inverted.b);
      setInvertedColor(invertedHex);

    } catch (error) {
      console.warn('视频颜色采样失败:', error);
    }
  }, [videoRef, rgbToHex, invertColor]);

  // 定期采样
  useEffect(() => {
    const interval = setInterval(sampleVideoColor, sampleRate);
    return () => clearInterval(interval);
  }, [sampleVideoColor, sampleRate]);

  return {
    averageColor,
    invertedColor,
    sampleVideoColor
  };
};