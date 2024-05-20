const request = require("supertest");
const app = require("../app");
const { sequelize, Favorite, User } = require("../models");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

let access_token;

beforeAll(async () => {
    try {
        const user = await User.create({
            email: "admin@gmail.com",
            password: "12345",
        });
        const favorite = await Favorite.create({
            myMangaId: 1,
            title: "Haikyuu",
            pictUrl: "bebas",
            score: 8.8,
            UserId: 1,
        });
        // const data = require("../data/lodgings.json");
        // const dataType = require("../data/types.json");
        // await Type.bulkCreate(dataType);

        // const dataUser = require("../data/admin.json");
        // const user =  await User.bulkCreate(data);

        // access_token = createToken(user.id);
        // console.log(access_token, "<<<<<accesstoken");

        // await Lodging.bulkCreate(data);
    } catch (error) {
        console.log(error, "<<< before all");
    }
});

//! ================= testing admin login ============================

describe("POST /users/login", () => {
    //* a. berhasil login
    test(`Login Success`, async () => {
        const response = await request(app)
            .post(`/users/login`)
            .send({ email: `admin@gmail.com`, password: `12345` });

        const { body, status } = response;
        // console.log(body.access_token, "<<<<<<<<<body");
        access_token = body.access_token;

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("access_token", expect.any(String));
    });

    //* b. Email tidak diberikan /diinput
    test(`error email empty`, async () => {
        const response = await request(app)
            .post(`/users/login`)
            .send({ password: `12345` });

        const { body, status } = response;

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Email or Password is required");
    });

    //* c. Password tidak diberikan /diinput
    test(`error password empty`, async () => {
        const response = await request(app)
            .post(`/users/login`)
            .send({ email: `admin@gmail.com` });

        const { body, status } = response;

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Email or Password is required");
    });

    //* d. Email diberikan invalid/ tidak terdaftar
    test(`error email invalid`, async () => {
        const response = await request(app)
            .post(`/users/login`)
            .send({ email: "invalidAdmin@gmail.com", password: `12345` });

        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Invalid email or password");
    });

    //* d. Password diberikan invalid/ tidak terdaftar
    test(`error password invalid`, async () => {
        const response = await request(app)
            .post(`/users/login`)
            .send({ email: "admin@gmail.com", password: `12345Inavlid` });

        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Invalid email or password");
    });
});

//! ================= testing regist ============================
describe("POST /register", () => {
    //* a. berhasil regist
    test(`success regist user`, async () => {
        let newData = {
            email: `admin2@gmail.com`,
            password: `12345`,
        };

        const response = await request(app)
            .post(`/users/register`)
            .send(newData);

        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(201);
        expect(body).toBeInstanceOf(Object);
        // expect(body.rooms).toHaveProperty("id", 2);
    });
    test(`error email empty`, async () => {
        const response = await request(app)
            .post(`/users/register`)
            .send({ password: `12345` });

        const { body, status } = response;

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["email is required"]);
    });

    test(`error password empty`, async () => {
        const response = await request(app)
            .post(`/users/register`)
            .send({ email: `admin@gmail.com` });

        const { body, status } = response;

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", ["password is required"]);
    });
});

describe("/mangas/favorite", () => {
    // //* a. post fav
    // test(`success post fav`, async () => {
    //     let newData = {
    //         myMangaId: 2,
    //     };

    //     const response = await request(app)
    //         .post(`/mangas/favorite/:mangaId`)
    //         .send({ myMangaId: 2 })
    //         .set("Authorization", `Bearer ` + access_token);

    //     const { body, status } = response;
    //     // console.log(body, "<<<<<< body");
    //     expect(status).toBe(201);
    //     expect(body).toBeInstanceOf(Object);
    //     // expect(body.rooms).toHaveProperty("id", 2);
    // });
    test(`success get fav`, async () => {
        const response = await request(app)
            .get(`/mangas/favorite`)

            .set("Authorization", `Bearer ` + access_token);

        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        // expect(body.rooms).toHaveProperty("id", 2);
    });

    test(`success del fav`, async () => {
        const response = await request(app)
            .delete(`/mangas/favorite/:favId`)
            .send({ favId: 1 })
            .set("Authorization", `Bearer ` + access_token);

        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        // expect(body.rooms).toHaveProperty("id", 2);
    });
});
// !============
describe("get/userId", () => {
    test(`success get userId`, async () => {
        const response = await request(app)
            .get(`/users`)
            .send({ id: 1 })
            .set("Authorization", `Bearer ` + access_token);

        const { body, status } = response;
        // console.log(body, "<<<<<< body");
        expect(status).toBe(201);
        expect(body).toBeInstanceOf(Object);
        // expect(body.rooms).toHaveProperty("id", 2);
    });
    // test(`success patch imageurl`, async () => {
    //     const response = await request(app)
    //         .patch(`/users/:id/imageUrl`)
    //         .send({
    //             imageUrl:
    //                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPCLWMmAY6mvPuZuQSP7ifTYm6osktNLg_Rg&s",
    //         })
    //         .set("Authorization", `Bearer ` + access_token);

    //     const { body, status } = response;
    //     // console.log(body, "<<<<<< body");
    //     expect(status).toBe(201);
    //     expect(body).toBeInstanceOf(Object);
    //     // expect(body.rooms).toHaveProperty("id", 2);
    // });
});

afterAll(async () => {
    try {
        await Favorite.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
        await User.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
        // await sequelize.queryInterface.bulkDelete("Users", null, {
        //     truncate: true,
        //     cascade: true,
        //     restartIdentity: true,
        // });
        // await sequelize.queryInterface.bulkDelete("Types", null, {
        //     truncate: true,
        //     cascade: true,
        //     restartIdentity: true,
        // });
        // await sequelize.queryInterface.bulkDelete("Lodgings", null, {
        //     truncate: true,
        //     cascade: true,
        //     restartIdentity: true,
        // });
        // ======
    } catch (error) {
        console.log(error, "<<<< afterAll");
    }
});
