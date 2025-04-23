import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import API_BASE_URL from '../config/api';

const PostContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777;
  font-size: 0.9rem;
`;

const Timestamp = styled.span`
  font-style: italic;
`;

const VoteContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VoteButton = styled.button`
  background-color: ${props => props.upvote ? 'var(--success-color)' : 'var(--danger-color)'};
  color: white;
  padding: 4px 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VoteCount = styled.span`
  font-weight: bold;
  min-width: 30px;
  text-align: center;
`;

const CommentsSection = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SeeMoreButton = styled.button`
  background-color: var(--secondary-color);
  color: var(--text-color);
  align-self: center;
  margin-top: 0.5rem;
`;

const PostItem = ({ post, updatePostVotes, showFullComments }) => {
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(showFullComments);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post.comments && post.comments.length > 0) {
      const fetchComments = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`${API_BASE_URL}/api/comments/post/${post._id}`);
          setComments(res.data);
        } catch (err) {
          console.error('Error fetching comments:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchComments();
    }
  }, [post._id, post.comments]);

  const handleVote = async (type) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/posts/${post._id}/${type}`);
      updatePostVotes(post._id, res.data);
    } catch (err) {
      console.error(`Error ${type}ing post:`, err);
    }
  };

  const addNewComment = (comment) => {
    setComments([comment, ...comments]);
  };

  const updateCommentVotes = (id, updatedComment) => {
    setComments(comments.map(comment => comment._id === id ? updatedComment : comment));
  };

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const displayComments = showAllComments ? comments : comments.slice(0, 3);
  const hasMoreComments = comments.length > 3;

  return (
    <PostContainer>
      <PostContent>{post.content}</PostContent>
      <PostMeta>
        <Timestamp>
          {new Date(post.createdAt).toLocaleString()}
        </Timestamp>
        <VoteContainer>
          <VoteButton upvote onClick={() => handleVote('upvote')}>
            ▲ {post.upvotes}
          </VoteButton>
          <VoteButton onClick={() => handleVote('downvote')}>
            ▼ {post.downvotes}
          </VoteButton>
        </VoteContainer>
      </PostMeta>

      <CommentsSection>
        <CommentForm postId={post._id} addNewComment={addNewComment} />
        
        {loading ? (
          <p>Loading comments...</p>
        ) : (
          <>
            <CommentList 
              comments={displayComments} 
              updateCommentVotes={updateCommentVotes} 
            />
            
            {hasMoreComments && (
              <SeeMoreButton onClick={toggleComments}>
                {showAllComments ? 'Hide Comments' : `See ${comments.length - 3} More Comments`}
              </SeeMoreButton>
            )}
          </>
        )}
      </CommentsSection>
    </PostContainer>
  );
};

export default PostItem;
