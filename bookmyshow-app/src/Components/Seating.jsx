import { useEffect, useState } from "react";
import "./Seating.css";
import { rows, rows2 } from "./data";
import { useSelector } from "react-redux";

const Silver = ["A", "B", "C", "D"];
const ticketList = {
  silver: [],
  platinium: [],
  price: 0,
};

const Seating = ({
  seatingActive = false,
  movie_name = "Tom And Jerry",
  location = "INOX: Neelyog, Ghatkopar E",
  timeAndDate = "Tomorrow, 12 Mar, 10:30 AM",
  type1 = "SILVER",
  type2 = "Premium",
  ticketPrice1 = 112,
  ticketPrice2 = 100,
  ticketListfunc,
  handleCloseSeatingModal,
  handleCloseSeatingButton
}) => {
  const [active, setActive] = useState(false);
  const [rowsData, setRowData] = useState(rows);
  const [rowsData2, setRowData2] = useState(rows2);
  const [price, setPrice] = useState(0);
  const movie_details = useSelector((state) => state.booking_details);

  const handleClick = (value) => {
    setRowData(
      rowsData.map((e) =>
        e.id === value ? { ...e, isSelected: !e.isSelected } : e
      )
    );

    setRowData2(
      rowsData2.map((e) =>
        e.id === value ? { ...e, isSelected: !e.isSelected } : e
      )
    );
  };

  useEffect(() => {
    const selectedSilverSeats = rowsData.filter((e) => e.isSelected).length;
    const selectedPlatinumSeats = rowsData2.filter((e) => e.isSelected).length;
    const newPrice = selectedSilverSeats * ticketPrice1 + selectedPlatinumSeats * ticketPrice2;

    setPrice(newPrice);
    setActive(newPrice > 0);
  }, [rowsData, rowsData2, ticketPrice1, ticketPrice2]);

  const handleSeat = () => {
    rowsData.forEach((e) => {
      if (e.isSelected) ticketList.silver.push(e.seat);
    });
    rowsData2.forEach((e) => {
      if (e.isSelected) ticketList.platinium.push(e.seat);
    });
    ticketList.price = price;
    console.log(ticketList);
    handleCloseSeatingModal(ticketList);
  };

  return (
    <div
      style={
        seatingActive
          ? {
              display: "block",
              zIndex: 1000,
              position: "absolute",
              top: "10%",
              left: 0,
              height: "100vh",
            }
          : { display: "none" }
      }
      className="seatingModal"
    >
      <div className="seatingModal__nav">
        <div>
          <div>
            <h4 style={{ color: "white", fontSize: 20 }}>{movie_details.movie_name}</h4>
            <h5 style={{ color: "white" }}>{movie_details.cinemas_name}</h5>
          </div>
          <div>
            <button
              style={{ cursor: "pointer", fontSize: 25 }}
              onClick={() => handleCloseSeatingButton()}
            >
              X
            </button>
          </div>
        </div>
        <div>
          <h3>
            {movie_details.date} {movie_details.time}
          </h3>
        </div>
      </div>
      <div className="seatingModal__seatContainer">
        <div>
          <h5>
            {type1}-Rs. {ticketPrice1}
          </h5>

          <div className="seatingModal__seatContainer.can">
            <div style={{ display: "grid" }}>
              {Silver.map((e) => (
                <div style={{ margin: 10, color: "gray" }} key={e}>
                  {e}
                </div>
              ))}
            </div>
            <div className="seatingModal__seatContainer_seats">
              {rowsData.map((e) => (
                <div
                  onClick={() => handleClick(e.id)}
                  className={
                    e.disable
                      ? "disable"
                      : e.isReserved
                      ? "reserved"
                      : e.isSelected
                      ? "select"
                      : "seats"
                  }
                  key={e.id}
                >
                  <p>{e.number}</p>
                </div>
              ))}
            </div>
          </div>
          <h5>
            {type2}-Rs. {ticketPrice2}
          </h5>
          <div className="seatingModal__seatContainer.can">
            <div style={{ display: "grid" }}>
              {Silver.map((e) => (
                <div style={{ margin: 10, color: "gray" }} key={e}>
                  {e}
                </div>
              ))}
            </div>
            <div className="seatingModal__seatContainer_seats">
              {rowsData2.map((e) => (
                <div
                  onClick={() => handleClick(e.id)}
                  className={
                    e.disable
                      ? "disable"
                      : e.isReserved
                      ? "reserved"
                      : e.isSelected
                      ? "select"
                      : "seats"
                  }
                  key={e.id}
                >
                  <p>{e.number}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="Screen">
            <img src="https://i.imgur.com/XhsTL5Y.png" alt="screen" />
          </div>
        </div>
      </div>
      <div
        style={active ? { display: "block" } : { display: "none" }}
        className="PriceButton"
      >
        <button
          onClick={() => handleSeat()}
          style={{ height: 40, margin: 10, marginLeft: "40%", cursor: "pointer" }}
        >
          Rs. {price}
        </button>
      </div>
    </div>
  );
};

export default Seating;
