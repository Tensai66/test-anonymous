import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NoComments = styled.p`
  color: #777;
  font-style: italic;
  text-align: center;
  padding: 0.5rem;
`;

const CommentList = ({ comments, updateCommentVotes }) => {
  if (!comments || comments.length === 0) {
    return <NoComments>No comments yet. Be the first to comment!</NoComments>;
  }

  return (
    <CommentsContainer>
      {comments.map(comment => (
        <CommentItem 
          key={comment._id} 
          comment={comment} 
          updateCommentVotes={updateCommentVotes} 
        />
      ))}
    </CommentsContainer>
  );
};

export default CommentList;
