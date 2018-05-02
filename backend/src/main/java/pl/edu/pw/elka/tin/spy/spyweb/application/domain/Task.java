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
@Table(name = "TASKS")
public class Task implements Serializable {
    @Id
    private int id;
    private String status;

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", status='" + status + '\'' +
                '}';
    }
}
