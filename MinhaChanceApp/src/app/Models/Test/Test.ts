import { Certification } from "../Certification/Certification";
import { Question } from "../Question/Question";

export class Test {
    id!: number;
    certificationId!: string;
    questions!: Question[];
    durationTime!: string;
    difficulty!: string;
}