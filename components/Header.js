import React, {Component} from 'react'
import './Header.styl'
import logo from './logo.jpg'

class Header extends Component {
    render(){
        return(
            <div className="component-header">
                <img src={logo} alt="logo" className="logo"/>
                <h1 className="title">Music Player Build By React</h1>
            </div>
        )
    }
}
export default Header