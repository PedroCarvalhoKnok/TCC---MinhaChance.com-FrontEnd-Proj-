export class Question {
    id: number;
    questionDescription: string;
    intelligenceType: string;
    answerOne?: string = 'Discordo totalmente';
    answerTwo?: string = 'Discordo parcialmente';
    answerTree?: string = 'Concordo parcialmente';
    answerFour?: string = 'Concordo totalmente';
    userAnswer?: string;
}