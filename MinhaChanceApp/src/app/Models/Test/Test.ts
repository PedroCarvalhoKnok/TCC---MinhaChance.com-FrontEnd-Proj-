import { Certification } from "../Certification/Certification";
import { Question } from "../Question/Question";

export class Test {
    id!: number;
    certificationId!: number;
    questionsQuantity!: number;
    durationTime!: string;
    difficulty!: string;
    approvalPercentual!: string;
    questions?: Question[];
}