import { Benefit } from "./Benefit";
import { Requirement } from "./Requirement";

export class Vacancy {
    id!: number;
    userId?: number;
    vacancyTitle!: string;
    creationDate!: string;
    quantity!: number;
    salary!: number;
    isConfidential!: boolean;
    contractType!: string;
    modalidity!: string;
    semanalQuantity?: number;
    image!: File;
    description!: string;
    benefit?: Benefit;
    requirement?: Requirement;
    benefits?: string;
    requirements?: string;
    category!: string;
    location?: string;
}