import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return  this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((totalIncome, transaction) => {
      if (transaction.type === 'income'){
        return totalIncome + transaction.value;
      } else {
        return totalIncome;
      }
    }, 0)
    const outcome = this.transactions.reduce((totalOutcome, transaction) => {
      if (transaction.type === 'outcome'){
        return totalOutcome + transaction.value;
      } else {
        return totalOutcome;
      }
    }, 0)

    const total = income - outcome;
    
    const balance = {
      income, 
      outcome,
      total
    }
    
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    
    this.transactions.push(transaction);
    
    return transaction;
  }
}

export default TransactionsRepository;
