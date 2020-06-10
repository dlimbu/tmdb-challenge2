import {Lightning} from "wpe-lightning-sdk";
import Item from '../item/Item'

export default class List extends Lightning.Component {
    static _template() {
        return {
            Label: {
                y: -50,
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
        this._itemWidth = 210;
    }

    _handleLeft() {
        // @todo: update index and call setIndex
        this.setIndex(Math.max(--this._index, 0))
        this.tag('Label').setSmooth('y', 0, {duration: 0.5});
        this.signalItemFocus();
    }

    _handleRight() {
        // @todo: update index and call setIndex
        this.setIndex(Math.min(++this._index, this.items.length - 1))
        this.tag('Label').setSmooth('y', 0, {duration: 0.5});
        this.signalItemFocus();
    }

    signalItemFocus() {
        this.signal('onItemFocus', this.results[this._index]);
    }

    _focus() {
        this.tag('Label').setSmooth('y', 0, {duration: 0.5});
        this.label = this.results[this._index];
        this.signalItemFocus();
    }

    _unfocus() {
        
    }

    setIndex(index) {
        /**
         * @todo:
         * Implement working setIndex method
         * that stores index and position movie component to focus
         * on selected item
         */
         this._index = index;
         this.tag('Label').patch({
             y: -50,
             text: {
                 text: this.results[index].title,
             }
         });

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
                x: idx * this._itemWidth,
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
