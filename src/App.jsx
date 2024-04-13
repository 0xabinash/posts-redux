import './App.css';
import { lazy } from 'react';

//Normal imports
import PostsList from './features/posts/PostsList';
// import AddPostForm from './features/posts/AddPostForm';
// import SinglePostPage from './features/posts/SinglePostPage';
// import EditPostForm from './features/posts/EditPostForm';
// import UserPage from './features/users/UserPage';
// import UsersList from './features/users/UsersList';

//Lazy loading imports
const AddPostForm = lazy(() => import('./features/posts/AddPostForm'));
const SinglePostPage = lazy(() => import('./features/posts/SinglePostPage'));
const EditPostForm = lazy(() => import('./features/posts/EditPostForm'));
const UserPage = lazy(() => import('./features/users/UserPage'));
const UsersList = lazy(() => import('./features/users/UsersList'));
import Layout from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      //Home route
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        //Nested Post routes
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
        //Nested User routes
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
        //Direct back to home if page doesn't exist
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
