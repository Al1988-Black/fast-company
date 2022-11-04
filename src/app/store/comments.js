import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        commentsAddedFiled: (state, action) => {
            state.error = action.payload;
        },
        commentsDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (com) => com._id !== action.payload
            );
        },
        commentsDeletedFiled: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;

const {
    commentsRequested,
    commentsReceved,
    commentsRequestFiled,
    commentsAdded,
    commentsAddedFiled,
    commentsDeleted,
    commentsDeletedFiled
} = actions;

const commentsCreateRequested = createAction(
    "comments/commentsCreateRequested"
);
const commentsDeleteRequested = createAction(
    "comments/commentsDeleteRequested"
);

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const createComment = (data) => async (dispatch) => {
    dispatch(commentsCreateRequested());
    try {
        const { content } = await commentService.createComment(data);
        dispatch(commentsAdded(content));
    } catch (error) {
        dispatch(commentsAddedFiled(error.message));
    }
};

export const deleteComment = (id) => async (dispatch) => {
    dispatch(commentsDeleteRequested);
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(commentsDeleted(id));
        }
        console.log(content);
    } catch (error) {
        dispatch(commentsDeletedFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;
export default commentsReducer;
