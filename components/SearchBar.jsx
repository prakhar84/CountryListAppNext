"use client";

import React from "react";
import SearchImage from "@/public/search-interface-symbol.png";
import Image from "next/image";

function SearchBar({ searchTerm, setSearchTerm }) {
  function handleSearchQuery(x) {
    setSearchTerm(x.toLowerCase());
  }

  return (
    <>
      <div
        className="input-group mb-3"
        style={{ textAlign: "right", display: "flex", position: "relative" }}
      >
        <input
          type="text"
          className="abc"
          placeholder="Search Countries"
          id="searchInput"
          style={{
            border: "1px solid grey",
            borderRadius: "0px",
            position: "relative",
            flex: "1",
            padding: "1%",
          }}
          value={searchTerm}
          onChange={(event) => handleSearchQuery(event.target.value)}
        />
        <Image
          src={SearchImage}
          alt="magni"
          id="searchicon"
          width={30}
          height={30}
          style={{
            position: "absolute",
            top: "50%",
            right: "1%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    </>
  );
}

export default SearchBar;
