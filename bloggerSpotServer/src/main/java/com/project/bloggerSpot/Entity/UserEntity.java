package com.project.bloggerSpot.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "usermaster")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private String email;
    @Column
    private String phone;
    @Column
    private String bio;
}
