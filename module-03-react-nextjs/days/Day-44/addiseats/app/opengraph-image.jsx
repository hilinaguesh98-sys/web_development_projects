import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const alt = 'Addis Eats food delivery'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const image = await readFile(path.join(process.cwd(), 'public', 'addiseats-food.jpg'))
  const imageSrc = `data:image/jpeg;base64,${image.toString('base64')}`

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', backgroundColor: '#20150f', color: 'white', fontFamily: 'Arial' }}>
      <img src={imageSrc} alt="" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'absolute', inset: 0, padding: '64px', background: 'linear-gradient(0deg, rgba(0,0,0,.82), rgba(0,0,0,.02) 90%)' }}>
        <div style={{ display: 'flex', color: '#ff9b3d', fontSize: 26, fontWeight: 700, marginBottom: 16 }}>AUTHENTIC FLAVORS · FAST DELIVERY</div>
        <div style={{ display: 'flex', fontSize: 68, lineHeight: 1.1, fontWeight: 700 }}>Addis Eats</div>
        <div style={{ display: 'flex', fontSize: 30, marginTop: 16 }}>Ethiopian favorites delivered across Addis Ababa</div>
      </div>
    </div>,
    size,
  )
}
