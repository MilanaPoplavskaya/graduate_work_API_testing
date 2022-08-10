import superagent from "superagent";
import { URL } from "../URL/URL";
import { statusCodes } from "../fixtures/statusCodes";
import { title } from "../fixtures/titles";
import { ID } from "../fixtures/id";
import { headers } from "../fixtures/headers";
import { existingUser, createdUser, userNameOfComment } from "../fixtures/users";
import { emptyBody } from "../fixtures/body";

const { idOfPost, userId, postIdOfComment, userReplacementId, commentId } = ID;
const { allPosts, allUsers, allComments, singleUser, singleComment } = URL;
const { created, OK } = statusCodes;
const { header, type, pragma, connection, ok } = headers;
const { createdName, createdUsername, createdEmail } = createdUser;
const { existingName, existingUsername } = existingUser;
const { nameLeftComment } = userNameOfComment;


describe("Testing jsonplaceholder", () => {
    test("POST request: create new post", async () => {
        const resultOfRequest = await superagent.post(allPosts)
            .set(header, type)
            .send({
                title: title,
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
        expect(resultOfRequest.ok).toBe(ok);
        expect(resultOfRequest.status).toBe(created);
    });
    test("GET request: check user", async () => {
        const resultOfRequest = await superagent.get(singleUser);
        expect(resultOfRequest.status).toEqual(OK);
        expect(resultOfRequest.body.name).toEqual(existingName);
        expect(resultOfRequest.body.username).toBe(existingUsername);
        console.log(resultOfRequest.body);
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
        expect(resultOfRequest.body).toEqual(emptyBody);
        expect(resultOfRequest.status).toBe(OK);
    });
    test("DELETE request: delete user", async () => {
        const resultOfRequest = await superagent.delete(singleUser);
        expect(resultOfRequest.body).toEqual(emptyBody);
        expect(resultOfRequest.status).toBe(OK);
        expect(resultOfRequest.ok).toBe(ok);
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
            .send({ title: title });
        expect(resultOfRequest.body.title).toBe(title);
        expect(resultOfRequest.body.name).toBe(nameLeftComment);
        expect(resultOfRequest.status).toBe(OK);
    });
});