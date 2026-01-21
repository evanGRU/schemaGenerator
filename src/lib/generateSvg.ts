import {buildCircuits} from "@/lib/buildCircuits";
import { FormData } from '@/types/form'

export function generateSvg(data: FormData) {
    const circuits = buildCircuits(data)

    const lineXMap: Record<string, number> = {
        R1A: 500,
        R1B: 620,
        R2A: 700,
        R2B: 760,
        STO: 840,
        P24: 880,
    }

    const yStart = 42
    const yEnd = 118

    const circuitSymbols = circuits.map(c => {
        const x = lineXMap[c.line] || 500
        return `
        <!-- ${c.label} -->
        <circle cx="${x}" cy="${yEnd}" r="8" class="term"/>
        <line x1="${x}" y1="${yStart}" x2="${x}" y2="${yEnd}" class="s"/>
        <text x="${x}" y="${yEnd + 15}" class="tv">${c.label}</text>
        `
    }).join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="220" viewBox="0 0 900 220">
    <defs>
        <style>
            .s { stroke:#000; stroke-width:2; fill:none; stroke-linecap:butt; stroke-linejoin:miter; }
            .dash { stroke-dasharray:7 6; }
            .term { fill:#fff; stroke:#000; stroke-width:2; }
            .t { font-family: Arial, sans-serif; font-size:14px; fill:#000; }
            .tv { font-family: Arial, sans-serif; font-size:14px; fill:#000; text-anchor:middle; dominant-baseline:middle; }
        </style>
    </defs>

    <!-- Main box -->
    <rect x="50" y="20" width="840" height="190" class="s dash" fill="#d9d9d9"/>

    <!-- Circuits -->
    ${circuitSymbols}

    <!-- Device label -->
    <text x="760" y="125" font-family="Arial, sans-serif" font-size="26" fill="#000">ATV320</text>
</svg>`
}