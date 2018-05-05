package pl.edu.pw.elka.tin.spy.spyweb.application.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "ADMINS")
public class Admin implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Column(unique = true,
            columnDefinition = "VARCHAR2(128)")
    private String login;

    @NotNull
    @Column(columnDefinition = "VARCHAR2(128)")
    private String password;

    @Column(name = "logged_in",
            columnDefinition = "BOOLEAN default false")
    private Boolean loggedIn = false;

    @Override
    public String toString() {
        return "Admin{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
