package com.example.login;

import com.opensymphony.xwork2.ActionSupport;

public class LoginAction extends ActionSupport {
    private String name;
    private String mobile;
    private String email;

    public String execute() {
        return SUCCESS;
    }

    public void validate() {
        if (name == null || name.trim().equals("")) {
            addFieldError("name", "Name is required");
        } else if (!name.matches("[a-zA-Z\\s]+")) {
            addFieldError("name", "Name should only contain letters");
        }

        if (mobile == null || mobile.trim().equals("")) {
            addFieldError("mobile", "Mobile number is required");
        } else if (!mobile.matches("\\d{10}")) {
            addFieldError("mobile", "Mobile number must be 10 digits");
        }

        if (email == null || email.trim().equals("")) {
            addFieldError("email", "Email is required");
        } else if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            addFieldError("email", "Invalid email format");
        }
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
