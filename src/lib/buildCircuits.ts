import { FormData } from '@/types/form'

export type Circuit = {
    label: string
    caliber: string
    line: string
}

export function buildCircuits(data: FormData): Circuit[] {
    const circuits: Circuit[] = []

    const lines = ['R1A', 'R1B', 'R2A', 'R2B', 'STO', 'P24']
    let lineIndex = 0

    data.rooms.map(room => {
        circuits.push({
            label: `Prises ${room.name}`,
            caliber: '16A',
            line: lines[lineIndex] || lines[lines.length - 1],
        })
        lineIndex++
    })

    if (data.chauffeEau) {
        circuits.push({
            label: 'Chauffe-eau',
            caliber: '20A',
            line: lines[lineIndex] || lines[lines.length - 1],
        })
        lineIndex++
    }

    if (data.portail) {
        circuits.push({
            label: 'Portail électrique',
            caliber: '10A',
            line: lines[lineIndex] || lines[lines.length - 1],
        })
    }

    return circuits
}
