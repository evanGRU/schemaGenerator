'use client'

import { useState } from 'react'
import { FormData } from '@/types/form'
import styles from './page.module.scss'

export default function Home() {
    const [data, setData] = useState<FormData>({
        brand: 'Schneider',
        rooms: [
            { name: 'Salon', sockets: 5 },
        ],
        chauffeEau: false,
        portail: false,
    })

    const addRoom = () => {
        setData({
            ...data,
            rooms: [...data.rooms, { name: '', sockets: 1 }],
        })
    }

    const removeRoom = (index: number) => {
        setData({
            ...data,
            rooms: data.rooms.filter((_, i) => i !== index),
        })
    }

    const updateRoom = (
        index: number,
        field: 'name' | 'sockets',
        value: string | number
    ) => {
        const rooms = [...data.rooms]
        rooms[index] = { ...rooms[index], [field]: value }
        setData({ ...data, rooms })
    }

    const submit = async () => {
        const res = await fetch('/api/generate-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        const blob = await res.blob()
        window.open(URL.createObjectURL(blob))
    }

    return (
        <main className={`${styles.container} ${styles.form}`}>
            <h1 className={styles.title}>Générateur de schéma électrique</h1>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Paramètres généraux</h2>

                <div className={styles.field}>
                    <label>Marque</label>
                    <select
                        value={data.brand}
                        onChange={e =>
                            setData({ ...data, brand: e.target.value as any })
                        }
                    >
                        <option>Schneider</option>
                        <option>Legrand</option>
                    </select>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Pièces</h2>

                {data.rooms.map((room, index) => (
                    <div className={styles.room} key={index}>
                        <input
                            placeholder="Nom de la pièce"
                            value={room.name}
                            onChange={e =>
                                updateRoom(index, 'name', e.target.value)
                            }
                        />
                        <input
                            type="number"
                            min={1}
                            value={room.sockets}
                            onChange={e =>
                                updateRoom(index, 'sockets', Number(e.target.value))
                            }
                        />
                        <button
                            className={styles.remove}
                            onClick={() => removeRoom(index)}
                        >
                            ✕
                        </button>
                    </div>
                ))}

                <button className={styles.addRoom} onClick={addRoom}>
                    ➕ Ajouter une pièce
                </button>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Options</h2>

                <div className={styles.options}>
                    <label>
                        <input
                            type="checkbox"
                            checked={data.chauffeEau}
                            onChange={e =>
                                setData({ ...data, chauffeEau: e.target.checked })
                            }
                        />
                        Chauffe-eau
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={data.portail}
                            onChange={e =>
                                setData({ ...data, portail: e.target.checked })
                            }
                        />
                        Portail électrique
                    </label>
                </div>
            </section>

            <button className={styles.submit} onClick={submit}>
                Générer le PDF
            </button>
        </main>
    )
}
