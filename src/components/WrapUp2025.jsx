import { useState, useEffect } from 'react';
import './WrapUp2025.css';

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
          <div className={`slide slide-intro ${isAnimating ? 'animating' : ''}`}>
            <div className="glitch-container">
              <h1 className="glitch" data-text="LUCA'S">LUCA'S</h1>
              <h1 className="year-text">2025</h1>
              <h1 className="glitch wrapped-text" data-text="WRAPPED">WRAPPED</h1>
            </div>
            <p className="tagline">Because you absolutely needed to know this</p>
            <div className="scroll-hint">
              <span>Swipe to waste more time</span>
              <div className="arrow-down">&#8595;</div>
            </div>
          </div>
        );

      case 'sleep':
        return (
          <div className={`slide slide-sleep ${isAnimating ? 'animating' : ''}`}>
            <div className="slide-header">
              <span className="category-tag">SLEEP PERFORMANCE</span>
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
              <span className="badge-icon">&#127942;</span>
              <span className="badge-text">Svegliato PRIMA della sveglia: <strong>23 volte</strong></span>
              <span className="badge-subtext">Le altre 342? Snooze come microservizio.</span>
            </div>
          </div>
        );

      case 'breathing':
        return (
          <div className={`slide slide-breathing ${isAnimating ? 'animating' : ''}`}>
            <div className="slide-header">
              <span className="category-tag">RESPIRATORY ANALYTICS</span>
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
                <div className="stat-value">15&#8594;40</div>
                <div className="stat-label">Respiri/min</div>
                <div className="stat-note">Scalabile durante call investitori</div>
              </div>
            </div>
          </div>
        );

      case 'hydration':
        return (
          <div className={`slide slide-hydration ${isAnimating ? 'animating' : ''}`}>
            <div className="slide-header">
              <span className="category-tag">HYDRATION METRICS</span>
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
          <div className={`slide slide-carbon ${isAnimating ? 'animating' : ''}`}>
            <div className="slide-header">
              <span className="category-tag">CARBON FOOTPRINT</span>
              <span className="edition-tag">Working Edition</span>
            </div>
            <div className="big-number carbon-number">
              <CountUp end={847} /> <span className="unit">kg CO&#8322;</span>
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
          <div className={`slide slide-keyboard ${isAnimating ? 'animating' : ''}`}>
            <div className="slide-header">
              <span className="category-tag">KEYSTROKE ECONOMY</span>
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
          <div className={`slide slide-email ${isAnimating ? 'animating' : ''}`}>
            <div className="slide-header">
              <span className="category-tag">EMAIL EFFICIENCY</span>
            </div>
            <div className="funnel">
              <div className="funnel-step" style={{ width: '100%' }}>
                <span className="funnel-number">2,847</span>
                <span className="funnel-label">Ricevute</span>
              </div>
              <div className="funnel-arrow">&#8595;</div>
              <div className="funnel-step" style={{ width: '70%' }}>
                <span className="funnel-number">312</span>
                <span className="funnel-label">Lette</span>
              </div>
              <div className="funnel-arrow">&#8595;</div>
              <div className="funnel-step" style={{ width: '40%' }}>
                <span className="funnel-number">47</span>
                <span className="funnel-label">Con risposta</span>
              </div>
              <div className="funnel-arrow">&#8595;</div>
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
          <div className={`slide slide-meetings ${isAnimating ? 'animating' : ''}`}>
            <div className="slide-header">
              <span className="category-tag">MEETING ROI</span>
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
          <div className={`slide slide-certs ${isAnimating ? 'animating' : ''}`}>
            <div className="slide-header">
              <span className="category-tag">CERTIFICAZIONI 2025</span>
            </div>
            <div className="cert-grid">
              <div className="cert-card">
                <div className="cert-icon">&#9989;</div>
                <div className="cert-name">Certified Eye-Roller</div>
                <div className="cert-context">durante pitch deck</div>
              </div>
              <div className="cert-card">
                <div className="cert-icon">&#129351;</div>
                <div className="cert-name">Black Belt</div>
                <div className="cert-context">"Sei in muto"</div>
              </div>
              <div className="cert-card">
                <div className="cert-icon">&#127891;</div>
                <div className="cert-name">Master</div>
                <div className="cert-context">Annuire Pensando Ad Altro</div>
              </div>
              <div className="cert-card featured">
                <div className="cert-icon">&#127894;</div>
                <div className="cert-name">PhD</div>
                <div className="cert-context">Procrastination</div>
              </div>
            </div>
          </div>
        );

      case 'wisdom':
        return (
          <div className={`slide slide-wisdom ${isAnimating ? 'animating' : ''}`}>
            <div className="slide-header">
              <span className="category-tag">La più grande lezione imparata</span>
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
              <span className="rocket">&#128640;</span>
            </div>
            <div className="carbon-footer">
              P.S. Questo wrap-up è stato generato con un carbon footprint di circa 0.0003 kg di CO&#8322;. Prego.
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="wrap-container">
      <div className="noise-overlay" />
      <div className="main-content">
        {renderSlide()}
      </div>

      <div className="nav-arrows">
        <button className="nav-arrow" onClick={prevSlide}>&#8592;</button>
        <button className="nav-arrow" onClick={nextSlide}>&#8594;</button>
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
  );
};

export default WrapUp2025;
