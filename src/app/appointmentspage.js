//  this relies on the appointments component
import React from 'react';


const appp = () => {
    // Sort appointments by date
    const appointmentsDatessorted = appointments.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    return (
      <div>
        <div id="positionimg">
          {/* <img src={appointmentImage} alt="Appointments"/> */}
        </div>
        <h2 className="appointments-text">Appointments</h2>
        {/* Loop thru sorted appointments and display them with the component */}
        {appointmentsDatessorted.map((appointment, x) => (
            <appointmentcomponents
            key={x}
            appointment={appointment}
        />
        ))}
      </div>
    );
  };
  
export default appp;