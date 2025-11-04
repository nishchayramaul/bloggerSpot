package com.project.bloggerSpot.services;

import com.project.bloggerSpot.entity.UserEntity;
import com.project.bloggerSpot.repo.UserMasterRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserMasterRepo userMasterRepo;

    public CustomUserDetailsService(UserMasterRepo userMasterRepo) {
        this.userMasterRepo = userMasterRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userMasterRepo.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return user; // Your existing UserEntity implements UserDetails
    }
}
