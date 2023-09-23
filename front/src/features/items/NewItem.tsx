import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hook';
import { selectUser } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';
import ItemForm from './components/ItemForm';
import { Container, Typography } from '@mui/material';

const NewItem = () => {

  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mb: 3 }}>
        New item
      </Typography>
      <ItemForm/>
    </Container>
  );
};

export default NewItem;