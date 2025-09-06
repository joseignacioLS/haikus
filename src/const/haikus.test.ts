import { Temporal } from "temporal-polyfill";
import { describe, expect, test } from "vitest";
import { haikus } from "./haikus";

describe("haikus", () => {

  test("No repeated Ids", () => {
    const idArray = Array.from(new Set(haikus.map(h => h.id)));
    expect(haikus.length).toBe(idArray.length)
  })

  test("Tags ok", () => {
    haikus.forEach(({ id, tags }) => {
      const hasMetric = tags.find(t => /^[0-9]\-[0-9]\-[0-9]$/.test(t)) !== undefined
      expect.soft(hasMetric, `El poema ${id} no tiene métrica`).toBe(true)

      const hasClass = tags.find(t => t === "Haiku" || t === "Senryū") !== undefined
      expect.soft(hasClass, `El poema ${id} no está clasificado`).toBe(true)

      const notRepeatedTags = tags.length === Array.from(new Set(tags)).length
      expect.soft(notRepeatedTags, `El poema ${id} tiene tags repetidas`).toBe(true)

    })
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
})