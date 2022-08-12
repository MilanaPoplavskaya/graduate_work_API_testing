interface IHeaders {
    header: string,
    type: string,
    pragma: string,
    connection: string
}

export const HEADERS: IHeaders = {
    header: "Content-Type",
    type: "application/json",
    pragma: "no-cache",
    connection: "close",
};