package pl.edu.pw.elka.tin.spy.spyweb.application.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "CLIENTS")
public class Client {
    @Id
    @GeneratedValue
    private int id;
    private String ip;
    private String status;
    @OneToMany(mappedBy = "client")
    private List<Task> taskList;

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", ip='" + ip + '\'' +
                ", status=" + status +
                '}';
    }
}
