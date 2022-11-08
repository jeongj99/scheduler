import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [
      ...state.days
    ];

    days.find(day => day.appointments.includes(id)).spots--;

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        console.log(response.status, response.statusText);
        return setState(prev => ({ ...prev, appointments, days }));
      });
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [
      ...state.days
    ];

    days.find(day => day.appointments.includes(id)).spots++;

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        console.log(response.status, response.statusText);
        return setState(prev => ({ ...prev, appointments, days }));
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}