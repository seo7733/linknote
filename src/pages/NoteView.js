import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
} from '@mui/material';

function NoteView() {
  const [note, setNote] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchNote();
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

    if (data.user_id !== user.id) {
      setError('접근 권한이 없습니다.');
      return;
    }

    setNote(data);
  };

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
              돌아가기
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  if (!note) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography>로딩 중...</Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">
              {note.title}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate(`/note/${id}/edit`)}
            >
              수정
            </Button>
          </Box>
          <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
            {note.content}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="caption" color="text.secondary">
              작성일: {new Date(note.created_at).toLocaleString()}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default NoteView; 