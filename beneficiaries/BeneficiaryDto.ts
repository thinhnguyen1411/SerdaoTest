import { AccountDto } from "./AccountDto";

export interface BeneficiaryDto {
    /**
     *
     * @type {number}
     * @memberof BeneficiaryDto
     */
    id: number;

    /**
     *
     * @type {string}
     * @memberof BeneficiaryDto
     */
    firstName: string;

    /**
     *
     * @type {string}
     * @memberof BeneficiaryDto
     */
    lastName: string;

    /**
     *
     * @type {string}
     * @memberof BeneficiaryDto
     */
    iban: string;
}