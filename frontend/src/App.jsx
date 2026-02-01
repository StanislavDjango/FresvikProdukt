import { useRef, useState } from 'react'
import './styles.css'

const navItems = [
  {
    key: 'product',
    href: '/produkt-mappe',
    label: { no: 'Produkt', en: 'Product' },
    items: {
      no: [
        'Fresvik PIR-Panel',
        'Fresvik PUR-Panel',
        'Kjøle- og fryseportar',
        'Kjøle- og frysedører',
        'Fasadepanel',
      ],
      en: [
        'Fresvik PIR-Panel',
        'Fresvik PUR-Panel',
        'Cold & freezer gates',
        'Cold & freezer doors',
        'Facade panels',
      ],
    },
  },
  { key: 'references', href: '/referansar', label: { no: 'Referansar', en: 'References' } },
  {
    key: 'services',
    href: '/tenester',
    label: { no: 'Tenester', en: 'Services' },
    items: {
      no: ['Montasje', 'Leveranse', 'Service og reservedeler'],
      en: ['Installation', 'Delivery', 'Service & spare parts'],
    },
  },
  {
    key: 'support',
    href: '/kundeservice',
    label: { no: 'Kundeservice', en: 'Customer service' },
    items: {
      no: ['Dokumentasjon', 'Monteringsanvisningar'],
      en: ['Documentation', 'Installation guides'],
    },
  },
  {
    key: 'about',
    href: '/om-oss',
    label: { no: 'Om oss', en: 'About us' },
    items: {
      no: ['Fresvik Produkt', 'Tilsette', 'Aktuelt', 'Ledig stilling'],
      en: ['Fresvik Produkt', 'Employees', 'News', 'Careers'],
    },
  },
  { key: 'contact', href: '/kontakt', label: { no: 'Kontakt', en: 'Contact' } },
  { key: 'inquiry', href: '/kontakt', label: { no: 'Send forespørsel', en: 'Send inquiry' } },
]

export default function App() {
  const [activeMenu, setActiveMenu] = useState(null)
  const [language, setLanguage] = useState('no')
  const closeTimer = useRef(null)

  const openMenu = (key) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
    }
    setActiveMenu(key)
  }

  const scheduleClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
    }
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null)
    }, 200)
  }

  const setLang = (lang) => {
    if (lang === language) return
    setLanguage(lang)
    setActiveMenu(null)
  }

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-overlay" aria-hidden="true" />

        <nav className="nav">
          <div
            className="container nav-wrap"
            onMouseLeave={() => {
              scheduleClose()
            }}
          >
            <img className="nav-logo-floating" src="/img/Logo/LogoFresvik.png" alt="Fresvik Produkt" />
            <div className="nav-shell">
              <ul className="nav-links">
                {navItems.map((item) => (
                  <li
                    key={item.key}
                    className={`nav-item ${item.items ? 'has-submenu' : ''}`}
                    onMouseEnter={() => {
                      if (item.items) {
                        openMenu(item.key)
                      } else {
                        setActiveMenu(null)
                      }
                    }}
                  >
                    {item.items ? (
                      <button className="nav-link" type="button">
                        {item.label[language]}
                      </button>
                    ) : (
                      <a className="nav-link" href={item.href ?? '#'}>
                        {item.label[language]}
                      </a>
                    )}
                    {item.items ? (
                      <div
                        className={`nav-submenu ${activeMenu === item.key ? 'is-open' : ''}`}
                        role="menu"
                        onMouseEnter={() => openMenu(item.key)}
                        onMouseLeave={scheduleClose}
                      >
                        <div className="nav-submenu-inner">
                          {item.items[language].map((subItem) => (
                            <a key={subItem} href="#" className="nav-submenu-item">
                              {subItem}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav-lang" role="group" aria-label="Språk">
              <span className="nav-lang-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <path
                    d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19zm6.7 7H15.7a14.7 14.7 0 0 0-1.2-4 7.6 7.6 0 0 1 4.2 4zm-6.7-5a13 13 0 0 1 1.5 5H10.5a13 13 0 0 1 1.5-5zm-5.7 5a7.6 7.6 0 0 1 4.2-4 14.7 14.7 0 0 0-1.2 4H6.3zm0 5h3.2c.2 1.4.6 2.8 1.2 4a7.6 7.6 0 0 1-4.4-4zm5.7 5a13 13 0 0 1-1.5-5h3.1a13 13 0 0 1-1.5 5zm3-1a14.7 14.7 0 0 0 1.2-4h3.2a7.6 7.6 0 0 1-4.4 4zm1.4-5c.1-.7.1-1.4.1-2s0-1.3-.1-2h3.6a7.7 7.7 0 0 1 0 4h-3.6zm-9.8 0a7.7 7.7 0 0 1 0-4h3.6c-.1.7-.1 1.4-.1 2s0 1.3.1 2H6.3zm4.3-4h3.1c.1.7.1 1.4.1 2s0 1.3-.1 2h-3.1c-.1-.7-.1-1.4-.1-2s0-1.3.1-2z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <button
                type="button"
                className={`nav-lang-btn ${language === 'no' ? 'is-active' : ''}`}
                onClick={() => setLang('no')}
                aria-pressed={language === 'no'}
              >
                NO
              </button>
              <span className="nav-lang-sep">|</span>
              <button
                type="button"
                className={`nav-lang-btn ${language === 'en' ? 'is-active' : ''}`}
                onClick={() => setLang('en')}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>
          </div>
        </nav>

        <div className="container hero-body">
          <div className="brand-block">
            <img className="brand-logo" src="/img/Logo/LogoFresvik.png" alt="Fresvik Produkt" />
          </div>
        </div>

        <footer className="site-footer">
          <div className="container footer-top">
            <div className="footer-col">
              <h3>Fresvik Produkt AS</h3>
              <p>
                Fresvikvegen 995,
                <br />
                6896 Fresvik
              </p>
              <p>Tel: 57 69 83 00</p>
              <p>
                E-post: <a href="#">post@fresvik.no</a>
              </p>
            </div>
            <div className="footer-col footer-news">
              <h3>Motta nyheitsbrev</h3>
              <p>
                Meld deg på vårt nyheitsbrev og få tips og inspirasjon frå bransjen.
              </p>
              <a href="#">Sjå vår personvernerklæring.</a>
              <form className="footer-form" action="#" method="post">
                <label className="sr-only" htmlFor="footer-newsletter-email">
                  Nyheitsbrev
                </label>
                <input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  placeholder="E-postadresse"
                  autoComplete="email"
                />
                <button type="submit">Meld på</button>
              </form>
            </div>
          </div>
          <div className="container footer-divider" />
          <div className="container footer-bottom">
            <div className="footer-col footer-links" aria-hidden="true" />
          </div>
          <div className="container footer-note">
            <p>Uoffisiell testside / designkonsept. Ikke en offisiell nettside for Fresvik Produkt AS.</p>
          </div>
        </footer>
      </header>
    </div>
  )
}
