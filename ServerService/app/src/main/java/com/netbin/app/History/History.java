package com.netbin.app.History;

import com.netbin.app.Node.Node;
import com.netbin.app.User.User;
import com.netbin.app.Waste.Waste;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;

import java.sql.Timestamp;
import java.time.LocalDateTime;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "history")
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer history_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "node_id", nullable = false)
    private Node node;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "waste_id", nullable = false)
    private Waste waste;

    @Column(nullable = false)
    private Timestamp timestamp;

    @Column(nullable = true)
    private Integer cobins_awarded;

}
