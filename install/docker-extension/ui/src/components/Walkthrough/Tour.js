import React, { useReducer } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { IconDiv } from "./tourStyledComponents";
import { IconButton, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
const TOUR_STEPS = [
  {
    target: ".first-step",
    title: "Choose the Service Mesh that you would like to deploy",
    placement: "right-start",
    content: <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</i>,
    disableBeacon: true,
  },
  {
    target: ".second-step",
    title:"Import your docker compose apps",
    content:
    <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</i>,
  },
  {
    target: ".third-step",
    title:"Open Meshery",
    placement: "top",
    content: <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</i>
  },
];
const INITIAL_STATE = {
    key: new Date(),
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: TOUR_STEPS,
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "START":
        return { ...state, run: true };
      case "RESET":
        return { ...state, stepIndex: 0 };
      case "STOP":
        return { ...state, run: false };
      case "NEXT_OR_PREV":
        return { ...state, ...action.payload };
      case "RESTART":
        return {
          ...state,
          stepIndex: 0,
          run: true,
          loading: false,
          key: new Date(),
        };
      default:
        return state;
    }
  };

const Tour = () => {
const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);
    
      const callback = (data) => {
        const { action, index, type, status } = data;
    
        if (
          action === ACTIONS.CLOSE ||
          (status === STATUS.SKIPPED && tourState.run) ||
          status === STATUS.FINISHED
        ) {
          dispatch({ type: "STOP" });
        } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
          dispatch({
            type: "NEXT_OR_PREV",
            payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
          });
        }
      };
    
      const startTour = () => {
        dispatch({ type: "RESTART" });
      };

  return (
    <>
    <IconDiv>
      <Tooltip title="Take a Walkthrough">
      <IconButton onClick={startTour} size="large">
        <HelpIcon fontSize="inherit" />
      </IconButton>
      </Tooltip>
      </IconDiv>
    
      <JoyRide
      {...tourState}
      callback={callback}
        steps={TOUR_STEPS}
        continuous={true}
        hideCloseButton={true}
        showSkipButton={true}
        styles={{
          tooltipContainer: {
            textAlign: "left"
          },
          buttonNext: {
            backgroundColor: "#2496ED",
            borderColor:"none",
            fontSize: "15px",
            padding:"10px"
          },
          buttonBack: {
            marginRight: 10,
            color:"#677285"
          }
        }}
        locale={{
          last: "End tour",
          skip: "Close tour"
        }}
      />
    </>
  );
};

export default Tour;