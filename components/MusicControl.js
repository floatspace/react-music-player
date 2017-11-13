import React, {Component} from 'react'
import Pubsub from 'pubsub-js'

import './MusicControl.styl'

class MusicControl extends Component {
    constructor(props){
        super(props);
    }

    switchMusicHandler(args) {
        Pubsub.publish('SWICH_MUSIC', args);
    }

    playControlHandler(args) {
        Pubsub.publish('PLAY_CONTROL', args); 
    }

    render() {
        return(
            <div className="music-control">
                <span className="iconfont icon-prev" onClick={this.switchMusicHandler.bind(this, 'prev')}></span>
                <span className={`iconfont ${this.props.status === 'on' ? 'icon-zanting' : 'icon-bofang'}`} onClick={this.playControlHandler.bind(this)}></span>
                <span className="iconfont icon-next" onClick={this.switchMusicHandler.bind(this, 'next')}></span>
            </div>
        )
    }
}

export default MusicControl