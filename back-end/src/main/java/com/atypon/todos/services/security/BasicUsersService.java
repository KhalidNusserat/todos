package com.atypon.todos.services.security;

import com.atypon.todos.entities.User;
import com.atypon.todos.repositories.UsersRepository;
import com.atypon.todos.security.SignupData;
import com.atypon.todos.services.verification.CentralVerificationService;
import com.atypon.todos.services.verification.VerificationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class BasicUsersService implements UsersService {
    private final UsersRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final CentralVerificationService verificationService;

    @Override
    public UserDetails loadUserByUsername(String username) {
        return repository.getByUsername(username).orElseThrow();
    }

    @Override
    public void signup(SignupData signupData) throws VerificationException {
        verificationService.verify(signupData);
        String encryptedPassword = passwordEncoder.encode(signupData.getPassword());
        User user = User.builder()
                .username(signupData.getUsername())
                .email(signupData.getEmail())
                .password(encryptedPassword)
                .build();
        repository.insert(user);
    }
}
