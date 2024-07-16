import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Avatar, Typography } from "@mui/material";
import CircularProgress from '@mui/joy/CircularProgress';
import '../UploadPhoto/Uploadphoto.css';
import { UploadUserPhoto } from "../Services/UserServices";

export default function UploadPhoto() {
  const [open, setOpen] = React.useState(false);
  const localdata = localStorage.getItem("signInResponse");
  const result = JSON.parse(localdata);
  const[loading,setLoading] = React.useState(false);
  const[imageData, setImageData] = React.useState({
    userid: result.userId,
    image: null,
  });
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
  const handlefile = async (e) =>{
    setImageData((prevdata) => ({
        ...prevdata,
        image: e.target.files[0],
      }));
     
  }

  const[photo, setPhoto] = React.useState('');

  React.useEffect(()=>{
    const myfunction = async ()=>{

    if(imageData.image !== null)
    {
      const formData = new FormData();
      for (let key in imageData) {
        formData.append(key, imageData[key]);
      }
    try{
      setLoading(true);
        let response = await UploadUserPhoto(formData);
        setPhoto(response.data.data);
        if(response.data.success)
        {
          setLoading(false);
        }
        localStorage.setItem("userPhoto",response.data.data
      );
    }
    catch(error)
    {
        console.log(error);
    }
  }
    }
    myfunction();
  }, [imageData],[2000])
  

  return (
    <React.Fragment>
      <span variant="outlined" color="danger" onClick={() => setOpen(true)}>
        Upload Photo
      </span>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography>Upload Photo</Typography>
          <div className="uploadphoto">
          <Avatar src={localStorage.getItem("userPhoto")} id="img-up"/>
          <div className="uploadphoto-l">
            {loading &&
          <CircularProgress/>
            }
          </div>
          </div><br />
          <div className="up-div">
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-10}
          >
            <CloudUploadIcon/>
            Upload file
            <VisuallyHiddenInput type="file" onChange={handlefile}/>
          </Button>
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-10}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          </div>
         
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
