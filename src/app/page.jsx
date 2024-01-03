"use client";

import Flags from "@/components/Flags";
import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/public/Index.css";
import Loader from "@/components/Loader";

function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const url = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
        setLoaded(true);
      } catch (error) {
        console.log("Error caught while fetching:", error);
      }
    };
    fetchData();

    // Load Bootstrap JavaScript on the client side
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.min.js");
    }
  }, []);

  return (
    <>
      {loaded ? (
        <div className="container-fluid outer-body">
          <Heading />
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Flags
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            data={data}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Index;
