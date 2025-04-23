import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const FormContainer = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  margin-bottom: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(106, 140, 175, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem;
  align-self: flex-end;
  font-weight: 600;
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const PostForm = ({ addNewPost }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await axios.post(`${API_BASE_URL}/api/posts`, { content });
      addNewPost(res.data);
      setContent('');
    } catch (err) {
      console.error('Error creating post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <TextArea
          placeholder="What's on your mind? (Anonymous)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <SubmitButton type="submit" disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? 'Posting...' : 'Post Anonymously'}
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default PostForm;
