package com.atypon.todos.services.verification;

import com.atypon.todos.security.SignupData;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class CentralVerificationService {
    private final List<VerificationService> verificationServices;

    public void verify(SignupData signupData) throws VerificationException {
        for (VerificationService verificationService : verificationServices) {
            verificationService.verify(signupData);
        }
    }
}
