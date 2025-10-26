/**
 * Main window
 * GUI definition
 */

import { Colour, label, window } from "openrct2-flexui";
import { pluginName } from "./environment";

export const mainWindow = window({
    title: pluginName,
    width: 200,
    height: 200,
    colours: [Colour["Grey"], Colour["Grey"]],
    content: [
        label({
            text: "Hello world!"
        }),
    ]
})