package com.project.bloggerSpot.bloggerSpotController;

import com.project.bloggerSpot.model.PasswordResetRequest;
import com.project.bloggerSpot.model.UserDto;
import com.project.bloggerSpot.services.UserRequestHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static com.project.bloggerSpot.utils.UtilsPath.*;

@RestController
@RequestMapping(APPLICATION_PATH)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BloggerSpotController {

    private final UserRequestHandler userRequestHandler;
    public BloggerSpotController(UserRequestHandler userRequestHandler) {
        this.userRequestHandler = userRequestHandler;
    }

    @PostMapping(USER_SIGNUP_URL)
    public ResponseEntity<UserDto> userSignup(@RequestBody UserDto userDto) {
        return userRequestHandler.userSignup(userDto);
    }

    @PostMapping(USER_LOGIN_URL)
    public ResponseEntity<UserDto> userLogin(@RequestBody UserDto userDto) {
        return userRequestHandler.userLogin(userDto);
    }

    @PostMapping(FORGOT_PASSWORD_URL)
    public ResponseEntity<?> forgotPassword( @RequestParam("email") String email){
        return userRequestHandler.forgotPassword(email);
    }

    @PostMapping(RESET_PASSWORD)
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest passwordResetRequest){
        return userRequestHandler.verifyOtp(passwordResetRequest);
    }



}
