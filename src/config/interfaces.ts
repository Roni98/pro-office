export interface Subject {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    gapTime?: string;
    description: string;
    attendance?: boolean;
}
