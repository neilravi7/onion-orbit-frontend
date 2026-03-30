import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestOptionCreator, requestMaker } from "../../helper/request";
import { API_URL } from "../../helper/services";
import { isUserAuthenticated, getUserDetails, getUserRole} from "../../helper/utils";

// -async thunks-

// auth:register
export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async (requestPayload, {rejectWithValue}) => {
        try{
            const requestOptions = requestOptionCreator("POST", requestPayload, false);
            const response = await requestMaker(API_URL.signUp(), requestOptions)
            if(response.isError){
                return rejectWithValue('Registration error.');
            }
            return response.data             
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
);

// export const getCustomerProfile = createAsyncThunk(
//     'auth/getCustomerProfile',
//     async (requestPayload, {rejectWithValue}, dispatch) => {
//         try{
//             const user_id = getUserId();
//             const requestOption = requestOptionCreator("GET", {}, true);
//             const response = requestMaker(API_URL.getCustomerProfile(user_id), requestOption);
//             if(response.isError){
//                 return rejectWithValue('Unable to fetch customer data');
//             }else{
//                 window.localStorage.setItem('userInfo', response.data);
//                 dispatch(authSlice.reducer.setUserDetails(response.data));    
//             }
//         }catch (e){
//             rejectWithValue(e.message);
//         }  

//     }
// )

// async function getUserProfile(params) {
//     try{
//         const user_id = getUserId();
//         const requestOption = requestOptionCreator("GET", {}, true);
//         const response = requestMaker(API_URL.getCustomerProfile(user_id), requestOption);
//         if(response.isError){
//             return Error("Unable to fetch customer data");
//         }else{
//             window.localStorage.setItem('userInfo', response.data);
//         }   
//     }catch ( e){
//         console.log(e.message)
//     }
// }

// auth:login
export const signInUser = createAsyncThunk(
    'auth/signInUser',
    async (requestPayload, {rejectWithValue}) => {
        try{
            const requestOption = requestOptionCreator("POST", requestPayload, false);
            const response = await requestMaker(API_URL.signIn(), requestOption)
            if(response.isError){
                return rejectWithValue(`Login failed ${response.status.code}`);
            }else{
                window.localStorage.setItem('access', JSON.stringify(response.data.access));
                window.localStorage.setItem('refresh', JSON.stringify(response.data.refresh));
                window.localStorage.setItem('userInfo', JSON.stringify(response.data.user_info));
                return response.data
            }
        }catch (error){
            return rejectWithValue(`${error}`)
        }
    }
);

// -- auth slice -- 
const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:getUserDetails(),
        isAuthenticated:isUserAuthenticated(),
        isVendor:false,
        isCustomer:false,
        userRole:getUserRole(),
        isLocated:false,
        success:false, // response of action success | failed
        inProgress:false, // progress status 
        message:null // message to show
    },
    reducers:{
        clearAuthState: (state) =>{
            state.message=null;
            state.inProgress=false;
            state.success=false;
        },
        setUserDetails:(state, data) =>{
            state.user=data;
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(signUpUser.pending, (state) => {
            state.inProgress=true;
            state.success = false;
            state.message = null;
        })
        .addCase(signUpUser.fulfilled, (state) => {
            state.inProgress=false;
            state.success = true;
            state.message = "Signup successful!";
        })
        .addCase(signUpUser.rejected, (state, action) => {
            state.inProgress = false;
            state.success = false;
            state.message = action.payload;
        }).addCase(signInUser.pending, (state) => {
            state.inProgress = false;
            state.success = true;
            state.message = null;
        }).addCase(signInUser.fulfilled, (state, action) => {
            state.inProgress = false;
            state.success = false;
            state.isAuthenticated=true;
            state.user=action.payload.user_info;
            state.userRole=action.payload.user_info.user_role;
            state.message = "Login Successful!";
        }).addCase(signInUser.rejected, (state, action) => {
            state.inProgress=false;
            state.success=false;
            state.message="Login Failed!";
        })
    }
})

export const {clearAuthState, setUserDetails} = authSlice.actions;
export default authSlice.reducer;