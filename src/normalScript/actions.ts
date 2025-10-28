/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Scenario-Object-Trigger
 * 
 * OpenRCT2-Scenario-Object-Trigger
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { readBanner } from "../fx/bannerStorage";
import { hasFlag } from "../fx/flagCheck";
import { gameActionArgsFlags } from "../const/gameActionArgsFlags";
import { getObjectIndex } from "../fx/getObjectIndex";
import { debug, error } from "../fx/logger";
import { readParkStorage, writeParkStorage } from "../fx/parkStorage";
import { SOT, SOTword } from "../const/sotEnum";

/** trash object identifier */
var objectName: string = ""
/** trash object index */
var objectIndex: number
/** trash cunt */
var trashCunt: number

/**
 * Takes data from banner, removes banner and moves data into park storage
 * (this is for fresh game start)
 * @returns fail
 */
export function bannerToParkStorage() {
    let a = readBanner()?.split(" ")
    debug(a?.toString()??"undefined")
    if (a !=undefined) {
        objectName = a[SOT.object]
        trashCunt = Number(a[SOT.count])
    }
    else {
        error("Banner data: corrupt")
        return
    }
    let b = getObjectIndex("small_scenery", objectName) 
    if (b != undefined) {
        objectIndex = b
        debug("object index is "+b.toString())
    }
    else {
        error("Banner data: object selection invalid")
        return
    }
    writeParkStorage(a)
    
}

/**
 * Loads data from park storage into module
 */
export function parkStorageToVariables() {
    let ps = readParkStorage()
    if (ps != undefined) {
        let oi = getObjectIndex("small_scenery", ps[SOT.object])
        if (oi != undefined) {
            objectName = ps[SOT.object]
            objectIndex = oi
            debug("object index is "+oi.toString())
            trashCunt = Number(ps[SOT.count])
            debug("object cunt is "+trashCunt.toString())
        }
        else {
            error("Can not get object index")
        }
    }
    else {
        error("Park store data can not be read")
    }
}

/**
 * Final function, once all trash is removed
 */
function onTrashRemoved() {
	objectManager.load("rct2.water.wtrcyan", 0)
    //causes OpenRCT2 to SIGSEGV
    //objectManager.unload(objectName)
	debug("Water cleaned")

}

/**
 * Update trash cunt into park storage
 * @param cunt number of trash
 */
function updateTrashCuntPersistence(cunt: number) {
    writeParkStorage([SOTword, "00", objectName, cunt.toString()])
}

/**
 * Action hook resolver, takes care of updating cunt
 * @param e 
 */
export function onCallback(e: GameActionEventArgs) {
    if (e.action == "smallsceneryremove") {
        let es = e.args as SmallSceneryRemoveArgs
        //console.log(es.object)
        if (es.object == objectIndex) {
            trashCunt--
            updateTrashCuntPersistence(trashCunt)
            debug("trash removed, remaining "+trashCunt.toString())
            if (trashCunt == 0) {
                console.log("trash gone!!!!")
                onTrashRemoved()
            }
        }
    }
    if (e.action == "smallsceneryplace") {
        let es = e.args as SmallSceneryPlaceArgs
        if (es.object == objectIndex && !hasFlag(es.flags??0, gameActionArgsFlags.GAME_COMMAND_FLAG_GHOST)) {
            trashCunt++
            updateTrashCuntPersistence(trashCunt)
            debug("trash added, remaining "+trashCunt.toString())
        }
    }
}

/**
 * Subscription to game action events
 */
export function subscribeToActions() {
    context.subscribe("action.execute", (e:GameActionEventArgs) => onCallback(e))
    debug("subscribed to actions")
}