import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout, updateProfileImage } from '../features/auth/authSlice';
import axios from 'axios';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      

      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: '424797ecb7462e72c13d',
          pinata_secret_api_key: 'babe39519849e0a6db20c8b59e008b306079ee202585454043bf844f0abcb54e',
        },
      });

      const ipfsHash = response.data.IpfsHash;

      // Update the user's profile with new image
      dispatch(updateProfileImage({ id: user?.id, profileImage: ipfsHash }));
      
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Task Manager
       
        </Typography>
        <Box>
          {user ? (
            <>
              <Typography component="span" sx={{ mr: 2 , display:'inline-flex'}}>
                Welcome,
                <IconButton component="label">
             <Avatar src={`https://gateway.pinata.cloud/ipfs/${user?.profileImage}`} sx={{ml:"10px" , mr:"10px" , mt:"-10px"}} />
             <input type="file" hidden onChange={handleFileChange} />
             </IconButton>
                 {user?.username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
