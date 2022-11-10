import React from "react";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData(); // Import the custom hook and destructure it

  const interviewers = getInterviewersForDay(state, state.day);

  // Creates an array of the Appointment components
  const dailyAppointments = getAppointmentsForDay(state, state.day).map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
