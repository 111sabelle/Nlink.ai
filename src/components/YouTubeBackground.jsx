import { useEffect, useRef, useState } from 'react';
import './YouTubeBackground.css';

const YouTubeBackground = ({ videoId, children, className = '' }) => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    // 加载YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // 等待API加载完成
    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const initializePlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player('youtube-background-player', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: videoId,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        autohide: 0,
        mute: 1,
        start: 0,
        end: 0,
        rel: 0
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  };

  const onPlayerReady = (event) => {
    setIsPlayerReady(true);
    event.target.mute();
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      event.target.playVideo();
    }
  };

  return (
    <div className={`youtube-background ${className}`} ref={containerRef}>
      {/* YouTube视频背景 */}
      <div className="youtube-video-container">
        <div id="youtube-background-player" className="youtube-player"></div>
        <div className="video-overlay"></div>
      </div>

      {/* 内容层 */}
      <div className="youtube-content">
        {children}
      </div>
    </div>
  );
};

export default YouTubeBackground;
