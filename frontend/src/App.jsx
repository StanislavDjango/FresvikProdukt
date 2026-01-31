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
const actionItems = ['Kontakt oss', 'Isolasjon', 'Forespørsel']

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
