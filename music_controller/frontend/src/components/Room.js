import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  TextField,
  ButtonGroup,
} from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";

const Room = (props) => {
  const { roomCode } = useParams();
  const [state, setState] = React.useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    showSettings: false,
    spotifyAuthenticated: false,
  });

  const navigate = useNavigate();

  const getRoomDetails = () => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          props.leaveRoomCallBack();
          navigate("/");
        }
        return response.json();
      })
      .then((data) => {
        setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
        if (state.isHost) {
          console.log("isHost");
          authenticatespotify();
        }
      });
  };

  const authenticatespotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setState({
          ...state,
          spotifyAuthenticated: data.state,
        });
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };

  const leaveButtonPress = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((response) => {
      props.leaveRoomCallBack();
      navigate("/");
    });
  };

  const updateShowSettings = (value) => {
    setState({
      ...state,
      showSettings: value,
    });
  };

  const renderShowSettingsButton = () => (
    <Grid item xs={12} align="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => updateShowSettings(true)}
      >
        Settings
      </Button>
    </Grid>
  );

  const renderSetting = () => (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <CreateRoomPage
          update={true}
          votesToSkip={state.votesToSkip}
          guestCanPause={state.guestCanPause}
          roomCode={roomCode}
          updateCallBack={getRoomDetails}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => updateShowSettings(false)}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );

  useEffect(() => {
    getRoomDetails();
  }, [roomCode]);

  return state.showSettings ? (
    renderSetting()
  ) : (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h6" variant="h6">
          Votes: {state.votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h6" variant="h6">
          Guest Can Pause: {state.guestCanPause ? "True" : "False"}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h6" variant="h6">
          Host: {state.isHost ? "True" : "False"}
        </Typography>
      </Grid>
      {state.isHost ? renderShowSettingsButton() : null}
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPress}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;

// {
/* <div>
<h3>{roomCode}</h3>
<p>Votes: {state.votesToSkip}</p>
<p>Guest Can Pause: {state.guestCanPause ? "True" : "False"}</p>
<p>Host: {state.isHost ? "True" : "False"}</p>
</div> */
// }
// export default class Room extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       votesToSkip: 2,
//       guestCanPause: false,
//       isHost: false,
//     };
//     this.roomCode = this.props.match.params;
//   }

//   render() {
//     return (
//       <div>
//         <h3>{this.roomCode}</h3>
//         <p>Votes: {this.state.votesToSkip}</p>
//         <p>Guest Can Pause: {this.state.guestCanPause ? "Yes" : "No"}</p>
//         <p>Host: {this.state.isHost ? "Yes" : "No"}</p>
//       </div>
//     );
//   }
// }
