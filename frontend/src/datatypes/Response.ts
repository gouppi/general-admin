
interface Error {
    location: string;
    msg: string;
    param: string;
    value: string;
}

interface Response {
    statusCode: number;
    message: string;
    success: boolean;
    errors?: Error[];
    data?: any
}

export default Response
export type {Error}