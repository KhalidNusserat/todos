import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PublicPage from "../components/PublicPage";
import Centered from "../components/Centered";
import Authentication from "../api/authentication";
import { SignupDataType } from "../api/User";
import { useState } from "react";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        Authentication.signUp({
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password')
        } as SignupDataType)
            .then(_ => navigate('/'))
            .catch((err: Error) => setError(err.message))
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
                            Sign Up
                        </Typography>
                        {
                            error
                            ?
                            <Alert severity="error">{error}</Alert>
                            :
                            <div></div>
                        }
                        <Box component='form' onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
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
                                id="email"
                                name="email"
                                label="Email"
                                autoComplete="email"
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
                                Sign Up
                            </Button>

                            <Button fullWidth onClick={_ => navigate('/login')}>
                                Already have an account? Login instead!
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Centered>
        </PublicPage>
    );
};

export default SignUpPage;