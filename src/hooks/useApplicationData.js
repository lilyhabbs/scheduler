import { useEffect, useReducer } from 'react';
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from 'reducers/application';

export default function useApplicationData() {  
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
    });
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, day });

  const getSpots = (dayObj, appointments) => {
    const nullAppointments = dayObj.appointments.filter(id => appointments[id].interview === null);
    return nullAppointments.length;
  };
  
  const updateSpots = (dayName, days, appointments) => {
    const dayObj = days.find(day => day.name === dayName);
    
    const spots = getSpots(dayObj, appointments);
  
    const newDay = {
      ...dayObj,
      spots
    };
  
    return days.map(day => day.name === dayName ? newDay : day);
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state.day, state.days, appointments);
    
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, appointments, days });
    });
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state.day, state.days, appointments);

    return axios.delete(`/api/appointments/${id}`)
    .then(() => { 
      dispatch({ type: SET_INTERVIEW, appointments, days });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};