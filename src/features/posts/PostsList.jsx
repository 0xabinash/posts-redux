import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { selectPostIds, getPostsStatus, getPostsError } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  //Indexes
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const postsToShow = orderedPostIds.slice(firstIndex, lastIndex);

  const handleBtnClick = (e) => {
    if (e.target.name === 'next') {
      setCurrentPage((prev) => prev + 1);
    }

    if (e.target.name === 'previous') {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setTotalPages(Math.ceil(orderedPostIds.length / postsPerPage));
    console.log('tp->', totalPages);
  }, [orderedPostIds, postsPerPage]);

  let content;
  if (postsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postsStatus === 'succeeded') {
    content = postsToShow.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <>
      <section className="container__posts">{content}</section>
      <div className="pagination__btn">
        <button
          disabled={currentPage <= 1}
          name="previous"
          className="prev__btn"
          onClick={handleBtnClick}
        >
          ⏮ Prev
        </button>
        <span className="current__page">{currentPage}</span>
        <button
          disabled={currentPage >= totalPages}
          name="next"
          className="next__btn"
          onClick={handleBtnClick}
        >
          Next ⏭
        </button>
      </div>
    </>
  );
};

export default PostsList;
