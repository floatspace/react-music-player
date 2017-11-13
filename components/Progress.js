import React, {Component} from 'react'
import './Progress.styl'

class Progress extends Component {
    constructor(props) {
        super(props);
        this.changeProgress = this.changeProgress.bind(this);
    }
    changeProgress(e) {
        let progressBarEl = this.refs.progressBar;
        let clientX = e.clientX;
        let progressStartLeft = progressBarEl.getBoundingClientRect().left;
        let progressWidth = progressBarEl.getBoundingClientRect().width;
        let calPercent = (clientX - progressStartLeft) / progressWidth;
        this.props.onChangeProgress(calPercent);
    }
    render() {
        let progress = this.props.progress;
        return(
            <div className="component-progress" onClick={this.changeProgress} ref="progressBar">
                <div className="progress" style={{ width: progress + '%', backgroundColor: this.props.bgColor || ''}}></div>
            </div>
        )
    }
}
export default Progress