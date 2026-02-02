import { useEffect, useRef, useState } from 'react'
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
  {
    key: 'references',
    href: '#referansar',
    page: 'references',
    hash: 'referansar',
    label: { no: 'Referansar', en: 'References' },
  },
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
  {
    key: 'contact',
    href: '#kontakt',
    page: 'contact',
    hash: 'kontakt',
    label: { no: 'Kontakt', en: 'Contact' },
  },
  {
    key: 'inquiry',
    href: '#kontakt-foresporing',
    page: 'contact',
    hash: 'kontakt-foresporing',
    label: { no: 'Send forespørsel', en: 'Send inquiry' },
  },
]

const getPageFromHash = (hash) => {
  if (hash === '#referansar') return 'references'
  if (hash.startsWith('#kontakt')) return 'contact'
  return 'home'
}

export default function App() {
  const [activeMenu, setActiveMenu] = useState(null)
  const [language, setLanguage] = useState('no')
  const [page, setPage] = useState(() => getPageFromHash(window.location.hash))
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileOpenSection, setMobileOpenSection] = useState(null)
  const closeTimer = useRef(null)

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash(window.location.hash))
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
        setMobileOpenSection(null)
      }
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

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

  const goHome = () => {
    setActiveMenu(null)
    setMobileMenuOpen(false)
    setMobileOpenSection(null)
    if (window.location.hash) {
      window.location.hash = ''
    } else {
      setPage('home')
    }
  }

  const goPage = (hash, targetPage) => {
    setActiveMenu(null)
    setMobileMenuOpen(false)
    setMobileOpenSection(null)
    if (!hash) return
    if (window.location.hash !== `#${hash}`) {
      window.location.hash = hash
    } else if (targetPage) {
      setPage(targetPage)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => {
      const next = !open
      if (!next) {
        setMobileOpenSection(null)
      }
      return next
    })
  }

  const handleMobileSection = (key) => {
    setMobileOpenSection((current) => (current === key ? null : key))
  }

  const references = [
    {
      title: 'Historisk leveranse til Spar Lund Torv',
      description: 'Fresvik Produkt har levert det aller første PIR-prosjektet som er produsert i Norge.',
      image:
        'https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1759222151377-Y2600X4366PYP2EVYBJ9/Spar%2BLund%2BTorv%2B-%2BFresvik%2BProdukt%2B1%2B.jpeg',
      href: 'https://www.fresvik.no/referansar/historisk-leveranse-pir-panel-spar-lund-torv',
    },
    {
      title: 'Bjerkreim Legekontor: fryselager og kjølerom',
      description:
        'Prosjekt med omsorgsbustadar har fått skreddarsydde løysingar for kjølerom og fryselager.',
      image:
        'https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1757502389661-0NT1K8HKOIMI3JAQC92D/Bjerkreim%2BLegekontor%2B1.jpeg',
      href: 'https://www.fresvik.no/referansar/bjerkreim-legekontor-vikesaa',
    },
    {
      title: 'Kjøle- og fryserom til Bunnpris Hammerfest',
      description:
        'Langt nord i vårt vakre land har vi levert eitt fryserom og eitt kjølerom til meierivarer.',
      image:
        'https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1747635709094-QZ1DMKF9F7N73IKHN7JA/1000024746.jpg',
      href: 'https://www.fresvik.no/referansar/bunnpris-hammerfest',
    },
    {
      title: 'Bunnpris Volda: Nytt kjølerom med isolert kjøledør',
      description:
        'Vi leverte eit nytt kjølerom med kjøledør til Bunnpris-butikk i vakre Volda i Møre og Romsdal.',
      image:
        'https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1742460548045-IK0PV2OD0TE4E6PHMPW0/Kj%C3%B8lerom%2BBunnpris%2BVolda%2B3.jpg',
      href: 'https://www.fresvik.no/referansar/kjolerom-kjoledor-bunnpris-volda',
    },
    {
      title: 'Nytt stort fryserom til Coop Obs Alnabru',
      description:
        'Leveranse av nytt stort fryserom med fryseport, PVC-gardin og innestengingsalarm.',
      image:
        'https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1734082729594-BHFB3R5YE0O1JKAXEDM9/Fryserom%2BOBS%2BAlna%2B3_red.jpg',
      href: 'https://www.fresvik.no/referansar/fryserom-coop-obs-alnabru',
    },
    {
      title: 'Kjøle- og fryserom til nye Vik helse- og omsorgssenter',
      description: 'Fresvik Produkt har hittil levert 5 kjølerom og 1 fryserom med tilhøyrande dørar.',
      image:
        'https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1733749159320-QFVQ5BDRGRH74139ILFZ/Vik%2Bhelse-%2Bog%2Bsjukeheim%2B1.jpg',
      href: 'https://www.fresvik.no/referansar/vik-helse-og-omsorgssenter',
    },
    {
      title: 'Nok ein Kiwi-butikk får nye fryse- og kjølerom',
      description:
        'Fresvik Produkt har levert fryse- og kjølerom til nok ein Kiwi-butikk, denne gongen i flotte Otta.',
      image:
        'https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1733820354075-093JAT4O9XRFJQLFQLUX/Kiwi%2BOtta%2B1.jpeg',
      href: 'https://www.fresvik.no/referansar/fryse-og-kjolerom-kiwi-otta',
    },
    {
      title: 'Nye leveransar til Rema 1000 Øya i Larvik',
      description:
        'Leveranse av nytt fryserom og kjølerom, komplett med dører, innestengingsalarm og PVC-gardin.',
      image:
        'https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1719842659307-NIRBLOIHY5ZWCFKW4BE2/1715599204491_upscale.jpeg',
      href: 'https://www.fresvik.no/referansar/nye-leveransar-til-rema-1000-ya-i-larvik',
    },
    {
      title: 'Ny leveranse til Dyreparken Safaricamp i Kristiansand Dyrepark',
      description:
        'Fryserom, fem kjølerom, innestengingsalarm, PVC-gardin og sju dører levert til Safaricamp.',
      image:
        'https://images.squarespace-cdn.com/content/v1/64ec79dc5754e2533112d764/1719344562160-Z9D12R6FJ09COTBFIC4B/FP%2BDyreparken.jpg',
      href: 'https://www.fresvik.no/referansar/ny-leveranse-til-dyreparken-safaricamp-i-kristiansand-dyrepark',
    },
    {
      title: 'Spesialløysing til tørkerom hjå Drageboden Kaupanger',
      description:
        'Drageboden på Kaupanger har fått skreddarsydde panel som blir nytta som to tørkerom til trevirke.',
      image: '/img/fon/Fon.png',
      href: 'https://www.fresvik.no/referansar/spesialloysing-torkerom-drageboden-kaupanger',
    },
  ]

  const contactLocations = [
    {
      title: 'Fresvik – Hovudkontor',
      address: ['Hovsvegen, Øyri', '6896 Fresvik'],
      phone: '57 69 83 00',
      email: 'post@fresvik.no',
      mapEmbed:
        'https://www.openstreetmap.org/export/embed.html?bbox=6.908344%2C61.057524%2C6.948344%2C61.087524&layer=mapnik&marker=61.072524%2C6.928344',
      mapLink: 'https://www.openstreetmap.org/?mlat=61.072524&mlon=6.928344#map=16/61.072524/6.928344',
    },
    {
      title: 'Drammen – Salskontor',
      address: ['Bragernes Torg 4', '3017 Drammen'],
      phone: '32 88 50 00',
      email: 'post@fresvik.no',
      mapEmbed:
        'https://www.openstreetmap.org/export/embed.html?bbox=10.19%2C59.738%2C10.215%2C59.749&layer=mapnik&marker=59.7439%2C10.2045',
      mapLink: 'https://www.openstreetmap.org/?mlat=59.7439&mlon=10.2045#map=16/59.7439/10.2045',
    },
  ]

  const salesContacts = [
    {
      name: 'Arne-Olav Lien Bardølsgaard',
      phone: '99 55 25 49',
      email: 'armbard@fresvik.no',
    },
    {
      name: 'Lars Erling Livrud',
      phone: '40 47 79 12',
      email: 'larliv@fresvik.no',
    },
    {
      name: 'Frode Winther',
      phone: '91 38 39 49',
      email: 'frowin@fresvik.no',
    },
  ]

  return (
    <div className="page">
      <header className={`hero ${page === 'contact' ? 'hero--contact' : ''}`}>
        <div className="hero-overlay" aria-hidden="true" />

        <nav className="nav">
          <div
            className="container nav-wrap"
            onMouseLeave={() => {
              scheduleClose()
            }}
          >
            <img
              className="nav-logo-floating"
              src="/img/Logo/LogoFresvik.png"
              alt="Fresvik Produkt"
              role="button"
              tabIndex={0}
              onClick={goHome}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  goHome()
                }
              }}
            />
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
                    ) : item.page ? (
                      <a
                        className="nav-link"
                        href={item.href}
                        onClick={(event) => {
                          event.preventDefault()
                          goPage(item.hash ?? item.page, item.page)
                        }}
                      >
                        {item.label[language]}
                      </a>
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
              <button
                type="button"
                className={`nav-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
                aria-label="Meny"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-drawer"
                onClick={toggleMobileMenu}
              >
                <span />
                <span />
                <span />
              </button>
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

          <div
            className={`nav-drawer-overlay ${isMobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => {
              setMobileMenuOpen(false)
              setMobileOpenSection(null)
            }}
          />
          <aside
            id="mobile-drawer"
            className={`nav-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="nav-drawer-header">
              <img className="nav-drawer-logo" src="/img/Logo/LogoFresvik.png" alt="Fresvik Produkt" />
              <button
                type="button"
                className="nav-drawer-close"
                aria-label="Lukk meny"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setMobileOpenSection(null)
                }}
              >
                ×
              </button>
            </div>
            <div className="nav-drawer-lang" role="group" aria-label="Språk">
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
            <ul className="nav-drawer-links">
              {navItems.map((item) => (
                <li key={item.key} className="nav-drawer-item">
                  {item.items ? (
                    <>
                      <button type="button" onClick={() => handleMobileSection(item.key)}>
                        <span>{item.label[language]}</span>
                        <span className="nav-drawer-chevron">{mobileOpenSection === item.key ? '−' : '+'}</span>
                      </button>
                      <div
                        className={`nav-drawer-submenu ${mobileOpenSection === item.key ? 'is-open' : ''}`}
                      >
                        {item.items[language].map((subItem) => (
                          <a
                            key={subItem}
                            href="#"
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setMobileOpenSection(null)
                            }}
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    </>
                  ) : (
                    <a
                      href={item.href ?? '#'}
                      onClick={(event) => {
                        if (item.page) {
                          event.preventDefault()
                          goPage(item.hash ?? item.page, item.page)
                        } else {
                          setMobileMenuOpen(false)
                          setMobileOpenSection(null)
                        }
                      }}
                    >
                      {item.label[language]}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </nav>

        <div className="container hero-body">
          <div className="brand-block">
            <img className="brand-logo" src="/img/Logo/LogoFresvik.png" alt="Fresvik Produkt" />
          </div>
        </div>
      </header>

      {page === 'references' ? (
        <main className="references-surface">
          <section className="references">
            <div className="container references-header">
              <h2>Referansar</h2>
              <p>
                Vi leverer til næringsmiddelindustrien og til næringsbygg, institusjonar,
                storkjøkken, butikkar, laboratorium, skip og offshoreinstallasjonar. Vårt
                produktspekter er basert på modular, og vi legg sterk vekt på skreddarsaum,
                leveransesikkerheit og kvalitet.
              </p>
            </div>
            <div className="container references-grid">
              {references.map((item) => (
                <a key={item.title} className="reference-card" href={item.href}>
                  <div className="reference-image">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                  <div className="reference-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </main>
      ) : null}

      {page === 'contact' ? (
        <main className="contact-surface">
          <section className="contact" id="kontakt">
            <div className="container contact-header">
              <h2>Kontakt oss</h2>
              <p>
                Har du prosjekt i næringsmiddelindustrien, storkjøkken, butikk, laboratorium eller
                offshore? Ta kontakt med oss på <a href="mailto:post@fresvik.no">post@fresvik.no</a>.
              </p>
              <div className="contact-quick-links">
                <a href="https://fryserom.no">Prosjekt med privatperson? Sjå Fryserom.no</a>
                <a href="https://www.fresvik.no/tilsette">Sjå tilsette</a>
              </div>
            </div>

            <div className="container contact-grid">
              {contactLocations.map((office) => (
                <article key={office.title} className="contact-card">
                  <h3>{office.title}</h3>
                  <div className="contact-lines">
                    {office.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <div className="contact-meta">
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`}>Tel: {office.phone}</a>
                    <a href={`mailto:${office.email}`}>E-post: {office.email}</a>
                  </div>
                </article>
              ))}
            </div>

            <div className="container contact-sales">
              <div className="contact-section-header">
                <h3>Salsavdeling</h3>
                <p>Ta gjerne direkte kontakt med salsavdelinga for prosjekt og pristilbod.</p>
              </div>
              <div className="contact-sales-grid">
                {salesContacts.map((person) => (
                  <article key={person.email} className="contact-person">
                    <h4>{person.name}</h4>
                    <p>
                      Mob: <a href={`tel:${person.phone.replace(/\s/g, '')}`}>{person.phone}</a>
                    </p>
                    <p>
                      <a href={`mailto:${person.email}`}>{person.email}</a>
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="container contact-form-section" id="kontakt-foresporing">
              <div className="contact-form-card">
                <div className="contact-form-header">
                  <h3>Send oss ei forespørsel</h3>
                  <p>
                    Fyll ut skjemaet, så kjem vi tilbake til deg så raskt som mogleg. Du kan òg
                    sende e-post til <a href="mailto:post@fresvik.no">post@fresvik.no</a>.
                  </p>
                </div>
                <form className="contact-form" action="#" method="post">
                  <div className="contact-field">
                    <label htmlFor="contact-name">Namn</label>
                    <input id="contact-name" name="name" type="text" placeholder="Ditt namn" />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="contact-company">Bedrift</label>
                    <input id="contact-company" name="company" type="text" placeholder="Bedriftsnamn" />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="contact-email">E-post</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="namn@bedrift.no"
                      required
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="contact-phone">Telefon</label>
                    <input id="contact-phone" name="phone" type="tel" placeholder="Valfritt" />
                  </div>
                  <div className="contact-field contact-field-full">
                    <label htmlFor="contact-message">Melding</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="5"
                      placeholder="Kort om prosjektet ditt"
                      required
                    />
                  </div>
                  <button type="submit">Send forespørsel</button>
                </form>
              </div>
            </div>

            <div className="container contact-maps">
              <div className="contact-section-header">
                <h3>Kart</h3>
                <p>Finn oss her — både hovudkontor og salskontor.</p>
              </div>
              <div className="contact-map-grid">
                {contactLocations.map((office) => (
                  <article key={office.mapEmbed} className="contact-map-card">
                    <div className="contact-map-header">
                      <h4>{office.title}</h4>
                      <a href={office.mapLink}>Åpne i kart</a>
                    </div>
                    <div className="contact-map">
                      <iframe
                        title={`Kart ${office.title}`}
                        src={office.mapEmbed}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>
      ) : null}

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
            <p>Meld deg på vårt nyheitsbrev og få tips og inspirasjon frå bransjen.</p>
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
    </div>
  )
}











