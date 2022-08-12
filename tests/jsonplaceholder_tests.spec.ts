import superagent from "superagent";
import { URL } from "../URL/URL";
import { STATUS_CODES } from "../fixtures/statusCodes";
import { TITLE } from "../fixtures/titles";
import { ID } from "../fixtures/id";
import { HEADERS } from "../fixtures/headers";
import { EXISTING_USER, CREATED_USER, USER_NAME_OF_COMMENT } from "../fixtures/users";
import { EMPTY_BODY } from "../fixtures/body";

const { idOfPost, userId, postIdOfComment, userReplacementId, commentId } = ID;
const { allPosts, allUsers, allComments, singleUser, singleComment } = URL;
const { created, OK } = STATUS_CODES;
const { header, type, pragma, connection } = HEADERS;
const { createdName, createdUsername, createdEmail } = CREATED_USER;
const { existingName, existingUsername } = EXISTING_USER;
const { nameLeftComment } = USER_NAME_OF_COMMENT;


describe("Testing jsonplaceholder", () => {
    test("POST request: create new post", async () => {
        const resultOfRequest = await superagent.post(allPosts)
            .set(header, type)
            .send({
                title: TITLE,
            });
        expect(resultOfRequest.body.id).toEqual(idOfPost);
        expect(resultOfRequest.status).toBe(created);
        expect(resultOfRequest.headers.pragma).toEqual(pragma);
    });
    test("POST request: create new user", async () => {
        const resultOfRequest = await superagent.post(allUsers)
            .set(header, type)
            .send({ createdName, createdUsername, createdEmail });
        expect(resultOfRequest.body.id).toEqual(userId);
        expect(resultOfRequest.body.createdName).toEqual(createdName);
        expect(resultOfRequest.status).toBe(created);
    });
    test("GET request: check user", async () => {
        const resultOfRequest = await superagent.get(singleUser);
        expect(resultOfRequest.status).toEqual(OK);
        expect(resultOfRequest.body.name).toEqual(existingName);
        expect(resultOfRequest.body.username).toBe(existingUsername);
    });
    test("GET request: check comments", async () => {
        const resultOfRequest = await superagent.get(allComments);
        expect(resultOfRequest.status).toEqual(OK);
        expect(resultOfRequest.headers.connection).toEqual(connection);
    });
    test("GET request: check one comment", async () => {
        const resultOfRequest = await superagent.get(singleComment);
        expect(resultOfRequest.status).toEqual(OK);
        expect(resultOfRequest.body.name).toBe(nameLeftComment);
        expect(resultOfRequest.body.postId).toBe(postIdOfComment);
    });
    test("PUT request: user replacement", async () => {
        const resultOfRequest = await superagent.put(singleUser)
            .set(header, type)
            .send({});
        expect(resultOfRequest.status).toEqual(OK);
        expect(resultOfRequest.body.id).toBe(userReplacementId);
    });
    test("PUT request: comment replacement", async () => {
        const resultOfRequest = await superagent.put(singleComment)
            .set(header, type)
            .send({ createdName, createdUsername, createdEmail });
        expect(resultOfRequest.body.id).toEqual(commentId);
        expect(resultOfRequest.body.createdName).toEqual(createdName);
        expect(resultOfRequest.status).toEqual(OK);
    });
    test("DELETE request: delete comment", async () => {
        const resultOfRequest = await superagent.delete(singleComment);
        expect(resultOfRequest.body).toEqual(EMPTY_BODY);
        expect(resultOfRequest.status).toBe(OK);
    });
    test("DELETE request: delete user", async () => {
        const resultOfRequest = await superagent.delete(singleUser);
        expect(resultOfRequest.body).toEqual(EMPTY_BODY);
        expect(resultOfRequest.status).toBe(OK);
    });
    test("PATCH request: updating user information", async () => {
        const resultOfRequest = await superagent.patch(singleUser)
            .set(header, type)
            .send({ createdName, createdUsername, createdEmail });
        expect(resultOfRequest.body.createdName).toBe(createdName);
        expect(resultOfRequest.body.createdUsername).toBe(createdUsername);
        expect(resultOfRequest.status).toBe(OK);
    });
    test("PATCH request: updating comment", async () => {
        const resultOfRequest = await superagent.patch(singleComment)
            .set(header, type)
            .send({ title: TITLE });
        expect(resultOfRequest.body.title).toBe(TITLE);
        expect(resultOfRequest.body.name).toBe(nameLeftComment);
        expect(resultOfRequest.status).toBe(OK);
    });
});