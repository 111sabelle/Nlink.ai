import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BlurText.css';

gsap.registerPlugin(ScrollTrigger);

const BlurText = ({
  text = '',
  delay = 150,
  className = '',
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete
}) => {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 968);

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 968);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated) return;
    
    // 移动端直接显示，不做动画
    if (isMobile) {
      const spans = container.querySelectorAll('.blur-text-span');
      gsap.set(spans, {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0
      });
      setHasAnimated(true);
      return;
    }

    const spans = container.querySelectorAll('.blur-text-span');
    if (spans.length === 0) return;
    
    // 设置初始状态
    gsap.set(spans, {
      filter: 'blur(10px)',
      opacity: 0,
      y: direction === 'top' ? -50 : 50
    });

    // 创建唯一的ScrollTrigger
    let scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom-=20%',
      once: true, // 关键：只触发一次
      onEnter: () => {
        if (hasAnimated) return; // 双重检查
        
        setHasAnimated(true);
        
        // 创建动画时间线（不使用ScrollTrigger）
        const tl = gsap.timeline({
          onComplete: () => {
            onAnimationComplete?.();
          }
        });

        // 为每个元素添加动画，减慢速度
        spans.forEach((span, index) => {
          tl.to(span, {
            filter: 'blur(5px)',
            opacity: 0.5,
            y: direction === 'top' ? 8 : -8,
            duration: 0.4,
            ease: 'power2.out'
          }, index * (delay / 1000))
          .to(span, {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          }, index * (delay / 1000) + 0.4);
        });
      }
    });

    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, [text, delay, animateBy, direction, isMobile]); // 添加isMobile依赖

  return (
    <div ref={containerRef} className={`blur-text-container ${className}`}>
      {elements.map((segment, index) => (
        <span 
          key={index} 
          className="blur-text-span"
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </div>
  );
};

export default BlurText;
