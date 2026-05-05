import sharp from 'sharp'
import { readdirSync, statSync, unlinkSync, renameSync, writeFileSync } from 'fs'
import { join, extname, basename } from 'path'

const DIRS = ['./public/images/paintings', './public/images']
const WEBP_QUALITY = 80

let totalBefore = 0, totalAfter = 0

for (const dir of DIRS) {
  for (const file of readdirSync(dir)) {
    const filePath = join(dir, file)
    if (statSync(filePath).isDirectory()) continue
    const ext = extname(file).toLowerCase()
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

    const sizeBefore = statSync(filePath).size
    totalBefore += sizeBefore

    const outPath = join(dir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'))
    const tmpPath = outPath + '.tmp'

    try {
      const buffer = await sharp(filePath)
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toBuffer()

      writeFileSync(tmpPath, buffer)
      unlinkSync(filePath)
      renameSync(tmpPath, outPath)

      totalAfter += buffer.length
      const pct = Math.round((1 - buffer.length / sizeBefore) * 100)
      console.log(`✓ ${file.padEnd(60)} ${Math.round(sizeBefore/1024)}KB → ${Math.round(buffer.length/1024)}KB  (-${pct}%)`)
    } catch (err) {
      totalAfter += sizeBefore
      console.error(`✗ ${file}: ${err.message}`)
      try { unlinkSync(tmpPath) } catch {}
    }
  }
}

console.log(`\nTotal: ${Math.round(totalBefore/1024)}KB → ${Math.round(totalAfter/1024)}KB  (saved ${Math.round((1-totalAfter/totalBefore)*100)}%)`)
