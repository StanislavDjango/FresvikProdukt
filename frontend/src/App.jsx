import { useRef, useState } from 'react'
import './styles.css'

const navItems = [
  {
    label: 'Produkt',
    items: [
      'Fresvik PIR-Panel',
      'Fresvik PUR-Panel',
      'Kjøle- og fryseportar',
      'Kjøle- og frysedører',
      'Fasadepanel',
    ],
  },
  { label: 'Referansar', href: '/referansar' },
  {
    label: 'Tenester',
    items: ['Montasje', 'Leveranse', 'Service og reservedeler'],
  },
  {
    label: 'Kundeservice',
    items: ['Dokumentasjon', 'Monteringsanvisningar'],
  },
  {
    label: 'Om oss',
    items: ['Fresvik Produkt', 'Tilsette', 'Aktuelt', 'Ledig stilling'],
  },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Send forespørsel', href: '/kontakt' },
]
export default function App() {
  const [activeMenu, setActiveMenu] = useState(null)
  const closeTimer = useRef(null)

  const openMenu = (label) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
    }
    setActiveMenu(label)
  }

  const scheduleClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
    }
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null)
    }, 200)
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
                    key={item.label}
                    className={`nav-item ${item.items ? 'has-submenu' : ''}`}
                    onMouseEnter={() => {
                      if (item.items) {
                        openMenu(item.label)
                      } else {
                        setActiveMenu(null)
                      }
                    }}
                  >
                    {item.items ? (
                      <button className="nav-link" type="button">
                        {item.label}
                      </button>
                    ) : (
                      <a className="nav-link" href={item.href ?? '#'}>
                        {item.label}
                      </a>
                    )}
                    {item.items ? (
                      <div
                        className={`nav-submenu ${activeMenu === item.label ? 'is-open' : ''}`}
                        role="menu"
                        onMouseEnter={() => openMenu(item.label)}
                        onMouseLeave={scheduleClose}
                      >
                        <div className="nav-submenu-inner">
                          {item.items.map((subItem) => (
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
