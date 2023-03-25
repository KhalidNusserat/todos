package com.atypon.todos.services.verification;

import com.atypon.todos.security.SignupData;

public interface VerificationService {
    void verify(SignupData signupData) throws VerificationException;
}
