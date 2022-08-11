export class Session {
    id!: number;
    videoSession?: File;
    pdfSession?: File;
    videoSessionName!: string;
    pdfSessionName!: string;
    courseId!: number;
    description!: string;
    sessionTitle!: string;
    videoPath?: string;
    pdfPath?: string
}