import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../../config";
import { useAuthOwner } from "../../Context";
import { Autocomplete } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const lat = "-34.408909";
  const lon = "150.885437";
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthOwner();
  const [categories, setCategories] = React.useState([]);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const handleAutoCompleteChange = (e, val) => {
    setSelectedCategory(val);
    // console.log(selectedCategory);
  };
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/categories`, {});

      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      throw error;
    }
  };
  const handleRegister = async (
    name,
    email,
    phone,
    des,
    abn,
    banking,
    location,
    lat,
    lon,
    categories,
    password
  ) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/owner/register`,
        {
          name,
          email,
          phone,
          des,
          abn,
          banking,
          location,
          lat,
          lon,
          categories,
          password,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      console.log(response.data);
      alert("create successful");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const phone = data.get("phone");
    const des = data.get("description");
    const abn = data.get("abn");
    const banking = data.get("banking");
    const location = data.get("location");
    const categories = selectedCategory
      .map((option) => option.categoryCode)
      .toString();
    const password = data.get("password");

    console.log(
      name,
      email,
      phone,
      des,
      abn,
      banking,
      location,
      lat,
      lon,
      "categories:",
      categories,
      password
    );
    handleRegister(
      name,
      email,
      phone,
      des,
      abn,
      banking,
      location,
      lat,
      lon,
      categories,
      password
    );
    navigate("/");
  };

  React.useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Description"
                  name="description"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="ABN"
                  name="abn"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Banking"
                  name="banking"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Location"
                  name="location"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  name="categories"
                  multiple
                  options={categories}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.categoryName}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} key={option.categoryCode}  >
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.categoryName}
                    </li>
                  )}
                  onChange={handleAutoCompleteChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categories"
                      placeholder="Categories"
                    />
                  )}
                  style={{ width: 500 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
