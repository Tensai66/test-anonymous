import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CommentContainer = styled.div`
  background-color: var(--background-color);
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CommentContent = styled.div`
  font-size: 1rem;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
`;

const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777;
  font-size: 0.8rem;
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
  padding: 3px 6px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VoteCount = styled.span`
  font-weight: bold;
  min-width: 25px;
  text-align: center;
`;

const CommentItem = ({ comment, updateCommentVotes }) => {
  const handleVote = async (type) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/comments/${comment._id}/${type}`);
      updateCommentVotes(comment._id, res.data);
    } catch (err) {
      console.error(`Error ${type}ing comment:`, err);
    }
  };

  return (
    <CommentContainer>
      <CommentContent>{comment.content}</CommentContent>
      <CommentMeta>
        <Timestamp>
          {new Date(comment.createdAt).toLocaleString()}
        </Timestamp>
        <VoteContainer>
          <VoteButton upvote onClick={() => handleVote('upvote')}>
            ▲ {comment.upvotes}
          </VoteButton>
          <VoteButton onClick={() => handleVote('downvote')}>
            ▼ {comment.downvotes}
          </VoteButton>
        </VoteContainer>
      </CommentMeta>
    </CommentContainer>
  );
};

export default CommentItem;
