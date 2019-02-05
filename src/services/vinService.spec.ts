import { transform, convert, filter } from "./vinService"
import { vinCheckResponseFixture, vinResultEntryFixture } from "../test/fixtures"

describe("Vin Service", () => {
    describe.skip("Response converter", () => {
        it("gives empty result when no data is given", () => expect(convert(null)).toEqual(null))
        it("gives empty result when invalid data is given", () => expect(convert({} as any)).toEqual(null))
        it("gives empty result when response contains no data", () =>
            expect(convert(vinCheckResponseFixture({ Results: [] }))).toEqual(null))

        const entry = (Variable: string, Value: string) => vinResultEntryFixture({ Variable, Value })

        it("takes make from Results array", () =>
            expect(convert(vinCheckResponseFixture({ Results: [entry("Make", "HONDA")] })).make).toEqual("HONDA"))

        it("takes year from Results array", () =>
            expect(convert(vinCheckResponseFixture({ Results: [entry("Model Year", "2007")] })).year).toEqual(2007))

        it("takes type from Results array", () =>
            expect(
                convert(vinCheckResponseFixture({ Results: [entry("Vehicle Type", "PASSENGER CAR")] })).vechicleType
            ).toEqual("PASSENGER CAR"))

        it("takes trim from Results array", () =>
            expect(convert(vinCheckResponseFixture({ Results: [entry("Trim", "FN2")] })).trim).toEqual("FN2"))

        it("takes all values from Results", () =>
            expect(
                convert(
                    vinCheckResponseFixture({
                        Results: [
                            entry("Make", "MAZDA"),
                            entry("Model Year", "2010"),
                            entry("Model", "rx8"),
                            entry("Vehicle Type", "CAR"),
                            entry("Trim", "RX8")
                        ]
                    })
                )
            ).toEqual({
                make: "MAZDA",
                year: 2010,
                model: "rx8",
                vechicleType: "CAR",
                trim: "RX8"
            }))
    })

    describe("Response transform", () => {
        it("gives empty result when no data is given", () => expect(transform(null)).toEqual(null))

        it("gives empty result when invalid data is given", () => expect(transform({} as any)).toEqual(null))

        it("gives empty result when response contains no data", () => expect(transform({ Results: [] })).toEqual(null))

        const _entry = (Variable: string, Value: string) => ({ Results: [{ [Variable]: Value }] })

        it("takes make from Results array", () => expect(transform(_entry("Make", "YAMAHA")).make).toEqual("YAMAHA"))

        it("takes year from Results array", () => expect(transform(_entry("ModelYear", "2006")).year).toEqual(2006))

        it("takes type from Results array", () =>
            expect(transform(_entry("VehicleType", "MOTORCYLE")).vechicleType).toEqual("MOTORCYLE"))

        it("takes trim from Results array", () => expect(transform(_entry("Trim", "XVS650")).trim).toEqual("XVS650"))

        it("takes all values from Results", () =>
            expect(
                transform({
                    Results: [
                        {
                            Make: "YAMAHA",
                            ModelYear: "2006",
                            Model: "DRAGSTAR",
                            VehicleType: "MOTORCYCLE",
                            Trim: "XVS650"
                        }
                    ]
                })
            ).toEqual({
                make: "YAMAHA",
                year: 2006,
                model: "DRAGSTAR",
                vechicleType: "MOTORCYCLE",
                trim: "XVS650"
            }))
    })

    describe("Vin string filter", () => {
        it("uppercases given string", () => expect(filter("abc")).toEqual("ABC"))
        it("disallows IOQ", () => expect(filter("IOQabc")).toEqual("ABC"))
        it("disallows ioq", () => expect(filter("ioqabc")).toEqual("ABC"))
        it("trims to first 17 chars", () => expect(filter("SHHFN23607U002758abc")).toEqual("SHHFN23607U002758"))
    })
})
