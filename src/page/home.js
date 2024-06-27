import React, { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputMask from 'react-input-mask';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';



// Thai month names array
const thaiMonths = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

const Home = () => {
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [idnation, setIdnation] = useState('');
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [format, setFormat] = useState('');
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({
    name: false,
    lastname: false,
    idnation: false,
    birthday: false,
    gender: false,
  });

  const handleLastnameChange = (event) => {
    const value = event.target.value;
    const isValid = /^[a-zA-Z\u0E00-\u0E7F\s]*$/.test(value); 
  
    if (isValid) {
      setLastname(value);
      setFormErrors({ ...formErrors, lastname: false });
    } else {
      setFormErrors({ ...formErrors, lastname: true });
    }
  };
  
  const handlenameChange = (event) => {
    const value = event.target.value;
    const isValid = /^[a-zA-Z\u0E00-\u0E7F\s]*$/.test(value); 
    if (isValid) {
      setName(value);
      setFormErrors({ ...formErrors, name: false });
    } else {
      setFormErrors({ ...formErrors, name: true });
    }
  };

  const handleIdnation = (event) => {
    setIdnation(event.target.value);
    setFormErrors({ ...formErrors, idnation: false });
  };

  const handleClose = () => {
    setOpen(false);
    handleClickClear()
  };

  const handleNavigate = () => {

    navigate('/information')
    window.location.reload();


  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
    setFormErrors({ ...formErrors, gender: false });
  };

  const handleClick = () => {
    let isValid = true;

    if (!name) {
      setFormErrors({ ...formErrors, name: true });
      isValid = false;
    }

    if (!lastname) {
      setFormErrors({ ...formErrors, lastname: true });
      isValid = false;
    }

    if (!idnation) {
      setFormErrors({ ...formErrors, idnation: true });
      isValid = false;
    }

    if (!birthday) {
      setFormErrors({ ...formErrors, birthday: true });
      isValid = false;
    }

    if (!gender) {
      setFormErrors({ ...formErrors, gender: true });
      isValid = false;
    }


    if (isValid) {
      const data = {
        name,
        lastname,
        gender,
        idnation,
        birthday
      }
     localStorage.setItem('userData', JSON.stringify(data));
      setOpen(true);
      const birthDate = dayjs(birthday);
      const until65 = birthDate.add(65, 'year');
      const now = dayjs();
      const calculate = until65.diff(now, 'year', true);

      if (calculate <= 65 && calculate > 0) {
        setAlert(false);
        setAlert2(true);
        const formattedDate = until65.format('DD/MM/YYYY');
        setFormat(formattedDate);
      } else if (calculate < 0) {
        setAlert2(false);
        setAlert(true);
      }
    }
    
  };

  const handleClickClear = () => {
    setName('');
    setLastname('');
    setIdnation('');
    setBirthday(null);
    setGender('');
    setAlert(false);
    setAlert2(false);
    setFormErrors({
      name: false,
      lastname: false,
      idnation: false,
      birthday: false,
      gender: false,
    });
  };

  const getThaiFormattedDate = (formattedDate) => {
    if (!formattedDate) return '';
    const parts = formattedDate.split('/');
    const day = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const year = parts[2];

    const thaiMonth = thaiMonths[monthIndex];
    return `${day} ${thaiMonth} พ.ศ. ${parseInt(year, 10) + 543}`;
  };

  return (
    <div className="App">
      <Grid component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              กรอกข้อมูล
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoFocus
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="ชื่อ"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={handlenameChange}
                    error={formErrors.name}
                    helperText={formErrors.name ? 'กรุณากรอกชื่อ' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastname"
                    label="นามสกุล"
                    name="lastname"
                    autoComplete="current-lastname"
                    value={lastname}
                    onChange={handleLastnameChange}
                    error={formErrors.lastname}
                    helperText={formErrors.lastname ? 'กรุณากรอกนามสกุล' : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputMask
                    mask="9-9999-99999-99-9"
                    value={idnation}
                    onChange={handleIdnation}
                    maskChar="_"
                  >
                    {() => (
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="idnation"
                        label="เลขบัตรประชาชน"
                        name="idnation"
                        autoComplete="current-idnation"
                        variant="outlined"
                        error={formErrors.idnation}
                        helperText={formErrors.idnation ? 'กรุณากรอกเลขบัตรประชาชน' : ''}
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      disableFuture
                      value={birthday}
                      format="DD/MM/YYYY"
                      label="วัน/เดือน/ปีเกิด"
                      onChange={(newValue, context) => {
                        if (context.validationError == null) {
                          setBirthday(newValue);
                          setFormErrors({ ...formErrors, birthday: false });
                        } else {
                          setFormErrors({ ...formErrors, birthday: true });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField {...params}
                          error={formErrors.birthday}
                          helperText={formErrors.birthday ? 'กรุณาเลือกวันเกิด' : ''} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-select-label">เพศ</InputLabel>
                    <Select
                      labelId="gender-select-label"
                      id="gender-select"
                      value={gender}
                      onChange={handleChangeGender}
                      error={formErrors.gender}
                      label="เพศ"
                    >
                      <MenuItem value="ชาย">ชาย</MenuItem>
                      <MenuItem value="หญิง">หญิง</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, background: 'green' }}
                onClick={handleClick}
              >
                ยืนยัน
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 4, background: 'black' }}
                onClick={handleClickClear}
              >
                ล้างค่า
              </Button>

            </Box>

            {/* {alert && (
              <div>
                <span style={{ color: "green" }}>สามารถเข้ารับบริการได้ </span>
              </div>
            )}

            {alert2 && (
              <div>
                <p>
                  <span style={{ color: "red" }}>
                    ไม่สามารถเข้ารับบริการได้
                  </span>
                  เนื่องจากอายุจะครบ 65 ปี วันที่ {getThaiFormattedDate(format)}
                </p>
              </div>
            )} */}
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"คุณแน่ใจที่จะยืนยันใช่ไหม?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNavigate}  >ตรวจสอบ</Button>
          <Button onClick={handleClose} color="success" autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
