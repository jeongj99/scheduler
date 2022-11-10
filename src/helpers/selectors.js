// Returns the appointments for that day in an array
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

// Returns the interviewers for that day in an array
export function getInterviewersForDay(state, day) {

  const result = [];

  const selectedDay = (state.days).filter(stateDay => stateDay.name === day);

  if (state.days.length === 0 || selectedDay.length === 0) {
    return [];
  }

  for (const interviewer of selectedDay[0].interviewers) {
    if (state.interviewers[interviewer]) {
      result.push(state.interviewers[interviewer]);
    }
  }
  return result;
}

// Returns an object containing the interview passed with the student and interview; unless interview is null, then return null
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewers = { ...state.interviewers };
  const resultInterview = { ...interview };
  resultInterview.interviewer = interviewers[resultInterview.interviewer];
  return resultInterview;
}