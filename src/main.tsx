import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { LanguageProvider } from './i18n/LanguageContext'
import './styles/tokens.css'
import './styles/base.css'
import './styles/hero.css'
import './styles/sections.css'
import './styles/scenes.css'
import './styles/deck.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
