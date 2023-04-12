import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelpText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";


// import React, { Component } from "react";
// import { Button, Grid, Typography, TextField, FormHelpText, FormControl, Link, useNavigate, Radio, RadioGroup, FormControlLabel, styled } from "@material-ui/core";

const CreateRoomPage = (props) => {
  CreateRoomPage.defaultProps = {
    votesToSkip: props.votesToSkip ?? 2,
    guestCanPause: props.guestCanPause ?? true,
    update: props.update ?? false,
    roomCode: props.roomCode ?? null,
    updateCallBack: props.updateCallBack ?? (() => {}),
  };

  const [state, setState] = React.useState({
    guestCanPause: CreateRoomPage.defaultProps.guestCanPause,
    votesToSkip: CreateRoomPage.defaultProps.votesToSkip,
    roomCode: CreateRoomPage.defaultProps.roomCode,
    errorMsg: "",
    successMsg: "",
  });

  // useEffect(() => {
  //   console.log("guestCanPause changed:", state.guestCanPause);
  //   console.log("votesToSkip changed:", state.votesToSkip);
  //   console.log("roomCode changed:", state.roomCode);
  // }, [state.guestCanPause, state.votesToSkip, state.roomCode]);

  const handleVotesChange = (e) => {
    setState({
      ...state,
      votesToSkip: e.target.value,
    });
  };

  const handleGuestCanPauseChange = (e) => {
    setState({
      ...state,
      guestCanPause: e.target.value === "true",
    });
  };

  const navigate = useNavigate();

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: state.votesToSkip,
        guest_can_pause: state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data.code));
    console.log(state);
  };

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: state.votesToSkip,
        guest_can_pause: state.guestCanPause,
        code: state.roomCode,
      }),
    };
    console.log(JSON.stringify(requestOptions));
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        setState({
          ...state,
          successMsg: "Room update successfully",
        });
      } else {
        setState({
          ...state,
          errorMsg: "Error updating room",
        });
      }
      CreateRoomPage.defaultProps.updateCallBack();
    });
    console.log(state);
  };

  const renderCreateButton = () => (
    <Grid item xs={12} align="center">
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );

  const renderUpdateButton = () => (
    <Grid item xs={12} align="center">
      <Button
        color="primary"
        variant="contained"
        onClick={handleUpdateButtonPressed}
      >
        Update Room
      </Button>
    </Grid>
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={state.errorMsg != "" || state.successMsg != ""}>
          {state.successMsg != "" ? (
            <Alert
              severity="success"
              onClose={() => setState({ ...state, successMsg: "" })}
            >
              {state.successMsg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => setState({ ...state, errorMsg: "" })}
            >
              {state.errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {CreateRoomPage.defaultProps.update ? "Update Room" : "Create A Room"}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelpText style={{ textAlign: "center" }}>
            Guest Control of Playback State
          </FormHelpText>
          <RadioGroup
            row
            value={state.guestCanPause.toString()}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={CreateRoomPage.defaultProps.votesToSkip}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
          />
          <FormHelpText style={{ textAlign: "center" }}>
            Votes Required To Skip Song
          </FormHelpText>
        </FormControl>
      </Grid>
      {CreateRoomPage.defaultProps.update
        ? renderUpdateButton()
        : renderCreateButton()}
    </Grid>
  );
};

export default CreateRoomPage;
