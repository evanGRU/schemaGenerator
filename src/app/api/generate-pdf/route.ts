import puppeteer from 'puppeteer'
import { generateSvg } from '@/lib/generateSvg'

export async function POST(req: Request) {
    const data = await req.json()

    const svg = generateSvg(data)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setContent(svg)
    const pdf = await page.pdf({ format: 'A4' })

    await browser.close()

    return new Response(Buffer.from(pdf), {
        headers: {
            'Content-Type': 'application/pdf',
        },
    })
}
