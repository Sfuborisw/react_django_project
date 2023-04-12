import { Button, Grid, TextField } from "@material-ui/core";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Room from "./Room";
import { Link, useNavigate } from "react-router-dom";

const RoomJoinPage = () => {
  const [state, setState] = React.useState({
    roomCode: "",
    error: "",
  });

  const handleTextChange = (e) => {
    setState({
      ...state,
      roomCode: e.target.value,
    });
  };

  const navigate = useNavigate();

  const roomButtonPressed = () => {
    console.log(state.roomCode);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: state.roomCode,
      }),
    };
    console.log(JSON.stringify(requestOptions))
    fetch("/api/join-room", requestOptions).then((response) => {
      if (response.ok) {
        navigate(`/room/${state.roomCode}`)
      } else {
        setState({
            ...state,
            error: "Room Not Found",
        })
      }
    }).catch((error) => {
        console.log(error)
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Join A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={state.error ? true : false}
          label="Code"
          placeholder="Enter a Room Code"
          value={state.roomCode}
          helperText={state.error}
          variant="outlined"
          onChange={handleTextChange}
        />
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;

// export default class RoomJoinPage extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return <p>This is RoomJoinPage</p>;
//     }
// }
