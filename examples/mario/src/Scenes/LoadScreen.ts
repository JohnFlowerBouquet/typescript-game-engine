import { Font } from "../../../../src/font";
import { createColorLayer } from "../../../../src/layers/color";
import { createTextLayer } from "../../../../src/layers/text";
import Scene from "../../../../src/Scene";

export const LoadScreen = (font: Font, name: string) => {
    const loadScreen = new Scene();
    loadScreen.compositor.addLayer(createColorLayer("#000"));
    loadScreen.compositor.addLayer(createTextLayer(font, `Loading ${name}`))
    return loadScreen;
}