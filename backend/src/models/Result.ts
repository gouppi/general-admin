export default interface Result {
    message: string;
    success: boolean;
    field?: string;
    statusCode: number;
    data?: any;
}