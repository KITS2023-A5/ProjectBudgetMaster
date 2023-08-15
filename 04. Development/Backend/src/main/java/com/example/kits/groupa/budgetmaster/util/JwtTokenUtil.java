//package com.example.kits.groupa.budgetmaster.util;
//
//import com.example.kits.groupa.budgetmaster.dto.LoginRequest;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import lombok.Value;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//@Component
//public class JwtTokenUtil {
//    private static final long EXPIRE_DURATION = 24 * 60 * 60 * 1000; // 24 hour
//
//    @Value("${jwt.secret}")
//    private String SECRET_KEY;
//
//    public String generateAccessToken(LoginRequest loginRequest) {
//        return Jwts.builder()
//                .setSubject(String.format("%s", loginRequest.getUsernameOrEmail()))
//                .setIssuer("CodeJava")
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION))
//                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
//                .compact();
//
//    }
//}
