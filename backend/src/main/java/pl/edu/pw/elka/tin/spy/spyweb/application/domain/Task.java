package pl.edu.pw.elka.tin.spy.spyweb.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "TASKS")
public class Task implements Serializable {
    @Id
    private int id;
    // @TODO Change this status to another enum
    private String status;

    @ManyToOne
    @JoinColumn(name = "client_id")
    @NotNull
    @JsonIgnore
    private Client client;

    private Task(TaskBuilder taskBuilder) {
        this.status = taskBuilder.status;
        this.client = taskBuilder.client;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", status='" + status + '\'' +
                '}';
    }

    public static class TaskBuilder {
        private String status;
        private Client client;

        public TaskBuilder(String status, Client client) {
            this.status = status;
            this.client = client;
        }

        public TaskBuilder setStatus(String status) {
            this.status = status;
            return this;
        }

        public TaskBuilder setClient(Client client) {
            this.client = client;
            return this;
        }

        public Task build() {
            return new Task(this);
        }
    }
}
