import { preload } from 'react-dom'
import Image from 'next/image'
import HomeSearch from './HomeSearch'
import heroImage from './assets/photo_2026-09-09_10-50-26.jpg'

export default function HomeHero() {
  preload('/home-hero-desktop.avif', {
    as: 'image',
    fetchPriority: 'high',
    imageSizes: '100vw',
    imageSrcSet: '/home-hero-mobile.avif 750w, /home-hero-desktop.avif 1280w',
    type: 'image/avif',
  })

  return <section className="hero">
    <picture className="hero-picture">
      <source media="(max-width: 600px)" srcSet="/home-hero-mobile.avif" type="image/avif"/>
      <source srcSet="/home-hero-desktop.avif" type="image/avif"/>
      <Image src={heroImage} alt="Burgers and fries ready to serve" fill fetchPriority="high" unoptimized className="hero-image"/>
    </picture>
    <div className="hero-overlay">
      <div className="container hero-content">
        <p className="hero-kicker">AUTHENTIC FLAVORS · FAST DELIVERY</p>
        <h1>Hungry? We've got<br/>you covered.</h1>
        <p className="hero-copy">Delicious Ethiopian and international dishes from your<br/>favorite local restaurants delivered straight to your door.</p>
        <HomeSearch />
      </div>
    </div>
  </section>
}
