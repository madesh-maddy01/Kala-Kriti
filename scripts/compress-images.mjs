import sharp from 'sharp'
import { readdirSync, statSync, writeFileSync, unlinkSync, renameSync } from 'fs'
import { join, extname } from 'path'

const PAINTINGS_DIR = './public/images/paintings'
const MAX_WIDTH = 1600
const JPEG_QUALITY = 78

const files = readdirSync(PAINTINGS_DIR)

let totalBefore = 0
let totalAfter = 0

for (const file of files) {
  const filePath = join(PAINTINGS_DIR, file)
  const ext = extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue

  const sizeBefore = statSync(filePath).size
  totalBefore += sizeBefore

  const isPng = ext === '.png'
  const outPath = isPng ? filePath.replace(/\.png$/i, '.jpg') : filePath
  const tmpPath = outPath + '.tmp'

  try {
    const image = sharp(filePath)
    const meta = await image.metadata()

    const resized = meta.width > MAX_WIDTH
      ? image.resize(MAX_WIDTH, null, { withoutEnlargement: true, kernel: 'lanczos3' })
      : image

    const buffer = await resized
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, chromaSubsampling: '4:2:0' })
      .toBuffer()

    // Write to tmp, then atomic rename
    writeFileSync(tmpPath, buffer)
    if (isPng) unlinkSync(filePath)   // remove original PNG before rename
    renameSync(tmpPath, outPath)

    totalAfter += buffer.length
    const saved = Math.round((1 - buffer.length / sizeBefore) * 100)
    const label = isPng ? `${file} → ${file.replace(/\.png$/i, '.jpg')}` : file
    console.log(`✓ ${label.padEnd(65)} ${Math.round(sizeBefore/1024)}KB → ${Math.round(buffer.length/1024)}KB  (-${saved}%)`)
  } catch (err) {
    totalAfter += sizeBefore
    console.error(`✗ ${file}: ${err.message}`)
    try { unlinkSync(tmpPath) } catch {}
  }
}

console.log(`\nTotal: ${Math.round(totalBefore/1024)}KB → ${Math.round(totalAfter/1024)}KB  (saved ${Math.round((1 - totalAfter/totalBefore)*100)}%)`)
