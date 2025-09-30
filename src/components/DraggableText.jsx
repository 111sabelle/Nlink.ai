import React, { useState, useRef, useEffect, useCallback } from 'react';
import './DraggableText.css';

const DraggableText = ({ src, alt, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const imgRef = useRef(null);
  const animationRef = useRef(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef(initialPosition);
  const positionHistoryRef = useRef([]);
  const isAnimatingRef = useRef(false);
  const hasInitializedRef = useRef(false); // 新增：标记是否已初始化

  // 同步位置到ref
  useEffect(() => {
    currentPositionRef.current = position;
  }, [position]);

  // 同步动画状态到ref
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setIsAnimating(false);
    isAnimatingRef.current = false;
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const rect = imgRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // 重置速度历史
    positionHistoryRef.current = [];
    velocityRef.current = { x: 0, y: 0 };
    
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const now = performance.now();
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // 记录位置历史（用于计算平均速度）
    positionHistoryRef.current.push({
      x: newX,
      y: newY,
      time: now
    });
    
    // 只保留最近100ms的历史
    positionHistoryRef.current = positionHistoryRef.current.filter(
      point => now - point.time < 100
    );
    
    const newPosition = { x: newX, y: newY };
    setPosition(newPosition);
    currentPositionRef.current = newPosition;
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    
    // 计算平均速度
    const history = positionHistoryRef.current;
    
    if (history.length > 1) {
      const recent = history.slice(-3);
      const first = recent[0];
      const last = recent[recent.length - 1];
      const deltaTime = last.time - first.time;
      
      if (deltaTime > 0) {
        const velX = (last.x - first.x) / deltaTime * 1000;
        const velY = (last.y - first.y) / deltaTime * 1000;
        
        velocityRef.current = { 
          x: velX * 0.02,
          y: velY * 0.02 
        };
        
        const speed = Math.sqrt(velX * velX + velY * velY);
        
        if (speed > 30) {
          setIsAnimating(true);
          isAnimatingRef.current = true;
          startInertiaAnimation();
        }
      }
    }
  }, []);

  const startInertiaAnimation = useCallback(() => {
    let currentPos = { ...currentPositionRef.current };
    let currentVel = { ...velocityRef.current };
    const friction = 0.97;
    const bounce = 0.8;

    const animate = () => {
      if (!isAnimatingRef.current) {
        return;
      }

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const imgElement = imgRef.current;
      const imgWidth = imgElement ? imgElement.offsetWidth : 50;
      const imgHeight = imgElement ? imgElement.offsetHeight : 50;

      currentPos.x += currentVel.x;
      currentPos.y += currentVel.y;

      let bounced = false;
      if (currentPos.x <= 0) {
        currentPos.x = 0;
        currentVel.x = Math.abs(currentVel.x) * bounce;
        bounced = true;
      } else if (currentPos.x >= windowWidth - imgWidth) {
        currentPos.x = windowWidth - imgWidth;
        currentVel.x = -Math.abs(currentVel.x) * bounce;
        bounced = true;
      }

      if (currentPos.y <= 0) {
        currentPos.y = 0;
        currentVel.y = Math.abs(currentVel.y) * bounce;
        bounced = true;
      } else if (currentPos.y >= windowHeight - imgHeight) {
        currentPos.y = windowHeight - imgHeight;
        currentVel.y = -Math.abs(currentVel.y) * bounce;
        bounced = true;
      }

      if (!bounced) {
        currentVel.x *= friction;
        currentVel.y *= friction;
      }

      setPosition({ ...currentPos });
      currentPositionRef.current = { ...currentPos };

      const speed = Math.sqrt(currentVel.x * currentVel.x + currentVel.y * currentVel.y);
      if (speed > 0.05) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        isAnimatingRef.current = false;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // 全局鼠标事件监听
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 只在首次加载时设置初始位置
  useEffect(() => {
    if (!hasInitializedRef.current) {
      setPosition(initialPosition);
      currentPositionRef.current = initialPosition;
      velocityRef.current = { x: 0, y: 0 };
      setIsAnimating(false);
      isAnimatingRef.current = false;
      hasInitializedRef.current = true; // 标记已初始化
    }
  }, []); // 移除 initialPosition 依赖，只在组件首次挂载时执行

  // 清理动画
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`draggable-text ${isDragging ? 'dragging' : ''} ${isAnimating ? 'bouncing' : ''}`}
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
      draggable={false}
    />
  );
};

export default DraggableText;
