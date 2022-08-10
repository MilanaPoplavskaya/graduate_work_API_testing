interface IHeaders {
    header: string,
    type: string,
    pragma: string,
    connection: string
    ok: boolean
}

export const headers: IHeaders = {
    header: "Content-Type",
    type: "application/json",
    pragma: "no-cache",
    connection: "close",
    ok: true,
};

