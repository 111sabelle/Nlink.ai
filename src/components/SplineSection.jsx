import { useEffect, useRef, useState, useCallback } from 'react';
import placeInReality from '../assets/placeinreality.png';
import ScrollReveal from './ScrollReveal';
import './SplineSection.css';

const SplineSection = () => {
  const sectionRef = useRef(null);
  const firstSplineRef = useRef(null);
  const secondSplineRef = useRef(null);
  const thirdImageRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const thirdTextRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgressRef = useRef(0); 
  const smoothProgressRef = useRef(0); 
  const rafLoopRef = useRef(0);
  const [isPinned, setIsPinned] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [secondSplineLoaded, setSecondSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="spline-viewer"]');
    
    if (existingScript) {
      setSplineLoaded(true);
      setSecondSplineLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.71/build/spline-viewer.js';
    
    script.onload = () => {
      console.log('Spline viewer script loaded successfully');
      setSplineLoaded(true);
      setSecondSplineLoaded(true);
      setSplineError(false);
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Spline viewer script:', error);
      setSplineError(true);
      setSplineLoaded(false);
      setSecondSplineLoaded(false);
    };
    
    document.head.appendChild(script);

    return () => {
      // 清理逻辑
    };
  }, []);

  const updateScrollAnimation = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;
    
    // 计算 pin 区间
    const sectionTop = rect.top;
  const pinDistance = Math.max(1, sectionHeight - windowHeight);
    const inPinRange = sectionTop <= 0 && sectionTop >= -pinDistance;

    // 计算进度来决定是否pin
    let progressForPin = 0;
    if (inPinRange) {
      progressForPin = Math.min(1, Math.max(0, -sectionTop / pinDistance));
    } else if (sectionTop < -pinDistance) {
      progressForPin = 1;
    } else {
      progressForPin = 0;
    }
    setIsPinned(inPinRange && progressForPin < 0.96);

    let progress = 0;
    if (inPinRange) {
      progress = Math.min(1, Math.max(0, -sectionTop / pinDistance));
    } else if (sectionTop < -pinDistance) {
      progress = 1;
    } else {
      progress = 0;
    }
    
    targetProgressRef.current = progress;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updateScrollAnimation);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初始计算一次
    handleScroll();

    // 渲染循环：对目标进度做指数平滑，避免突变和抖动
    const tick = () => {
      const current = smoothProgressRef.current;
      const target = targetProgressRef.current;
      // 指数平滑系数（0.12 越大越跟手，越小越丝滑）
      const alpha = 0.12;
      const next = current + (target - current) * alpha;
      smoothProgressRef.current = next;
      if (Math.abs(next - scrollProgress) > 0.0008) {
        setScrollProgress(next);
      }
      rafLoopRef.current = requestAnimationFrame(tick);
    };
    rafLoopRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (rafLoopRef.current) cancelAnimationFrame(rafLoopRef.current);
    };
  }, [updateScrollAnimation, scrollProgress]);

  // 缓动函数
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const easedProgress = easeInOutCubic(scrollProgress);

  // 分段映射工具：将 t 映射到 [start,end] 段内的 0-1 进度
  const segment = (t, start, end) => {
    if (end === start) return 0;
    const x = (t - start) / (end - start);
    return Math.max(0, Math.min(1, x));
  };

  // 第一屏：文本向上移动并淡出（范围更长 0.0 -> 0.7）
  const firstTextT = segment(easedProgress, 0.0, 0.7);
  const firstTextOpacity = 1 - firstTextT;
  // 加大位移幅度至约 45vh
  const firstTextTranslateY = -45 * firstTextT; // vh

  // 第一屏：模型原地淡出（0.1 -> 0.6）
  const firstModelT = segment(easedProgress, 0.1, 0.6);
  const firstModelOpacity = 1 - firstModelT;

  // 第二屏：文本先自下而上出现（0.25 -> 0.7），再向上消失（0.75 -> 0.85）提前退出
  const secondTextEnterT = segment(easedProgress, 0.25, 0.7);
  const secondTextExitT = segment(easedProgress, 0.75, 0.85);
  const secondTextOpacity = secondTextEnterT * (1 - secondTextExitT);
  // 位移：进入阶段从 +35vh -> 0，退出阶段 0 -> -45vh
  const secondTextTranslateY = 35 * (1 - secondTextEnterT) - 45 * secondTextExitT; // vh

  // 第二屏：模型先在 0.55->0.70 渐入到 1，然后 0.8->0.87 渐出为 0（提前退出，给第三页让路）
  const secondModelEnterT = segment(easedProgress, 0.55, 0.70);
  const secondModelExitT = segment(easedProgress, 0.8, 0.87);
  const secondModelOpacity = Math.min(1, secondModelEnterT) * (1 - secondModelExitT);

  // 第三屏：入场 -> 停留 -> 退场（给第三页更大的进度空间）
  // 文本入场 0.87->0.95，延长入场时间，自下而上，从第二页退出后开始
  const thirdTextEnterT = segment(easedProgress, 0.87, 0.95);
  const thirdTextOpacity = thirdTextEnterT;
  const thirdTextTranslateY = 35 * (1 - thirdTextEnterT); // vh

  // 图像入场 0.89->0.96 原地淡入，稍晚于文本，延长入场时间
  const thirdImageEnterT = segment(easedProgress, 0.89, 0.96);
  const thirdImageOpacity = thirdImageEnterT;

  // 层级：前半段第一屏在上，中段第二屏在上，后段第三屏在上
  const firstPageZ = easedProgress < 0.6 ? 3 : 1;
  const secondPageZ = easedProgress >= 0.6 && easedProgress < 0.87 ? 3 : 2;
  const thirdPageZ = easedProgress >= 0.87 ? 3 : 1;

  return (
    <section 
      ref={sectionRef} 
      className="spline-dual-section"
    >
      <div 
        className={`spline-dual-container${isPinned ? ' locked' : ''}`}
        style={{
          transition: 'none'
        }}
      >
        
        {/* 第一页面 - CREATE YOUR CONTENT */}
        <div 
          className="spline-page spline-page-first"
          style={{ zIndex: firstPageZ }}
        >
          {/* 左侧改回 Spline 模型 */}
          <div className="spline-model" style={{ opacity: firstModelOpacity }}>
            {!splineLoaded && !splineError && (
              <div className="spline-loading">
                <div className="loading-spinner"></div>
                <p>Loading 3D Scene...</p>
              </div>
            )}

            {splineError && (
              <div className="spline-error">
                <p>Failed to load 3D scene</p>
                <button onClick={() => window.location.reload()}>Retry</button>
              </div>
            )}

            {splineLoaded && (
              <spline-viewer 
                ref={firstSplineRef}
                url="https://prod.spline.design/X6uIgb9KtS9iKIoJ/scene.splinecode"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px'
                }}
                onLoad={() => console.log('First Spline scene loaded')}
                onError={(error) => console.error('First Spline scene error:', error)}
              />
            )}
          </div>

          {/* 右侧文本内容 */}
          <div ref={firstTextRef} className="content-text" style={{
            opacity: firstTextOpacity,
            transform: `translateY(${firstTextTranslateY}vh)`
          }}>
            <ScrollReveal
              baseOpacity={0.05}
              enableBlur={true}
              baseRotation={8}
              blurStrength={15}
              containerClassName="spline-title"
              textClassName="spline-title-text"
              rotationEnd="center center"
              wordAnimationEnd="center center"
            >
              CREATE YOUR CONTENT
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={5}
              blurStrength={12}
              containerClassName="spline-description"
              textClassName="spline-description-text"
              rotationEnd="center center"
              wordAnimationEnd="center center"
            >
              Generate new works or upload existing digital assets, ready to step into the real world.
            </ScrollReveal>
          </div>
        </div>

        {/* 第二页面 - CHOOSE YOUR LOCATION */}
        <div 
          className="spline-page spline-page-second"
          style={{ zIndex: secondPageZ }}
        >
          {/* 左侧文本内容 */}
          <div ref={secondTextRef} className="content-text content-text-left" style={{
            opacity: secondTextOpacity,
            transform: `translateY(${secondTextTranslateY}vh)`
          }}>
            <ScrollReveal
              baseOpacity={0.05}
              enableBlur={true}
              baseRotation={8}
              blurStrength={15}
              containerClassName="spline-title"
              textClassName="spline-title-text"
              rotationEnd="center center"
              wordAnimationEnd="center center"
            >
              CHOOSE YOUR LOCATION
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={5}
              blurStrength={12}
              containerClassName="spline-description"
              textClassName="spline-description-text"
              rotationEnd="center center"
              wordAnimationEnd="center center"
            >
              Navigate the map, pinpoint the exact spot where your content should live.
            </ScrollReveal>
          </div>

          {/* 右侧 Spline 模型 */}
          <div className="spline-model" style={{ opacity: secondModelOpacity }}>
            {!secondSplineLoaded && !splineError && (
            <div className="spline-loading">
              <div className="loading-spinner"></div>
              <p>Loading 3D Scene...</p>
            </div>
          )}
          
          {splineError && (
            <div className="spline-error">
              <p>Failed to load 3D scene</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}
          
            {secondSplineLoaded && (
            <spline-viewer 
                ref={secondSplineRef}
                url="https://prod.spline.design/MXjl8QxKa-iQ03vX/scene.splinecode"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '20px'
              }}
                onLoad={() => console.log('Second Spline scene loaded')}
                onError={(error) => console.error('Second Spline scene error:', error)}
            />
          )}
          </div>
        </div>

        {/* 第三页面 - PLACE IN REALITY */}
        <div 
          className="spline-page spline-page-third"
          style={{
            zIndex: thirdPageZ
          }}
        >
          {/* 左侧图片 */}
          <div className="spline-model" style={{ 
            opacity: thirdImageOpacity
          }}>
            <img ref={thirdImageRef} src={placeInReality} alt="Place in Reality" />
          </div>

          {/* 右侧文本内容 */}
          <div ref={thirdTextRef} className="content-text" style={{
            opacity: thirdTextOpacity,
            transform: `translateY(${thirdTextTranslateY}vh)`
          }}>
            <ScrollReveal
              baseOpacity={0.05}
              enableBlur={true}
              baseRotation={8}
              blurStrength={15}
              containerClassName="spline-title"
              textClassName="spline-title-text"
              rotationEnd="center center"
              wordAnimationEnd="center center"
            >
              PLACE IN REALITY
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={5}
              blurStrength={12}
              containerClassName="spline-description"
              textClassName="spline-description-text"
              rotationEnd="center center"
              wordAnimationEnd="center center"
            >
              Anchor your digital creation in the real world and let everyone around discover, explore, and interact.
            </ScrollReveal>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SplineSection;
