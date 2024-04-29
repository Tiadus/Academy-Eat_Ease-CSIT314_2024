import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../Dashboard/Title";
import { useAuthOwner } from "../../Context";
import BACKEND_URL from "../../config";
import axios from "axios";
const Profile = () => {
  const { isAuthenticated, user, setUser } = useAuthOwner();
  const [name, setResName] = useState("");
  const [phone, setResPhone] = useState("");
  const [address, setResAddress] = useState("");
  const [description, setResDescription] = useState("");
  const [email, setResEmail] = useState("");
  const [abn, setResABN] = useState("");
  const [banking, setResBanking] = useState("");
  const [currPassWord, setCurrPassWord] = useState("");
  const [confirmPassWord, setConfirmPassWord] = useState("");

  const getOwnerInfo = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/owner/information`, {
        headers: {
          Authorization: isAuthenticated,
        },
      });

      console.log("Owner information: ", response.data);
      setUser(response.data);
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleEditName = async (newName) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/owner/edit/name`,
        {
          newName,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      console.log(response.data.message);
      getOwnerInfo();
      alert(response.data.message);
    } catch (e) {
      // alert("Error", e.message);
      console.log("Error", e);
    }
  };

  const handleEditPhone = async (newPhone) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/owner/edit/phone`,
        {
          newPhone,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      console.log(response.data);
      getOwnerInfo();
      alert(response.data.message);
    } catch (e) {
      // alert("Error", e.message);
      console.log("Error", e);
    }
  };

  const handleEditEmail = async (newEmail) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/owner/edit/email`,
        {
          newEmail,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      console.log(response.data);
      getOwnerInfo();
      alert(response.data.message);
    } catch (e) {
      // alert("Error", e.message);
      console.log("Error", e);
    }
  };

  //   NEED lat lon for this
  const handleEditAddress = async (newAddress) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/owner/edit/address`,
        {
          newAddress,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      console.log(response.data);
      getOwnerInfo();
      alert(response.data.message);
    } catch (e) {
      // alert("Error", e.message);
      console.log("Error", e);
    }
  };
  const handleEditPassword = async (newPassword, confirmPassWord) => {
    if (newPassword !== confirmPassWord) {
      return alert("Password mismatched");
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/owner/edit/password`,
        {
          newPassword,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      console.log(response.data);
      getOwnerInfo();
      alert(response.data.message);
    } catch (e) {
      // alert("Error", e.message);
      console.log("Error", e);
    }
  };

  const handleEditDesc = async (newDes) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/owner/edit/description`,
        {
          newDes,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      console.log(response.data);
      getOwnerInfo();
      alert(response.data.message);
    } catch (e) {
      // alert("Error", e.message);
      console.log("Error", e);
    }
  };

  const handleEditABN = async (newABN) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/owner/edit/abn`,
        {
          newABN,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      console.log(response.data);
      getOwnerInfo();
      alert(response.data.message);
    } catch (e) {
      // alert("Error", e.message);
      console.log("Error", e);
    }
  };

  const handleEditBanking = async (newBanking) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/owner/edit/banking`,
        {
          newBanking,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      console.log(response.data);
      getOwnerInfo();
      alert(response.data.message);
    } catch (e) {
      // alert("Error", e.message);
      console.log("Error", e);
    }
  };
  useEffect(() => {
    console.log(user);
    getOwnerInfo();
  }, []);

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Title>Details</Title>

      <Grid container spacing={2}>
        <Grid item xs={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setResName(e.target.value)}
              defaultValue={user.restaurantName}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => handleEditName(name)} variant="outlined">
              Save
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography>Phone</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setResPhone(e.target.value)}
              defaultValue={user.restaurantPhone}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => handleEditPhone(phone)} variant="outlined">
              Save
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography>Email</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setResEmail(e.target.value)}
              defaultValue={user.restaurantEmail}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => handleEditEmail(email)} variant="outlined">
              Save
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography>Address</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setResAddress(e.target.value)}
              defaultValue={user.restaurantLocation}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={() => handleEditAddress(address)}
              variant="outlined"
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography>Password</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setCurrPassWord(e.target.value)}
              placeholder="******"
              variant="outlined"
            />
          </Grid>
          {/* <Grid item xs={2}>
            <Button variant="outlined">Save</Button>
          </Grid> */}
        </Grid>
        <Grid item xs={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography>Confirm password</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setConfirmPassWord(e.target.value)}
              placeholder="******"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} marginBottom={2}>
          <Button onClick={()=>handleEditPassword(currPassWord, confirmPassWord)} variant="outlined">Save</Button>
        </Grid>
      </Grid>
      <Grid item xs={12} marginBottom={2}>
        <Typography>Description</Typography>
        <TextField
          onChange={(e) => setResDescription(e.target.value)}
          id="outlined-multiline-static"
          label=""
          multiline
          rows={4}
          defaultValue={user.restaurantDescription}
          fullWidth
          margin="normal"
        />
        <Button onClick={()=>handleEditDesc(description)} variant="outlined">Save</Button>
      </Grid>
      <Divider />
      <Title>Bank Details</Title>

      <Grid container spacing={2}>
        <Grid item xs={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography>ABN</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setResABN(e.target.value)}
              defaultValue={user.restaurantABN}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={()=>handleEditABN(abn)} variant="outlined">Save</Button>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography>Bank account</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setResBanking(e.target.value)}
              defaultValue={user.restaurantBanking}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={()=>handleEditBanking(banking)} variant="outlined">Save</Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
