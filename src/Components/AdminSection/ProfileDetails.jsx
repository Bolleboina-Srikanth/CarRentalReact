import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadPhoto from '../UploadPhoto/UploadPhoto';
import { useNavigate } from 'react-router-dom';
import loginicon from '../Images/loginicon.svg';
import orders from '../Images/ordersicon.svg';

export default function AccountMenu() {
    const navigate = useNavigate();
    const photo = localStorage.getItem("userPhoto");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const result = localStorage.getItem("signInResponse");
  const name = JSON.parse(result);
  const handleLogout = () => {
    localStorage.removeItem("signInResponse");
    navigate('/');
    localStorage.setItem("userPhoto", "");
  }

  const handlesignin = () =>{
    navigate('/signin');
  }

  const handleOrders = () =>{
    navigate('/orders', {state: ""});
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 34, height: 34 }}>{photo !== "" && <img src={photo} width={40} height={40}  alt="" />}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {result !== null ? <>
        <MenuItem >
          <Avatar>{photo !== "" && <img src={photo} width={40} height={40}  alt="" />}</Avatar>{name.name}
        </MenuItem>
        <MenuItem >
          <CloudUploadIcon />&nbsp; <UploadPhoto/>
        </MenuItem>
        {name.role == "Admin" ? "" : 
        <MenuItem>
        <><img src={orders} alt="" width={23}/> <span style={{cursor: "pointer"}} onClick={handleOrders}>&nbsp;&nbsp;Orders</span></>
        </MenuItem>
         }
        <Divider />
       
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem></> : 
        <MenuItem onClick={handlesignin}><img src={loginicon} alt="" /> &nbsp; Login</MenuItem>
        }
      </Menu>
    </React.Fragment>
  );
}
