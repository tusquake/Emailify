package com.emailify.demo;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.emailify.demo.services.EmailService;

@SpringBootTest
public class EmailSenderTest {

    @Autowired
    private EmailService emailService;

    @Test
    void emailSentTest() {
        System.out.println("sending email..");
        emailService.sendEmail("kbeauti191@gmail.com", "Email From Spring Boot",
                "This email is send using spring boot while creating email service");
    }

    @Test
    void sendHtmlInEmail() {
        String html = "" +
                "<h1 style='color:red;border:1px solid red;'>Welcome to Tushar's Spring Boot Tutorial</h1>" +
                "";
        emailService.sendEmailWithHtml("kbeauti191@gmail.com", "Email From Spring Boot", html);
    }

    @Test
    void sendEmailWithFile() {
        emailService.sendEmailWithFile("kbeauti191@gmail.com", "Email with file", "This email contains a file",
                new File(
                        "C:\\Users\\TUSHAR\\OneDrive\\Desktop\\java full stack\\Spring_project\\Emailify\\src\\main\\resources\\static\\images\\Certificate-1.png"));
    }

    @Test
    void sendEmailWithFileWithStream() {
        File file = new File(
                "C:\\Users\\TUSHAR\\OneDrive\\Desktop\\java full stack\\Spring_project\\Emailify\\src\\main\\resources\\static\\images\\Certificate-1.png");
        InputStream is;
        try {
            is = new FileInputStream(file);
            emailService.sendEmailWithFile("kbeauti191@gmail.com", "Email with file",
                    "This email contains a file", is);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

}
