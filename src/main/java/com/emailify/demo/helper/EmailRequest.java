package com.emailify.demo.helper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class EmailRequest {

    private String to;

    private String subject;

    private String message;

}
