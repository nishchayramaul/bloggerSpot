package com.project.bloggerSpot.services;

import com.project.bloggerSpot.entity.OtpToken;
import com.project.bloggerSpot.entity.UserEntity;
import com.project.bloggerSpot.customExceptions.CustomException;
import com.project.bloggerSpot.model.EmailRequestDto;
import com.project.bloggerSpot.model.PasswordResetRequest;
import com.project.bloggerSpot.model.UserDto;
import com.project.bloggerSpot.repo.PasswordResetTokenRepo;
import com.project.bloggerSpot.repo.UserMasterRepo;
import com.project.bloggerSpot.utils.EmailUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserRequestHandler {

    @Value("classpath:templates/otptemplate.txt")
    private Resource otpTemplate;

    private final PasswordEncoder passwordEncoder;
    private final UserMasterRepo userMasterRepo;
    private final EmailSender emailSender;
    public UserRequestHandler(PasswordEncoder passwordEncoder, UserMasterRepo userMasterRepo, EmailSender emailSender, PasswordResetTokenRepo passwordResetTokenRepo) {
        this.passwordEncoder = passwordEncoder;
        this.userMasterRepo = userMasterRepo;
        this.emailSender = emailSender;
        this.passwordResetTokenRepo = passwordResetTokenRepo;
    }

    public UserEntity getUserByEmail(String email) {
        return userMasterRepo.findByEmail(email);
    }

    public ResponseEntity<UserDto> userSignup(UserDto user) {
        log.info("Executing user signup method");

        UserEntity existingUserName = userMasterRepo.findByUsername(user.getUsername());
        UserEntity existingEmail = userMasterRepo.findByEmail(user.getEmail());

        if (existingUserName != null || existingEmail != null){
            throw new CustomException("User already exists with this email or username");
        }

        try {
            String password = passwordEncoder.encode(user.getConfirmPassword());
            UserEntity userEntity = new UserEntity();
            userEntity.setFirstName(user.getFirstName());
            userEntity.setLastName(user.getLastName());
            userEntity.setEmail(user.getEmail());
            userEntity.setPhone(user.getPhone());
            userEntity.setBio(user.getBio());
            userEntity.setPassword(password);
            userEntity.setUsername(user.getUsername());

            userMasterRepo.save(userEntity);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("Error in user signup method", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    public ResponseEntity<UserDto> userLogin(UserDto user){
        log.info("Executing user login method");
        UserEntity existingEmail = userMasterRepo.findByEmail(user.getEmail());
        if (existingEmail == null){
            throw new CustomException("User does not exist, Please sign up");
        }
        if (!passwordEncoder.matches(user.getConfirmPassword(), existingEmail.getPassword())){
            throw new CustomException("Invalid password, Please reset your Password ");
        }
        return ResponseEntity.ok(user);
    }


    public static String otpGenerator() {
        List<Integer> digits = new ArrayList<>();

        for (int i = 0; i <= 9; i++) {
            digits.add(i);
        }
        Collections.shuffle(digits);
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            otp.append(digits.get(i));
        }
        return otp.toString();
    }

    private final PasswordResetTokenRepo passwordResetTokenRepo;

    public String generateAndStoreOtp(String email) {
        log.info("Generating and storing OTP for email: {}", email);

        Optional<OtpToken> existingTokenOpt = passwordResetTokenRepo
                .findTopByUserEmailOrderByCreatedTimestampDesc(email);

        OtpToken token = existingTokenOpt.orElseGet(OtpToken::new);

        String otp = otpGenerator();
        String hashedOtp = passwordEncoder.encode(otp);

        token.setUserEmail(email);
        token.setHashedOtp(hashedOtp);
        token.setUsed(false);
        token.setCreatedTimestamp(LocalDateTime.now());
        token.setExpiryTime(LocalDateTime.now().plusMinutes(2));

        passwordResetTokenRepo.save(token);

        return otp;
    }


    private String loadTemplate(Resource resource) {
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
            return reader.lines().collect(Collectors.joining("\n"));
        } catch (Exception e) {
            throw new RuntimeException("Failed to load email template: " + e.getMessage(), e);
        }
    }


    @Async
    public ResponseEntity<?> forgotPassword(String email){
        UserEntity entity = userMasterRepo.findByEmail(email);
        if (entity == null) {
            throw new CustomException("No account associated with this email");
        }

        String otp = generateAndStoreOtp(entity.getEmail());

        String body = loadTemplate(otpTemplate)
                .replace("{{username}}", entity.getUsername())
                .replace("{{otp}}", otp);

        EmailRequestDto emailRequestDto = EmailUtils.buildEmailRequest(
                List.of(entity.getEmail()),
                null,
                "Forgot Password OTP",
                body
        );

        emailSender.sendEmail(emailRequestDto);
        return ResponseEntity.ok().body("OTP sent to your email");
    }

    public ResponseEntity<?> verifyOtp(PasswordResetRequest passwordResetRequest) {
        log.info("Verifying OTP for user: {}", passwordResetRequest.getEmail());

        UserEntity user = userMasterRepo.findByEmail(passwordResetRequest.getEmail());
        if (user == null) {
            throw new CustomException("No account found with this email");
        }

        if(passwordResetRequest.getNewPassword()!=null){
          return  resetPassword(passwordResetRequest);
        }
        // Fetch latest token
        OtpToken token = passwordResetTokenRepo
                .findTopByUserEmailOrderByCreatedTimestampDesc(passwordResetRequest.getEmail())
                .orElseThrow(() -> new CustomException("No OTP found. Please request a new one."));


        if (token.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new CustomException("OTP has expired. Please request a new one.");
        }

        if (token.isUsed()) {
            throw new CustomException("OTP already used. Please request a new one.");
        }


        if (!passwordEncoder.matches(passwordResetRequest.getOtp(), token.getHashedOtp())) {
            throw new CustomException("Invalid OTP");
        }

        token.setUsed(true);
        passwordResetTokenRepo.save(token);

        passwordResetTokenRepo.deleteAllByUserEmailAndIdNot(passwordResetRequest.getEmail(), token.getId());

        return ResponseEntity.ok("OTP verified, reset your Password");
    }


    public ResponseEntity<?> resetPassword(PasswordResetRequest passwordResetRequest) {
        log.info("Resetting password for user: {}", passwordResetRequest.getEmail());

        UserEntity user = userMasterRepo.findByEmail(passwordResetRequest.getEmail());
        if (user == null) {
            throw new CustomException("No account found with this email");
        }

        if (passwordResetRequest.getNewPassword() == null || passwordResetRequest.getNewPassword().trim().isEmpty()) {
            throw new CustomException("New password is required");
        }


        user.setPassword(passwordEncoder.encode(passwordResetRequest.getNewPassword()));
        userMasterRepo.save(user);

        return ResponseEntity.ok("Password reset successful");
    }
//    public ResponseEntity<?> resetPassword(PasswordResetRequest passwordResetRequest) {
//        log.info("Resetting password for user: {}", passwordResetRequest.getEmail());
//
//        UserEntity user = userMasterRepo.findByEmail(passwordResetRequest.getEmail());
//        if (user == null) {
//            throw new CustomException("No account found with this email");
//        }
//
//        // Fetch latest token
//        OtpToken token = passwordResetTokenRepo
//                .findTopByUserEmailOrderByCreatedTimestampDesc(passwordResetRequest.getEmail())
//                .orElseThrow(() -> new CustomException("No OTP found. Please request a new one."));
//
//        // Check if expired
//        if (token.getExpiryTime().isBefore(LocalDateTime.now())) {
//            throw new CustomException("OTP has expired. Please request a new one.");
//        }
//
//        // Check if already used
//        if (token.isUsed()) {
//            throw new CustomException("OTP already used. Please request a new one.");
//        }
//
//        // Match OTP
//        if (!passwordEcoder.matches(passwordResetRequest.getOtp(), token.getHashedOtp())) {
//            throw new CustomException("Invalid OTP");
//        }
//
//        // All good: reset password
//        user.setPassword(passwordEcoder.encode(passwordResetRequest.getNewPassword()));
//        userMasterRepo.save(user);
//
//        // Mark OTP used
//        token.setUsed(true);
//        passwordResetTokenRepo.save(token);
//
//        // Clean up: delete other unused/expired tokens for this user
//        passwordResetTokenRepo.deleteAllByUserEmailAndIdNot(passwordResetRequest.getEmail(), token.getId());
//
//        return ResponseEntity.ok("Password reset successful");
//    }
//


}
