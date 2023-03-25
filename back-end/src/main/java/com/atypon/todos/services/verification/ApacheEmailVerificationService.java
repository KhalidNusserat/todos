package com.atypon.todos.services.verification;

import com.atypon.todos.repositories.UsersRepository;
import com.atypon.todos.security.SignupData;
import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApacheEmailVerificationService implements VerificationService {
    private final UsersRepository usersRepository;

    @Override
    public void verify(SignupData signupData) throws VerificationException {
        String email = signupData.getEmail();
        if (!EmailValidator.getInstance().isValid(email)) {
            throw new VerificationException("The entered email is invalid");
        }
        if (usersRepository.existsByEmail(email)) {
            throw new VerificationException("Email already exists");
        }
    }
}
