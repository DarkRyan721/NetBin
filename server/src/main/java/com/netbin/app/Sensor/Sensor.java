package com.netbin.app.Sensor;

import com.netbin.app.Node.Node;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sensor")
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer sensor_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "node_id", nullable = false)
    private Node node;

    @Column(nullable = false, length = 150)
    private String sensor_type;

    @Column(nullable = false, length = 150)
    private String sensor_data;

    @Column(nullable = false)
    private Timestamp timestamp;
}
