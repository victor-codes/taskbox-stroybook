import React from "react";
import Task from "./Task";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { archiveTask, pinTask } from "../lib/redux";

export function PureTaskList({ loading, tasks, onPinTask, onArchivedTask }) {
  const events = {
    onPinTask,
    onArchivedTask,
  };

  const loadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span>
        <span>cool</span>
        <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items">
        {loadingRow}
        {loadingRow}
        {loadingRow}
        {loadingRow}
        {loadingRow}
        {loadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }
  const taskInOrder = [
    ...tasks.filter((task) => task.state === "TASK_PINNED"),
    ...tasks.filter((task) => task.state !== "TASK_PINNED"),
  ];

  return (
    <div className="list-items">
      {taskInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}

PureTaskList.defaultProps = {
  loading: false,
};

PureTaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onPinTask: PropTypes.func,
  onArchivedTask: PropTypes.func,
};

export default connect(
  ({ tasks }) => ({
    tasks: tasks.filter(
      (t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    ),
  }),
  (dispatch) => ({
    onArchivedTask: (id) => dispatch(archiveTask(id)),
    onPinnedTask: (id) => dispatch(pinTask(id)),
  })
)(PureTaskList);
