interface IUserNameOfComment {
    nameLeftComment: string,
}

interface IExistingUser {
    existingName: string,
    existingUsername: string
}

interface ICreatedUser {
    createdName: string,
    createdUsername: string,
    createdEmail: string,
}

export const existingUser: IExistingUser = {
    existingName: "Ervin Howell",
    existingUsername: "Antonette",
};
export const createdUser: ICreatedUser = {
    createdName: "Milana",
    createdUsername: "Lana",
    createdEmail: "lana123@gmail.com",
};

export const userNameOfComment: IUserNameOfComment = {
    nameLeftComment: "et omnis dolorem",
};