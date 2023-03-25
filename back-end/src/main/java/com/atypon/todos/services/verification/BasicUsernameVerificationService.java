package com.atypon.todos.services.verification;

import com.atypon.todos.repositories.UsersRepository;
import com.atypon.todos.security.SignupData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class BasicUsernameVerificationService implements VerificationService {
    private final Pattern pattern = Pattern.compile("^\\w{1,20}$");
    private final UsersRepository usersRepository;

    @Override
    public void verify(SignupData signupData) throws VerificationException {
        String username = signupData.getUsername();
        if (!pattern.matcher(username).matches()) {
            throw new VerificationException("The entered username must be between 1 and 20 letters");
        }
        if (usersRepository.existsByUsername(username)) {
            throw new VerificationException("The username already exists");
        }
    }
}
