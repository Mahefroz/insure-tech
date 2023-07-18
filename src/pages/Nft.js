import React from "react";
import { File } from "web3.storage";
import { Web3Storage } from "web3.storage";
import { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  FormControl,
  FormHelperText,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useRouter } from "next/router";

import styles from "./nft.module.css";
import Premium from "./Premium";

function Nft() {
  const [submit, setSubmit] = useState(false);
  const [cid, setCid] = useState("");

  const router = useRouter();
  const [allUsers, setAllUsers] = useState([]);
  const [userLength, setUserLength] = useState(0);
  // const [user, setUser] = useState(value);
  const [user, setUser] = React.useState({
    userId: null,
    userName: "",
    userAge: "",
    carName: "",
    carRegNo: "",
    regRegion: null,
    carType: null,
    carMake: null,
    carYear: null,
    carPrice: "",
    driverLicense: "",
  });
  const [userPolicy, setUserPolicy] = React.useState({
    policyId: null,
    policyType: null,
    policyPayor: "",
    premiumAmount: null,
    orderStatus: null,
    premiumPaid: false,
    balance: null,
  });
  const insurance = [];
  const [validationError, setValidationError] = useState({
    _userId: false,
    _userName: false,
    _userAge: false,
    _userAgeInv: false,
    _carName: false,
    _carRegNo: false,
    _regRegion: false,
    _carType: false,
    _carMake: false,
    _carYear: false,
    _carPrice: false,
    _carPriceInv: false,
    _driverLicense: false,
    _policyType: false,
  });
  // const [userPolicy, setUserPolicy] = useState(Policy);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ2OWE0QWZiN0EyNEJDYjVkODg4NDkyNjdhMTU0Mzk2MEM4MDMzZEYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU3NTYwMDkyNDEsIm5hbWUiOiJJbnN1cmFuY2VCcm9rZXIifQ.MYDpt25pk5pJkoBMBBN8HJAbh5L64aHeZnlvdLiMTO0";

  const setId = async () => {
    let len = allUsers.length + 1;

    user_id = user_id + 1;
    console.log("Setting id", len);
    // await setUserLength(len);
    await setUser({ ...user, ["userId"]: len });
    await setUserPolicy({ ...userPolicy, ["policyId"]: len });
  };
  const handleChange = (prop) => async (event) => {
    console.log("Prop", prop, event.target.value);
    const err = "_" + prop;
    console.log("err", err);

    await setUser({ ...user, [prop]: event.target.value });

    if (prop === "userAge") {
      await setValidationError({
        ...validationError,
        ["_userAge"]: false,
        ["_userAgeInv"]: false,
      });
    } else if (prop === "carPrice") {
      await setValidationError({
        ...validationError,
        ["_carPrice"]: false,
        ["_carPriceInv"]: false,
      });
    } else {
      await setValidationError({ ...validationError, [err]: false });
    }
  };
  console.log("User dataaaa", user, userPolicy);

  const handleChangePolicy = async (event) => {
    console.log("Policy Type:", event.target.value);

    await setUserPolicy({ ...userPolicy, ["policyType"]: event.target.value });
    await setValidationError({ ...validationError, ["_policyType"]: false });
  };
  const handleSubmit = async () => {
    // const users = [];
    console.log("User Data", user, userPolicy);
    let validate = {
      _userName: false,
      _userAge: false,
      _userAgeInv: false,
      _carName: false,
      _carRegNo: false,
      _regRegion: false,
      _carType: false,
      _carMake: false,
      _carYear: false,
      _carPrice: false,
      _carPriceInv: false,
      _driverLicense: false,
      _policyType: false,
    };
    console.log("length", user.userName.length);

    if (user.userName.length === 0) {
      validate = { ...validate, _userName: true };
    } else {
      validate = { ...validate, _userName: false };
    }

    if (user.userAge.length === 0) {
      validate = { ...validate, _userAge: true };
    } else if (parseInt(user.userAge) < 18 || parseInt(user.userAge) > 90) {
      validate = { ...validate, _userAgeInv: true };
    } else {
      validate = { ...validate, _userAge: false };
    }

    if (user.carName.length == 0) {
      validate = { ...validate, _carName: true };
    } else {
      validate = { ...validate, _carName: false };
    }

    if (user.carRegNo.length === 0) {
      validate = { ...validate, _carRegNo: true };
    } else {
      validate = { ...validate, _carRegNo: false };
    }

    if (user.regRegion === null) {
      validate = { ...validate, _regRegion: true };
    } else {
      validate = { ...validate, _regRegion: false };
    }

    if (user.carType === null) {
      validate = { ...validate, _carType: true };
    } else {
      validate = { ...validate, _carType: false };
    }

    if (user.carMake === null) {
      validate = { ...validate, _carMake: true };
    } else {
      validate = { ...validate, _carMake: false };
    }

    if (user.carYear > Date() || user.carYear === null) {
      validate = { ...validate, _carYear: true };
    } else {
      validate = { ...validate, _carYear: false };
    }

    if (user.carPrice.length === 0) {
      validate = { ...validate, _carPrice: true };
    } else if (
      parseInt(user.carPrice) === 0 ||
      parseInt(user.carPrice) < 1000
    ) {
      validate = { ...validate, _carPriceInv: true };
    } else {
      validate = { ...validate, _carPrice: false };
    }

    if (user.driverLicense.length === 0 || user.driverLicense === null) {
      validate = { ...validate, _driverLicense: true };
    } else {
      validate = { ...validate, _driverLicense: false };
    }
    if (userPolicy.policyType === null) {
      validate = { ...validate, _policyType: true };
    } else {
      validate = { ...validate, _policyType: false };
    }

    await setValidationError(validate);
    if (
      user.userName.length === 0 ||
      parseInt(user.userAge) < 18 ||
      user.userAge.length === 0 ||
      user.carRegNo.length === 0 ||
      user.regRegion === null ||
      user.carType === null ||
      user.carMake === null ||
      user.carYear > Date() ||
      user.carYear === null ||
      user.carPrice.length === 0 ||
      parseInt(user.carPrice) === 0 ||
      user.driverLicense.length === 0 ||
      user.driverLicense === null ||
      userPolicy.policyType === null
    ) {
      console.log("Payload", user, validate);
      return;
    }

    calculatePremium();
    // users.push(user);
    // users.push(userPolicy);
    // console.log("user date", user.carYear.$d);
    // router.push({
    //   pathname: "/Premium",
    //   query: { data: user, data2: user.carYear.$d },
    // });
    // users.push(user);

    // console.log("All users", users);
    // const metadata = makeFileObjects();
    // console.log("Returned files", getFiles);
    // storeFiles(metadata);
    // await setAllUsers([...allUsers, ...users]);
    // await setUser({
    //   userId: null,
    //   userName: "",
    //   userAge: "",
    //   carName: "",
    //   carRegNo: "",
    //   regRegion: null,
    //   carType: null,
    //   carMake: null,
    //   carYear: null,
    //   carPrice: "",
    //   driverLicense: "",
    // });
    // await setValidationError({
    //   _userId: false,
    //   _userName: false,
    //   _userAge: false,
    //   _carName: false,
    //   _carRegNo: false,
    //   _regRegion: false,
    //   _carType: false,
    //   _carMake: false,
    //   _carYear: false,
    //   _carPrice: false,
    //   _driverLicense: false,
    // });
    // await setUserPolicy({
    //   policyId: null,
    //   policyType: null,
    //   policyPayor: "",
    //   premiumAmount: "",
    //   orderStatus: "",
    //   premiumPaid: "",
    //   balance: "",
    // });
    // console.log("checking state", user);
  };

  const calculatePremium = async () => {
    // const users = [];
    console.log("User Info", user, userPolicy);
    let fl_premium;
    let comp_premium;
    let base_price;
    let c_age;
    let c_region;
    //Third Party Liability Insurance
    if (userPolicy.policyType === 0) {
      if (user.carMake === 0) {
        fl_premium = 2094;
      } else if (user.carMake === 1) {
        fl_premium = 3416;
      } else if (user.carMake === 2) {
        fl_premium = 7897;
      }
      console.log("fl premium", fl_premium);
      // emit premium(fl_premium);
      await setUserPolicy({
        ...userPolicy,
        premiumAmount: fl_premium,
        policyPayor: user.userName,
        orderStatus: 0,
        premiumPaid: false,
        balance: fl_premium,
      });
      setSubmit(true);
      // await setUserPolicy({ ...userPolicy, ["premiumAmount"]: fl_premium });
    }

    if (userPolicy.policyType === 1) {
      //base
      if (
        parseInt(user.carPrice) < 100000 ||
        parseInt(user.carPrice) === 100000
      ) {
        base_price = parseInt(user.carPrice) * 0.0325;
      } else if (
        parseInt(user.carPrice) > 100000 &&
        parseInt(user.carPrice) < 300000
      ) {
        base_price = parseInt(user.carPrice) * 0.03;
      } else if (parseInt(user.carPrice) === 300000) {
        base_price = parseInt(user.carPrice) * 0.0275;
      } else if (
        parseInt(user.carPrice) > 300000 &&
        parseInt(user.carPrice) < 10000000
      ) {
        base_price = parseInt(user.carPrice) * 0.0275;
      } else if (
        parseInt(user.carPrice) === 10000000 ||
        parseInt(user.carPrice) > 10000000
      ) {
        base_price = parseInt(user.carPrice) * 0.025;
      }
      console.log("Base Price", base_price);

      //age wise
      if (parseInt(user.userAge) === 18) {
        c_age = base_price * 0.35;
      } else if (
        (parseInt(user.userAge) > 18 && parseInt(user.userAge) < 22) ||
        parseInt(user.userAge) === 22
      ) {
        c_age = base_price * 0.35;
      } else if (parseInt(user.userAge) > 22 && parseInt(user.userAge) < 26) {
        c_age = base_price * 0.25;
      } else if (parseInt(user.userAge) > 26 && parseInt(user.userAge) < 31) {
        c_age = base_price * 0.15;
      } else if (parseInt(user.userAge) > 30 && parseInt(user.userAge) < 61) {
        base_price = base_price - base_price * 0.1;
      }
      // console.log("Base Price Age ", base_price);
      console.log("Age Price", c_age);
      //car type
      if (user.carType === 0) {
        base_price = base_price - base_price * 0.1;
      }
      //sports
      else if (user.carType === 1) {
        base_price = base_price + base_price * 0.2;
      }
      console.log("New base price", base_price);

      //region
      if (user.regRegion === 0) {
        c_region = base_price * 0.05;
      } else if (user.regRegion === 1) {
        c_region = 0;
      }
      console.log("Region Price", c_region);

      comp_premium = Math.round(base_price + c_age + c_region, 2);
      console.log("Comprehensive", comp_premium);
      await setUserPolicy({
        ...userPolicy,
        premiumAmount: comp_premium,
        policyPayor: user.userName,
        orderStatus: 0,
        premiumPaid: false,
        balance: comp_premium,
      });
      setSubmit(true);
      // await setAllUsers([...allUsers, ...users]);
    }
  };
  console.log("Policy update", user, userPolicy);

  // const purchase = async () => {
  //   setSubmit(false);
  //   const users = [];
  //   users.push({ user, userPolicy });
  //   // users.push(userPolicy);
  //   await setAllUsers([...allUsers, ...users]);
  //   // console.log("metadata details", users);

  //   const metadata = makeFileObjects();
  //   console.log("Returned files", metadata);
  //   await storeFiles(metadata);
  //   console.log("CID in prop", cid);
  // };

  // const getAccessToken = () => {
  //   return token;
  // };

  // const makeStorageClient = () => {
  //   return new Web3Storage({ token: getAccessToken() });
  // };

  // let user_id = 0;
  // const user1 = Object.create(User);
  // const p1 = Object.create(Policy);

  // const makeFileObjects = () => {
  //   console.log("Mapping data", user, userPolicy);
  //   const user_obj = user;
  //   const p_obj = userPolicy;

  //   //   const obj = { data };
  //   const buffer1 = Buffer.from(JSON.stringify(user_obj));
  //   const buffer2 = Buffer.from(JSON.stringify(p_obj));
  //   const f_name = user.userId + ".json";
  //   console.log("filename", f_name);
  //   const files = [
  //     // new File(["contents-of-file-1"], "plain-utf8.txt"),
  //     new File([buffer1, buffer2], f_name),
  //   ];
  //   // console.log("Files", files);
  //   return files;
  // };

  // const storeFiles = async (files) => {
  //   console.log("Users in store", user);
  //   const client = makeStorageClient();
  //   const c_id = await client.put(files);
  //   console.log("stored metadata with cid:", c_id);
  //   if (c_id != undefined) {
  //     await setCid(c_id);
  //   }
  //   router.push({
  //     pathname: "/Mint",
  //     query: {
  //       metadata: c_id,
  //       id: user.userId,
  //       name: user.userName,
  //       cname: user.carName,
  //       price: user.carPrice,
  //       policy: userPolicy.policyType,
  //       premium: userPolicy.premiumAmount,
  //     },
  //   });
  // return cid;
  // };
  // useEffect(() => {
  //   makeStorageClient();
  //   setId();
  // }, [allUsers]);
  // useEffect(() => {
  //   // makeStorageClient();
  //   setId();
  // }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sub}>
        <h1>Insure Tech</h1>
        <h2 style={{ color: "blue" }}>Enter User Information</h2>
        <FormControl style={{ marginTop: "20px" }}>
          <Box className={styles.form}>
            <Box>
              <TextField
                style={{ margin: "10px 10px 0px 10px" }}
                variant="outlined"
                size="small"
                placeholder="Full Name"
                onChange={handleChange("userName")}
                value={user.userName}
                error={validationError._userName}
              />
              {validationError._userName && (
                <FormHelperText
                  sx={{ fontSize: "9px", color: "red", marginTop: "0px" }}
                >
                  Username is required
                </FormHelperText>
              )}
            </Box>
            <Box>
              <TextField
                style={{ margin: "10px 10px 0px 10px" }}
                variant="outlined"
                size="small"
                placeholder="Age"
                onChange={handleChange("userAge")}
                value={user.userAge}
                error={validationError._userAge || validationError._userAgeInv}
              />
              {validationError._userAge && (
                <FormHelperText
                  sx={{ fontSize: "9px", color: "red", marginTop: "0px" }}
                >
                  Age is required
                </FormHelperText>
              )}
              {validationError._userAgeInv && (
                <FormHelperText
                  sx={{ fontSize: "9px", color: "red", marginTop: "0px" }}
                >
                  Less than 18 or greater than 90 years cannot attain a policy
                </FormHelperText>
              )}
            </Box>
          </Box>
          <Box className={styles.form}>
            <Box>
              <TextField
                style={{ margin: "10px 10px 0px 10px" }}
                variant="outlined"
                size="small"
                placeholder="Car Name"
                onChange={handleChange("carName")}
                value={user.carName}
                error={validationError._carName}
              />
              {validationError._carName && (
                <FormHelperText
                  sx={{ fontSize: "9px", color: "red", marginTop: "0px" }}
                >
                  Carname is required
                </FormHelperText>
              )}
            </Box>
            <Box>
              <TextField
                style={{ margin: "10px 10px 0px 10px" }}
                variant="outlined"
                size="small"
                placeholder="Car Registration No"
                onChange={handleChange("carRegNo")}
                value={user.carRegNo}
                error={validationError._carRegNo}
              />
              {validationError._carRegNo && (
                <FormHelperText
                  sx={{ fontSize: "9px", color: "red", marginTop: "0px" }}
                >
                  Car Reg No is required
                </FormHelperText>
              )}
            </Box>
          </Box>
          <Box className={styles.form}>
            <FormControl
              size="small"
              // fullwidth
              style={{ maxWidth: 50, minWidth: "46%", margin: "10px" }}
            >
              <InputLabel id="reg-region">Registration Region</InputLabel>
              <Select
                labelId="reg-region"
                id="reg-region"
                // value={age}
                label="Registration Region"
                onChange={handleChange("regRegion")}
                value={user.regRegion}
                error={validationError._regRegion}
              >
                <MenuItem value={0}>Northern Emirates / Abu Dhabi</MenuItem>
                <MenuItem value={1}>Dubai</MenuItem>
              </Select>
              {validationError._regRegion && (
                <FormHelperText
                  sx={{
                    fontSize: "9px",
                    color: "red",
                    marginTop: "0px",
                    marginLeft: "0px",
                  }}
                >
                  Region is required
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              size="small"
              // fullwidth
              style={{ maxWidth: 50, minWidth: "46%", margin: "10px" }}
            >
              <InputLabel id="car-type">Car Type</InputLabel>
              <Select
                labelId="car-type"
                id="car-type"
                // value={age}
                label="Car Type"
                onChange={handleChange("carType")}
                value={user.carType}
                error={validationError._carType}
              >
                <MenuItem value={0}>SUV/Other</MenuItem>
                <MenuItem value={1}>Sports</MenuItem>
              </Select>
              {validationError._carType && (
                <FormHelperText
                  sx={{
                    fontSize: "9px",
                    color: "red",
                    marginTop: "0px",
                    marginLeft: "0px",
                  }}
                >
                  Car Type is required
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box className={styles.form}>
            <FormControl
              size="small"
              // fullwidth
              style={{ maxWidth: 50, minWidth: "46%", margin: "10px" }}
              // style={{ width: "55%", margin: "10px" }}
            >
              <InputLabel id="car-make">Car Make</InputLabel>
              <Select
                labelId="car-make"
                id="car-make-select"
                // value={age}
                label="Car make"
                // style={{ maxWidth: "46%", minWidth: "46%", margin: "10px" }}
                onChange={handleChange("carMake")}
                value={user.carMake}
              >
                <MenuItem value={0}>Less than or equal to 1000cc</MenuItem>
                <MenuItem value={1}>
                  Greater than 1000cc and Less than 1500cc{" "}
                </MenuItem>
                <MenuItem value={2}>Greater than 1000cc</MenuItem>
              </Select>
              {validationError._carMake && (
                <FormHelperText
                  sx={{
                    fontSize: "9px",
                    color: "red",
                    marginTop: "0px",
                    marginLeft: "0px",
                  }}
                >
                  Car Make is required
                </FormHelperText>
              )}
            </FormControl>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  size="small"
                  label="Year of Purchase"
                  maxDate={new Date()}
                  // selected={user.carYear}
                  value={user.carYear}
                  // onChange={handleChange("carYear")}
                  onChange={(newValue) => {
                    // setValue(newValue);
                    // handleChange("carYear");
                    setUser({
                      ...user,
                      ["carYear"]: newValue,
                      // ["carYear"]: new Date(newValue).toLocaleDateString("fr-FR"),
                      // newValue.toLocaleDateString("fr-FR"),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      style={{ margin: "10px 10px 0px 10px" }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>

              {validationError._carYear && (
                <FormHelperText
                  sx={{ fontSize: "9px", color: "red", marginTop: "0px" }}
                >
                  Invalid Year of purchase
                </FormHelperText>
              )}
            </Box>
          </Box>
          <Box className={styles.form}>
            <Box>
              <TextField
                style={{ margin: "10px 10px 0px 10px" }}
                variant="outlined"
                size="small"
                placeholder="Car Price"
                onChange={handleChange("carPrice")}
                value={user.carPrice}
              />
              {validationError._carPrice && (
                <FormHelperText
                  sx={{ fontSize: "9px", color: "red", marginTop: "0px" }}
                >
                  Car price is required
                </FormHelperText>
              )}
              {validationError._carPriceInv && (
                <FormHelperText
                  sx={{ fontSize: "9px", color: "red", marginTop: "0px" }}
                >
                  Invalid Car Price
                </FormHelperText>
              )}
            </Box>
            <Box>
              <TextField
                style={{ margin: "10px 10px 0px 10px" }}
                variant="outlined"
                size="small"
                placeholder="Driving License Number"
                onChange={handleChange("driverLicense")}
                value={user.driverLicense}
              />
              {validationError._driverLicense && (
                <FormHelperText
                  sx={{ fontSize: "9px", color: "red", marginTop: "0px" }}
                >
                  Driver License number is required
                </FormHelperText>
              )}
            </Box>
          </Box>
          <Box className={styles.form}>
            <FormControl
              size="small"
              // fullwidth
              style={{ width: "100%", margin: "10px" }}
            >
              <InputLabel id="policy-type">Policy Type</InputLabel>
              <Select
                labelId="policy-type"
                id="policy-type-select"
                // value={age}
                label="Policy Type"
                onChange={handleChangePolicy}
                value={userPolicy.policyType}
              >
                <MenuItem value={0}>
                  Third Party Liability Insurance Policy
                </MenuItem>
                <MenuItem value={1}>Comprehensive Insurance Policy</MenuItem>
              </Select>
              {validationError._policyType && (
                <FormHelperText
                  sx={{
                    fontSize: "9px",
                    color: "red",
                    marginTop: "0px",
                    marginLeft: "0px",
                  }}
                >
                  Policy Type is required
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Button
            size="small"
            variant="contained"
            style={{ margin: "10px" }}
            onClick={() => {
              handleSubmit();
              // router.push({
              //   pathname: "/Premium",
              //   query: user,
              // });
            }}
          >
            Calculate Premium
          </Button>
        </FormControl>
        <Box>
          {submit === true ? (
            <h2 align="center" style={{ marginTop: "20px" }}>
              Premium Details
            </h2>
          ) : (
            ""
          )}
          {submit === true ? (
            <div style={{ marginTop: "20px" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>ID</TableCell> */}
                      <TableCell>User Name</TableCell>
                      <TableCell>Car Name</TableCell>
                      <TableCell>Car Price</TableCell>
                      <TableCell>Insurance Policy</TableCell>
                      <TableCell>Premium </TableCell>
                      <TableCell>Purchase Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      // key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {/* <TableCell component="th" scope="row">
                      {userPolicy.policyId}
                    </TableCell> */}
                      <TableCell component="th" scope="row">
                        {userPolicy.policyPayor}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.carName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.carPrice} -AED
                      </TableCell>
                      <TableCell
                        style={{ width: "50px" }}
                        component="th"
                        scope="row"
                      >
                        {userPolicy.policyType === 0
                          ? "Third-Party Liability Insurance"
                          : "Comprehensive Car Insurance"}
                      </TableCell>
                      <TableCell
                        style={{ color: "orange" }}
                        component="th"
                        scope="row"
                      >
                        {userPolicy.premiumAmount} AED
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {userPolicy.orderStatus === 0 ? (
                          <Typography style={{ color: "red" }}>
                            Pending
                          </Typography>
                        ) : (
                          <Typography style={{ color: "green" }}>
                            Purchased
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button
                          className={styles.buy}
                          variant="standard"
                          onClick={() => {
                            console.log("proceeding user", allUsers);
                            router.push({
                              pathname: "/Mint",
                              query: {
                                udata: JSON.stringify(user),
                                pdata: JSON.stringify(userPolicy),
                              },
                            });
                          }}
                        >
                          Proceed
                        </Button>
                      </TableCell>
                    </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            ""
          )}
        </Box>
      </div>
    </div>
  );
}

export default Nft;
