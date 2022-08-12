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

export const EXISTING_USER: IExistingUser = {
    existingName: "Ervin Howell",
    existingUsername: "Antonette",
};
export const CREATED_USER: ICreatedUser = {
    createdName: "Milana",
    createdUsername: "Lana",
    createdEmail: "lana123@gmail.com",
};

export const USER_NAME_OF_COMMENT: IUserNameOfComment = {
    nameLeftComment: "et omnis dolorem",
};