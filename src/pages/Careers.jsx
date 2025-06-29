// src/pages/Careers.jsx
import React from 'react';
import './Careers.css';

const Careers = () => {
  return (
    <div className="careers-simple">
      <h2>We're Hiring Drivers!</h2>
      <p>
        Mans Joke Trucking is looking for reliable and professional drivers to join our team.
        If you're interested, please send your resume to:
      </p>
      <p>
        <a href="mailto:careers@mjtruckdelivery.com?subject=Driver%20Application">
          info@mansjoketrucking.com
        </a>
      </p>
    </div>
  );
};

export default Careers;