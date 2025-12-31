import { useState, useEffect, useCallback, useRef } from 'react';
import './WrapUp2025.css';

const TOTAL_SLIDES = 10;

const Particles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${Math.random() * 4 + 6}s`,
  }));

  return (
    <div className="particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};

const AnimatedCounter = ({ target, isActive }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const start = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [isActive, target]);

  useEffect(() => {
    if (!isActive) {
      hasAnimated.current = false;
      setCount(0);
    }
  }, [isActive]);

  return <>{count.toLocaleString('it-IT')}</>;
};

const ProgressFill = ({ width, isActive, color }) => {
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setCurrentWidth(width), 500);
      return () => clearTimeout(timer);
    } else {
      setCurrentWidth(0);
    }
  }, [isActive, width]);

  return (
    <div
      className="progress-fill"
      style={{ width: `${currentWidth}%`, background: color }}
    />
  );
};

const BreakdownBarFill = ({ width, isActive, color }) => {
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setCurrentWidth(width), 500);
      return () => clearTimeout(timer);
    } else {
      setCurrentWidth(0);
    }
  }, [isActive, width]);

  return (
    <div
      className="breakdown-bar-fill"
      style={{ width: `${currentWidth}%`, background: color }}
    />
  );
};

const WrapUp2025 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const touchStartY = useRef(0);

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentSlide || index < 0 || index >= TOTAL_SLIDES) return;

    setIsAnimating(true);
    setCurrentSlide(index);

    if (index > 0) setShowSwipeHint(false);

    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, currentSlide]);

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [goToSlide, currentSlide]);
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [goToSlide, currentSlide]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) nextSlide();
      else prevSlide();
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      const diff = touchStartY.current - e.changedTouches[0].screenY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  return (
    <div className="app-container">
      <div
        className="slides-wrapper"
        style={{ transform: `translateY(-${currentSlide * 100}vh)` }}
      >
        {/* Slide 0: Intro */}
        <div className={`slide slide-intro ${currentSlide === 0 ? 'active' : ''}`}>
          <Particles />
          <div className="slide-content">
            <p className="slide-label">// 2025.wrapped()</p>
            <h1 className="slide-title glitch" data-text="LUCA'S 2025 WRAPPED">
              LUCA'S 2025 WRAPPED
            </h1>
            <p className="slide-subtitle">"Because you absolutely needed to know this"</p>
            <div
              className="achievement"
              style={{ background: 'linear-gradient(135deg, var(--accent-magenta), var(--accent-purple))' }}
            >
              <span>v1.0.0 — Production Ready</span>
            </div>
          </div>
        </div>

        {/* Slide 1: Sleep */}
        <div className={`slide slide-sleep ${currentSlide === 1 ? 'active' : ''}`}>
          <Particles />
          <div className="slide-content">
            <p className="slide-label">💤 sleep.performance</p>
            <h2 className="slide-title" style={{ color: 'var(--accent-cyan)' }}>
              SLEEP PERFORMANCE
            </h2>
            <div className="big-number" style={{ color: 'var(--accent-cyan)' }}>
              <AnimatedCounter target={2555} isActive={currentSlide === 1} />
            </div>
            <p className="big-number-label">ore dormite (target: 2.920)</p>

            <div className="progress-container">
              <div className="progress-label">
                <span>Efficienza</span>
                <span>87,5%</span>
              </div>
              <div className="progress-bar">
                <ProgressFill width={87.5} isActive={currentSlide === 1} color="var(--accent-cyan)" />
              </div>
            </div>

            <div className="quote" style={{ borderColor: 'var(--accent-cyan)' }}>
              "Ho ottimizzato il mio ciclo REM implementando un approccio event-driven al sonno. Ogni sogno è stato elaborato in modo asincrono."
            </div>

            <div className="achievement" style={{ border: '1px solid var(--accent-cyan)' }}>
              <span>🏆 Svegliato PRIMA della sveglia: <strong>23 volte</strong></span>
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
              Le altre 342? Snooze come microservizio.
            </p>
          </div>
        </div>

        {/* Slide 2: Breath */}
        <div className={`slide slide-breath ${currentSlide === 2 ? 'active' : ''}`}>
          <Particles />
          <div className="slide-content">
            <p className="slide-label">🌬️ respiratory.analytics</p>
            <h2 className="slide-title" style={{ color: 'var(--accent-purple)' }}>
              RESPIRATORY ANALYTICS
            </h2>
            <div className="big-number" style={{ color: 'var(--accent-purple)' }}>
              <AnimatedCounter target={7884000} isActive={currentSlide === 2} />
            </div>
            <p className="big-number-label">respiri effettuati con successo</p>

            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">Downtime</div>
                <div className="stat-value" style={{ color: 'var(--accent-green)' }}>Zero</div>
                <div className="stat-label" style={{ marginTop: '0.25rem' }}>sul sistema respiratorio</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Uptime</div>
                <div className="stat-value" style={{ color: 'var(--accent-cyan)' }}>99.999%</div>
                <div className="stat-label" style={{ marginTop: '0.25rem', fontSize: '0.6rem' }}>
                  (quel 0.001% è quando ho visto i prezzi delle API di OpenAI)
                </div>
              </div>
            </div>

            <div className="quote" style={{ borderColor: 'var(--accent-purple)' }}>
              <strong>Throughput medio:</strong> 15 respiri/minuto, scalabile fino a 40 durante le call con gli investitori
            </div>
          </div>
        </div>

        {/* Slide 3: Hydration */}
        <div className={`slide slide-hydration ${currentSlide === 3 ? 'active' : ''}`}>
          <Particles />
          <div className="slide-content">
            <p className="slide-label">💧 hydration.metrics</p>
            <h2 className="slide-title" style={{ color: 'var(--accent-blue)' }}>
              HYDRATION METRICS
            </h2>
            <div className="big-number" style={{ color: 'var(--accent-blue)' }}>
              <AnimatedCounter target={730} isActive={currentSlide === 3} />
            </div>
            <p className="big-number-label">litri d'acqua consumati</p>

            <div className="quote" style={{ borderColor: 'var(--accent-blue)', fontSize: '0.75rem' }}>
              "Ho implementato un sistema di idratazione basato su Kubernetes. Ogni bicchiere è un pod. Il mio corpo è il cluster. Ad ogni nuovo aggiornamento devo distruggerlo e ricrearlo."
            </div>

            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              📊 Breakdown:
            </p>

            <ul className="breakdown-list">
              <li className="breakdown-item">
                <span className="breakdown-value" style={{ color: 'var(--accent-cyan)' }}>40%</span>
                <div className="breakdown-bar">
                  <BreakdownBarFill width={40} isActive={currentSlide === 3} color="var(--accent-cyan)" />
                </div>
                <span>durante coding session</span>
              </li>
              <li className="breakdown-item">
                <span className="breakdown-value" style={{ color: 'var(--accent-yellow)' }}>35%</span>
                <div className="breakdown-bar">
                  <BreakdownBarFill width={35} isActive={currentSlide === 3} color="var(--accent-yellow)" />
                </div>
                <span>durante riunioni inutili</span>
              </li>
              <li className="breakdown-item">
                <span className="breakdown-value" style={{ color: 'var(--accent-magenta)' }}>25%</span>
                <div className="breakdown-bar">
                  <BreakdownBarFill width={25} isActive={currentSlide === 3} color="var(--accent-magenta)" />
                </div>
                <span>per mandare giù decisioni discutibili</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Slide 4: Carbon */}
        <div className={`slide slide-carbon ${currentSlide === 4 ? 'active' : ''}`}>
          <Particles />
          <div className="slide-content">
            <p className="slide-label">🌍 carbon.footprint (Working Edition)</p>
            <h2 className="slide-title" style={{ color: 'var(--accent-orange)' }}>
              CARBON FOOTPRINT
            </h2>
            <div className="big-number" style={{ color: 'var(--accent-orange)' }}>
              <AnimatedCounter target={847} isActive={currentSlide === 4} />
            </div>
            <p className="big-number-label">kg di CO2 emessi per attività lavorative</p>

            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '1rem 0 0.5rem' }}>
              Di cui:
            </p>

            <div className="breakdown-list">
              <div className="carbon-item">
                <span className="carbon-value" style={{ color: 'var(--accent-orange)' }}>312 kg</span>
                <span>Respiri pesanti durante ore di meeting estemporanei, non programmati, per "Hai un minuto?"</span>
              </div>
              <div className="carbon-item">
                <span className="carbon-value" style={{ color: 'var(--accent-yellow)' }}>189 kg</span>
                <span>Sospiri durante review del codice altrui</span>
              </div>
              <div className="carbon-item">
                <span className="carbon-value" style={{ color: 'var(--accent-magenta)' }}>156 kg</span>
                <span>Esalazioni di frustrazione verso i vendor</span>
              </div>
              <div className="carbon-item">
                <span className="carbon-value" style={{ color: 'var(--accent-purple)' }}>127 kg</span>
                <span>Sbuffi durante "quick sync" di 90 minuti</span>
              </div>
              <div className="carbon-item">
                <span className="carbon-value" style={{ color: 'var(--accent-cyan)' }}>63 kg</span>
                <span>Imprecazioni vaporizzate nell'etere</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 5: Keystroke */}
        <div className={`slide slide-keystroke ${currentSlide === 5 ? 'active' : ''}`}>
          <Particles />
          <div className="slide-content">
            <p className="slide-label">⌨️ keystroke.economy</p>
            <h2 className="slide-title" style={{ color: 'var(--accent-green)' }}>
              KEYSTROKE ECONOMY
            </h2>
            <div className="big-number" style={{ color: 'var(--accent-green)' }}>4.2M</div>
            <p className="big-number-label">tasti premuti</p>

            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">TAB</div>
                <div className="stat-value" style={{ color: 'var(--accent-cyan)' }}>890.000</div>
                <div className="stat-label" style={{ marginTop: '0.5rem', fontSize: '0.6rem', lineHeight: 1.4 }}>
                  (il 21% — benvenuti nell'era dell'AI, dove accettare suggerimenti è diventato il nuovo scrivere codice)
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Ctrl+Z</div>
                <div className="stat-value" style={{ color: 'var(--accent-magenta)' }}>12.847</div>
                <div className="stat-label" style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
                  (che poi è la storia della mia vita)
                </div>
              </div>
              <div className="stat-item" style={{ gridColumn: 'span 2' }}>
                <div className="stat-label">Ctrl+C / Ctrl+V</div>
                <div className="stat-value" style={{ color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace", fontSize: '1rem', fontStyle: 'italic' }}>
                  classified
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 6: Email */}
        <div className={`slide slide-email ${currentSlide === 6 ? 'active' : ''}`}>
          <Particles />
          <div className="slide-content">
            <p className="slide-label">📧 email.efficiency</p>
            <h2 className="slide-title" style={{ color: 'var(--accent-yellow)' }}>
              EMAIL EFFICIENCY
            </h2>

            <div className="funnel">
              <div className="funnel-step" style={{ width: '100%', background: 'linear-gradient(90deg, rgba(254,228,64,0.2), transparent)' }}>
                <span className="funnel-number" style={{ color: 'var(--accent-yellow)' }}>2.847</span>
                <span>email ricevute</span>
              </div>
              <div className="funnel-arrow">↓</div>
              <div className="funnel-step" style={{ width: '85%', background: 'linear-gradient(90deg, rgba(0,245,212,0.2), transparent)' }}>
                <span className="funnel-number" style={{ color: 'var(--accent-cyan)' }}>312</span>
                <span>lette</span>
              </div>
              <div className="funnel-arrow">↓</div>
              <div className="funnel-step" style={{ width: '70%', background: 'linear-gradient(90deg, rgba(247,37,133,0.2), transparent)' }}>
                <span className="funnel-number" style={{ color: 'var(--accent-magenta)' }}>47</span>
                <span>con risposta</span>
              </div>
              <div className="funnel-arrow">↓</div>
              <div className="funnel-step" style={{ width: '55%', background: 'linear-gradient(90deg, rgba(6,214,160,0.2), transparent)' }}>
                <span className="funnel-number" style={{ color: 'var(--accent-green)' }}>3</span>
                <span>utili</span>
              </div>
            </div>

            <div className="quote" style={{ borderColor: 'var(--accent-yellow)', textAlign: 'center', borderLeft: 'none', borderBottom: '3px solid var(--accent-yellow)', fontStyle: 'italic' }}>
              Conversion rate: 0.1%. Growth hacking at its finest.
            </div>
          </div>
        </div>

        {/* Slide 7: Meeting */}
        <div className={`slide slide-meeting ${currentSlide === 7 ? 'active' : ''}`}>
          <Particles />
          <div className="slide-content">
            <p className="slide-label">🎯 meeting.roi</p>
            <h2 className="slide-title" style={{ color: 'var(--accent-magenta)' }}>
              MEETING ROI
            </h2>
            <div className="big-number" style={{ color: 'var(--accent-magenta)' }}>
              <AnimatedCounter target={847} isActive={currentSlide === 7} />
            </div>
            <p className="big-number-label">ore in meeting</p>

            <ul className="breakdown-list">
              <li className="breakdown-item">
                <span className="breakdown-value" style={{ color: 'var(--accent-yellow)' }}>84%</span>
                <div className="breakdown-bar">
                  <BreakdownBarFill width={84} isActive={currentSlide === 7} color="var(--accent-yellow)" />
                </div>
                <span style={{ fontSize: '0.75rem' }}>Meeting che potevano essere email</span>
              </li>
              <li className="breakdown-item">
                <span className="breakdown-value" style={{ color: 'var(--accent-cyan)' }}>78%</span>
                <div className="breakdown-bar">
                  <BreakdownBarFill width={78} isActive={currentSlide === 7} color="var(--accent-cyan)" />
                </div>
                <span style={{ fontSize: '0.75rem' }}>Meeting che potevano essere un messaggio Teams</span>
              </li>
              <li className="breakdown-item">
                <span className="breakdown-value" style={{ color: 'var(--accent-orange)' }}>65%</span>
                <div className="breakdown-bar">
                  <BreakdownBarFill width={65} isActive={currentSlide === 7} color="var(--accent-orange)" />
                </div>
                <span style={{ fontSize: '0.75rem' }}>Meeting che potevano non esistere</span>
              </li>
              <li className="breakdown-item">
                <span className="breakdown-value" style={{ color: 'var(--text-secondary)' }}>[NDA]</span>
                <div className="breakdown-bar">
                  <BreakdownBarFill width={5} isActive={currentSlide === 7} color="var(--text-secondary)" />
                </div>
                <span style={{ fontSize: '0.75rem' }}>Meeting produttivi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Slide 8: Certifications */}
        <div className={`slide slide-certs ${currentSlide === 8 ? 'active' : ''}`}>
          <Particles />
          <div className="slide-content">
            <p className="slide-label">🏅 certificazioni.2025</p>
            <h2 className="slide-title" style={{ color: 'var(--accent-cyan)' }}>
              CERTIFICAZIONI 2025
            </h2>

            <div className="cert-grid">
              <div className="cert-badge">
                <div className="cert-icon">🙄</div>
                <div><strong>Certified Eye-Roller</strong><br />durante pitch deck</div>
              </div>
              <div className="cert-badge">
                <div className="cert-icon">🥋</div>
                <div><strong>Black Belt</strong><br />in "Sei in muto"</div>
              </div>
              <div className="cert-badge">
                <div className="cert-icon">🧘</div>
                <div><strong>Master in Annuire</strong><br />Pensando Ad Altro</div>
              </div>
              <div className="cert-badge">
                <div className="cert-icon">🎓</div>
                <div><strong>PhD</strong><br />in Procrastination</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 9: Outro */}
        <div className={`slide slide-outro ${currentSlide === 9 ? 'active' : ''}`}>
          <Particles />
          <div className="slide-content">
            <p className="slide-label">🎵 La più grande lezione imparata in questo anno:</p>

            <a
              href="https://www.youtube.com/watch?v=UAGJEym15Us"
              target="_blank"
              rel="noopener noreferrer"
              className="quote"
              style={{
                borderColor: 'var(--accent-purple)',
                fontSize: '1rem',
                textAlign: 'center',
                borderLeft: 'none',
                borderTop: '3px solid var(--accent-purple)',
                paddingTop: '1.5rem',
                textDecoration: 'none',
                display: 'block',
                cursor: 'pointer',
              }}
            >
              <em>"L'anno che sta arrivando, tra un anno passerà.<br />Io mi sto preparando, è questa la novità."</em>
              <br /><br />
              <span style={{ color: 'var(--text-secondary)' }}>— <strong>Lucio Dalla</strong>, che nel 1979 aveva già capito tutto</span>
              <br />
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-purple)', marginTop: '0.5rem', display: 'inline-block' }}>▶ Ascolta su YouTube</span>
            </a>

            <h2 className="slide-title" style={{ fontSize: 'clamp(1.3rem, 5vw, 2rem)', marginTop: '2rem' }}>
              <strong>Che il 2026 sia leggero.</strong>
            </h2>

            <p className="slide-subtitle" style={{ opacity: 1, transform: 'none', fontStyle: 'normal', lineHeight: 1.8, fontSize: '0.8rem' }}>
              Leggero come un microservizio ben fatto.<br />
              Leggero come un meeting cancellato.<br />
              Leggero come quella sensazione quando il deploy va in prod al primo tentativo.
            </p>

            <div className="achievement" style={{ marginTop: '1.5rem', background: 'rgba(0,0,0,0.6)', border: '2px solid var(--accent-cyan)', padding: '1rem 1.5rem' }}>
              <span style={{ color: 'var(--text-primary)' }}>Buon anno, e ricordati: se non l'hai postato su LinkedIn, non è mai successo. 🚀</span>
            </div>

            <a
              href="https://www.youtube.com/watch?v=UAGJEym15Us"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-random"
            >
              Click me — CTA totalmente a caso
            </a>

            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '1.5rem', fontStyle: 'italic' }}>
              P.S. Questo wrap-up ha un carbon footprint di circa 0,0003 kg di CO2. Prego.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-dots">
        {Array.from({ length: TOTAL_SLIDES }, (_, i) => (
          <button
            key={i}
            className={`nav-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </nav>

      {/* Swipe Hint */}
      <div className={`swipe-hint ${!showSwipeHint ? 'hidden' : ''}`}>
        <span className="swipe-arrow">↓</span>
        <span>Scorri per continuare</span>
      </div>
    </div>
  );
};

export default WrapUp2025;
