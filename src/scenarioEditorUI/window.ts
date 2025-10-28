/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Scenario-Object-Trigger
 * 
 * OpenRCT2-Scenario-Object-Trigger
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Main window
 * GUI definition
 */

import { Colour, dropdown, groupbox, label, LayoutDirection, window } from "openrct2-flexui";
import { pluginName, pluginVersion } from "../environment";
import { onDropDownChange, onMainWinOpen } from "./actions";
import { scenarioEditorModel } from "./model";

export const scenarioEditorWin = window({
    title: `${pluginName} ${pluginVersion}`,
    width: 500,
    height: 124,
    colours: [Colour["Grey"], Colour["Grey"]],
    content: [
        groupbox({
            direction: LayoutDirection.Horizontal,
            text: "Action",
            content: [
                label({
                    text: "When object "
                }),
                dropdown({
                    width: 200,
                    items: scenarioEditorModel.objects,
                    onChange: (index) => onDropDownChange(index)
                }),
                label({
                    text: "count is zero"
                }),
                dropdown({
                    items: ["purify water"]
                })
            ]
        }),
        groupbox({
            content: [
                label({
                    text: scenarioEditorModel.message
                })
            ]
        }),
        groupbox({
            content: [
                label({
                    //disabled: true,
                    text: "{BLACK}https://github.com/tygrysek90/OpenRCT2-Scenario-Object-Trigger",
                    alignment: "centred"
                })
            ]
        })
    ],
    onOpen: () => onMainWinOpen()
})