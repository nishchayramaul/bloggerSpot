package com.project.bloggerSpot.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmailRequestDto {
    private List<String> to;
    private List<String> cc;
    private String subject;
    private String body;
}

