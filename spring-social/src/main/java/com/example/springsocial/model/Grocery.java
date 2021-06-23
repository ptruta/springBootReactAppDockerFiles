package com.example.springsocial.model;

import javax.persistence.*;

@Entity
@Table(name = "groceries")
public class Grocery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public User getUser() {
        return user;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public void setUser(final User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Grocery{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", user=" + user +
                '}';
    }
}
