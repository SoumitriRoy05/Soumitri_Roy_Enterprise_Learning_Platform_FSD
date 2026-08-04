package com.skillsphere.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Value("${skillsphere.db.host}")
    private String host;

    @Value("${skillsphere.db.port}")
    private String port;

    @Value("${skillsphere.db.name}")
    private String name;

    @Value("${skillsphere.db.username}")
    private String username;

    @Value("${skillsphere.db.password}")
    private String password;

    @Bean
    public DataSource dataSource() {
        String mysqlUrl = "jdbc:mysql://" + host + ":" + port + "/" + name + "?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl(mysqlUrl);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        
        System.out.println("✅ DatabaseConfig: Initializing Clever Cloud MySQL DataSource");
        return dataSource;
    }
}
