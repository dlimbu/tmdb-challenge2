import {Lightning, Utils} from 'wpe-lightning-sdk';
import {List} from "../components"

export default class Main extends Lightning.Component{
    static _template() {
        return {
            scale: 0.5,
            Lists: {
                x: 100,
                y: 0.6*1080, 
                zIndex: 3
            },
            Logo: {
                src: Utils.asset('images/logo.png'),
                x: 100,
                y: 100,
                w: 600,
                h: 100,
            }
        };
    }

    _init() {
        this._index = 0; 
    }

    _focus() {
        console.log('Main._focus called')
        
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