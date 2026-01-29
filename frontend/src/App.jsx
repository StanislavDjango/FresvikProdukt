import { useEffect, useMemo, useState } from 'react'

const fallbackData = {
  title: 'Fresvik PIR-Panel',
  subtitle: 'Nå er vi først ute i Norge med neste generasjons isolasjonspanel til kjøle- og fryserom.',
  lead: 'Fresvik Produkt har produsert kjøle- og fryserom sidan 1980, og er i dag den einaste norske produsenten av isolasjonspanel til kjøle- og fryserom.',
  overview: 'Fresvik PIR-Panel er eit sandwichelement med oppskumma PIR-skum (Polyisocyanurat-skum) som kjerne, innkapsla mellom to stålplater.',
  hero_image_url: '',
  logo_url: '',
  partners_body: 'Vår visjon er å vere den beste samarbeidspartnaren for deg som kjøleentreprenør.',
  cta_title: 'Har du eit prosjekt du vil diskutere med oss?',
  cta_body: 'Ta kontakt med oss for rådgiving, tekniske avklaringar og skreddarsydde løysingar.',
  cta_button_label: 'Ta kontakt',
  cta_button_url: 'https://www.fresvik.no/kontakt',
  features: [],
  specs: [],
  sections: [],
  gallery: [],
  downloads: [],
  related: [],
}

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/products/fresvik-pir-panel/'

export default function App() {
  const [product, setProduct] = useState(fallbackData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function load() {
      try {
        const res = await fetch(apiUrl)
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`)
        }
        const data = await res.json()
        if (!ignore) {
          setProduct(data)
          setError('')
        }
      } catch (err) {
        if (!ignore) {
          setError('Kunne ikkje hente data frå API. Viser lokal fallback.')
          setProduct(fallbackData)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [])

  const heroImage = product.hero_image_url || '/img/fon/hero-bg.jpg'
  const specGroups = useMemo(() => {
    const grouped = new Map()
    product.specs?.forEach((spec) => {
      const group = spec.group || 'Tekniske data'
      if (!grouped.has(group)) {
        grouped.set(group, [])
      }
      grouped.get(group).push(spec)
    })
    return grouped
  }, [product.specs])

  return (
    <div className="page glass-theme">
      <header className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay" />
        <nav className="nav">
          <div className="nav-brand">
            {product.logo_url ? (
              <img src={product.logo_url} alt="Fresvik" />
            ) : (
              <span>Fresvik Produkt</span>
            )}
          </div>
          <div className="nav-links">
            <a href="#om-oss">Om oss</a>
            <a href="#produkter">Produkter</a>
            <a href="#referanser">Referanser</a>
            <a href="#kontakt">Kontakt oss</a>
          </div>
          <div className="nav-actions">
            <button className="icon-button">🔎</button>
            <button className="solid">Kontakt oss</button>
          </div>
        </nav>

        <div className="hero-main">
          <div className="hero-card">
            <span className="pill">Nyhet!</span>
            <h1>{product.title}</h1>
            <p className="subtitle">{product.subtitle}</p>
            <p className="lead">{product.lead}</p>
            <p className="hero-body">{product.overview}</p>
            <div className="hero-cta">
              <button className="solid">Kontakt oss</button>
            </div>
          </div>

          <aside className="hero-benefits">
            <h3>+ Fordeler med PIR-panel</h3>
            <ul>
              {(product.features || []).slice(0, 6).map((feature) => (
                <li key={feature.title}>{feature.title}</li>
              ))}
            </ul>
            <button className="solid ghost-inverse">Send forespørsel</button>
          </aside>
        </div>

        <div className="hero-product-strip">
          <div className="product-cards">
            {(product.sections || []).slice(0, 3).map((section) => (
              <div key={section.title} className="product-card">
                <div className="product-thumb" />
                <p>{section.title}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="section info-grid" id="produkter">
        <div className="info-card">
          <h3>Konstruksjon</h3>
          <p>{product.sections?.[0]?.body}</p>
        </div>
        <div className="info-card">
          <h3>Isolasjon</h3>
          <p>{product.sections?.[1]?.body}</p>
        </div>
        <div className="info-card">
          <h3>Overflate</h3>
          <p>{product.sections?.[2]?.body}</p>
        </div>
        <div className="specs-card">
          <h3>Tekniske data</h3>
          <div className="spec-list">
            {product.specs?.slice(0, 6).map((spec) => (
              <div key={spec.label} className="spec-row">
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section actions-row" id="kontakt">
        <a className="solid wide" href={product.downloads?.[0]?.file_url} target="_blank" rel="noreferrer">
          Last ned brosjyre
        </a>
        <div className="action-icons">
          <button className="icon-button">📞</button>
          <button className="icon-button">✉️</button>
        </div>
        <a className="solid wide" href={product.cta_button_url} target="_blank" rel="noreferrer">
          {product.cta_button_label || 'Send forespørsel'}
        </a>
      </section>

      <section className="section downloads" id="referanser">
        <div className="section-header">
          <h2>Dokumentasjon</h2>
          <p>Last ned tekniske dokument og montasjeanvisning.</p>
        </div>
        <div className="download-grid">
          {(product.downloads || []).map((item) => (
            <a key={item.title} className="download-card" href={item.file_url} target="_blank" rel="noreferrer">
              <div>
                <h3>{item.title}</h3>
                <p>PDF</p>
              </div>
              <span>Last ned →</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer" id="om-oss">
        <div>
          <strong>Fresvik Produkt</strong>
          <p>{product.partners_body}</p>
        </div>
        <div>
          <small>© 2026 Fresvik Produkt</small>
        </div>
      </footer>

      {loading && <div className="toast">Laster inn data…</div>}
      {error && <div className="toast error">{error}</div>}
    </div>
  )
}
