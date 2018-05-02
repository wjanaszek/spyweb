package pl.edu.pw.elka.tin.spy.spyweb.application.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Getter @Setter @NoArgsConstructor
@Table(name = "USERS")
public class User implements Serializable {
    @Id
    private Integer id;
    private String login;
    private String password;
    private boolean isLoggedIn;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
