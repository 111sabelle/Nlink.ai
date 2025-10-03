import { useEffect, useRef, useState } from 'react';
import './SocialShowcase.css';

// 请将这5张图片放在 src/assets/ 下，文件名如下
import sm1 from '../assets/socialmedia1.png';
import sm2 from '../assets/socialmedia2.png';
import sm3 from '../assets/socialmedia3.png';
import sm4 from '../assets/socialmedia4.png';
import sm5 from '../assets/socialmedia5.png';

const images = [sm1, sm2, sm3, sm4, sm5];

export default function SocialShowcase() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 计算容器中心与视口中心的相对位置，范围大致在 [-1.5, 1.5]
      const containerCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const offset = (viewportCenter - containerCenter) / vh; // 上负下正
      const p = Math.max(-1, Math.min(1, -offset)); // 上滚为负，下滚为正
      setProgress(p);
    };

    // 优化：使用scroll事件 + RAF节流，而不是连续RAF
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(onScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 初始计算一次
    onScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // 运动幅度（像素）。加大幅度以便更明显
  const baseAmplitude = 180; // px 基础幅度

  return (
    <section ref={sectionRef} className="social-section">
      <div className="social-header">
        <div className="social-title">
          <h3 className="social-title-main">SHARE YOUR<br />CREATION</h3>
        </div>
        <div className="social-subtitle">
          <p>
            Turn your drop into a global moment — share it with the world, let others explore,
            and earn points along the way!
          </p>
        </div>
      </div>

      <div className="social-showcase">
        <div className="media-frame">
          <div className="media-row">
            {images.map((src, idx) => {
              const dir = idx % 2 === 0 ? 1 : -1; // 1: 向下, -1: 向上
              const boost = (idx === 1 || idx === 3) ? 1.6 : 1.0; // 第2、第4张更大的幅度
              const translate = dir * baseAmplitude * boost * progress; // 根据滚动微动
              return (
                <div className="media-cell" key={idx}>
                  <img
                    src={src}
                    alt={`social media ${idx + 1}`}
                    className={`media-img media-img-${idx + 1}`}
                    style={{ ['--ty']: `${translate}px` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


