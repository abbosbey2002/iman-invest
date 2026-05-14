const puppeteer = require('puppeteer')
;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  for (const [w, h, name] of [
    [390, 700, 'm-logo'],
    [1440, 700, 'd-logo'],
  ]) {
    const page = await browser.newPage()
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 15000 })
    await new Promise(r => setTimeout(r, 600))
    await page.screenshot({ path: `/tmp/shots/${name}.png` })
    await page.close()
    console.log(`✓ ${name} (${w}x${h})`)
  }
  // Also drawer
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 800, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 15000 })
  await page.click('.burger')
  await new Promise(r => setTimeout(r, 500))
  await page.screenshot({ path: '/tmp/shots/m-drawer.png' })
  await page.close()
  console.log('✓ m-drawer')
  await browser.close()
})()
