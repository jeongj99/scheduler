import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // Custom hook imported
  // If interview is not null, set mode to SHOW; otherwise EMPTY
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  // Function used when the save button is clicked 
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING); // Transitions to the save component, displaying a loading icon and a saving message

    bookInterview(id, interview) // Does the axios request and changes the state to display it
      .then(() => {
        transition(SHOW); // Mode is set to SHOW to display the Show component
      })
      .catch(() => {
        transition(ERROR_SAVE, true); // When there is an error, the Error component is rendered
      });
  };

  // Function used when the save button is clicked 
  const deleting = () => {
    transition(DELETING, true); // Transitions to the deleting component, displaying a loading icon and a deleting message

    cancelInterview(id) // Does the axios request and changes the state to display it
      .then(() => {
        transition(EMPTY); // Mode is set to EMPTY to display the Empty component
      })
      .catch(() => {
        transition(ERROR_DELETE, true); // When there is an error, the Error component is rendered
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={back} onSave={save} />}
      {mode === EDIT && <Form student={interview.student} interviewer={interview.interviewer.id} interviewers={interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onCancel={back} onConfirm={deleting} />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not cancel appointment." onClose={back} />}
    </article>
  );
}