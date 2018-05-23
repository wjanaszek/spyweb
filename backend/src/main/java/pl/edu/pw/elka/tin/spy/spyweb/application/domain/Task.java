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

    public Task(User user) {
        this.name = "Get photo";
        this.creationTimestamp = new Date();
        this.status = "NEW";
        this.user = user;
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
}
