package com.example.kits.groupa.budgetmaster.payload.request;

import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class DateRequest {
    private Date startDate;
    private Date endDate;
}
