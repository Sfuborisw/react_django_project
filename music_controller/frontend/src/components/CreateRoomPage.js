import React, { Component } from "react";
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
import { styled } from "@material-ui/core";

// const navigate = useNavigate();
// export default class CreateRoomPage extends Component {
//   defaultVotes = 2;
//   constructor(props) {
//     super(props);
//     this.state = {
//       guestCanPause: true,
//       votesToSkip: this.defaultVotes,
//     };

//     //binding this message to the class, otherwise cannot use this in functions
//     this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
//     this.handleVotesChange = this.handleVotesChange.bind(this);
//     this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
//   }

//   //e = obj that call this function
//   handleVotesChange(e) {
//     this.setState({
//       votesToSkip: e.target.value,
//     });
//   }

//   handleGuestCanPauseChange(e) {
//     this.setState({
//       guestCanPause: e.target.value === "true" ? true : false,
//     });
//   }

//   handleRoomButtonPressed() {
//     //send request to back-end
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         votes_to_skip: this.state.votesToSkip,
//         guest_can_pause: this.state.guestCanPause,
//       }),
//     };
//     fetch("api/create-room", requestOptions)
//       .then((response) => response.json())
//       .then((data) => this.props.history.push("/room/" + data.code));
//       // .then((data) => navigate("/room/" + data.code));
//     console.log(this.state);
//   }

//   render() {
//     return (
//       <Grid container spacing={1}>
//         <Grid item xs={12} align="center">
//           <Typography component="h4" variant="h4">
//             Create A Room
//           </Typography>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <FormControl component="fieldset">
//             <FormHelpText>
//               <div align="center">Guest Control of Playback State</div>
//             </FormHelpText>
//             <RadioGroup
//               row
//               defaultValue="true"
//               onChange={this.handleGuestCanPauseChange}
//             >
//               <FormControlLabel
//                 value="true"
//                 control={<Radio color="primary" />}
//                 label="Play/Pause"
//                 labelPlacement="bottom"
//               />
//               <FormControlLabel
//                 value="false"
//                 control={<Radio color="secondary" />}
//                 label="No Control"
//                 labelPlacement="bottom"
//               />
//             </RadioGroup>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <FormControl>
//             <TextField
//               required="true"
//               type="number"
//               onChange={this.handleVotesChange}
//               defaultValue={this.defaultVotes}
//               inputProps={{ min: 1, style: { textAlign: "center" } }}
//             />
//             <FormHelpText>
//               <div align="center">Votes Required To Skip Song</div>
//             </FormHelpText>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button
//             color="primary"
//             variant="contained"
//             onClick={this.handleRoomButtonPressed}
//           >
//             Create A Room
//           </Button>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button color="secondary" variant="contained" to="/" component={Link}>
//             Back
//           </Button>
//         </Grid>
//       </Grid>
//     );
//   }
// }

const CreateRoomPage = () => {
  const defaultVotes = 2;
  const [state, setState] = React.useState({
    guestCanPause: true,
    votesToSkip: defaultVotes,
  });

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
  fetch("api/create-room", requestOptions)
    .then((response) => response.json())
    .then((data) => navigate("/room/" + data.code));
  console.log(state)
};

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelpText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelpText>
          <RadioGroup
            row
            defaultValue="true"
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
            required="true"
            type="number"
            onChange={handleVotesChange}
            defaultValue={defaultVotes}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
          />
          <FormHelpText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelpText>
        </FormControl>
      </Grid>
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
};

export default CreateRoomPage;
