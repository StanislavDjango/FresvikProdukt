import './styles.css'

const navItems = [
  'Produkt',
  'Referansar',
  'Tenester',
  'Kundeservice',
  'Om oss',
  'Kontakt',
  'Send forespørsel',
]
const actionItems = ['Kontakt oss', 'Isolasjon', 'Forespørsel']

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero-overlay" aria-hidden="true" />

        <nav className="nav">
          <div className="container nav-shell">
            <div className="nav-inner">
              <img className="nav-logo" src="/img/Logo/LogoFresvik.png" alt="Fresvik Produkt" />
              <ul className="nav-links">
                {navItems.map((item) => (
                  <li key={item}>
                    <a href="#" className="nav-link">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <div className="container hero-body">
          <div className="brand-block">
            <img className="brand-logo" src="/img/Logo/LogoFresvik.png" alt="Fresvik Produkt" />
          </div>
        </div>

        <div className="container hero-actions">
          {actionItems.map((item, index) => (
            <button
              key={item}
              className={`pill ${index === 0 ? 'pill--primary' : ''}`}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <footer className="container hero-footer">
          <span>2024 Fresvik Produkt AS. Alle rettigheter reservert.</span>
          <span>Personvern</span>
          <span>Cookies</span>
          <span>Krediteringer</span>
        </footer>
      </header>
    </div>
  )
}
