
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [duration, setDuration] = useState(60);
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setRemaining((previous) => {
        if (previous <= 1) {
          setRunning(false);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  const elapsed = (duration - remaining) / duration;
  const topSand = 1 - elapsed;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const chooseDuration = (seconds) => {
    setRunning(false);
    setDuration(seconds);
    setRemaining(seconds);
  };

  const resetClock = () => {
    setRunning(false);
    setRemaining(duration);
  };

  return (
    <main className="app">
      <div className="heading">
        <span className="eyebrow">THE ART OF TIME</span>
        <h1>TIMELESS</h1>
        <p>A little moment of infinity</p>
      </div>

      <div className="hourglass-wrap">
        <div className="hourglass-shadow" />

        <svg className="hourglass" viewBox="0 0 400 500">
          <defs>
            <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff0a6" />
              <stop offset="45%" stopColor="#e9a92e" />
              <stop offset="100%" stopColor="#9e5a10" />
            </linearGradient>

            <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity=".04" />
              <stop offset="25%" stopColor="#b8edff" stopOpacity=".20" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity=".02" />
              <stop offset="80%" stopColor="#b8edff" stopOpacity=".16" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity=".04" />
            </linearGradient>

            <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff0c0" />
              <stop offset="35%" stopColor="#a66a27" />
              <stop offset="65%" stopColor="#f5ce77" />
              <stop offset="100%" stopColor="#674019" />
            </linearGradient>

            <clipPath id="topChamber">
              <path d="M112 75 L288 75 C288 145 205 177 205 250 L195 250 C195 177 112 145 112 75Z" />
            </clipPath>

            <clipPath id="bottomChamber">
              <path d="M195 250 L205 250 C205 323 288 355 288 425 L112 425 C112 355 195 323 195 250Z" />
            </clipPath>
          </defs>

          {/* Metal top and bottom caps */}
          <rect x="90" y="43" width="220" height="25" rx="8" fill="url(#metal)" />
          <rect x="90" y="432" width="220" height="25" rx="8" fill="url(#metal)" />

          {/* Decorative support pillars */}
          <rect x="98" y="62" width="13" height="376" rx="6" fill="url(#metal)" />
          <rect x="289" y="62" width="13" height="376" rx="6" fill="url(#metal)" />

          {/* Glass body */}
          <path
            d="M112 75 C112 155 195 170 195 250 C195 330 112 345 112 425 L288 425 C288 345 205 330 205 250 C205 170 288 155 288 75Z"
            fill="url(#glass)"
            stroke="#c5edff"
            strokeOpacity=".7"
            strokeWidth="3"
          />

          {/* Upper chamber sand */}
          <g clipPath="url(#topChamber)">
            <rect
              x="100"
              y={75}
              width="200"
              height={170 * topSand}
              fill="url(#gold)"
            />
            <path
              d={`M110 ${75 + 170 * topSand} Q200 ${65 + 170 * topSand} 290 ${75 + 170 * topSand}`}
              fill="none"
              stroke="#fff0a6"
              strokeWidth="3"
              opacity=".8"
            />
          </g>

          {/* Lower chamber growing sand pile */}
          <g clipPath="url(#bottomChamber)">
            <path
              d={`M200 250
                L${200 - 82 * elapsed} ${425}
                L${200 + 82 * elapsed} 425 Z`}
              fill="url(#gold)"
            />
            <ellipse
              cx="200"
              cy={425 - 95 * elapsed}
              rx={82 * elapsed}
              ry={Math.max(2, 12 * elapsed)}
              fill="#f5cb69"
              opacity=".8"
            />
          </g>

          {/* Falling stream */}
          {running && remaining > 0 && (
            <g className="sand-stream">
              <path
                d="M200 215 L200 270"
                stroke="#ffd46c"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="4 5"
              />
              <circle cx="200" cy="244" r="3" fill="#fff0a6" />
            </g>
          )}

          {/* Glass reflections */}
          <path d="M125 88 C128 140 180 165 184 208"
            fill="none" stroke="white" strokeOpacity=".5" strokeWidth="5"
            strokeLinecap="round" />
          <path d="M275 90 C270 135 240 155 230 175"
            fill="none" stroke="white" strokeOpacity=".25" strokeWidth="3"
            strokeLinecap="round" />
          <path d="M125 415 C130 370 160 350 174 330"
            fill="none" stroke="white" strokeOpacity=".25" strokeWidth="4"
            strokeLinecap="round" />
        </svg>

        <div className="glass-glow" />
      </div>

      <div className="timer-panel">
        <div className="timer-label">TIME REMAINING</div>
        <div className="timer">{formatTime(remaining)}</div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${elapsed * 100}%` }}
          />
        </div>

        <div className="controls">
          <button
            className="start-btn"
            onClick={() => setRunning(!running)}
            disabled={remaining === 0}
          >
            {running ? "PAUSE" : remaining === 0 ? "FINISHED" : "START"}
          </button>

          <button className="reset-btn" onClick={resetClock}>
            RESET
          </button>
        </div>

        <div className="duration-options">
          <span>SET DURATION</span>
          <div>
            {[30, 60, 120].map((seconds) => (
              <button
                key={seconds}
                className={duration === seconds ? "selected" : ""}
                onClick={() => chooseDuration(seconds)}
              >
                {seconds / 60 || 0.5} MIN
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer>EVERY GRAIN TELLS A STORY</footer>
    </main>
  );
}

export default App;
