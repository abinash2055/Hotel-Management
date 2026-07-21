import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Departments = () => {
  const scrollRef = useRef(null);

  const departments = [
    { name: "Pediatrics", imageUrl: "/departments/pedia.jpg" },
    { name: "Orthopedics", imageUrl: "/departments/ortho.jpg" },
    { name: "Cardiology", imageUrl: "/departments/cardio.jpg" },
    { name: "Neurology", imageUrl: "/departments/neuro.jpg" },
    { name: "Oncology", imageUrl: "/departments/onco.jpg" },
    { name: "Radiology", imageUrl: "/departments/radio.jpg" },
    { name: "Physical Therapy", imageUrl: "/departments/therapy.jpg" },
    { name: "Dermatology", imageUrl: "/departments/derma.jpg" },
    { name: "ENT", imageUrl: "/departments/ent.jpg" },
  ];

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="container departments">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Our Departments</h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <button className="scroll-btn" onClick={scrollLeft}>
              <FaChevronLeft />
            </button>

            <button className="scroll-btn" onClick={scrollRight}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="departments-scroll" ref={scrollRef}>
          {departments.map(({ name, imageUrl }) => (
            <div className="card" key={name}>
              <img src={imageUrl} alt={name} />
              <div className="depart-name">{name}</div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
      .departments-scroll {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 10px;
}

.departments-scroll::-webkit-scrollbar {
  display: none;
}

.card {
  min-width: 260px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

.depart-name {
  padding: 15px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}

.scroll-btn {
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  background: #1976d2;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;
}

.scroll-btn:hover {
  background: #1259a7;
}

/* ========================= */
/* Laptop (1024px - 1200px)  */
/* ========================= */

@media (max-width: 1200px) {
  .card {
    min-width: 240px;
  }

  .card img {
    height: 210px;
  }
}

/* ========================= */
/* Tablet (768px - 1023px)   */
/* ========================= */

@media (max-width: 1023px) {
  .departments-scroll {
    gap: 16px;
  }

  .card {
    min-width: 220px;
  }

  .card img {
    height: 190px;
  }

  .depart-name {
    font-size: 16px;
    padding: 12px;
  }

  .scroll-btn {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}

/* ========================= */
/* Mobile (up to 767px)      */
/* ========================= */

@media (max-width: 767px) {
  .departments-scroll {
    gap: 12px;
  }

  .card {
    min-width: 180px;
  }

  .card img {
    height: 160px;
  }

  .depart-name {
    font-size: 14px;
    padding: 10px;
  }

  .scroll-btn {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }

  h2 {
    font-size: 24px;
  }
}
      `}</style>
    </>
  );
};

export default Departments;