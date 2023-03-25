package com.atypon.todos.services.verification;

import com.atypon.todos.security.SignupData;

import java.util.regex.Pattern;

public class BasicStrongPasswordVerificationService implements VerificationService {
    private static final Pattern PATTERN = Pattern.compile(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$\n"
    );
    private static final String MESSAGE =
            "The entered password must have at least 8 characters," +
                    " 1 lowercase letter, 1 uppercase letter, 1 special symbol and 1 digit";

    @Override
    public void verify(SignupData signupData) throws VerificationException {
        String password = signupData.getPassword();
        if (!PATTERN.matcher(password).matches()) {
            throw new VerificationException(MESSAGE);
        }
    }
}
