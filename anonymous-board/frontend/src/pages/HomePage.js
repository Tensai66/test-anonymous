import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PostItem from '../components/PostItem';
import PostForm from '../components/PostForm';
import API_BASE_URL from '../config/api';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  color: var(--text-color);
  margin-bottom: 1rem;
`;

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/posts`);
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const addNewPost = (post) => {
    setPosts([post, ...posts]);
  };

  const updatePostVotes = (id, updatedPost) => {
    setPosts(posts.map(post => post.id === id ? updatedPost : post));
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <HomePageContainer>
      <Title>Anonymous Posting Board</Title>
      <PostForm addNewPost={addNewPost} />
      <PostsContainer>
        {posts.map(post => (
          <PostItem 
            key={post.id} 
            post={post} 
            updatePostVotes={updatePostVotes}
            showFullComments={false}
          />
        ))}
      </PostsContainer>
    </HomePageContainer>
  );
};

export default HomePage;
