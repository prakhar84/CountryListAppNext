"use client";

import React from "react";
import Image from "next/image";

function HeadingAndCountryDetails({ country }) {
  const {
    flags: { svg },
    name: { common },
    capital,
    population,
    region,
    subregion,
    area,
    idd: { root, suffixes },
    timezones,
  } = country;

  return (
    <div className="upperbody container-fluid">
      <div className="row imgandcontent">
        <h1 id="heading" style={{ fontWeight: "700", fontSize: "45px" }}>
          {common}
        </h1>
        <div
          className="col-lg-6 align-self-center igcontainer2"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            className=""
            src={svg}
            id="mainflagimg"
            alt="country_flag_img.png"
            height="auto"
            width="100%"
            style={{ border: "1px solid black" }}
          />
        </div>

        <div className="col-lg-4 content">
          <h4 id="nativename">Native Name: {common}</h4>
          <h4 id="capital">Capital: {capital}</h4>
          <h4 id="population">Population: {population} </h4>
          <h4 id="region">Region: {region} </h4>
          <h4 id="subregion">Sub-region: {subregion} </h4>
          <h4 id="area">
            Area: {area}.0 Km<sup>2</sup>
          </h4>
          <h4 id="countrycode">
            Country Code: {root}
            {suffixes}
          </h4>
          <h4 id="languages">
            Languages:{" "}
            {"languages" in country
              ? Object.values(country.languages).join(" and ")
              : "N/A"}
          </h4>
          <h4 id="currencies">
            Currencies:{" "}
            {"currencies" in country
              ? country.currencies[Object.keys(country.currencies)[0]].name
              : "N/A"}
          </h4>
          <h4 id="timezone">Timezone: {timezones[0]} </h4>
        </div>
      </div>
    </div>
  );
}

export default HeadingAndCountryDetails;
