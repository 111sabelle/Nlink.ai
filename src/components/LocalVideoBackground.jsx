import { useRef, useEffect, useState } from 'react';
import './LocalVideoBackground.css';

const LocalVideoBackground = ({ children }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(false);
      console.error('视频加载失败');
    };

    const handleCanPlay = () => {
      video.play().catch(e => {
        console.warn('自动播放失败:', e);
      });
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <div className="local-video-background">
      {/* 视频层 */}
      <video
        ref={videoRef}
        className={`background-video ${isLoaded ? 'loaded' : 'loading'}`}
        muted
        loop
        playsInline
        preload="metadata"
        autoPlay
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        您的浏览器不支持视频播放。
      </video>

      {/* 加载状态 */}
      {!isLoaded && !hasError && (
        <div className="video-loading">
          <div className="loading-spinner"></div>
          <p>加载视频中...</p>
        </div>
      )}

      {/* 错误状态 */}
      {hasError && (
        <div className="video-error">
          <p>视频加载失败</p>
          <div className="error-fallback"></div>
        </div>
      )}

      {/* 内容层 */}
      <div className="video-content">
        {children}
      </div>
    </div>
  );
};

export default LocalVideoBackground;
