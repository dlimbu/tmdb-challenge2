import {Lightning} from "wpe-lightning-sdk";
import Item from '../item/Item'

export default class List extends Lightning.Component {
    static _template() {
        return {
            Label: {
                y: -100,
                text: {
                    text: '', 
                    fontFace: 'SourceSansPro-Bold',
                    fontSize: 50,
                    wordWrap: false,
                    wordWrapWidth: 1500,
                    textOverflow: 'ellipsis'
                }
            },
            Movies: {
                y: 110,
            }
        }
    }

    _init() {
        this._index = 0;
    }

    _handleLeft() {
        // @todo: update index and call setIndex
        this.setIndex(Math.max(--this._index, 0))
        let asset = this.results[this._index];
        this.tag('Label').setSmooth('y', 0, {duration: 0.5});
        this.signal('onItemFocus', asset);
    }

    _handleRight() {
        // @todo: update index and call setIndex
        this.setIndex(Math.min(++this._index, this.items.length - 1))
        let asset = this.results[this._index];
        this.tag('Label').setSmooth('y', 0, {duration: 0.5});
        this.signal('onItemFocus',asset);
    }

    _focus() {
        this.tag('Label').setSmooth('y', 0, {duration: 0.5});
        this.label = this.results[this._index];
        let asset = this.results[this._index];
        this.signal('onItemFocus',asset);
    }

    setIndex(index) {
        /**
         * @todo:
         * Implement working setIndex method
         * that stores index and position movie component to focus
         * on selected item
         */
         this._index = index;
         this.tag('Label').y = -300;
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
                x: idx * 200,
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
