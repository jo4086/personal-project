import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerAddress } from '../../api/addressApi'

export const registerAddressThunk = createAsyncThunk('address/registerAddress', async (address, { rejectWithValue }) => {
    try {
        const response = await registerAddress(address)
        return response.data.address
    } catch (err) {
        console.error(err)
        return rejectWithValue(err.response?.data?.message || 'addressSlice: 신규회원 주소 등록 실패')
    }
})

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        address: [],
        loading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerAddressThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerAddressThunk.fulfilled, (state, action) => {
                state.loading = false
                state.address = [action.payload]
            })
            .addCase(registerAddressThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default addressSlice.reducer