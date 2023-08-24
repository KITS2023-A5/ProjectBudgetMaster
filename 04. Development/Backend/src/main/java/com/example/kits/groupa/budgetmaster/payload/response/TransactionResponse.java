package com.example.kits.groupa.budgetmaster.payload.response;

import com.example.kits.groupa.budgetmaster.repositories.TransactionProjection;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Data
@NoArgsConstructor
public class TransactionResponse {
    public Long totalCount;
    public List<TransactionProjection> transactions;
}
