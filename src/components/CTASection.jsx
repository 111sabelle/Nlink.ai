import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CTASection.css';
import BlurText from './BlurText';
import ElectricBorder from './ElectricBorder';
import jointheWaitingListImage from '../assets/jointhewaitinglist.png';
import arrowIcon from '../assets/arrow.png';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const [imageAnimated, setImageAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 968);

  const handleDownloadClick = () => {
    window.history.pushState({}, '', '/download');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 968);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const image = imageRef.current;
    const section = sectionRef.current;
    if (!image || !section || imageAnimated) return;

    // 设置图像初始状态（缩小和透明）
    gsap.set(image, {
      scale: 0.3,
      opacity: 0,
      transformOrigin: 'center center'
    });

    // 创建弹性放大动画
    let scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom-=30%',
      once: true,
      onEnter: () => {
        if (imageAnimated) return;
        setImageAnimated(true);
        
        gsap.to(image, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)', // 弹性缓动
          delay: 0.2 // 稍微延迟，让文字先动画
        });
      }
    });

    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, [imageAnimated]);

  return (
    <section ref={sectionRef} className="cta-section">
      <div className="cta-container">
        <div className="cta-wrapper">
          {/* 桌面端使用Electric边框，移动端使用普通紫色边框 */}
          {!isMobile ? (
            <ElectricBorder
              color="#FEC9FF"
              speed={1}
              chaos={0.5}
              thickness={2}
              style={{ borderRadius: 24 }}
            >
              <div className="cta-content">
              {/* 左上角文字 */}
              <div className="cta-text-area">
                <h2 className="cta-title">What will you place?</h2>
                <BlurText
                  text="Play Nlink now"
                  delay={200}
                  animateBy="words"
                  direction="top"
                  className="cta-subtitle"
                  onAnimationComplete={() => console.log('CTA text animation completed')}
                />
              </div>
              
              {/* 垂直居中按钮 */}
              <button 
                className="cta-button" 
                onClick={handleDownloadClick}
              >
                <span className="cta-button-text">Join the waiting list</span>
                <div className="cta-button-icon">
                  <img src={arrowIcon} alt="arrow" className="arrow-icon-img" />
                </div>
              </button>
            </div>
          </ElectricBorder>
          ) : (
            <div className="cta-content cta-content-mobile">
              {/* 左上角文字 */}
              <div className="cta-text-area">
                <h2 className="cta-title">What will you place?</h2>
                <BlurText
                  text="Play Nlink now"
                  delay={200}
                  animateBy="words"
                  direction="top"
                  className="cta-subtitle"
                  onAnimationComplete={() => console.log('CTA text animation completed')}
                />
              </div>
              
              {/* 垂直居中按钮 */}
              <button 
                className="cta-button" 
                onClick={handleDownloadClick}
              >
                <span className="cta-button-text">Join the waiting list</span>
                <div className="cta-button-icon">
                  <img src={arrowIcon} alt="arrow" className="arrow-icon-img" />
                </div>
              </button>
            </div>
          )}
          
          {/* 右侧图像 - 移到ElectricBorder外部 */}
          <div className="cta-image-area">
            <img 
              ref={imageRef}
              src={jointheWaitingListImage} 
              alt="Join the waiting list" 
              className="cta-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
