import React, { useState } from "react";
import { Button, Menu, MenuItem, Avatar, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExitToApp, AccountCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/users/userActions"
import { withStyles } from '@material-ui/core/styles';
import history from "../../services/history"
import "./style.css";
const StyledMenu = withStyles({
  paper: {
    width: "200px",
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: "orange",
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);



export default function AuthOptions() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <div className="userName">
          {user.data && user.data.name}
        </div>
        <Avatar alt={user.data && user.data.name} src={user.data && process.env.REACT_APP_BASE_URL.replace('api/', '') + user.data.image} />
      </Button>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => { history.push('/profile'); handleClose() }}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => { dispatch(logOut()); handleClose() }}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
