import React, { Component } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  ButtonGroup,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";

import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Room from "./Room";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };

    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ roomCode: data.code });
      });
  }

  renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  clearRoomCode(){
    this.setState({
      roomCode: null,
    })
  }

  render() {
    return (
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<p> This is the Home Page</p>}></Route> */}
          {/* <Route exact path="/" element={<React.Fragment>{this.renderHomePage()}</React.Fragment>} /> */}
          <Route
            exact
            path="/"
            element={
              this.state.roomCode ? (
                <Navigate to={`/room/${this.state.roomCode}`} />
              ) : (
                <React.Fragment>{this.renderHomePage()}</React.Fragment>
              )
            }
          />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          {/* <Route path="/room/:roomCode" render={(props) => {
            return <Room {...props} leaveRoomCallBack={this.clearRoomCode}/>
          }} /> */}
          <Route path="/room/:roomCode" element={<Room leaveRoomCallBack={this.clearRoomCode} />} />

        </Routes>
      </Router>
    );
    // return <p>123</p>
  }
}
