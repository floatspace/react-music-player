import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, IndexRoute, Route, browserHistory} from 'react-router'
import Pubsub from 'pubsub-js'

import $ from 'jquery'
import jPlayer from 'jplayer'

import Header from './components/Header'
import MusicPlayer from './components/MusicPlayer'
import MusicList from './components/MusicList'
import musicInfo from './components/musicInfo'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {musicInfo: musicInfo, curMusicInfo: musicInfo[0] , playStatus: 'on'};
        this.playMusic = this.playMusic.bind(this);
        this.getIndex = this.getIndex.bind(this);
    }

    playMusic(fileName) {
        if(!!!fileName) return;
        $('#player').jPlayer('setMedia', {
            mp3: fileName
        }).jPlayer('play');
        this.setState({
            playStatus : 'on'
        })
    }

    getIndex(curItem) {
        return this.state.musicInfo.indexOf(curItem);
    }

    componentDidMount() {
        let fileName = this.state.curMusicInfo && this.state.curMusicInfo.file;
        let self = this;
        $('#player').jPlayer({
            ready: function() {
                self.playMusic(fileName);
            },
            supplied: 'mp3',
            wmode: 'window'
        });

        $('#player').bind($.jPlayer.event.ended,() => {
            let curIndex = this.getIndex(this.state.curMusicInfo);
            let len = this.state.musicInfo.length;
            let nextItem = this.state.musicInfo[(curIndex+1+len)%len];
            this.setState({
                curMusicInfo: nextItem
            }); 
            this.playMusic(nextItem.file);
        })

        var switchMusicEvent = Pubsub.subscribe('SWICH_MUSIC', (msg, args) => {
            let curIndex = this.getIndex(this.state.curMusicInfo);
            let len = this.state.musicInfo.length;
            let nextItem = null;
            if(args === 'next') {
                nextItem = this.state.musicInfo[(curIndex+1+len)%len];
            } else {
                nextItem = this.state.musicInfo[(curIndex-1+len)%len];
            }
            this.playMusic(nextItem.file);
            this.setState({
                curMusicInfo: nextItem
            }); 
        })

        var toggleMusicEvent = Pubsub.subscribe('TOGGLE_MUSIC', (msg, item) => {
            this.setState({
                curMusicInfo: item
            });
            let fileName = item.file;
            this.playMusic(fileName);
        })

        var removeOneEvent = Pubsub.subscribe('REMOVE_ONE' , (msg, item) => {
            console.log(`App监控到了来自MusicList组件的事件: ${msg}: ${item.id}`);            
            let inPlayIndex = this.getIndex(this.state.curMusicInfo);

            let newMusicInfo = this.state.musicInfo.filter((key) => {
                return key.id !== item.id;
            });
            if(newMusicInfo.length === 0) {
                $('#player').jPlayer('pause');
            }
            this.setState({
                musicInfo: newMusicInfo
            });

            if(this.state.curMusicInfo.id === item.id) {                
                let len = newMusicInfo.length;
                this.setState({
                    curMusicInfo: newMusicInfo[(inPlayIndex+len)%len]
                });
                this.playMusic(this.state.curMusicInfo && this.state.curMusicInfo.file);
            }
        })

        var playControlEvent = Pubsub.subscribe('PLAY_CONTROL', (msg) => {
            if(this.state.playStatus === 'on') {
                $('#player').jPlayer('pause');
                this.setState({
                    playStatus : 'off'
                })
            } else {
                $('#player').jPlayer('play');
                this.setState({
                    playStatus : 'on'
                })
            }
        })
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.ended);
        Pubsub.unsubscribe(switchMusicEvent);
        Pubsub.unsubscribe(toggleMusicEvent);
        Pubsub.unsubscribe(removeOneEvent);
        Pubsub.unsubscribe(playControlEvent);
    }

    render(){
        return(
            <div>
                <Header/>
                { React.cloneElement(this.props.children, this.state) }
            </div>
        )
    }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MusicPlayer} />
      <Route path="/list" component={MusicList} />
    </Route>
  </Router>
), document.getElementById('root'))