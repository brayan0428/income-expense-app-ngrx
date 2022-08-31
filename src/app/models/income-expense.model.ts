export class IncomeExpense {
  constructor(
    public description: string,
    public type: string,
    public amount: number,
    public uid?: string
  ) {}
}
