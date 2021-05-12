export function getAppointmentsForDay(state, day) {
  let appointments = [];
  const filteredAppointments = state.days.filter(dayOfWeek => dayOfWeek.name === day);
  
  if (filteredAppointments.length > 0) {
    appointments = filteredAppointments[0].appointments.map(appointmentId => state.appointments[appointmentId]);
  }

  return appointments;
};