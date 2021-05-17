package com.epam.controller;

import com.epam.dao.UserRepository;
import com.epam.entity.User;
import com.epam.security.JwtTokenProvider;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/auth")
public class AuthenticationController {
    private static final Logger LOGGER = LogManager.getLogger(AuthenticationController.class.getName());
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequestDTO request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User does not exists"));
            String token = jwtTokenProvider.createToken(request.getEmail(), user.getRole().name());
            Map<Object, Object> response = new HashMap<>();
            response.put("email", request.getEmail());
            response.put("token", token);
            response.put("permission", user.getRole().getPermissions());
            response.put("status", user.getStatus());
            LOGGER.info("Successfully logged in");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (AuthenticationException e) {
            LOGGER.error(e.getMessage(),e);
            return new ResponseEntity<>("Unable to login, check email or password", HttpStatus.UNAUTHORIZED);
        }

    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<HttpStatus> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
            logoutHandler.logout(request, response, null);
            LOGGER.info("Successfully logged out");
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(),e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
