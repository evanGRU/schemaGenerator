export type Room = {
    name: string
    sockets: number
}

export type FormData = {
    brand: 'Schneider' | 'Legrand'
    rooms: Room[]
    chauffeEau: boolean
    portail: boolean
}
