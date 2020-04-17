
export function msToTime(s: number): string {
    const pad = (n: any, z = 2) => {
        return ('00' + n).slice(-z)
    }
    const ms = s % 1000
    s = (s - ms) / 1000
    const secs = s % 60
    s = (s - secs) / 60
    const mins = s % 60
    const hrs = (s - mins) / 60
    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3)
}

export function randomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randColor(): number {
    const colors = [0xDE3249, 0x650A5A, 0xC34288, 0xAA4F08, 0xDE3249, 0x650A5A, 0xC34288, 0xAA4F08, 0xFF3300, 0x650A5A, 0x35CC5A, 0xFFCC5A, 0x55335A, 0x3500FA]
    return colors[randomInt(0, colors.length - 1)]
}