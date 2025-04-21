import { expect, test } from "vitest";
import { haikus } from "./haikus";
import { Temporal } from "temporal-polyfill";


test("No repeated Ids", () => {
  const idArray = Array.from(new Set(haikus.map(h => h.id)));
  expect(haikus.length).toBe(idArray.length)
})

test("Metrics are correct", () => {
  haikus.forEach(({ id, text, tags }) => {
    const pattern = tags.find(t => /^[0-9]\-[0-9]\-[0-9]$/.test(t))
    if (!pattern) return
    const lineLengths = text.map(l => String(l.split(/ |-/).length)).join("-")
    expect.soft(lineLengths, `El haiku ${id} no cumple la métrica ${pattern}`).toBe(pattern)
  })
})

test("Dates are correlative", () => {
  haikus.forEach(({ date }, i) => {
    if (i === 0) return
    const prevDate = Temporal.PlainDate.from(haikus[i - 1].date)
    const currentDate = Temporal.PlainDate.from(date)
    const diff = prevDate.since(currentDate).days;
    expect(diff, `${prevDate.toString()} debe ser posterior a ${currentDate.toString()}`).toBeGreaterThanOrEqual(0)
  })
})