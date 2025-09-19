package com.project.bloggerSpot.utils;

import com.project.bloggerSpot.model.EmailRequestDto;

import java.util.List;

public class EmailUtils {

    public static EmailRequestDto buildEmailRequest(
            List<String> to,
            List<String> cc,
            String subject,
            String body
    ) {
        return EmailRequestDto.builder()
                .to(to)
                .cc(cc)
                .subject(subject)
                .body(body)
                .build();
    }
}

