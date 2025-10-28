/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Scenario-Object-Trigger
 * 
 * OpenRCT2-Scenario-Object-Trigger
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { build, pluginName, pluginVersion } from "./environment";
import { scenarioEditorWin } from "./scenarioEditorUI/window";
import { debug, error } from "./fx/logger";
import { bannerToParkStorage, parkStorageToVariables, subscribeToActions } from "./normalScript/actions";
import { readBanner, removeBanner } from "./fx/bannerStorage";
import { isParkStorage } from "./fx/parkStorage";

export var mode = context.mode

export function startup()
{
	// we are not doing headless
	if (typeof ui === "undefined") {
		error(`${pluginName} is not made to run in headless server mode`)
		return
	}
	else {
		switch(mode) {
			// Scenario Editor part
			case "scenario_editor":
				debug("In scenario editor mode")
				ui.registerMenuItem(pluginName, () => scenarioEditorWin.open());
				if (build.isDevelopment) {
					//the dev version will be distributed for wider audiences
					//mainWindow.open()
				}
				break
			// Game part
			case "normal":
				debug(pluginVersion)
				// New game with SOT gets caught here
				if (readBanner()) {
					debug("actions banner found")
					bannerToParkStorage()
					removeBanner()
					subscribeToActions()
				}
				else {
					// Saved game with SOT gets caught here
					if (isParkStorage()) {
						debug("park storage found")
						parkStorageToVariables()
						subscribeToActions()
					}
					else {
						// The game has no SOT action defined
						debug("Nothing to do here. I quit!")
						// We are done here
						return
					}
				}
				break
			default:
				// Nothing else to offer
				debug("This game mode is not supported")
				return
		}

	}
}