const { InfluxDB, FluxTableMetaData } = require("@influxdata/influxdb-client");
const { query } = require("express");

// Configuración del cliente para InfluxDB
const url = "http://localhost:8086";
const token =
  "385212cd308a4510dd31808eb7e45f10c3ecab467518f9b7b027e1eb9abb081a"; // Asegúrate de poner tu token real aquí
const org = "skysculptor";
const bucket = "data";

const client = new InfluxDB({ url, token });

// Obtener fechas disponibles para vuelos a una ciudad específica
// Función para obtener las fechas disponibles
async function queryAvailableDates(arrival) {
  const queryApi = client.getQueryApi(org);
  const fluxQuery = `
        from(bucket: "${bucket}")
        |> range(start: -1y)
        |> filter(fn: (r) => r["_measurement"] == "flight")
        |> filter(fn: (r) => r["arrival_airport"] == "${arrival}")
        |> keep(columns: ["_time"])
        |> distinct(column: "_time")
        |> sort()
    `;

  const result = [];
  return new Promise((resolve, reject) => {
    queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        if (o._value) {
          // Usar _value en lugar de _time
          result.push(o._value.split("T")[0]);
        }
      },
      error(error) {
        console.error(error);
        reject(error);
      },
      complete() {
        resolve(result);
      },
    });
  });
}

async function queryUniqueAirlines(arrival) {
  const queryApi = client.getQueryApi(org);
  const fluxQuery = `
        from(bucket: "${bucket}")
        |> range(start: -1y)
        |> filter(fn: (r) => r["_measurement"] == "flight")
        |> filter(fn: (r) => r["arrival_airport"] == "${arrival}")
        |> distinct(column: "airline")
        |> filter(fn: (r) => not exists r.airline or not r.airline =~ /,/)
    `;

  const airlines = new Set();
  return new Promise((resolve, reject) => {
    queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        // Ensure that airline data exists and add it to the Set
        if (o.airline) {
          airlines.add(o.airline);
        }
      },
      error(error) {
        console.error(error);
        reject(error);
      },
      complete() {
        resolve(Array.from(airlines)); // Convert Set to Array
      },
    });
  });
}
// Archivo: handleInfluxdb.js

function parseDate(input) {
    if (!input) {
        console.error("Date input is null or undefined.");
        throw new Error("Invalid date format - date input is undefined or null");
    }
    const date = new Date(input);
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }
    return date.toISOString();
}


async function queryFlightPrices(city, airline, startDate, endDate) {
    const queryApi = client.getQueryApi(org);
    try {
        const formattedStart = parseDate(startDate);
        const formattedEnd = parseDate(endDate);

        const fluxQuery = `
        from(bucket: "${bucket}")
        |> range(start: time(v: "${formattedStart}"), stop: time(v: "${formattedEnd}"))
        |> filter(fn: (r) => r["_measurement"] == "flight" and r["_field"] == "price")
        |> filter(fn: (r) => r["arrival_airport"] == ${JSON.stringify(city)} and r["airline"] == ${JSON.stringify(airline)})
        |> aggregateWindow(every: 1d, fn: mean, createEmpty: false)
        |> yield(name: "mean")
    `;
        console.log("Executing query with:", fluxQuery);

        const results = [];
        return new Promise((resolve, reject) => {
            queryApi.queryRows(fluxQuery, {
                next(row, tableMeta) {
                    const o = tableMeta.toObject(row);
                    results.push({ time: o._time, price: o._value });
                },
                error(error) {
                    console.error(`Query error: ${error}`);
                    reject(error);
                },
                complete() {
                    resolve(results);
                },
            });
        });
    } catch (error) {
        console.error("Date parsing error:", error);
        throw error; // Re-throw the error to be caught by the endpoint handler.
    }
}







module.exports = {
  queryAvailableDates,
  queryUniqueAirlines,
  queryFlightPrices,
};
