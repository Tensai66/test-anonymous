import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import PostItem from '../components/PostItem';
import API_BASE_URL from '../config/api';

const PostPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const BackButton = styled.button`
  background-color: var(--secondary-color);
  color: var(--text-color);
  align-self: flex-start;
  margin-bottom: 1rem;
`;

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/posts/${postId}`);
        setPost(res.data.post);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const updatePostVotes = (id, updatedPost) => {
    setPost(updatedPost);
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <PostPageContainer>
      <BackButton onClick={() => window.history.back()}>← Back</BackButton>
      <PostItem 
        post={post} 
        updatePostVotes={updatePostVotes}
        showFullComments={true}
      />
    </PostPageContainer>
  );
};

export default PostPage;
