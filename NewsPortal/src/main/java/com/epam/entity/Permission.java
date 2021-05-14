package com.epam.entity;

public enum Permission {
    NEWS_READ("news:read"),
    NEWS_WRITE("news:write");

    private String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
