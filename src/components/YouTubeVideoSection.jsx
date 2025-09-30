import React, { useRef, useEffect, useState, useMemo } from 'react';
import './YouTubeVideoSection.css';

const YouTubeVideoSection = () => {
  const iframeRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [smallLoaded, setSmallLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const bgContainerRef = useRef(null);
  const smallContainerRef = useRef(null);
  const bgPlayerRef = useRef(null);
  const smallPlayerRef = useRef(null);
  const sectionRef = useRef(null);

  const originParam = useMemo(() => {
    try {
      return encodeURIComponent(window.location.origin);
    } catch {
      return '';
    }
  }, []);

  useEffect(() => {
    // 确保YouTube iframe API已加载
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        setIsReady(true);
        return;
      }

      // 如果API尚未加载，加载它
      if (!window.YT) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.body.appendChild(script);

        // API加载完成回调
        window.onYouTubeIframeAPIReady = () => {
          setIsReady(true);
        };
      }
    };

    loadYouTubeAPI();
  }, []);

  // 监听section是否进入视口
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      {
        threshold: 0.3 // 当30%的section进入视口时触发
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // API就绪且进入视口后创建两个播放器
  useEffect(() => {
    if (!isReady || !isInView) return;
    if (!bgContainerRef.current || !smallContainerRef.current) return;

    try {
      if (!bgPlayerRef.current) {
        bgPlayerRef.current = new window.YT.Player(bgContainerRef.current, {
          videoId: 'q3eqw6_7vEk',
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            autohide: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            loop: 1,
            playlist: 'q3eqw6_7vEk',
            iv_load_policy: 3,
            fs: 0,
            disablekb: 1,
            cc_load_policy: 0,
            origin: window.location.origin
          },
          events: {
            onReady: (e) => {
              try {
                e.target.mute();
                e.target.playVideo();
                setBgLoaded(true);
              } catch {}
            },
            onStateChange: (e) => {
              if (e.data === window.YT.PlayerState.ENDED) {
                e.target.seekTo(0);
                e.target.playVideo();
              }
            }
          }
        });
      }

      if (!smallPlayerRef.current) {
        smallPlayerRef.current = new window.YT.Player(smallContainerRef.current, {
          videoId: 'q3eqw6_7vEk',
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            autohide: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            loop: 1,
            playlist: 'q3eqw6_7vEk',
            iv_load_policy: 3,
            fs: 0,
            disablekb: 1,
            cc_load_policy: 0,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (e) => {
              try {
                e.target.mute();
                e.target.setVolume(0);
                e.target.playVideo();
                setSmallLoaded(true);
              } catch {}
            },
            onStateChange: (e) => {
              if (e.data === window.YT.PlayerState.ENDED) {
                e.target.seekTo(0);
                e.target.playVideo();
              }
            }
          }
        });
      }
    } catch {}

    return () => {
      try {
        bgPlayerRef.current?.destroy?.();
        smallPlayerRef.current?.destroy?.();
        bgPlayerRef.current = null;
        smallPlayerRef.current = null;
      } catch {}
    };
  }, [isReady, isInView]);

  return (
    <section ref={sectionRef} className="youtube-video-section" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      height: 'auto',
      background: '#000000',
      overflow: 'hidden',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* 背景视频层 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        <div
          ref={bgContainerRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.78vh',
            filter: 'blur(8px)'
          }}
          aria-label="YouTube Background Player"
        />
        {/* 黑色蒙版层 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2,
          pointerEvents: 'none'
        }}></div>
        {/* 上下边缘渐变模糊遮罩 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.9) 100%)',
          zIndex: 3,
          pointerEvents: 'none'
        }}></div>
      </div>

      {/* 前景小视频 - 响应式尺寸 */}
      <div 
        onClick={() => window.open('https://www.youtube.com/watch?v=q3eqw6_7vEk', '_blank')}
        style={{
          position: 'relative',
          zIndex: 10,
          width: 'min(85vw, 1000px)',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
          margin: '8rem 0',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 40px 100px rgba(0, 0, 0, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.5)';
        }}
      >
        <div
          ref={smallContainerRef}
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
          aria-label="YouTube Foreground Player"
        />
      </div>
    </section>
  );
};

export default YouTubeVideoSection;
