import { useState, useEffect } from 'react';
import LocalVideoBackground from './components/LocalVideoBackground'; // 替换为本地视频背景
import PillNav from './components/PillNav';
import StaggeredMenu from './components/StaggeredMenu';
import MobileBlocker from './components/MobileBlocker';
import UserIcon from './components/UserIcon';
import DraggableText from './components/DraggableText';
import LogoLoop from './components/LogoLoop';
import SplineSection from './components/SplineSection';
import SocialShowcase from './components/SocialShowcase';
import CTASection from './components/CTASection';
import DownloadPage from './components/DownloadPage';
import YouTubeVideoSection from './components/YouTubeVideoSection';
import Footer from './components/Footer';
import PixelTrailOverlay from './components/PixelTrailOverlay';
import logo from './assets/nlink-logo.svg';
import centerLogo from './assets/logo.png';
import logo2 from './assets/logo2.png';
import changeImg from './assets/change.png';
import realityImg from './assets/reality.png';
import inImg from './assets/in.png';
import realImg from './assets/real.png';
import timeImg from './assets/time.png';
import visionOsBottomImg from './assets/visionosbotton.png';
import visionOsLeftImg from './assets/visionosleft.png';
import iphoneUiImg from './assets/iphoneui.png';
// 导入company logo图片
import company1 from './assets/company1.png';
import company2 from './assets/company2.png';
import company3 from './assets/company3.png';
import company4 from './assets/company4.png';
import company5 from './assets/company5.png';
import company6 from './assets/company6.png';
import company7 from './assets/company7.png';
import company8 from './assets/company8.png';
import company9 from './assets/company9.png';
import './App.css';

function App() {
  const [activeHref, setActiveHref] = useState('/');
  const [currentPage, setCurrentPage] = useState('/'); // 添加页面状态
  const [currentMask, setCurrentMask] = useState(1); // 1: VisionOS蒙版, 2: 手机蒙版
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 968);
  const [comingSoonPage, setComingSoonPage] = useState(null);

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 968);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 格式化时间为 HH:MM
  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

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

  // 可拖动文字的初始位置（更大的垂直和水平差异）
  const draggableTexts = [
    { src: changeImg, alt: 'Change', initialPosition: { x: 100, y: 150 } },
    { src: realityImg, alt: 'Reality', initialPosition: { x: 350, y: 450 } },
    { src: inImg, alt: 'In', initialPosition: { x: 600, y: 200 } },
    { src: realImg, alt: 'Real', initialPosition: { x: 850, y: 500 } },
    { src: timeImg, alt: 'Time', initialPosition: { x: 1100, y: 120 } }
  ];

  // Company logos 配置
  const companyLogos = [
    { src: company1, alt: "Company 1" },
    { src: company2, alt: "Company 2" },
    { src: company3, alt: "Company 3" },
    { src: company4, alt: "Company 4" },
    { src: company5, alt: "Company 5" },
    { src: company6, alt: "Company 6" },
    { src: company7, alt: "Company 7" },
    { src: company8, alt: "Company 8" },
    { src: company9, alt: "Company 9" }
  ];

  const handleUserClick = () => {
    console.log('User icon clicked');
    // 这里可以添加用户菜单逻辑
  };

  const handleMaskToggle = (maskNumber) => {
    setCurrentMask(maskNumber);
  };

  // 处理页面导航
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      setCurrentPage(path);
      setActiveHref(path);
    };

    // 监听浏览器前进后退
    window.addEventListener('popstate', handleLocationChange);
    
    // 初始化当前页面
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // 拦截未完成页面的导航
  useEffect(() => {
    const handleNavClick = (e) => {
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
        }
      }
    };

    document.addEventListener('click', handleNavClick, true);
    return () => {
      document.removeEventListener('click', handleNavClick, true);
    };
  }, []);

  // 渲染不同的页面
  if (currentPage === '/download') {
    return isMobile ? <MobileBlocker /> : <DownloadPage />;
  }

  // 如果是移动端，显示移动端提示页面
  if (isMobile) {
    return <MobileBlocker />;
  }

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
      <PixelTrailOverlay />
      
      {/* Coming Soon 提示弹窗 */}
      {comingSoonPage && (
        <div className="success-overlay" onClick={() => setComingSoonPage(null)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-content">
              <img src={logo2} alt="NLink Logo" className="success-logo" />
              <div className="success-text">
                <h2 className="success-title">{getComingSoonText(comingSoonPage)} is coming soon.</h2>
                <p className="success-message">Get ready for something exciting!</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="App">
      {/* 本地视频容器 */}
      <div className="video-container">
        <LocalVideoBackground>
          {/* 顶部导航栏 - 响应式切换 */}
          {!isMobile ? (
            <div className="navigation-wrapper">
              {/* 左侧导航 - 禁用初始加载动画 */}
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

              {/* 中央Logo - 使用边框实现等距轮廓线 */}
              <div className="center-logo">
                <div className="center-logo-container">
                  <img src={centerLogo} alt="Nlink.ai Logo" className="center-logo-image" />
                </div>
              </div>

              {/* 右侧导航 */}
              <div className="right-nav-wrapper">
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
              colors={['#FFFFFF', '#F5F5F5']}
              logoUrl={centerLogo}
              accentColor="#FEC9FF"
            />
          )}

          {/* 可拖动的文字图片 */}
          {draggableTexts.map((text, index) => (
            <DraggableText
              key={index}
              src={text.src}
              alt={text.alt}
              initialPosition={text.initialPosition}
            />
          ))}

          {/* 主要内容区域 - 已删除文字 */}
          <div className="main-content">
            <div className="content-overlay">
              {/* 内容已删除 */}
            </div>
          </div>

          {/* 蒙版1: VisionOS风格 - 始终渲染但控制透明度 */}
          <div className={`mask-1 ${currentMask === 1 ? 'mask-visible' : 'mask-hidden'}`}>
            {/* 左侧竖形圆角矩形 */}
            <div className="left-vertical-image">
              <img
                src={visionOsLeftImg}
                alt="VisionOS Left"
                className="left-vertical-image-content"
              />
            </div>

            {/* 下方半透明图像 */}
            <div className="bottom-image">
              <img
                src={visionOsBottomImg}
                alt="VisionOS Bottom"
                className="bottom-image-content"
              />
            </div>
          </div>

          {/* 蒙版2: 手机风格 - 始终渲染但控制透明度 */}
          <div className={`mask-2 ${currentMask === 2 ? 'mask-visible' : 'mask-hidden'}`}>
            {/* 灵动岛上方的iPhone UI图像 */}
            <div className="phone-ui-image">
              <img
                src={iphoneUiImg}
                alt="iPhone UI"
                className="phone-ui-content"
              />
            </div>
            
            {/* 左侧灵动岛样式 */}
            <div className="phone-dynamic-island"></div>
            
            {/* 竖直时间显示 */}
            <div className="phone-time-display">
              <span className="phone-time-text">{formatTime(currentTime)}</span>
            </div>
          </div>
        </LocalVideoBackground>
      </div>

      {/* 控制区域 - 位于视频下方 */}
      <div className="control-area">
        {/* 蒙版切换按钮 */}
        <div className="mask-toggle">
          <button
            className={`mask-toggle-btn ${currentMask === 1 ? 'active' : ''}`}
            onClick={() => handleMaskToggle(1)}
          >
            <div className="mask-dot"></div>
          </button>
          <button
            className={`mask-toggle-btn ${currentMask === 2 ? 'active' : ''}`}
            onClick={() => handleMaskToggle(2)}
          >
            <div className="mask-dot"></div>
          </button>
        </div>
      </div>

      {/* Logo循环展示区域 */}
      <div className="logo-section">
        <LogoLoop
          logos={companyLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#F0F0F0"
          ariaLabel="合作伙伴"
        />
      </div>

      {/* Spline 3D模型与文本板块 */}
      <SplineSection />

      {/* 社交媒体展示板块 */}
      <SocialShowcase />

      {/* CTA行动号召板块 */}
      <CTASection />

      {/* YouTube视频背景板块 */}
      <YouTubeVideoSection />

      {/* Footer底部板块 */}
      <Footer />
      </div>
    </>
  );
}

export default App;
