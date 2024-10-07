package com.netbin.app.Waste;


import com.netbin.app.User.User;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "waste")
public class Waste {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer waste_id;

    @Column(nullable = false)
    private String timestamp;

    private String recognized_item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
