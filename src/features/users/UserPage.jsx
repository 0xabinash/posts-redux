import { useSelector } from 'react-redux';
import {
  selectAllUsers,
  selectUserById,
} from '../users/usersSlice';
import { NavLink, useParams } from 'react-router-dom';
import { selectAllPosts, selectAllPostsMemoized } from '../posts/postsSlice';

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, Number(userId)));

  // const postsForUser = useSelector((state)=>{
  //   const {posts: allPosts} = selectAllPosts(state);
  //   console.log("a->",allPosts)
  //   return allPosts.filter((post)=> post.userId === Number(userId));
  // })

  const postsForUser = useSelector((state) =>
    selectAllPostsMemoized(state, Number(userId))
  );
  console.log('pu->', postsForUser);

  const postTitles = postsForUser.map((post) => {
    return (
      <li key={post.id}>
        <NavLink to={`/post/${post.id}`}>{post.title}</NavLink>
      </li>
    );
  });

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
