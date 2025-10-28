/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Scenario-Object-Trigger
 * 
 * OpenRCT2-Scenario-Object-Trigger
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { debug } from "./logger"
import { SOT, SOTword } from "../const/sotEnum"

/** Stores index of loaded object type */
var bannerIndex: number


/**
 * Find element index where banner
 * @returns index of tile element where banner present is or false if no banner on tile
 */
function getBannerElementNum(): number | false {
    let tile = map.getTile(0,0)
    for (let n=0; n<tile.numElements; n++) {
        if (tile.elements[n].type == "banner") {
            return n
        }
    }
    return false
}

/**
 * Check if there is at least one banner object loaded into park
 * @returns true if there are at least one banner objects loaded into park, false otherwise
 */
export function getLoadedBanner(): boolean {
    let loadedBanners = objectManager.getAllObjects("banner")
    debug(loadedBanners.length.toString())
    if (loadedBanners.length > 0) {
        bannerIndex = loadedBanners[0].index
        return true
    }
    else {
        return false
    }
}

/**
 * Creates a banner at position 0,0 if not present
 * writes to banner string
 * @param str string to write 
 */
export function writeBanner(str: string) {
    let tile = map.getTile(0,0)
    let p = getBannerElementNum()
    debug(p.toString())
    if (p == false) {
        let t = tile.insertElement(tile.numElements) as BannerElement
        t.type = "banner"
        t.object = bannerIndex
        t.baseHeight = 0
        t.clearanceHeight = 0
        t.bannerText = str
        t.direction = 2
    }
    else {
        let b = tile.elements[p] as BannerElement
        b.bannerText = str
    }
}

/**
 * Read text from banner
 * @returns text in banner or undefined when there is no banner at map 0,0
 */
export function readBanner(): string | undefined {
    let tile = map.getTile(0,0)
    let p = getBannerElementNum()
    if (p != false) {
        if (p > -1) {
            let b = tile.elements[p] as BannerElement
            debug("read config " + b.bannerText)
            let bt = b.bannerText.split(" ")
            if (bt.length > 0 && bt[SOT.sot] == SOTword) {
                return b.bannerText
            }
        }
    }
    return undefined
}

/**
 * Removes first banner at 0,0 position
 */
export function removeBanner() {
    let tile = map.getTile(0,0)
    for (let n=0; n<tile.numElements; n++) {
        if (tile.elements[n].type == "banner") {
            tile.removeElement(n)
        }
    }
}