import { Player } from './Player'

export enum Era {
    SEVENTIES = '1968-1979',
    EIGHTIES = '1980-1989',
    NINETIES = '1990-1999',
    TWO_THOUSAND = '2000-2009',
    TWO_THOUSAND_TENS = '2010-Pres.',
    ALL = 'All Years',
}

export function filterPlayersByEra(player: Player, era: Era): boolean {
    switch (era) {
        case Era.SEVENTIES:
            return player.year < 1980
        case Era.EIGHTIES:
            return player.year >= 1980 && player.year < 1990
        case Era.NINETIES:
            return player.year >= 1990 && player.year < 2000
        case Era.TWO_THOUSAND:
            return player.year >= 2000 && player.year < 2010
        case Era.TWO_THOUSAND_TENS:
            return player.year >= 2010
        default:
            return true
    }
}
