import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStoradgeService from "../services/localStoradge. service";
import userService from "../services/user.service";
import getRandomInt from "../utils/getRandomInt";
import history from "../utils/history";

const initialState = localStoradgeService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStoradgeService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestedSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestedFiled: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdate: (state, action) => {
            const index = state.entities.findIndex(
                (u) => u._id === state.auth.userId
            );
            console.log(action.payload);
            state.entities[index] = action.payload;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequestFiled,
    authRequestedSuccess,
    authRequestedFiled,
    userCreated,
    userLoggedOut,
    userUpdate
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFiled = createAction("users/userCreateFiled");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFiled = createAction("users/userUpdateFiled");

export const logIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            localStoradgeService.setTokens(data);
            dispatch(authRequestedSuccess({ userId: data.localId }));
            history.push(redirect);
        } catch (error) {
            dispatch(authRequestedFiled(error.message));
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStoradgeService.setTokens(data);
            dispatch(authRequestedSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    rate: getRandomInt(1, 5),
                    completedMeetings: getRandomInt(0, 200),
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestedFiled(error.message));
        }
    };
function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(userCreateFiled(error.message));
        }
    };
}

export const logOut = () => (dispatch) => {
    localStoradgeService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdate(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFiled(error.message));
    }
};

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestFiled(error.message));
    }
};

export const getUsersList = () => (state) => state.users.entities;

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;

export const getDataLoaded = () => (state) => state.users.dataLoaded;

export const getCurrentUserId = () => (state) => state.users.auth.userId;

export const getIsLoadingUsersStatus = () => (state) => state.users.isLoading;

export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};

export default usersReducer;
