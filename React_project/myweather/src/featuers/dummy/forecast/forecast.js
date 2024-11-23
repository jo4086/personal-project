import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getForecast } from '../../api/openWeatherApi'

const forecastSlice = createSlice({
    name: 'forecast',
    initialState: {
        loading: false,
        forecast: {},
        error:null,
    }
})