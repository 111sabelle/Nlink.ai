import React, { useState, useEffect } from 'react';
import PillNav from './PillNav';
import StaggeredMenu from './StaggeredMenu';
import UserIcon from './UserIcon';
import Footer from './Footer';
import PixelTrailOverlay from './PixelTrailOverlay';
import StickerPeel from './StickerPeel';
import logo from '../assets/nlink-logo.svg';
import centerLogo from '../assets/logo.png';
import logo2 from '../assets/logo2.png';
import computerSticker from '../assets/computerstiker.png';
import arrowIcon from '../assets/arrow.png';
import './DownloadPage.css';

const DownloadPage = () => {
  const [activeHref, setActiveHref] = useState('/download');
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 968);
  const [comingSoonPage, setComingSoonPage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    role: '',
    hope: '',
    newsletter: false
  });

  // 左侧导航项目
  const leftNavItems = [
    { label: 'HOME', href: '/' },
    { label: 'LANDMARK', href: '/landmark' },
    { label: 'ABOUT', href: '/about' }
  ];

  // 右侧导航项目
  const rightNavItems = [
    { label: 'RANKING', href: '/ranking' },
    { label: 'DOWNLOAD', href: '/download' },
    { label: 'POINTS', href: '/points' }
  ];

  const handleUserClick = () => {
    console.log('User icon clicked');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 显示提交中状态
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="download-submit-text">Submitting...</span>';
    
    try {
      // 使用Google Sheets作为数据库
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0lbyRMhJrpvTiD7GF34r31rxAY3skL8u2bFM_2k3dCjcbbnBZWksgsxFGn6WygRDZ/exec';
      
      const formDataToSend = {
        name: formData.name,
        email: formData.email,
        location: formData.location,
        role: formData.role,
        hope: formData.hope,
        newsletter: formData.newsletter,
        timestamp: new Date().toISOString()
      };
      
      console.log('Submitting data:', formDataToSend);
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend)
      });
      
      console.log('Response received');
      
      // 显示自定义成功提示
      setShowSuccess(true);
      
      // 重置表单
      setFormData({
        name: '',
        email: '',
        location: '',
        role: '',
        hope: '',
        newsletter: false
      });
      
      // 3秒后自动关闭
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error submitting the form. Please try again.');
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  };

  // 加载Spline脚本
  useEffect(() => {
    const existingScript = document.querySelector('script[src*="spline-viewer"]');
    
    if (existingScript) {
      setSplineLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.71/build/spline-viewer.js';
    
    script.onload = () => {
      console.log('Spline viewer script loaded successfully');
      setSplineLoaded(true);
      setSplineError(false);
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Spline viewer script:', error);
      setSplineError(true);
      setSplineLoaded(false);
    };
    
    document.head.appendChild(script);

    return () => {
      // 清理逻辑
    };
  }, []);

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 968);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 处理导航点击
  useEffect(() => {
    const handleNavClick = (e) => {
      // 检查是否点击了导航链接
      const link = e.target.closest('a[href]');
      if (link && link.getAttribute('href')?.startsWith('/')) {
        const href = link.getAttribute('href');
        const unfinishedPages = ['/landmark', '/about', '/ranking', '/points'];
        
        if (unfinishedPages.includes(href)) {
          e.preventDefault();
          e.stopPropagation();
          setComingSoonPage(href);
          // 5秒后自动关闭
          setTimeout(() => {
            setComingSoonPage(null);
          }, 5000);
          return;
        }
        
        e.preventDefault();
        
        // 如果点击的是首页链接，返回主页
        if (href === '/') {
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
          setActiveHref(href);
          window.history.pushState({}, '', href);
        }
      }
    };

    document.addEventListener('click', handleNavClick, true);
    return () => {
      document.removeEventListener('click', handleNavClick, true);
    };
  }, []);

  // 获取Coming Soon提示文字
  const getComingSoonText = (page) => {
    const pageNames = {
      '/landmark': 'Landmark',
      '/about': 'About',
      '/ranking': 'Ranking',
      '/points': 'Points'
    };
    return pageNames[page] || 'This page';
  };

  return (
    <>
      {/* 只在桌面端显示PixelTrail鼠标反色交互 */}
      {!isMobile && <PixelTrailOverlay />}
      
      {/* 成功提示弹窗 */}
      {showSuccess && (
        <div className="success-overlay" onClick={() => setShowSuccess(false)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-content">
              <img src={logo2} alt="Nlink Logo" className="success-logo" />
              <div className="success-text">
                <h2 className="success-title">Thank you for joining our waiting list!</h2>
                <p className="success-message">We will contact you soon.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Coming Soon 提示弹窗 */}
      {comingSoonPage && (
        <div className="success-overlay" onClick={() => setComingSoonPage(null)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-content">
              <img src={logo2} alt="Nlink Logo" className="success-logo" />
              <div className="success-text">
                <h2 className="success-title">{getComingSoonText(comingSoonPage)} is coming soon.</h2>
                <p className="success-message">Get ready for something exciting!</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="download-page">
        {/* 顶部导航栏 - 响应式切换 */}
        {!isMobile ? (
          <div className="download-navigation-wrapper">
            {/* 左侧导航 */}
            <PillNav
              items={leftNavItems}
              activeHref={activeHref}
              className="left-nav"
              ease="power2.easeOut"
              baseColor="#000000"
              pillColor="#ffffff"
              hoveredPillTextColor="#ffffff"
              pillTextColor="#000000"
              initialLoadAnimation={false}
            />

            {/* 中央Logo */}
            <div className="download-center-logo">
              <div className="download-center-logo-container">
                <img src={centerLogo} alt="Nlink.ai Logo" className="download-center-logo-image" />
              </div>
            </div>

            {/* 右侧导航 */}
            <div className="download-right-nav-wrapper">
              <PillNav
                items={rightNavItems}
                activeHref={activeHref}
                className="right-nav"
                ease="power2.easeOut"
                baseColor="#000000"
                pillColor="#ffffff"
                hoveredPillTextColor="#ffffff"
                pillTextColor="#000000"
                initialLoadAnimation={false}
              />
              <UserIcon onClick={handleUserClick} />
            </div>
          </div>
        ) : (
          <div className="download-staggered-nav">
            <StaggeredMenu
              position="right"
              items={[...leftNavItems, ...rightNavItems].map(item => ({
                label: item.label,
                link: item.href,
                ariaLabel: `Go to ${item.label}`
              }))}
              displaySocials={false}
              displayItemNumbering={true}
              menuButtonColor="#000000"
              openMenuButtonColor="#000000"
              changeMenuColorOnOpen={false}
              colors={['#B9FBB7', '#FFD5FF']}
              logoUrl={centerLogo}
              accentColor="#FEC9FF"
            />
          </div>
        )}

        {/* 主要内容区域 */}
        <div className="download-main-content">
          {/* 移动端：顶部Spline模型区域 */}
          <div className="download-mobile-spline-section">
            {/* 横向滚动文字背景 */}
            <div className="download-horizontal-text">
              <div className="download-horizontal-text-inner">
                <span className="download-horizontal-text-item">JOINTHEWAITINGLIST</span>
                <span className="download-horizontal-text-item">JOINTHEWAITINGLIST</span>
                <span className="download-horizontal-text-item">JOINTHEWAITINGLIST</span>
                <span className="download-horizontal-text-item">JOINTHEWAITINGLIST</span>
              </div>
            </div>
            {/* Spline 3D模型 */}
            <div className="download-mobile-spline">
              {splineLoaded && (
                <spline-viewer 
                  url="https://prod.spline.design/X6uIgb9KtS9iKIoJ/scene.splinecode"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  onLoad={() => console.log('Mobile Download Spline scene loaded')}
                  onError={(error) => console.error('Mobile Download Spline scene error:', error)}
                />
              )}
            </div>
          </div>

          {/* 左侧竖直文字 - 桌面端 */}
          <div className="download-vertical-text download-vertical-text-desktop">
            <div className="download-vertical-text-inner">
              <span className="download-vertical-text-item">JOINTHEWAITINGLIST</span>
              <span className="download-vertical-text-item">JOINTHEWAITINGLIST</span>
              <span className="download-vertical-text-item">JOINTHEWAITINGLIST</span>
            </div>
            
            {/* Spline 3D模型覆盖层 */}
            <div className="download-spline-overlay">
              {splineLoaded && (
                <spline-viewer 
                  url="https://prod.spline.design/X6uIgb9KtS9iKIoJ/scene.splinecode"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  onLoad={() => console.log('Download page Spline scene loaded')}
                  onError={(error) => console.error('Download page Spline scene error:', error)}
                />
              )}
            </div>
          </div>

          {/* 右侧表单区域 */}
          <div className="download-form-container">
            <div className="download-form-header">
              <div className="download-title-wrapper">
                <h1 className="download-form-title">READY TO DROP OR DISCOVER?</h1>
                <StickerPeel
                  imageSrc={computerSticker}
                  width={120}
                  rotate={30}
                  className="download-sticker"
                />
              </div>
              <p className="download-form-subtitle">Get on the Nlink waiting list—shape reality with us.</p>
            </div>

            <form className="download-form" onSubmit={handleSubmit}>
              {/* NAME 和 EMAIL 并排 */}
              <div className="download-form-row">
                <div className="download-form-field">
                  <label htmlFor="name" className="download-form-label">NAME*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="download-form-input"
                    required
                  />
                </div>
                <div className="download-form-field">
                  <label htmlFor="email" className="download-form-label">EMAIL*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="download-form-input"
                    required
                  />
                </div>
              </div>

              {/* LOCATION */}
              <div className="download-form-field download-form-field-full">
                <label htmlFor="location" className="download-form-label">LOCATION*</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="download-form-input"
                  required
                />
              </div>

              {/* ROLE */}
              <div className="download-form-field download-form-field-full">
                <label htmlFor="role" className="download-form-label">ROLE*</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="download-form-select"
                  required
                >
                  <option value=""></option>
                  <option value="creator">Creator</option>
                  <option value="explorer">Explorer</option>
                  <option value="tester">Tester</option>
                  <option value="collector">Collector</option>
                  <option value="developer">Developer</option>
                  <option value="organization">Organization</option>
                </select>
              </div>

              {/* WHAT DO YOU HOPE TO DO WITH NLINK */}
              <div className="download-form-field download-form-field-full">
                <label htmlFor="hope" className="download-form-label">WHAT DO YOU HOPE TO DO WITH NLINK?</label>
                <textarea
                  id="hope"
                  name="hope"
                  value={formData.hope}
                  onChange={handleInputChange}
                  className="download-form-textarea"
                  rows="5"
                />
              </div>

              {/* Newsletter checkbox */}
              <div className="download-form-checkbox-wrapper">
                <label className="download-form-checkbox-label">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="download-form-checkbox"
                  />
                  <span className="download-form-checkbox-text">Sign me up for the Nlink newsletter</span>
                </label>
              </div>

              {/* Submit button */}
              <button type="submit" className="download-form-submit">
                <span className="download-submit-text">Join the waiting list</span>
                <div className="download-submit-arrow">
                  <img src={arrowIcon} alt="arrow" className="arrow-icon-img" />
                </div>
        </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default DownloadPage;