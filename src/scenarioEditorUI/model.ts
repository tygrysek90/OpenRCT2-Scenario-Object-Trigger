/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Scenario-Object-Trigger
 * 
 * OpenRCT2-Scenario-Object-Trigger
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * View model definition
 */

import { store } from "openrct2-flexui";

export const scenarioEditorModel = {
    objects: store<string[]>(["none"]),
    message: store<string>("")
}