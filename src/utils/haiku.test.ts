import { HIDDEN_HAIKU_TAG } from "@/const/variables";
import { describe, expect, test } from "vitest";
import { getCollections, getVisibleHaikus, sortHaikusById } from "./haiku";

describe("getVisibleHaikus", () => {
  test("Returns an array", () => {
    const result = getVisibleHaikus([])
    expect(Array.isArray(result)).toBeTruthy()
  })

  test("Removes haikus with hidden tag", () => {
    const result = getVisibleHaikus([
      {
        id: 1,
        text: [],
        date: "",
        tags: [HIDDEN_HAIKU_TAG]
      },
      {
        id: 2,
        text: [],
        date: "",
        tags: [""]
      }
    ])
    expect(result[0].id).toBe(2)
  })
})

describe("sortHaikusById", () => {
  test("Returns an array", () => {
    const result = sortHaikusById([])
    expect(Array.isArray(result)).toBeTruthy()
  })

  test("ids are in decreasing order", () => {
    const result = getVisibleHaikus([
      {
        id: 1,
        text: [],
        date: "",
        tags: [""]
      },
      {
        id: 2,
        text: [],
        date: "",
        tags: [""]
      },
      {
        id: 3,
        text: [],
        date: "",
        tags: [""]
      }
    ])
    expect(result[2].id).toBe(3)
    expect(result[1].id).toBe(2)
    expect(result[0].id).toBe(1)
  })
})


describe("getCollections", () => {
  test("Returns an array", () => {
    const result = getCollections([])
    expect(Array.isArray(result)).toBeTruthy()
  })


  test("Returns not repeated tags", () => {
    const result = getCollections([
      {
        id: 1,
        text: [],
        date: "",
        tags: ["3", "1"]
      },
      {
        id: 2,
        text: [],
        date: "",
        tags: ["1", "2"]
      },
      {
        id: 3,
        text: [],
        date: "",
        tags: ["3", "2"]
      }
    ])
    expect(result.length).toBe(3)
    expect(result[0]).toBe("1")
    expect(result[1]).toBe("2")
    expect(result[2]).toBe("3")
  })
})