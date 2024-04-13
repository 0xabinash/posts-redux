import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectPostById, updatePost, deletePost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const EditPostForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const [postData, setPostData] = useState({
    title: post?.title,
    body: post?.body,
    userId: post?.userId,
  });
  const [requestStatus, setRequestStatus] = useState('idle');

  if (!post) {
    return (
      <section>
        <h2>Post Not Found</h2>
      </section>
    );
  }

  const handlePostEditChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const canSave =
    [postData.title, postData.body, postData.userId].every(Boolean) &&
    requestStatus === 'idle';

  const onSavePostClicked = (e) => {
    if (canSave) {
      try {
        setRequestStatus('pending');
        const {title, body, userId} = postData;
        dispatch(
          updatePost({ id: post.id, reactions: post.reactions, title, body, userId: Number(userId) })
        ).unwrap();
        setPostData({title: "", body: "", userId: ""});
        navigate(`/post/${postId}`);
      } catch (error) {
        console.log('Failed to save post', error);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const onDeletePostClicked = () => {
    try {
      setRequestStatus('pending');
      dispatch(deletePost({id: post.id}));
      setPostData({ title: '', body: '', userId: '' });
      navigate('/');
    } catch (error) {
      console.log('Failed to delete post', error);
    } finally {
      setRequestStatus('idle');
    }
  };

  const userOptions = users.map((user) => {
    return (
      <option value={user.id} key={user.id}>
        {user.name}
      </option>
    );
  });

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Title</label>
        <input
          value={postData.title}
          id="postTitle"
          type="text"
          name="title"
          onChange={handlePostEditChange}
        />
        <label htmlFor="postAuthor">Author</label>
        <select
          defaultValue={postData.userId}
          name="userId"
          id="postAuthor"
          onChange={handlePostEditChange}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="">Content</label>
        <textarea
          value={postData.body}
          id="postBody"
          type="text"
          name="body"
          onChange={handlePostEditChange}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button type="button" onClick={onDeletePostClicked}>Delete Post</button>
      </form>
    </section>
  );
};

export default EditPostForm;
