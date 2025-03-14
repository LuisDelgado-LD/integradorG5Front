// import { useLocation } from "react-router-dom";
// import React, { useState, forwardRef  } from "react";
// import DatePicker, {registerLocale} from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import es from "date-fns/locale/es"; // Importa el locale español
// import AutocompleteSearch from "../Components/AutoCompleteSearch"; 


// const Navbar = () => {
//   registerLocale("es", es);
//   const location = useLocation();
//   if (location.pathname !== "/") return null;

//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(null);

//   const onChangeStart = (date) => {
//     // const [start, end] = dates;
//     setStartDate(date);
//     setEndDate(null);
//   };
//   const onChangeEnd = (dates) => {
//     const [start, end] = dates;
//     // setStartDate(start);
//     setEndDate(end);
//   };

//   return (
//     <nav className="navbar">
//       <p className="navbar-text">Escoge la Fecha para tu peludito</p>

//       <div className="date-picker-container">
//         <div className="date-picker">
//           <label className="date-label">Fecha de ingreso</label>
//           <div className="calendar-box">
//           <img src="/img/Calendario.png" alt="Calendario ingreso" className="calendar-icon" />
//             {/* <DatePicker
//               dateFormat="dd/MM/yyyy"
//               //excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
//               minDate={new Date()}
//               locale={es}
//               selected={startDate}
//               onChange={onChangeStart}
//               Date={startDate}
//               startDate={startDate}
//               endDate={endDate}
//               selectsRange
//             /> */}
//             <DatePicker 
//               withPortal
//               minDate={new Date()}
//               dateFormat="dd/MM/yyyy"
//               selected={startDate} 
//               locale={es}
//               onChange={onChangeStart}
//               />
//           </div>
//         </div>
//         <div className="date-picker">
//           <label className="date-label">Fecha salida</label>
//           <div className="calendar-box">
//           <img src="/img/Calendario.png" alt="Calendario ingreso" className="calendar-icon" />
//             <DatePicker
//               withPortal
//               dateFormat="dd/MM/yyyy"
//               locale={es}
//               minDate={startDate}
//               selected={endDate}
//               onChange={onChangeEnd}
//               startDate={startDate}
//               endDate={endDate}
//               selectsRange
//             />
//           </div>
//         </div>
//       </div>

//       <AutocompleteSearch onSelect={setSelectedBreed} />
//     </nav>
//   );
// };

// export default Navbar;


import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import AutocompleteSearch from "../Components/AutoCompleteSearch"; 

const Navbar = () => {
  registerLocale("es", es);
  const location = useLocation();
  if (location.pathname !== "/") return null;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);

  return (
    <nav className="navbar">
      <p className="navbar-text">Escoge la Fecha para tu peludito</p>

      <div className="date-picker-container">
        <div className="date-picker">
          <label className="date-label">Fecha de ingreso</label>
          <div className="calendar-box">
            <img src="/img/Calendario.png" alt="Calendario ingreso" className="calendar-icon" />
            <DatePicker 
              withPortal
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              selected={startDate} 
              locale={es}
              onChange={setStartDate}
            />
          </div>
        </div>

        <div className="date-picker">
          <label className="date-label">Fecha salida</label>
          <div className="calendar-box">
            <img src="/img/Calendario.png" alt="Calendario salida" className="calendar-icon" />
            <DatePicker
              withPortal
              dateFormat="dd/MM/yyyy"
              locale={es}
              minDate={startDate}
              selected={endDate}
              onChange={setEndDate}
            />
          </div>
        </div>
      </div>

      <AutocompleteSearch onSelect={setSelectedBreed} />
    </nav>
  );
};

export default Navbar;