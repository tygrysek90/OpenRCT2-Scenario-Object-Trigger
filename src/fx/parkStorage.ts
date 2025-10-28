/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/


/**
 * Functions for storing configuration in park (saves it with park)
 */

const persistenceVersion: string = "P"
const persistenceVersionValue: number = 1

const sequentialKey: string = "SOT"

/** Park storage pointer */
export var parkStorage = context.getParkStorage()

/**
 * Write ghost objects config to park storage
 * @param sequential array of strings 
 */
export function writeParkStorage(sequential: Array<string>) {
    parkStorage.set(persistenceVersion, persistenceVersionValue)
    parkStorage.set(sequentialKey, sequential)
}

/**
 * Read from park storage
 * @returns array of strings 
 */
export function readParkStorage(): Array<string> | undefined {
    
    if (parkStorage.get(persistenceVersion) == persistenceVersionValue) {
        return parkStorage.get(sequentialKey)
    }
    else {
        return undefined
    }
}

export function isParkStorage(): boolean {
    let ps = readParkStorage()
    if (ps != undefined) {
        if (ps.length > 0) {
            return true
        }
    }
    return false
}

