package com.netbin.app.Company;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "company", uniqueConstraints = {@UniqueConstraint(columnNames = {"company_name"})})
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer company_id;
    @Column(nullable = false)
    private String company_name;
    private Integer discount_details;
}
