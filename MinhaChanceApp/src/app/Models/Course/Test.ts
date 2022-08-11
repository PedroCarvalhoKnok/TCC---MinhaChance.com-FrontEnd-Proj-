import { Certification } from "./Certification";
import { Question } from "./Question";

export class Test {
    id!: number;
    certificationId!: number;
    questionsQuantity!: number;
    durationTime!: string;
    difficulty!: string;
    approvalPercentual!: string;
    questions?: Question[];
}