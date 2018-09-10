import React, { Component } from 'react';

class LogLevelPanelContent extends PanelContent {

  static LOG_LEVELS = ["ALL", "DEBUG", "ERROR", "FATAL", "INFO", "OFF", "TRACE", "WARN"];

  SelectAllbtnOnClick = () => {
    $(".cb_logLevel").each(function () {
      $(this).prop('checked', true);
    });
    checkedLogLevel = LOG_LEVELS;
    updateLogAreaWithFilter();
  }
  UnselectAllbtnOnClick = () => {
    $(".cb_logLevel").each(function () {
      $(this).prop('checked', false);
    });
    checkedLogLevel = [];
    updateLogAreaWithFilter();
  }

  createLogLevelCheckBox = (element) => {
    return(
      <span>
        <input type="checkbox" id="cb_${element}" class="cb_logLevel" value="${element}" checked />
        <label for="cb_${element}">${element}</label>
      </span>
    )
  }

  render() {
    return (
      <div className="LogLevelPanelContent">
        {LOG_LEVELS.forEach(element => createLogLevelCheckBox(element))}

        <button onClick={SelectAllbtnOnClick()}>Select All</button>
        <button onClick={UnselectAllbtnOnClick()}>Unselect All</button>
      </div>
    );
  }
}

export default LogLevelPanelContent;
