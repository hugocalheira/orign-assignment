interface CarInfo {
    make: string
    model: string
    year: number
    trim: string
    vechicleType: string
}

interface VinResultEntry {
    Value: string
    ValueId: string
    Variable: string
    VariableId: number
}

interface VinCheckResponse {
    Results: VinResultEntry[]
}
