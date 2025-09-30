import PixelTrail from './PixelTrail';
import './PixelTrailOverlay.css';

export default function PixelTrailOverlay() {
  return (
    <div className="pixel-trail-overlay">
      <PixelTrail
        gridSize={160}
        trailSize={0.035}
        maxAge={450}
        interpolate={10}
        easingFunction={(t) => t * (2 - t)}
        color="#ffffff"
        gooeyFilter={{ id: "pixel-trail-goo", strength: 1.0 }}
        alphaScale={1.0} /* 恢复完全不透明，让反色效果更明显 */
      />
    </div>
  );
}
