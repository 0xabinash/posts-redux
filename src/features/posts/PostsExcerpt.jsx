import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostsExcerpt = ({ postId })=>{

  const post = useSelector((state) => selectPostById(state, postId));

  return(
    <article>
        <h3 className="post__title">{post.title}</h3>
        <p className="excerpt">{post.body.substring(0, 75)}...</p>
        <p className="postCredit">
          <NavLink className="nav__link" to={`post/${post.id}`}>View post</NavLink>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
    </article>
  )
}

export default PostsExcerpt;