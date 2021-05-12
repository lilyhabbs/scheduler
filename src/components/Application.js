import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DayList from 'components/DayList';
import Appointment from 'components/Appointment';

import 'components/Application.scss';

const appointments = [
  {
    id: 1,
    time: "11am",
    interview: {
      student: "Clark Kent",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 2,
    time: "12pm",
    interview: {
      student: "Arthur Curry",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "1pm",
  },
  {
    id: 4,
    time: "2pm",
    interview: {
      student: "Diana Prince",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 5,
    time: "3pm",
    interview: {
      student: "Bruce Wayne",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
];

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({...prev, days}));

  useEffect(() => {
    axios.get('/api/days').then(res => {
      setDays(res.data);
    });
  }, []);

  const appointmentList = appointments.map((appointment) => {
    return(
      <Appointment
        key={ appointment.id }
        {...appointment}
      />  
    )
  })

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
            days={ state.days }
            day={ state.day }
            setDay={ setDay } 
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { appointmentList }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
