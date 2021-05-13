export function getAppointmentsForDay(state, day) {
  let appointments = [];

  const filteredAppointments = state.days.filter(dayOfWeek => dayOfWeek.name === day);
  
  if (filteredAppointments.length > 0) {
    appointments = filteredAppointments[0].appointments.map(appointmentId => state.appointments[appointmentId]);
  }

  return appointments;
};

export function getInterviewersForDay(state, day) {
  let interviewers = [];

  const filteredAppointments = state.days.filter(dayOfWeek => dayOfWeek.name === day);
  
  if (filteredAppointments.length > 0) {
    interviewers = filteredAppointments[0].interviewers.map(interviewerId => state.interviewers[interviewerId]);
  }

  return interviewers;
};

export function getInterview(state, interview) {  
  if (!interview) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
};