import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PublicPage from "../components/PublicPage";
import Centered from "../components/Centered";
import Authentication from "../api/authentication";
import { LoginDataType } from "../api/User";
import { useState } from "react";

const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        Authentication.login({
            username: data.get('username'),
            password: data.get('password')
        } as LoginDataType)
            .then(_ => navigate('/'))
            .catch((error: Error) => setError(error.message));
    }

    return (
        <PublicPage>
            <Centered>
                <Card
                    style={{
                        maxWidth: 450,
                        padding: '5px 5px',
                        margin: '0 auto',
                        borderRadius: '10px'
                    }}
                    variant="outlined"
                >
                    <CardContent>
                        <Typography
                            variant="h5"
                            gutterBottom
                            align='center'
                            fontFamily='Tajawal'
                        >
                            Login
                        </Typography>
                        {
                            error
                            ?
                            <Alert severity="error">{error}</Alert>
                            :
                            <div></div>
                        }
                        <Box component='form' onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                name="username"
                                label="Username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                name="password"
                                type="password"
                                label="Password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2
                                }}
                            >
                                Sign In
                            </Button>
                            <Button fullWidth onClick={_ => navigate('/signup')}>
                                Don't have an account? Sign up!
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Centered>
        </PublicPage>
    );
};

export default LoginPage;