"use client";

import HeadingAndCountryDetails from "@/components/HeadingAndCountryDetails";
import NeighbourCountries from "@/components/NeighbourCountries";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@/public/Details.css";

function Details() {
  const countrycca3code = window.location.search.slice(-3);
  const [country, setCountry] = useState("12");
  const [loaded, setLoaded] = useState(false);
  //   let params = new URLSearchParams(document.location.search);
  //   let countrycca3code = params.get("country");
  const url = `https://restcountries.com/v3.1/alpha/${countrycca3code}`;
  useEffect(() => {
    setLoaded(false);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const resp = await response.json();
        setCountry(resp);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loaded && (
        <div className="wholebody2 container-fluid ">
          <HeadingAndCountryDetails country={country[0]} />
          <NeighbourCountries country={country[0]} />
        </div>
      )}
    </>
  );
}

export default Details;
