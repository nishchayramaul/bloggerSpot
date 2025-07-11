package com.project.bloggerSpot.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

    @Entity
    @Data
    @Table(name = "password_reset_tokens")
    public class OtpToken {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        @Column
        private String userEmail;
        @Column
        private String hashedOtp;
        @Column
        private LocalDateTime expiryTime;
        @Column
        private boolean isUsed = false;
        @Column
        private LocalDateTime createdTimestamp = LocalDateTime.now();
    }


