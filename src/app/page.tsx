'use client'

import { useState, useEffect } from 'react'

interface NewsItem {
  title: string
  description: string
  url: string
  source: string
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')

  const fetchNews = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Используем бесплатный поиск через API
      const response = await fetch(
        'https://api.tavily.com/search?q=AI%20artificial%20intelligence%20news&max_results=8&api_key=demo'
      )
      
      if (!response.ok) {
        throw new Error('Ошибка поиска')
      }
      
      const data = await response.json()
      
      // Формат Tavily может отличаться, пробуем разные форматы
      let articles: NewsItem[] = []
      
      if (data.results && Array.isArray(data.results)) {
        articles = data.results.map((item: any) => ({
          title: item.title || 'Без названия',
          description: item.content || item.description || '',
          url: item.url || '#',
          source: new URL(item.url || 'https://example.com').hostname.replace('www.', '')
        }))
      } else if (data.answer) {
        // Альтернативный формат - саммари
        articles = [{
          title: 'AI News Summary',
          description: data.answer,
          url: 'https://techcrunch.com/tag/artificial-intelligence/',
          source: 'Tavily'
        }]
      }
      
      if (articles.length === 0) {
        // Фолбек - тестовые данные
        articles = getFallbackNews()
      }
      
      setNews(articles)
      setLastUpdated(new Date().toLocaleString('ru-RU', { 
        timeZone: 'Europe/Moscow',
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short'
      }))
      
    } catch (err) {
      console.error('Fetch error:', err)
      setNews(getFallbackNews())
      setLastUpdated(new Date().toLocaleString('ru-RU', { 
        timeZone: 'Europe/Moscow',
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short'
      }))
    } finally {
      setLoading(false)
    }
  }

  const getFallbackNews = (): NewsItem[] => [
    {
      title: 'Google VP предупреждает о рисках для AI-стартапов',
      description: 'Вице-президент Google считает, что агрегаторы AI и стартапы для студентов могут не выжить в условиях насыщения рынка.',
      url: 'https://techcrunch.com/2026/02/21/google-vp-warns-that-two-types-of-ai-startups-may-not-survive/',
      source: 'TechCrunch'
    },
    {
      title: 'Экономист назвал AI «переоцененным и опасным»',
      description: 'Стив Хэнки предупреждает о возможном пузыре в AI-индустрии и рекомендует инвесторам быть осторожными.',
      url: 'https://www.businessinsider.com/steve-hanke-ai-yann-lecun-meta-hype-bubble-stocks-hyperscalers-2026-2',
      source: 'Business Insider'
    },
    {
      title: 'Cisco: синергия человека и AI',
      description: 'Президент Cisco подчеркивает, что AI усиливает креативность и эмпатию людей, а не заменяет их полностью.',
      url: 'https://www.devdiscourse.com/article/technology/3812759-the-human-ai-synergy-redefining-tomorrows-workforce',
      source: 'Devdiscourse'
    },
    {
      title: 'Чат-боты вызывают «бредовые спирали»',
      description: 'Растет беспокойство о влиянии AI на психику пользователей, которые начинают принимать ложную информацию за реальность.',
      url: 'https://www.nbcnews.com/video/concerns-are-growing-over-chatbots-causing-users-to-go-into-delusional-spirals-258067525827',
      source: 'NBC News'
    },
    {
      title: 'Mississippi запустила AI для госзакупок',
      description: 'Инновационный хаб штата представил чатбот Procurii для улучшения государственных закупок.',
      url: 'https://www.govtech.com/artificial-intelligence/mississippi-ai-innovation-hubs-new-chatbot-targets-procurement',
      source: 'GovTech'
    }
  ]

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <main className="container">
      <header>
        <h1>🤖 AI News Daily</h1>
        <p className="subtitle">Новости искусственного интеллекта</p>
        <div className="meta">
          <span>Обновлено: {lastUpdated || '...'}</span>
          <button onClick={fetchNews} disabled={loading} className="refresh-btn">
            {loading ? 'Загрузка...' : '🔄 Обновить'}
          </button>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <section className="news-grid">
        {news.map((item, index) => (
          <article key={index} className="news-card">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div className="card-footer">
              <span className="source">{item.source}</span>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Читать →
              </a>
            </div>
          </article>
        ))}
      </section>

      <footer>
        <p>AI News Daily — автоматическая подборка новостей про AI</p>
      </footer>
    </main>
  )
}
