//package com.example.kits.groupa.budgetmaster.services;
//
////import com.example.kits.groupa.budgetmaster.dto.UserRegister;
//import com.example.kits.groupa.budgetmaster.entities.User;
//import com.example.kits.groupa.budgetmaster.repositories.UserRepository;
//
//import org.apache.commons.validator.routines.EmailValidator;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.server.ResponseStatusException;
//
//import java.util.Optional;
//
//@Service
//public class UserService {
//    private final UserRepository userRepository;
//
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    @Autowired
//    public UserService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
//    }
//
//    @Transactional
//    public void registerNewUser(UserRegister userRegister) {
//        String email = userRegister.getEmail();
//        String username = userRegister.getUsername();
//        Optional<User> mailUser = userRepository.findUserByEmail(email);
//        if ((email!=null) && (mailUser.isPresent()))
//        {
//            //BAD REQUEST da ton tai email
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Already exists email");
//        }
//        if (!EmailValidator.getInstance().isValid(email) || email.length() > 60)
//        {
//            //khong phai email
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email");
//        }
//        Optional<User> userNameUser = userRepository.findUserByUsername(username);
//        if ((username!=null) && (userNameUser.isPresent()))
//        {
//            //BAD REQUEST da ton tai username
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Already exists userName");
//        }
//        if (userRegister.getPassword().length() < 8)
//        {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Weak password");
//        }
//        User newUser = new User();
//        newUser.setName(userRegister.getName());
//        newUser.setEmail(userRegister.getEmail());
//        newUser.setUsername(userRegister.getUsername());
//        newUser.setPassword(bCryptPasswordEncoder.encode(userRegister.getPassword()));
//        userRepository.save(newUser);
//    }
//
//}
