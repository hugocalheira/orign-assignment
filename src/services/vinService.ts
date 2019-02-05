import { get } from "../utils/https"

// const invalidChars = new RegExp(/[I]/, "g")
export const filter = (vin: string) =>
    vin
        .toUpperCase()
        .replace(/[IOQ]/g, "")
        .slice(0, 17)

export const validate = (_vin: string): string => (_vin.length < 17 ? "17 chars expected" : null)

export const convert = (_res: VinCheckResponse): CarInfo => null

export const transform = (_res: any): CarInfo => {
    if (!_res) return null
    if (!_res.Results || !_res.Results.length) return null

    const res: CarInfo = {
        make: _res.Results[0].Make,
        model: _res.Results[0].Model,
        year: +_res.Results[0].ModelYear,
        trim: _res.Results[0].Trim,
        vechicleType: _res.Results[0].VehicleType
    }
    return res
}

export const apiCheck = async (_vin: string): Promise<CarInfo> => {
    const url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/"
    return get(url + _vin, { format: "json" }).then(data => transform(data), err => err)
}

// SHHFN23607U002758
// WBAFR1C52BC745487
