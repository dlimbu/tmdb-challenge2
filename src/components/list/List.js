import {Lightning} from "wpe-lightning-sdk";
import Item from '../item/Item'

export default class List extends Lightning.Component {
    static _template() {
        return {
            Label: {
                text: {
                    text: '', 
                    fontFace: 'SourceSansPro-Bold',
                    fontSize: 80,
                }
            },
            Movies: {
                y: 220,
            }
        }
    }

    _init() {
        this._index = 0;
    }

    _handleLeft() {
        // @todo: update index and call setIndex
        this.setIndex(Math.max(--this._index, 0))
    }

    _handleRight() {
        // @todo: update index and call setIndex
        this.setIndex(Math.min(++this._index, this.items.length - 1))
    }

    _focus() {
        this.label = this.results[this._index];
    }

    setIndex(index) {
        /**
         * @todo:
         * Implement working setIndex method
         * that stores index and position movie component to focus
         * on selected item
         */
         this._index = index;
         this.label = this.results[index];
    }

    set label(v) {
        // @todo: update list title
        this.tag('Label').text.text = v.title;
    }

    set movies(v) {
        this.moviesList = this.tag('Movies');
        this.results = v.results;
        // we add an array of object with type: Item
        this.moviesList.children = this.results.map((asset, idx)=>{
            return {
                type: Item,
                item: asset,
                x: idx * 410,
            };
        });
    }

    get items() {
        return this.moviesList.children;
    }

    get activeItem() {
        // @todo: return selected item
        return this.moviesList.children[this._index];
    }

    _getFocused() {
        return this.activeItem;
        // @todo:
        // return activeItem
    }
}
