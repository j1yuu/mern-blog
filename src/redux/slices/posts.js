import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchPopularPosts = createAsyncThunk('/posts/fetchPopularPosts', async () => {
    const { data } = await axios.get('/posts/popular');
    return data;
});

export const fetchTags = createAsyncThunk('/posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchComments = createAsyncThunk('/posts/fetchComments', async () => {
    const { data } = await axios.get('/comments');
    return data;
});

export const fetchRemovePost = createAsyncThunk('/posts/fetchRemovePost', async (id) => {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
});


const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
    comments: {
        items: [],
        status: 'loading'
    },
}

const postSlices = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение статей
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        //Получение популярных статей
        [fetchPopularPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPopularPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPopularPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        //Получение тегов
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
        //Получение комментариев
        [fetchComments.pending]: (state) => {
            state.comments.items = [];
            state.comments.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload;
            state.comments.status = 'loaded';
        },
        [fetchComments.rejected]: (state) => {
            state.comments.items = [];
            state.comments.status = 'error';
        },
        //Удаление статьи
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
        },
    }
});

export const postReducer = postSlices.reducer;