import React from 'react';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import useVisualMode from 'hooks/useVisualMode';

import 'components/Appointment/styles.scss';

export default function Appointment(props){
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const DELETING = 'DELETING';
  const EDIT = 'EDIT';

  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(()=> {
      transition(SHOW);
    });
  }
  
  function deleteAppointment() {
    transition(DELETING);

    props.cancelInterview(props.id)
    .then(()=> {
      transition(EMPTY);
    });
  }

  return (
    <article className="appointment">
      <Header time={ props.time } />
      {mode === EMPTY && <Empty onAdd={ () => transition(CREATE) } />}
      {mode === SHOW && (
        <Show
          student={ props.interview.student }
          interviewer={ props.interview.interviewer }
          onEdit={ () => transition(EDIT) }
          onDelete={ () => transition(CONFIRM) }
        />
      )}
      {mode === CREATE && <Form
        interviewers={ props.interviewers }
        onCancel={ () => back() }
        onSave={ save }
      />}
      {mode === SAVING && <Status message={ "Saving" } />}
      {mode === CONFIRM && <Confirm
        message={ "Delete the appointment?" }
        onCancel={ () => back() }
        onConfirm={ deleteAppointment }
      />}
      {mode === DELETING && <Status message={ "Deleting" } />}
      {mode === EDIT && <Form
        name={ props.interview.student }
        interviewer={ props.interview.interviewer.id }
        interviewers={ props.interviewers }
        onCancel={ () => back() }
        onSave={ save }
      />}
    </article>
  );
}