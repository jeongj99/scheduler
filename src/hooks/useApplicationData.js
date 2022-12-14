import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // On page load, it does all those GET requests to those paths and set the states with the data obtained from those GET Requests
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  // Function setDay that changes the day property in state
  const setDay = day => setState({ ...state, day });

  // Function updateSpots allows the number to decrease or increase when one books an appointment or cancels
  const updateSpots = (state, id, appointments) => {
    const updatedDays = [...state.days];

    const day = updatedDays.find(day => day.appointments.includes(id));

    const spots = day.appointments.reduce((spots, id) => {
      if (!appointments[id].interview) {
        spots++;
      }
      return spots;
    }, 0);

    day.spots = spots;

    return updatedDays;
  };

// Function that is used when one clicks on the save button; it does axios PUT request, and then changes the state using setState
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        console.log(response.status, response.statusText);

        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = updateSpots(state, id, appointments);

        setState(prev => ({ ...prev, appointments, days }));
      });
  };

// Function that is used when one clicks on the delete button; it does axios DELETE request, and then changes the state using setState
  const cancelInterview = id => {
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        console.log(response.status, response.statusText);

        const appointment = {
          ...state.appointments[id],
          interview: null
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = updateSpots(state, id, appointments);

        setState(prev => ({ ...prev, appointments, days }));
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}