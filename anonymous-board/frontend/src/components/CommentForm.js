import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const FormContainer = styled.div`
  background-color: var(--background-color);
  padding: 1rem;
  border-radius: 6px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(106, 140, 175, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--secondary-color);
  color: var(--text-color);
  padding: 0.5rem 0.75rem;
  align-self: flex-end;
  font-weight: 600;
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CommentForm = ({ postId, addNewComment }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await axios.post(`${API_BASE_URL}/api/comments`, { 
        content,
        postId 
      });
      addNewComment(res.data);
      setContent('');
    } catch (err) {
      console.error('Error creating comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <TextArea
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <SubmitButton type="submit" disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? 'Posting...' : 'Comment'}
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default CommentForm;
