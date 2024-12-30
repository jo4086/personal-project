import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signCheck } from '../../api/signCheckApi'

export const signCheckThunk = createAsyncThunk('blur/signCheck', async (blurdata, { rejectWithValue }) => {
    const { type, data } = blurdata
    try {
        // console.log('gi', type, data)
        const response = await signCheck(type, data)
        return { type, message: response.message }
    } catch (err) {
        // return rejectWithValue(err)
        return rejectWithValue({ type, status: err.response?.data?.status || '오류', message: err.response?.data?.message || '오류가 발생했습니다.' })
    }
})
// rejectedWithValue
// rejectedWithValue
// rejectWithValue

const blurSlice = createSlice({
    name: 'blur',
    initialState: {
        status: {},
        messages: {},
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signCheckThunk.pending, (state, action) => {
                const { type } = action.meta.arg
                state.status[type] = 'loading' // 해당 type 상태를 로딩으로 설정
                state.messages[type] = null
            })
            .addCase(signCheckThunk.fulfilled, (state, action) => {
                const { type, message } = action.payload
                state.status[type] = 'success' // 해당 type 상태를 성공으로 설정
                state.messages[type] = message
            })
            .addCase(signCheckThunk.rejected, (state, action) => {
                const { type, message } = action.payload
                state.status[type] = 'error' // 해당 type 상태를 에러로 설정
                state.messages[type] = message
            })
    },
})

export default blurSlice.reducer
