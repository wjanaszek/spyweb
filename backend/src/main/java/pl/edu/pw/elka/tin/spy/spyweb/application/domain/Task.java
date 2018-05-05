package pl.edu.pw.elka.tin.spy.spyweb.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "TASKS")
public class Task implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    @Column(name = "creation_timestamp",
            columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP",
            insertable = false,
            updatable = false)
    private Date creationTimestamp;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_update_timestamp")
    private Date lastUpdateTimestamp;

    @NotNull
    @Column(columnDefinition = "VARCHAR2(128)")
    private String name;

    @Column(columnDefinition = "VARCHAR2(16) default 'NEW'")
    private String status;

    @Column(name = "file_url",
            columnDefinition = "VARCHAR2(256)")
    private String fileUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    @JsonIgnore
    private User user;

    private Task(TaskBuilder taskBuilder) {
        this.name = taskBuilder.name;
        this.user = taskBuilder.user;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", creationTimestamp=" + creationTimestamp +
                ", lastUpdateTimestamp=" + lastUpdateTimestamp +
                ", name='" + name + '\'' +
                ", status='" + status + '\'' +
                ", fileUrl='" + fileUrl + '\'' +
                ", user=" + user +
                '}';
    }

    public static class TaskBuilder {
        private final String name;
        private final User user;
        private Date lastUpdateTimestamp;

        public TaskBuilder(User user, String name) {
            this.user = user;
            this.name = name;
        }

        public TaskBuilder setLastUpdateTimestamp(Date lastUpdateTimestamp) {
            this.lastUpdateTimestamp = lastUpdateTimestamp;
            return this;
        }

        public Task build() {
            return new Task(this);
        }
    }
}
