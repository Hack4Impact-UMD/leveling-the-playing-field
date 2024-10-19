import React from 'react';

const AppointmentsComponent = ({ appointment }) => {
  const { title, location, timeStart, timeEnd } = appointment;
  return (
    <>
    <div id="titel">{title}</div>
    <div id="add">{location}</div>
    <div id="timings">{timeStart}-{timeEnd}</div>
    </>
  );
};

export default AppointmentsComponent;
