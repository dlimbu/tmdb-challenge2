import {Lightning, Utils} from 'wpe-lightning-sdk';
import {List} from "../components"
import { getImgUrl } from '../lib/tools';

export default class Main extends Lightning.Component{
    static _template() {
        return {
            Lists: {
                x: 100,
                y: 0.50*1080, 
                zIndex: 3,
            },
            Logo: {
                src: Utils.asset('images/logo.png'),
                x: 100,
                y: 100,
                alpha: 0.00001,
                zIndex: 2,
            },
            Background: {
                w: 1920,
                h: 1080,
                color: 0xff000000,
                alpha: 0.3,
                zIndex: 1,
                BgImage: {
                    w: 1920,
                    h: 1080,
                    scale: 1.1,  
                    pivot: 0.5,  
                }
            }
        };
    }

    _init() {
        this._index = 0; 
    }

    _build() {
        this.tag('Logo').on('txLoaded', () => {
            this.tag('Logo').alpha = 1;
        });
    }

    _focus() {
        console.log('Main._focus called')
    }

    onItemFocus(asset) {
        let url = getImgUrl(asset.backdrop_path, 500);
        this.tag('BgImage').patch({
            src: url,
            smooth: {
                scale: [
                    1, { duration: 1, }
                ]
            }
        })
    }

    /**
     * @todo: add set movies() that will be called by the data-provider
     * inside set movies create new List child and call it's movies setter
     * and hand over the movies
     */

    set movies(movieData) {
        this.moviesList = new List(this.stage);
        this.tag('Lists').add(this.moviesList);
        this.moviesList.movies = movieData;
        this.moviesList.signals = { onItemFocus: true };
    }

    _unfocus() {
        // @todo
        console.log('Main._unfocus called')
    }

    _getFocused() {
        return this.moviesList;
        // @todo: delegate focus to List child
    }

}