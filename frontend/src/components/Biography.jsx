import React from 'react'

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Welcome to our Hospital Management System, a modern healthcare platform
            designed to simplify hospital operations and enhance patient care. Our
            system connects patients, doctors, and administrators through a secure and
            user-friendly interface, making healthcare services more efficient and
            accessible.
          </p>

          <p>
            We provide features such as online appointment booking, patient record
            management, doctor scheduling, prescription tracking, and secure medical
            data management. These tools help reduce paperwork, improve communication,
            and ensure a smooth healthcare experience for everyone.
          </p>

          <p>
            Our mission is to deliver reliable, technology-driven healthcare solutions
            that support hospitals in providing quality medical services while ensuring
            patient safety, privacy, and satisfaction.
          </p>

          <p>
            Developed using the MERN Stack (MongoDB, Express.js, React, and Node.js),
            this project demonstrates how modern web technologies can be used to build
            scalable and efficient healthcare management systems.
          </p>

          <p>
            We are committed to continuous improvement, innovation, and making
            healthcare management smarter, faster, and more accessible for patients and
            healthcare professionals alike.
          </p>
        </div>
      </div>
    </>
  )
}

export default Biography