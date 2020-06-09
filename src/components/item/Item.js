import {Lightning, Utils} from "wpe-lightning-sdk";

import { getImgUrl } from '../../lib/tools'
export default class Level extends Lightning.Component{
    static _template(){
        return {
            Image: {
                // w: 370,
                // h: 556,
            },
            Title: {
                alpha: 0,
                y: 280, x: 20,
                text: {fontFace: "SourceSansPro-Regular", fontSize: 24}
            }
        }
    }

    /**
     * @todo:
     * - toggle alpha on focus / unfocus (transition)
     */

    set item(v){
        const { poster_path, backdrop_path, title } = v;
        this.tag('Image').src = getImgUrl(poster_path);
        this.tag('Title').text.text = title;
        // @todo: patch the correct image and title
    }

    _focus() {
        this.tag('Image').setSmooth('scale', 1.2);
    }

    _unfocus() {
        this.tag('Image').setSmooth('scale', 1);
    }
}