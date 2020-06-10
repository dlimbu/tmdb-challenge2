import {Lightning, Utils} from "wpe-lightning-sdk";

import { getImgUrl } from '../../lib/tools'
export default class Level extends Lightning.Component{
    static _template(){
        return {
            Image: { },
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
        this.patch({
            Image: {
                src: getImgUrl(poster_path),
                alpha: 0.0001,
            },
            Titel: {
                text: {
                    text: title,
                },
                alpha: 0,
            }
        })

        this.tag('Image').on('txLoaded', ()=> {
            this.tag('Image').setSmooth('alpha', 1);
        });
        // @todo: patch the correct image and title
    }

    _focus() {
        this.tag('Image').setSmooth('scale', 1.2);
    }

    _unfocus() {
        this.tag('Image').setSmooth('scale', 1);
    }
}