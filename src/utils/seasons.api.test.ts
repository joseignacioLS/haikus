// import { afterEach, expect, test, vi } from "vitest";
// import { getSeasonsEvents } from "./seasons.api";
// import { Temporal } from "temporal-polyfill";
// import { describe } from "node:test";

// vi.mock("./api", () => ({
//   getRequest: vi.fn(() => { return { data: [{ phenom: "Equinox", time: "api call" }] } })
// }))

// describe("seasons api", () => {

//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   test("Cache Gets Retrieved", async () => {
//     localStorage.setItem("haiku-seasons-cache", JSON.stringify({
//       date: Temporal.Now.plainDateISO().toString(),
//       data: ["cache ok"]
//     }))
//     const seasonsData = await getSeasonsEvents(Temporal.Now.plainDateISO().year);
//     expect(seasonsData[0]).toBe("cache ok")
//   })

//   test("Api call if localstorage empty", async () => {
//     localStorage.clear()
//     const seasonsData = await getSeasonsEvents(Temporal.Now.plainDateISO().year);
//     expect(seasonsData[0].time).toBe("api call")
//   })
// })