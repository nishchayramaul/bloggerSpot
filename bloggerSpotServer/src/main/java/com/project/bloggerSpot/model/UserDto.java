package com.project.bloggerSpot.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserDto {
    private Long id;
    private String username;
    private String confirmPassword;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String bio;

}
