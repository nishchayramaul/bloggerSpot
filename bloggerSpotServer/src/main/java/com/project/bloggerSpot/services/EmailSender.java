package com.project.bloggerSpot.services;

import com.project.bloggerSpot.customExceptions.CustomException;
import com.project.bloggerSpot.model.EmailRequestDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailSender {

    private final JavaMailSender mailSender;

    public EmailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(EmailRequestDto emailRequestDto) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            if (emailRequestDto.getTo() != null && !emailRequestDto.getTo().isEmpty()) {
                helper.setTo(emailRequestDto.getTo().toArray(new String[0]));
            } else {
                throw new CustomException("Recipient email address is required");
            }

            if (emailRequestDto.getCc() != null && !emailRequestDto.getCc().isEmpty()) {
                helper.setCc(emailRequestDto.getCc().toArray(new String[0]));
            }

            helper.setSubject(emailRequestDto.getSubject());
            helper.setText(emailRequestDto.getBody(), false);


            mailSender.send(message);
            log.info("Email sent successfully to {}", emailRequestDto.getTo());

        } catch (MessagingException e) {
            log.error("Failed to send email", e);
            throw new RuntimeException("Email sending failed", e);
        }
    }
}
