import React, {Component} from 'react'
import {Link} from 'react-router'
import Pubsub from 'pubsub-js'

import './MusicList.styl'

class MusicList extends Component {
    constructor(props){
        super(props);
    }

    toggleMusicHandler(item) {
        Pubsub.publish('TOGGLE_MUSIC', item);
    }

    itemRemoveHandler(item, e) {
        e.stopPropagation();
        Pubsub.publish('REMOVE_ONE', item);
    }


    render() {    
        let listItems = this.props.musicInfo.map((item) => {
            let active = this.props.curMusicInfo.id === item.id ? 'active' : '';
            return (
                <li key={item.id} onDoubleClick={this.toggleMusicHandler.bind(this, item)} className={`music-list-item ${active}`}>
                    <span className="title">{item.title}</span>
                    <span className="artist">{item.artist}</span>
                    <span className="iconfont icon-icon_delete" onClick={this.itemRemoveHandler.bind(this, item)}></span>
                </li>
            )
        })    
        return (
            <div className="component-list">
                <ul className="music-list">{listItems}</ul>
                <p className="back"><Link to="/">返回>></Link></p>
            </div>
        )
    }
}
export default MusicList;