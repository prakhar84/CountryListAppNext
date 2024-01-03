"use client";

import React, { useEffect, useState } from "react";

function NeighbourCountries({ country }) {
  const [loaded, setLoaded] = useState(false);
  const [neighbourCountriesJson, setNeighbourCountriesJson] = useState(null);
  const {
    name: { common },
    borders,
    cca3,
  } = country;
  let temp = null;
  const [countries, setCountries] = useState("12");
  useEffect(() => {
    setLoaded(false);
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const resp = await response.json();
        temp = resp.filter((item) => borders.includes(item.cca3));
        setNeighbourCountriesJson(temp);
        setLoaded(true);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);
  const len = "borders" in country ? borders.length : 0;
  // console.log(borders);
  if (len === 0) {
    return (
      <h1>
        <strong>No neighbouring countries !!!</strong>
      </h1>
    );
  }
  if (loaded === false) {
    return <div>Neighbours Loading..... </div>;
  }

  return (
    <>
      {loaded &&
        (borders ? (
          <>
            <div className="lowerbody container-fluid">
              <div className="container-fluid card bodycard">
                <div className="row align-self-start">
                  <h1 className="col-12 heading" style={{ fontWeight: "700" }}>
                    Neighbour Countries
                  </h1>
                </div>
                <div
                  id="neighbours"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  {neighbourCountriesJson.map((item, index) => (
                    <img
                      key={index}
                      className="neighimg "
                      src={item?.flags?.svg}
                      alt={item?.flags?.alt}
                      height="15%"
                      width="30%"
                      style={{
                        margin: "15px",
                        padding: "0px",
                        border: "2px solid black",
                        overflow: "hidden",
                        objectFit: "contain",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>No Neighbouring Countries !!!</h1>
        ))}
    </>
  );
}

export default NeighbourCountries;
