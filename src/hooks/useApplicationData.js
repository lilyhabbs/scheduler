import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    })
  }, []);

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
      setState({
        ...state,
        appointments,
        days
      });
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
      setState({
        ...state,
        appointments,
        days
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};