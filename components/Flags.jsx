"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

function Flags({ searchTerm, setSearchTerm, data }) {
  const router = useRouter();

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   // Your custom logic here
  //   console.log("Link clicked, but default behavior prevented");
  //   // You can navigate manually using the router
  //   router.push("/CountryDetails?country=${}");
  // };

  function showMap(countryMap) {
    window.open(countryMap);
  }
  function addOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    } else {
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    }
  }
  const calculateLocalDateTime = (country) => {
    if (!country.timezones || country.timezones.length === 0) {
      return "No timezone info";
    }

    const currentUtcTime = new Date();
    const localDateTime = new Date(currentUtcTime);

    let standardUtcOffset = 0;
    for (const timezone of country.timezones) {
      const match = timezone.match(/([+-]?\d+)(?::(\d+))?/);
      if (match) {
        const hours = parseInt(match[1]);
        const minutes = match[2] ? parseInt(match[2]) : 0;
        standardUtcOffset = ((hours - 5) * 60 + (minutes - 30)) * 60 * 1000;
        break;
      }
    }

    localDateTime.setTime(currentUtcTime.getTime() + standardUtcOffset);

    const optionsDate = { month: "short", year: "numeric" };
    const localDateString = localDateTime.toLocaleDateString(
      undefined,
      optionsDate
    );
    const dayWithSuffix = addOrdinalSuffix(localDateTime.getDate());
    let hours = localDateTime.getHours();
    hours = hours % 12 || 12;
    const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
    const localTimeString = localDateTime
      .toLocaleTimeString(undefined, optionsTime)
      .toUpperCase();
    return `${dayWithSuffix} ${localDateString}, ${localTimeString}`;
  };

  function filterJson() {
    if (searchTerm) {
      const filteredCountries = data.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
      );
      if (filteredCountries.length === 0) {
        alert(`No countries with name ${searchTerm} exists`);
        setSearchTerm(searchTerm.slice(0, -1));
      }
      return filteredCountries;
    }
    return data;
  }

  return (
    <div className="container-fluid" id="lowerflagbody">
      {filterJson().map((cntry) => (
        <div
          key={cntry.cca3}
          className="card cardo"
          style={{ margin: "15px 0px" }}
        >
          <div
            className="row"
            style={{ margin: "13px", padding: "0px !important" }}
          >
            <div className="col-lg-4 igcontainer">
              <img
                className="countryflag"
                src={cntry.flags.png}
                alt=""
                height="50%"
                width="100%"
                style={{
                  minHeight: "100%",
                  display: "block",
                }}
              />
            </div>

            <div className="col-lg-8 card-body">
              <div style={{ placeItems: "center", alignItems: "center" }}>
                <h1
                  className="card-title"
                  id="countryname"
                  style={{ fontSize: "38px", margin: "0px " }}
                >
                  {cntry.name.common}
                </h1>
                <h5>
                  Currency:{" "}
                  {"currencies" in cntry
                    ? cntry.currencies[Object.keys(cntry.currencies)[0]].name
                    : "N/A"}
                </h5>
                <h5>Current date and time: {calculateLocalDateTime(cntry)}</h5>
                <div className="row justify-content-around buts">
                  <button
                    type="button"
                    className="btn btn-outline-primary col-5"
                    onClick={() => showMap(cntry.maps.googleMaps)}
                    style={{ border: "3px solid blue", borderRadius: "3px" }}
                  >
                    <strong style={{ fontSize: "large" }}>Show Map</strong>
                  </button>
                  {/* <Link
                    href={`/CountryDetails?country=${cntry.cca3}`}
                    passHref
                    legacyBehavior
                  >
                  <a
                    className="btn btn-outline-primary col-5"
                    style={{ border: "3px solid blue", borderRadius: "2px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/CountryDetails?country=${cntry.cca3}`);
                    }}
                  >
                    <strong style={{ fontSize: "large" }}>Detail</strong>
                  </a>
                  </Link> */}

                  {/* <Link
                    href={{
                      pathname: "CountryDetails",
                      query: { country: `${cntry.cca3}` },
                    }}
                    className="btn btn-outline-primary col-5"
                    style={{ border: "3px solid blue", borderRadius: "2px" }}
                  >
                    <strong style={{ fontSize: "large" }}>Detail</strong>
                  </Link> */}

                  <Link
                    href={`/CountryDetails?country=${cntry.cca3}`}
                    className="btn btn-outline-primary col-5"
                    style={{ border: "3px solid blue", borderRadius: "2px" }}
                  >
                    <strong style={{ fontSize: "large" }}>Detail</strong>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Flags;
