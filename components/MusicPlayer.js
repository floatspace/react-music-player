import React, {Component} from 'react'
import {Link} from 'react-router'
import Progress from './Progress'
import MusicControl from './MusicControl'
import $ from 'jquery'
import jPlayer from 'jplayer'
import './musicPlayer.styl'
import './icon.styl'

let duration = null;
class MusicPlayer extends Component {

    constructor(props) {
        super(props);
        this.state={progress: 0, volume: 0};
    }

    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                volume: e.jPlayer.options.volume * 100,
                progress: e.jPlayer.status.currentPercentAbsolute
            })
        })
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    progressChangeHandler(progress) {
        $('#player').jPlayer('play', duration * progress);
    }

    volumeChangeHandler(volume) {
        $('#player').jPlayer('volume', volume);
    }

    render() {
        return(
            <div>
                <div className="component-music-player">
                    <div className="music-list-link"><Link to="/list">播放列表>></Link></div>
                    <div className="music-info">
                        <p className="title">{this.props.curMusicInfo.title}</p>
                        <p className="artist">{this.props.curMusicInfo.artist}</p>
                        <div className="volume">
                            <span className="iconfont icon-yinliang"></span>
                            <span><Progress progress={this.state.volume} bgColor="#009a61" onChangeProgress={this.volumeChangeHandler}/></span>
                        </div>
                        <Progress progress={this.state.progress} onChangeProgress={this.progressChangeHandler}/>
                        <MusicControl status={this.props.playStatus}/>
                    </div>
                    <div className="music-cover">
                        <div className={`img-wrap ${this.props.playStatus === 'on' ? '' : 'pause'}`}>
                            <img src={this.props.curMusicInfo.cover} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MusicPlayer