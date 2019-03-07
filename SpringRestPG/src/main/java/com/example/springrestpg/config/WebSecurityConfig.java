/**
 * 
 */
package com.example.springrestpg.config;

import com.example.springrestpg.model.User;
import com.example.springrestpg.service.DetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;

/**
 * @author Dmitry Loktevich
 * 
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    DetailsService detailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(detailsService).passwordEncoder(User.PASSWORD_ENCODER);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.addFilterBefore(new CorsFilter(), ChannelProcessingFilter.class);
        http.csrf().disable()
        .exceptionHandling()
        .and()
        .authorizeRequests()
        .antMatchers("/api/authors").authenticated()
        .antMatchers("/api/authors/**").hasRole("ADMIN")
        .antMatchers("/api/**").authenticated()
        .and()
        .httpBasic();
    }
}