export function getAppointmentsForDay(state, day) {

  const result = [];

  const selectedDay = (state.days).filter(stateDay => stateDay.name === day);

  if (state.days.length === 0 || selectedDay.length === 0) {
    return [];
  }

  for (const appointment of selectedDay[0].appointments) {
    if (state.appointments[appointment]) {
      result.push(state.appointments[appointment]);
    }
  }
  return result;
}

export function getInterview(state, interview) {

}