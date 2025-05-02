import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';

function NoteEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchNote();
    }
  }, [id]);

  const fetchNote = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching note:', error);
      setError('노트를 불러오는데 실패했습니다.');
      return;
    }

    setTitle(data.title);
    setContent(data.content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const { error } = await supabase
          .from('notes')
          .update({ title, content })
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('notes')
          .insert([{ title, content, user_id: user.id }]);

        if (error) throw error;
      }
      navigate('/');
    } catch (err) {
      setError('노트 저장에 실패했습니다.');
      console.error('Error saving note:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {id ? '노트 수정' : '새 노트'}
          </Typography>
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
              multiline
              rows={10}
              required
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{ mr: 2 }}
              >
                취소
              </Button>
              <Button type="submit" variant="contained">
                저장
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default NoteEditor; 