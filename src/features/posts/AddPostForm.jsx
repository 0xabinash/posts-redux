import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addNewPost } from './postsSlice';
import { addNewPost } from '../posts/postsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: '', body: '', userId: '' });
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const users = useSelector(selectAllUsers);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const canSave =
    [formData.title, formData.body, formData.userId].every(Boolean) &&
    addRequestStatus === 'idle';

  const onSavePostClicked = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewPost(formData)).unwrap();
        setFormData({ title: '', body: '', userId: '' });
        navigate("/");
      } catch (error) {
        console.log('failed to save post ', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          value={formData.title}
          type="text"
          id="postTitle"
          name="title"
          onChange={(e) => handleInput(e)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          value={formData.userId}
          name="userId"
          id="postAuthor"
          onChange={(e) => handleInput(e)}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          value={formData.body}
          id="postContent"
          name="body"
          onChange={(e) => handleInput(e)}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
