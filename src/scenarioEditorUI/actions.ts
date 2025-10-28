/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Scenario-Object-Trigger
 * 
 * OpenRCT2-Scenario-Object-Trigger
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * GUI functions
 */

import { getLoadedBanner, writeBanner } from "../fx/bannerStorage"
import { scenarioEditorModel } from "./model"
import { DataLoader } from "../fx/objectLoader"

var dataLoader: DataLoader

export function onMainWinOpen() {
    let bannerLoadResult = getLoadedBanner()
    if (!bannerLoadResult) {
        scenarioEditorModel.message.set("{TOPAZ}At least one banner object must be enabled in park to make plugin work")
    }
    else {
        scenarioEditorModel.message.set("")
    }
    dataLoader = new DataLoader("small_scenery")
    scenarioEditorModel.objects.set(dataLoader._namesWithIdentifiers.slice())
}

export function onDropDownChange(index: number) {
    let trashCunt: number = 0
    let trashObjectIndex = index
    for (let x=0; x<map.size.x; x++) {
		for (let y=0; y<map.size.y; y++) {
			let tile = map.getTile(x,y)
			tile.elements.forEach(element => {
				if (element.type == "small_scenery") {
					let smScE = element as SmallSceneryElement
					if (smScE.object == trashObjectIndex) {
						trashCunt++
						console.log("indexing trash count "+trashCunt.toString())
					}
				}
			})
		}
	}
    writeBanner("SOT 00 "+dataLoader._identifiers[index]+" "+trashCunt)
    scenarioEditorModel.message.set("{GREEN}Setting successfully saved")   
}