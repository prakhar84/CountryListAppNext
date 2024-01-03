"use client";

import HeadingAndCountryDetails from "@/components/HeadingAndCountryDetails";
import NeighbourCountries from "@/components/NeighbourCountries";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/public/Details.css";
import { useSearchParams } from "next/navigation";

function Details() {
  const SearchParams = useSearchParams();
  const countrycca3code = SearchParams.get("country");
  const [country, setCountry] = useState("12");
  const [loaded, setLoaded] = useState(false);

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

    // Load Bootstrap JavaScript on the client side
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.min.js");
    }
  }, [url]); // Added url as a dependency to the useEffect dependency array

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
