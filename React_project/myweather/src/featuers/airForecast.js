import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAirForecast } from "../api/openWeatherApi";

export const fetchAirForecast = createAsyncThunk('airForecast/fetchAirForecasts', async ({ lon, lat }) => {
    const airForecastResponse = await getAirForecast(lon, lat)

    
    
})

const airForecastSlice = createSlice({
    name: 'airForecast',
    initialState: {
        loading: false,
        error: null,
        airForecasts: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase()
    }
})