import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser, checkAuthStatus } from '../../api/authApi.js'

export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await registerUser(userData)
        return response.data.user
    } catch (err) {
        console.error(err)
        return rejectWithValue(err.response?.data?.message || 'authSlice: 회원가입 실패')
    }
})

export const loginUserThunk = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await loginUser(credentials)
        return response.data.user
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'authSlice: 로그인 실패!')
    }
})

export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
    try {
        const response = await logoutUser()
        return response.data
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'authSlice: 로그아웃 실패!')
    }
})

export const checkAuthStatusThunk = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
    try {
        const response = await checkAuthStatus()
        return response.data
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'authSlice: 회원정보 조회 실패!')
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        // 1. 회원가입: registerUserThunk
        builder
            .addCase(registerUserThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        // 2. 로그인: loginUserThunk
        builder
            .addCase(loginUserThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.user = action.payload
                state.error = null
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.user = null
            })

        // 3. 로그아웃: logoutUserThunk
        builder
            .addCase(logoutUserThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logoutUserThunk.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = false
                state.user = null
            })
            .addCase(logoutUserThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        // 4. 로그인 여부 체크: checkAuthStatusThunk
        builder
            .addCase(checkAuthStatusThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = action.payload.isAuthenticated
                state.user = action.payload.user || null
                state.error = null
            })
            .addCase(checkAuthStatusThunk.rejected, (state, action) => {
                state.loading = false
                state.isAuthenticated = false
                state.error = action.payload
                state.user = null
            })
    },
})

export default authSlice.reducer