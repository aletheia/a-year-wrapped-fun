import React, { useState, useEffect } from 'react';

const WrapUp2025 = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const slides = [
    { id: 'intro', title: 'INTRO' },
    { id: 'sleep', title: 'SLEEP' },
    { id: 'breathing', title: 'BREATHING' },
    { id: 'hydration', title: 'HYDRATION' },
    { id: 'carbon', title: 'CO2' },
    { id: 'keyboard', title: 'KEYS' },
    { id: 'email', title: 'EMAIL' },
    { id: 'meetings', title: 'MEETINGS' },
    { id: 'certs', title: 'CERTS' },
    { id: 'wisdom', title: 'WISDOM' },
  ];

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [activeSlide]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const CircularProgress = ({ percentage, size = 200, strokeWidth = 12, color = '#00ff88', label, sublabel }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="circular-progress" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 1s ease-out',
              filter: `drop-shadow(0 0 10px ${color})`,
            }}
          />
        </svg>
        <div className="circular-progress-text">
          <span className="percentage">{percentage}%</span>
          {label && <span className="label">{label}</span>}
          {sublabel && <span className="sublabel">{sublabel}</span>}
        </div>
      </div>
    );
  };

  const BarChart = ({ data }) => (
    <div className="bar-chart">
      {data.map((item, index) => (
        <div key={index} className="bar-item" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="bar-label">{item.label}</div>
          <div className="bar-container">
            <div
              className="bar-fill"
              style={{
                width: `${item.value}%`,
                background: item.color || 'linear-gradient(90deg, #00ff88, #00ccff)',
              }}
            />
            <span className="bar-value">{item.display || `${item.value}%`}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const CountUp = ({ end, suffix = '', prefix = '', decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (hasAnimated) return;
      
      let start = 0;
      const duration = 1500;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          setHasAnimated(true);
          clearInterval(timer);
        } else {
          setCount(decimals > 0 ? parseFloat(start.toFixed(decimals)) : Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [end, hasAnimated, decimals]);

    const displayValue = decimals > 0 
      ? count.toFixed(decimals) 
      : count.toLocaleString();

    return (
      <span className="count-up">
        {prefix}{displayValue}{suffix}
      </span>
    );
  };

  const renderSlide = () => {
    switch (slides[activeSlide].id) {
      case 'intro':
        return (
          <div className="slide slide-intro">
            <div className="glitch-container">
              <h1 className="glitch" data-text="LUCA'S">LUCA'S</h1>
              <h1 className="year-text">2025</h1>
              <h1 className="glitch wrapped-text" data-text="WRAPPED">WRAPPED</h1>
            </div>
            <p className="tagline">Because you absolutely needed to know this</p>
            <div className="scroll-hint">
              <span>Swipe to waste more time</span>
              <div className="arrow-down">↓</div>
            </div>
          </div>
        );

      case 'sleep':
        return (
          <div className="slide slide-sleep">
            <div className="slide-header">
              <span className="category-tag">💤 SLEEP PERFORMANCE</span>
            </div>
            <div className="big-number">
              <CountUp end={2555} /> <span className="unit">ore</span>
            </div>
            <div className="stat-comparison">
              <span className="target">Target: 2,920</span>
            </div>
            <CircularProgress
              percentage={87.5}
              size={180}
              color="#a855f7"
              label="Efficienza"
              sublabel="event-driven sleep"
            />
            <div className="achievement-badge">
              <span className="badge-icon">🏆</span>
              <span className="badge-text">Svegliato PRIMA della sveglia: <strong>23 volte</strong></span>
              <span className="badge-subtext">Le altre 342? Snooze come microservizio.</span>
            </div>
          </div>
        );

      case 'breathing':
        return (
          <div className="slide slide-breathing">
            <div className="slide-header">
              <span className="category-tag">🌬️ RESPIRATORY ANALYTICS</span>
            </div>
            <div className="big-number breathing-number">
              <CountUp end={7884000} />
              <span className="unit">respiri</span>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value green">0</div>
                <div className="stat-label">Downtime</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">99.999%</div>
                <div className="stat-label">Uptime</div>
                <div className="stat-note">(0.001% = prezzi API OpenAI)</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">15→40</div>
                <div className="stat-label">Respiri/min</div>
                <div className="stat-note">Scalabile durante call investitori</div>
              </div>
            </div>
          </div>
        );

      case 'hydration':
        return (
          <div className="slide slide-hydration">
            <div className="slide-header">
              <span className="category-tag">💧 HYDRATION METRICS</span>
            </div>
            <div className="big-number">
              <CountUp end={730} /> <span className="unit">litri</span>
            </div>
            <div className="kubernetes-quote">
              "Ho implementato un sistema di idratazione basato su Kubernetes. Ogni bicchiere è un pod. Il mio corpo è il cluster. Ad ogni nuovo aggiornamento devo distruggerlo e ricrearlo."
            </div>
            <div className="water-breakdown">
              <div className="water-bar">
                <div className="water-segment coding" style={{ width: '40%' }}>
                  <span>40%</span>
                  <small>Coding</small>
                </div>
                <div className="water-segment meetings" style={{ width: '35%' }}>
                  <span>35%</span>
                  <small>Riunioni inutili</small>
                </div>
                <div className="water-segment decisions" style={{ width: '25%' }}>
                  <span>25%</span>
                  <small>Decisioni discutibili</small>
                </div>
              </div>
            </div>
          </div>
        );

      case 'carbon':
        return (
          <div className="slide slide-carbon">
            <div className="slide-header">
              <span className="category-tag">🌍 CARBON FOOTPRINT</span>
              <span className="edition-tag">Working Edition</span>
            </div>
            <div className="big-number carbon-number">
              <CountUp end={847} /> <span className="unit">kg CO₂</span>
            </div>
            <BarChart
              data={[
                { label: '"Hai un minuto?"', value: 37, display: '312 kg', color: 'linear-gradient(90deg, #ff6b6b, #ff8e8e)' },
                { label: 'Code review altrui', value: 22, display: '189 kg', color: 'linear-gradient(90deg, #ffd93d, #ffe066)' },
                { label: 'Frustrazione vendor', value: 18, display: '156 kg', color: 'linear-gradient(90deg, #6bcb77, #8edd8e)' },
                { label: '"Quick sync" 90min', value: 15, display: '127 kg', color: 'linear-gradient(90deg, #4d96ff, #6ba8ff)' },
                { label: 'Imprecazioni', value: 8, display: '63 kg', color: 'linear-gradient(90deg, #a855f7, #c084fc)' },
              ]}
            />
          </div>
        );

      case 'keyboard':
        return (
          <div className="slide slide-keyboard">
            <div className="slide-header">
              <span className="category-tag">⌨️ KEYSTROKE ECONOMY</span>
            </div>
            <div className="big-number">
              <CountUp end={4.2} suffix="M" decimals={1} /> <span className="unit">tasti premuti</span>
            </div>
            <div className="key-stats">
              <div className="key-stat featured">
                <div className="key-visual">TAB</div>
                <div className="key-info">
                  <span className="key-count">890,000</span>
                  <span className="key-percentage">21%</span>
                  <span className="key-description">Benvenuti nell'era dell'AI, dove accettare suggerimenti è diventato il nuovo scrivere codice</span>
                </div>
              </div>
              <div className="key-stat">
                <div className="key-visual small">Ctrl+Z</div>
                <div className="key-info">
                  <span className="key-count">12,847</span>
                  <span className="key-description">La storia della mia vita</span>
                </div>
              </div>
              <div className="key-stat classified">
                <div className="key-visual small">Ctrl+C/V</div>
                <div className="key-info">
                  <span className="key-count classified-text">CLASSIFIED</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="slide slide-email">
            <div className="slide-header">
              <span className="category-tag">📧 EMAIL EFFICIENCY</span>
            </div>
            <div className="funnel">
              <div className="funnel-step" style={{ width: '100%' }}>
                <span className="funnel-number">2,847</span>
                <span className="funnel-label">Ricevute</span>
              </div>
              <div className="funnel-arrow">↓</div>
              <div className="funnel-step" style={{ width: '70%' }}>
                <span className="funnel-number">312</span>
                <span className="funnel-label">Lette</span>
              </div>
              <div className="funnel-arrow">↓</div>
              <div className="funnel-step" style={{ width: '40%' }}>
                <span className="funnel-number">47</span>
                <span className="funnel-label">Con risposta</span>
              </div>
              <div className="funnel-arrow">↓</div>
              <div className="funnel-step final" style={{ width: '15%' }}>
                <span className="funnel-number">3</span>
                <span className="funnel-label">Utili</span>
              </div>
            </div>
            <div className="conversion-badge">
              <span>Conversion rate: 0.1%</span>
              <span className="growth-hack">Growth hacking at its finest.</span>
            </div>
          </div>
        );

      case 'meetings':
        return (
          <div className="slide slide-meetings">
            <div className="slide-header">
              <span className="category-tag">🎯 MEETING ROI</span>
            </div>
            <div className="big-number">
              <CountUp end={847} /> <span className="unit">ore in meeting</span>
            </div>
            <div className="meeting-stats">
              <div className="meeting-stat">
                <CircularProgress percentage={84} size={120} color="#ff6b6b" />
                <span className="meeting-label">Potevano essere email</span>
              </div>
              <div className="meeting-stat">
                <CircularProgress percentage={78} size={120} color="#ffd93d" />
                <span className="meeting-label">Potevano essere un Teams</span>
              </div>
              <div className="meeting-stat">
                <CircularProgress percentage={65} size={120} color="#6bcb77" />
                <span className="meeting-label">Potevano non esistere</span>
              </div>
              <div className="meeting-stat nda">
                <div className="nda-badge">[NDA]</div>
                <span className="meeting-label">Meeting produttivi</span>
              </div>
            </div>
          </div>
        );

      case 'certs':
        return (
          <div className="slide slide-certs">
            <div className="slide-header">
              <span className="category-tag">🏅 CERTIFICAZIONI 2025</span>
            </div>
            <div className="cert-grid">
              <div className="cert-card">
                <div className="cert-icon">✅</div>
                <div className="cert-name">Certified Eye-Roller</div>
                <div className="cert-context">durante pitch deck</div>
              </div>
              <div className="cert-card">
                <div className="cert-icon">🥋</div>
                <div className="cert-name">Black Belt</div>
                <div className="cert-context">"Sei in muto"</div>
              </div>
              <div className="cert-card">
                <div className="cert-icon">🎓</div>
                <div className="cert-name">Master</div>
                <div className="cert-context">Annuire Pensando Ad Altro</div>
              </div>
              <div className="cert-card featured">
                <div className="cert-icon">🎖️</div>
                <div className="cert-name">PhD</div>
                <div className="cert-context">Procrastination</div>
              </div>
            </div>
          </div>
        );

      case 'wisdom':
        return (
          <div className="slide slide-wisdom">
            <div className="slide-header">
              <span className="category-tag">🎵 La più grande lezione imparata</span>
            </div>
            <div className="quote-container">
              <blockquote>
                "L'anno che sta arrivando, tra un anno passerà.
                <br />
                Io mi sto preparando, è questa la novità."
              </blockquote>
              <cite>— Lucio Dalla, 1979</cite>
              <span className="quote-note">che aveva già capito tutto</span>
            </div>
            <div className="final-wish">
              <p className="wish-text">
                <strong>Che il 2026 sia leggero.</strong>
              </p>
              <p className="wish-examples">
                Leggero come un microservizio ben fatto.<br />
                Leggero come un meeting cancellato.<br />
                Leggero come quella sensazione quando il deploy va in prod al primo tentativo.
              </p>
            </div>
            <div className="linkedin-reminder">
              <span>Buon anno, e ricordati:</span>
              <span className="linkedin-text">se non l'hai postato su LinkedIn, non è mai successo.</span>
              <span className="rocket">🚀</span>
            </div>
            <div className="carbon-footer">
              P.S. Questo wrap-up è stato generato con un carbon footprint di circa 0.0003 kg di CO₂. Prego.
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .wrap-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          font-family: 'Syne', sans-serif;
          color: #ffffff;
          overflow-x: hidden;
          position: relative;
        }

        .wrap-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 0, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 107, 107, 0.05) 0%, transparent 30%);
          pointer-events: none;
          z-index: 0;
        }

        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 1;
        }

        .main-content {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .navigation {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 100;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          padding: 12px 20px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .nav-dot:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: scale(1.2);
        }

        .nav-dot.active {
          background: #00ff88;
          box-shadow: 0 0 15px #00ff88;
          transform: scale(1.3);
        }

        .nav-arrows {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          display: flex;
          width: 100%;
          justify-content: space-between;
          padding: 0 20px;
          pointer-events: none;
        }

        .nav-arrow {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-arrow:hover {
          background: rgba(0, 255, 136, 0.3);
          border-color: #00ff88;
          transform: scale(1.1);
        }

        .slide {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px 100px;
          animation: ${isAnimating ? 'slideIn 0.6s ease-out' : 'none'};
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slide-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 30px;
        }

        .category-tag {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #00ff88;
          background: rgba(0, 255, 136, 0.1);
          padding: 8px 20px;
          border-radius: 30px;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }

        .edition-tag {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          color: #ff6b6b;
        }

        .big-number {
          font-size: clamp(48px, 12vw, 120px);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .big-number .unit {
          font-size: 0.3em;
          font-weight: 500;
          opacity: 0.7;
          display: block;
          margin-top: 10px;
        }

        .count-up {
          font-variant-numeric: tabular-nums;
        }

        /* Intro Slide */
        .slide-intro {
          text-align: center;
        }

        .glitch-container {
          position: relative;
          margin-bottom: 40px;
        }

        .glitch {
          font-size: clamp(40px, 10vw, 80px);
          font-weight: 800;
          letter-spacing: -2px;
          position: relative;
          color: #fff;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch::before {
          animation: glitch-1 2s infinite linear alternate-reverse;
          color: #ff6b6b;
          z-index: -1;
        }

        .glitch::after {
          animation: glitch-2 3s infinite linear alternate-reverse;
          color: #00ff88;
          z-index: -2;
        }

        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(20% 0 30% 0); transform: translate(-3px, 0); }
          25% { clip-path: inset(60% 0 10% 0); transform: translate(3px, 0); }
          50% { clip-path: inset(10% 0 60% 0); transform: translate(-3px, 0); }
          75% { clip-path: inset(40% 0 20% 0); transform: translate(3px, 0); }
        }

        @keyframes glitch-2 {
          0%, 100% { clip-path: inset(70% 0 5% 0); transform: translate(3px, 0); }
          25% { clip-path: inset(5% 0 70% 0); transform: translate(-3px, 0); }
          50% { clip-path: inset(30% 0 30% 0); transform: translate(3px, 0); }
          75% { clip-path: inset(50% 0 20% 0); transform: translate(-3px, 0); }
        }

        .year-text {
          font-size: clamp(80px, 20vw, 200px);
          font-weight: 800;
          background: linear-gradient(135deg, #00ff88 0%, #00ccff 50%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 0.9;
          margin: 20px 0;
        }

        .wrapped-text {
          font-size: clamp(30px, 8vw, 60px);
          letter-spacing: 20px;
        }

        .tagline {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          font-style: italic;
          margin-top: 30px;
        }

        .scroll-hint {
          margin-top: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 12px;
          animation: bounce 2s infinite;
        }

        .arrow-down {
          font-size: 24px;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        /* Circular Progress */
        .circular-progress {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px 0;
        }

        .circular-progress-text {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .circular-progress-text .percentage {
          font-size: 32px;
          font-weight: 700;
        }

        .circular-progress-text .label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .circular-progress-text .sublabel {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 4px;
        }

        /* Sleep Slide */
        .stat-comparison {
          font-family: 'Space Mono', monospace;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          margin-bottom: 20px;
        }

        .achievement-badge {
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 16px;
          padding: 20px 30px;
          margin-top: 30px;
          text-align: center;
          max-width: 400px;
        }

        .badge-icon {
          font-size: 32px;
          display: block;
          margin-bottom: 10px;
        }

        .badge-text {
          font-size: 16px;
          display: block;
        }

        .badge-subtext {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          display: block;
          margin-top: 8px;
        }

        /* Breathing Slide */
        .breathing-number {
          animation: breathe 4s ease-in-out infinite;
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          max-width: 600px;
          width: 100%;
          margin-top: 30px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-5px);
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .stat-value.green {
          color: #00ff88;
        }

        .stat-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-note {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 8px;
        }

        /* Hydration Slide */
        .kubernetes-quote {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          max-width: 500px;
          text-align: center;
          line-height: 1.6;
          padding: 20px;
          background: rgba(0, 204, 255, 0.05);
          border-left: 3px solid #00ccff;
          margin: 20px 0;
        }

        .water-breakdown {
          width: 100%;
          max-width: 500px;
          margin-top: 30px;
        }

        .water-bar {
          display: flex;
          height: 60px;
          border-radius: 30px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.1);
        }

        .water-segment {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .water-segment:hover {
          filter: brightness(1.2);
        }

        .water-segment span {
          font-size: 16px;
        }

        .water-segment small {
          font-size: 10px;
          opacity: 0.8;
        }

        .water-segment.coding {
          background: linear-gradient(135deg, #00ff88, #00cc6a);
        }

        .water-segment.meetings {
          background: linear-gradient(135deg, #ffd93d, #ffb800);
        }

        .water-segment.decisions {
          background: linear-gradient(135deg, #ff6b6b, #ff4757);
        }

        /* Bar Chart */
        .bar-chart {
          width: 100%;
          max-width: 500px;
          margin-top: 30px;
        }

        .bar-item {
          margin-bottom: 15px;
          animation: fadeInLeft 0.5s ease-out backwards;
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .bar-label {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 5px;
        }

        .bar-container {
          height: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          overflow: hidden;
          position: relative;
        }

        .bar-fill {
          height: 100%;
          border-radius: 15px;
          transition: width 1s ease-out;
          display: flex;
          align-items: center;
          padding-left: 15px;
        }

        .bar-value {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Keyboard Slide */
        .key-stats {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 500px;
          margin-top: 30px;
        }

        .key-stat {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .key-stat.featured {
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 204, 255, 0.1));
          border-color: rgba(0, 255, 136, 0.3);
        }

        .key-stat.classified {
          background: rgba(255, 107, 107, 0.1);
          border-color: rgba(255, 107, 107, 0.3);
        }

        .key-visual {
          font-family: 'Space Mono', monospace;
          font-size: 24px;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.1);
          padding: 15px 20px;
          border-radius: 8px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          min-width: 80px;
          text-align: center;
        }

        .key-visual.small {
          font-size: 14px;
          padding: 10px 15px;
          min-width: 60px;
        }

        .key-info {
          flex: 1;
        }

        .key-count {
          font-size: 24px;
          font-weight: 700;
          display: block;
        }

        .key-percentage {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          color: #00ff88;
          margin-left: 10px;
        }

        .key-description {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          display: block;
          margin-top: 5px;
        }

        .classified-text {
          color: #ff6b6b;
          letter-spacing: 2px;
        }

        /* Email Slide */
        .funnel {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 100%;
          max-width: 400px;
        }

        .funnel-step {
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 204, 255, 0.2));
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .funnel-step:hover {
          transform: scale(1.02);
        }

        .funnel-step.final {
          background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 142, 142, 0.2));
          border-color: rgba(255, 107, 107, 0.3);
        }

        .funnel-number {
          font-size: 36px;
          font-weight: 700;
          display: block;
        }

        .funnel-label {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .funnel-arrow {
          font-size: 24px;
          color: rgba(255, 255, 255, 0.3);
        }

        .conversion-badge {
          margin-top: 30px;
          text-align: center;
        }

        .conversion-badge span {
          display: block;
        }

        .growth-hack {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          font-style: italic;
          margin-top: 5px;
        }

        /* Meetings Slide */
        .meeting-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-top: 30px;
        }

        .meeting-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .meeting-label {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          max-width: 120px;
        }

        .meeting-stat.nda {
          justify-content: center;
        }

        .nda-badge {
          font-family: 'Space Mono', monospace;
          font-size: 24px;
          font-weight: 700;
          color: #ff6b6b;
          background: rgba(255, 107, 107, 0.1);
          padding: 30px 40px;
          border-radius: 16px;
          border: 2px dashed rgba(255, 107, 107, 0.3);
        }

        /* Certs Slide */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 500px;
          margin-top: 30px;
        }

        .cert-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 25px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .cert-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
        }

        .cert-card.featured {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(192, 132, 252, 0.2));
          border-color: rgba(168, 85, 247, 0.3);
          grid-column: span 2;
        }

        .cert-icon {
          font-size: 40px;
          margin-bottom: 10px;
        }

        .cert-name {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .cert-context {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Wisdom Slide */
        .slide-wisdom {
          text-align: center;
        }

        .quote-container {
          max-width: 600px;
          margin-bottom: 40px;
        }

        .quote-container blockquote {
          font-size: clamp(20px, 4vw, 28px);
          font-style: italic;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
        }

        .quote-container cite {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          color: #00ff88;
          display: block;
        }

        .quote-note {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          display: block;
          margin-top: 5px;
        }

        .final-wish {
          margin-bottom: 40px;
        }

        .wish-text {
          font-size: 24px;
          margin-bottom: 15px;
        }

        .wish-examples {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 2;
        }

        .linkedin-reminder {
          background: rgba(0, 119, 181, 0.1);
          border: 1px solid rgba(0, 119, 181, 0.3);
          border-radius: 16px;
          padding: 20px 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          max-width: 400px;
          margin: 0 auto;
        }

        .linkedin-text {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          color: #00a0dc;
        }

        .rocket {
          font-size: 24px;
          animation: rocketShake 0.5s ease-in-out infinite;
        }

        @keyframes rocketShake {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }

        .carbon-footer {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.3);
          margin-top: 40px;
          font-style: italic;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .meeting-stats {
            grid-template-columns: 1fr;
          }

          .cert-grid {
            grid-template-columns: 1fr;
          }

          .cert-card.featured {
            grid-column: span 1;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .nav-arrows {
            display: none;
          }
        }
      `}</style>

      <div className="wrap-container">
        <div className="noise-overlay" />
        <div className="main-content">
          {renderSlide()}
        </div>

        <div className="nav-arrows">
          <button className="nav-arrow" onClick={prevSlide}>←</button>
          <button className="nav-arrow" onClick={nextSlide}>→</button>
        </div>

        <div className="navigation">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`nav-dot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
              title={slide.title}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default WrapUp2025;
