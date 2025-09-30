import React, { useEffect, useRef, useState } from 'react';
import './Footer.css';
import logo from '../assets/logo.svg';

const Footer = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const splineContainerRef = useRef(null);

  useEffect(() => {
    // 检查是否已经加载过Spline脚本
    const existingScript = document.querySelector('script[src*="spline-viewer.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.71/build/spline-viewer.js';
      script.async = true;
      
      script.onload = () => {
        setSplineLoaded(true);
      };
      
      script.onerror = () => {
        console.error('Failed to load Spline viewer');
      };
      
      document.body.appendChild(script);
    } else {
      setSplineLoaded(true);
    }

    return () => {
      // 不清理脚本，避免影响其他组件
    };
  }, []);

  const handleSendMessage = () => {
    // 这里可以添加发送消息的逻辑，比如打开联系表单或跳转到联系页面
    window.location.href = 'mailto:contact@nlink.ai';
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* 左侧区域 */}
        <div className="footer-left">
          {/* 上方：Logo和标题 */}
          <div className="footer-left-content">
            <div className="footer-logo">
              <img src={logo} alt="Nlink.ai" />
            </div>
            
            <h1 className="footer-title">
              Change reality<br />
              in<br />
              real time.
            </h1>
          </div>

          {/* 下方：社交媒体图标 */}
          <div className="footer-social">
            <a href="https://x.com/Nlink_AI" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/nlink_ai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@Nlink_ai" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/nlink-ai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://discord.gg/326mTf92" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="https://t.me/nlinkofficialcomm2025" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 1 0 24 12 12 12 0 0 0 11.944 0zM18.632 7.172a.748.748 0 0 1 .015.191c-.011.37-.167 3.762-.464 6.9-.126 1.329-.374 1.774-.614 1.817-.521.048-917.676-.343-1.176-.682-.782-.53-1.224-.882-1.982-1.413-875.427-.594-.147-.918.467-1.413l4.869-4.869c.213-.213.425-.639-.064-.639-.213 0-.426.085-.639.255l-5.933 3.994c-.511.34-1.022.255-1.47.085l-2.048-.639c-.639-.213-.639-.639.128-.959 3.098-1.533 6.835-3.162 9.079-4.099.894-.372 2.656-.829 2.656.767z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 中间Spline模型区域 */}
        <div className="footer-center">
          <div ref={splineContainerRef} className="footer-spline-container">
            {splineLoaded && (
              <spline-viewer url="https://prod.spline.design/sgMiD0EyAreEO5fZ/scene.splinecode"></spline-viewer>
            )}
          </div>
        </div>

        {/* 右侧区域 */}
        <div className="footer-right">
          <p className="footer-description">
            Thank you for exploring NLink.<br />
            Stay connected as we redefine how digital content lives in the real world. Whether you're here to create, collaborate, or simply explore, we'd love to hear from you. Together, let's change reality in real time—one space at a time.
          </p>

          <button className="footer-cta-button" onClick={handleSendMessage}>
            <span>Send a Message</span>
            <div className="footer-cta-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* 版权信息 */}
      <div className="footer-copyright">
        © 2025 Nlink.ai  All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
