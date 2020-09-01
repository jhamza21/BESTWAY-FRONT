import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  camera: {
    color: "orange",
  },
  avatar: {
    width: 200,
    height: 200
  },
  outlinedLabel: {
    '&.MuiInputLabel-outlined.Mui-focused': {
      color: 'orange'
    },
  },
  outlined: {
    '&.MuiOutlinedInput-adornedEnd': {
      '&.Mui-focused fieldset': {
        border: '2px solid orange'
      }
    },
  },
  textField: {
    '& label.Mui-focused': {
      color: 'orange',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        border: '2px solid orange'
      }
    }
  },
  form: {
    '& > *': {
      margin: '1%',
      width: '48%',
    },
  },
  expanded: {
    width: '100%',
    margin: '1%'
  },
  authForm: {
    '& > *': {
      margin: theme.spacing(2),
      width: '100%',
    },
  },
  buttonSubmit: {
    color: "white",
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  },
  activeToolbarButton: {
    color: "orange",
    borderBottom: "3px solid orange",
    width: 300,
  },
  toolbarButton: {
    width: 300,
    color: "black",
    '&:hover': {
      color: "orange",
    },
  },
  buttonUpload: {
    backgroundColor: "white",
    color: "orange",
    border: 'solid 1px',
    borderColor: orange[500],
    '&:hover': {
      borderColor: orange[700],
      backgroundColor: "white",
    },
  },
  buttonUploadLarge: {
    marginTop: 20,
    width: 250,
    backgroundColor: "white",
    color: "orange",
    border: 'solid 1px',
    borderColor: orange[500],
    '&:hover': {
      borderColor: orange[700],
      backgroundColor: "white",
    },
  },


  updateButton: {
    color: "black",
    cursor: 'pointer',
    '&:hover': {
      color: "orange",
    },
  },
  deleteButton: {
    color: "black",
    cursor: 'pointer',
    '&:hover': {
      color: "red",
    },
  },
  detailsButton: {
    color: "black",
    cursor: 'pointer',
    '&:hover': {
      color: "blue",
    },
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      color: orange[700]
    },
  },
}));
export default useStyles;