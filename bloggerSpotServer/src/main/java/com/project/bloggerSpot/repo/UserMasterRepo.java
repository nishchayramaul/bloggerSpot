package com.project.bloggerSpot.repo;

import com.project.bloggerSpot.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMasterRepo extends JpaRepository<UserEntity, Long>{
    UserEntity findByEmailAndUsername(String email,String username);
    UserEntity findByEmail(String username);
    UserEntity findByUsername(String username);
}
