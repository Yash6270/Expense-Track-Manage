export type Expense = {
  id: number;
  title: string;
  amount: number;
  date: Date;
};

export type Earned = {
    id: number;
    title: string;
    amount: number;
    date: Date;
};

export type YouOwe = {
    id:number;
    name: string;
    amount: number;
    date: Date;

};

export type OtherOwe = {
    id:number;
    name: string;
    amount: number;
    date: Date;

};


export const expenses: Expense[] = [];                   /* To store the data  expenses */
export const earned: Earned[] = [];
export const youOwe: YouOwe[] = [];
export const otherOwe:OtherOwe[] = [];




