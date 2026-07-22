import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";


const Dashboard = () => {
  const { user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [view, setView] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 480) setView("mobile");
      else if (w <= 1024) setView("tablet");
      else setView("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
        console.log("Some Error occured while Fetching Appointments", error)
      }
    };
    fetchAppointments();
  }, [])

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        setDoctors([]);
        console.log("Some Error occured while Fetching Doctors", error)
      }
    };
    fetchDoctors();
  }, [])

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(`http://localhost:4000/api/v1/appointment/update/${appointmentId}`, { status }, { withCredentials: true });

      setAppointments((prevAppointments) => prevAppointments.map((appointment) => appointment._id === appointmentId ? { ...appointment, status } : appointment))

      toast.success(data.message);

    } catch (error) {
      toast.error(error?.response?.data?.message || "Some Error Occured");
    }
  }


  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />

            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
              </div>
              <p>Welcome to the Admin Dashboard. Manage doctors, administrators, patient messages, and other hospital operations from one central place. Use the navigation menu to add new doctors or admins, view registered doctors, review patient inquiries, and efficiently oversee the healthcare management system.</p>
            </div>
          </div>

          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>

          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{doctors.length}</h3>
          </div>
        </div>

        <div style={{
          background: "#fff",
          borderRadius: 20,
          padding: view === "mobile" ? 16 : view === "tablet" ? 24 : 40,
          display: "flex",
          flexDirection: "column",
          gap: view === "mobile" ? 12 : 20,
          minHeight: "50vh"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12
          }}>
            <h5 style={{
              fontSize: view === "mobile" ? 18 : view === "tablet" ? 22 : 24,
              letterSpacing: 1,
              color: "#111",
              margin: 0
            }}>Appointments</h5>
          </div>

          <div style={{
            overflowX: "auto",
            overflowY: "auto",
            flex: 1,
            maxHeight: view === "mobile" ? "35vh" : view === "tablet" ? "45vh" : "55vh",
            borderRadius: 8,
            WebkitOverflowScrolling: "touch"
          }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: view === "mobile" ? 480 : view === "tablet" ? 550 : 650,
              color: "#111",
              fontSize: view === "mobile" ? 12 : view === "tablet" ? 14 : 16
            }}>
              <thead>
                <tr>
                  {["Patient", "Date", "Doctor", "Department", "Status", "Visited"].map((h, i) => (
                    <th key={i} style={{
                      padding: view === "mobile" ? "8px 6px" : "12px 8px",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                      background: "#f5f5f5",
                      position: "sticky",
                      top: 0,
                      fontWeight: 600
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {appointments && appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment._id} style={{ borderBottom: "1px solid #e5e5e5" }}>
                      <td style={{
                        padding: view === "mobile" ? "8px 6px" : "12px 8px",
                        whiteSpace: "nowrap"
                      }}>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td style={{
                        padding: view === "mobile" ? "8px 6px" : "12px 8px",
                        whiteSpace: "nowrap"
                      }}>{(appointment.appointment_date || "").substring(0, 16)}</td>
                      <td style={{
                        padding: view === "mobile" ? "8px 6px" : "12px 8px",
                        whiteSpace: "nowrap"
                      }}>{`${appointment.doctor?.firstName || ""} ${appointment.doctor?.lastName || ""}`}</td>
                      <td style={{
                        padding: view === "mobile" ? "8px 6px" : "12px 8px",
                        whiteSpace: "nowrap"
                      }}>{appointment.department}</td>

                      <td style={{
                        padding: view === "mobile" ? "8px 6px" : "12px 8px",
                        whiteSpace: "nowrap",
                        minWidth: 120
                      }}>
                        <select className={`value-${appointment.status === "Pending" ? "pending" : appointment.status === "Accepted" ? "accepted" : "rejected"}`} value={appointment.status || "Pending"} onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)} style={{ fontSize: view === "mobile" ? 12 : view === "tablet" ? 13 : 16, fontWeight: 600, border: "none", width: "100%", background: "transparent", color: "inherit" }}>

                          <option value="Pending" className="value-pending">Pending</option>
                          <option value="Accepted" className="value-accepted">Accepted</option>
                          <option value="Rejected" className="value-rejected">Rejected</option>
                        </select>
                      </td>

                      <td style={{
                        padding: view === "mobile" ? "8px 6px" : "12px 8px",
                        whiteSpace: "nowrap",
                        textAlign: "center"
                      }}>
                        {appointment.hasVisited === true ? <GoCheckCircleFill className="green" style={{ fontSize: view === "mobile" ? 14 : view === "tablet" ? 18 : 22, color: "#16a34a" }} /> : <AiFillCloseCircle className="red" style={{ fontSize: view === "mobile" ? 14 : view === "tablet" ? 18 : 22, color: "#dc2626" }} />}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6" style={{ textAlign: "center", padding: 30, color: "gray", fontSize: 16 }}>No Appointments....</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard