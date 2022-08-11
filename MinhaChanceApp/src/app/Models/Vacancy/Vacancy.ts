import { Benefit } from "./Benefit";
import { Requirement } from "./Requirement";

export class Vacancy {
    id!: number;
    vacancyTitle!: string;
    creationDate!: Date;
    quantity!: number;
    salary!: number;
    isConfidential!: boolean;
    contractType!: string;
    modalidity!: string;
    semanalQuantity?: number;
    image!: File;
    description!: string;
    benefits!: Benefit;
    requirements?: Requirement;
    category!: string;
}