import { AccountDto } from "./AccountDto";

export interface TransactionDto {
    /**
     *
     * @type {number}
     * @memberof TransactionDto
     */
    id: number;

    /**
     *
     * @type {number}
     * @memberof TransactionDto
     */
    amount: number;

     /**
     *
     * @type {AccountDto}
     * @memberof TransactionDto
     */
     account: AccountDto;
}