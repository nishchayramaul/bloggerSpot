package com.project.bloggerSpot.repo;

import com.project.bloggerSpot.Entity.OtpToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepo extends JpaRepository<OtpToken, Long> {

    Optional<OtpToken> findTopByUserEmailOrderByCreatedTimestampDesc(String userEmail);
    void deleteAllByUserEmailAndIdNot(String userEmail, Long excludeId);
}
