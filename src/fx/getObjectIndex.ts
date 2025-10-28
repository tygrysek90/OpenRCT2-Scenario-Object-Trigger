/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Scenario-Object-Trigger
 * 
 * OpenRCT2-Scenario-Object-Trigger
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/


/**
 * Seeks object index by its name
 * @param objectType OpenRCT2 ObjectType
 * @param identifier e.g. "rct2.small_scenery.something"
 * @returns object index, undefined when not found
 */
export function getObjectIndex(objectType: ObjectType, identifier: string): number | undefined {
    let objects = objectManager.getAllObjects(objectType);
    for (let n = 0; n < objects.length; n++) {
        if (objects[n].identifier == identifier) {
            return objects[n].index;
        }
    }
    return undefined;
}
