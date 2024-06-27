
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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

const Information = () => {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [alert, setAlert] = useState(false);
    const [alert2, setAlert2] = useState(false);
    const [format, setFormat] = useState('');
    const navigate = useNavigate();



    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            parsedUserData.birthday = dayjs(parsedUserData.birthday, 'DD/MM/YYYY');
            setUserData(parsedUserData);
            const birthDate = dayjs(parsedUserData.birthday);
            const until65 = birthDate.add(65, 'year');
            const now = dayjs();
            const calculate = until65.diff(now, 'year', true);

            if (calculate <= 65 && calculate > 0) {
                setAlert(false);
                setAlert2(true);
                const formattedDate = until65.format('DD/MM/YYYY');
                setFormat(formattedDate);
            } else if (calculate <= 0) {
                setAlert2(false);
                setAlert(true);
            }
        }
    }, []);


    if (!userData) {
        return null;
    }



    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        localStorage.clear('userData');
        navigate('/')
    };


    const getThaiFormattedDateAlert = (formattedDate) => {
        if (!formattedDate) return '';

        const parts = formattedDate.split('/');
        const day = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        const year = parts[2];

        const thaiMonth = thaiMonths[monthIndex];
        return `${day} ${thaiMonth} พ.ศ. ${parseInt(year, 10) + 543}`;
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
                            ข้อมูล
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    ชื่อ:{userData.name}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    นามสกุล:{userData.lastname}
                                </Grid>
                                <Grid item xs={12}>
                                    บัตรประชาชน:{userData.idnation}
                                </Grid>
                                <Grid item xs={12}>
                                    วัน/เดือน/ปีเกิด:{getThaiFormattedDate(dayjs(userData.birthday).format('DD/MM/YYYY'))}
                                </Grid>

                                <Grid item xs={12}>
                                    เพศ:{userData.gender}
                                </Grid>
                                <Grid item xs={12}>
                                    สถานะ: {alert && (
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
                                                เนื่องจากอายุจะครบ 65 ปี วันที่ {getThaiFormattedDateAlert(format)}
                                            </p>
                                        </div>
                                    )}
                                </Grid>
                            </Grid>


                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1, mb: 4, background: 'black' }}
                                onClick={handleClick}
                            >
                                ย้อนกลับ
                            </Button>

                        </Box>


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
                    <Button onClick={handleClose}  >ตรวจสอบ</Button>
                    <Button onClick={handleClose} color="success" autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Information;
