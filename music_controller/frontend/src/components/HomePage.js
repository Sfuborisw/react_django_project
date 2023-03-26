import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Routes, 
    Link,
    Route,
    Redirect
} from 'react-router-dom'

import CreateRoomPage from './CreateRoomPage';
import RoomJoinPage from './RoomJoinPage';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path='/' element={<p> This is the Home Page</p>}></Route>
                    <Route path='/join' element={<RoomJoinPage/>}/>
                    <Route path='/create' element={<CreateRoomPage/>}/>
                </Routes>
            </Router>
        );
        // return <p>123</p>

    }
}