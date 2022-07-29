import { Certification } from "../Certification/Certification";
import { Question } from "../Question/Question";

export class Test {
    id!: number;
    certification!: Certification;
    questions!: Question[];
    durationTime!: string;
    difficulty!: string;
}