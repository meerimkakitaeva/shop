import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Grid, TextField,} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import {IItemMutation} from '../../../types';
import {selectUser} from '../../users/usersSlice';
import FileInput from '../../../components/FileInput/FileInput';
import {selectCreateLoading} from "../itemsSlice";
import {createItem} from "../itemsThunk";

const ItemForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreateLoading);

  const user = useAppSelector(selectUser);

  let userId;

  if (user !== null && user !== undefined) {
    userId = user._id;
  } else {
    userId = null;
  }

  const [state, setState] = useState<IItemMutation>({
    user: userId,
    title: '',
    description: '',
    price: 0,
    image: null,
    category: '',
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.title || !state.price || !state.category) {
      alert('Please fill in all required fields');
      return;
    }

    if (state.price < 0) {
      alert("Price can't be a negative number");
      return;
    }

    await dispatch(createItem(state));
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  }

  return (
    <>


      <form
        autoComplete="off"
        onSubmit={submitFormHandler}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              id="title" label="Title"
              value={state.title}
              onChange={inputChangeHandler}
              name="title"
              sx={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs>
            <TextField
                id="price" label="Price"
                value={state.price}
                onChange={inputChangeHandler}
                name="price"
                sx={{ width: '100%' }}
            />
          </Grid>


          <Grid item xs>
            <TextField
                id="category" label="Category"
                value={state.category}
                onChange={inputChangeHandler}
                name="category"
                sx={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs>
            <TextField
              multiline rows={3}
              id="description" label="Description"
              value={state.description}
              onChange={inputChangeHandler}
              name="description"
              sx={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs>
            <FileInput
              onChange={filesInputChangeHandler}
              name="image"
              label="image"
            />
          </Grid>

          <Grid item xs>
            <LoadingButton
              type="submit"
              size="small"
              endIcon={<SendIcon/>}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Send</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ItemForm;