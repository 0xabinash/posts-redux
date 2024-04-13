import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// asyncThunks.
export const fetchPosts = createAsyncThunk("'posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (data) => {
  try {
    const response = await axios.post(POSTS_URL, data);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const updatePost = createAsyncThunk('posts/updatePost', async (data) => {
  const { id } = data;
  try {
    const resposne = await axios.put(`${POSTS_URL}/${id}`, data);
    return resposne.data;
  } catch (error) {
    return error.message;
  }
});

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId) => {
    const { id } = postId;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      if (response.status === 200) {
        return postId;
      }
    } catch (error) {
      return error.message;
    }
  }
);

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// Initial state.
const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

// Post slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;

      const existingPost = state.entities[postId];
      if (existingPost) {
        if (existingPost.reactions[reaction] > 0) {
          existingPost.reactions[reaction]--;
        } else {
          existingPost.reactions[reaction]++;
        }
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }

        const updatedPost = {
          id: action.payload.id,
          changes: {
            ...action.payload,
            date: new Date().toISOString(),
          },
        };

        postsAdapter.updateOne(state, updatedPost);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Delete could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        postsAdapter.removeOne(state, id);
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectAllPostsMemoized = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => {
    return posts.filter((post) => post.userId === userId);
  }
);

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
