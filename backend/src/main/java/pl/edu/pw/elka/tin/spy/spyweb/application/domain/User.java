package pl.edu.pw.elka.tin.spy.spyweb.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "USERS")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    @NotNull
    @Column(unique = true,
            columnDefinition = "VARCHAR2(128)")
    private String name;

    @NotNull
    @Column(columnDefinition = "VARCHAR2(128)")
    @JsonIgnore
    private String password;

    @NotNull
    @Column(columnDefinition = "VARCHAR2(16) default 'LOGOUT'")
    private String status;

    @OneToMany(mappedBy = "user")
    private List<Task> taskList;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
