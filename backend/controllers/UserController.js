const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
const { imageKit } = require("../helpers/imageKit");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
    static async register(req, res, next) {
        try {
            // console.log(req.body);

            let user = await User.create(req.body);
            // console.log(user);

            res.status(201).json({ message: `${user.email} has been created` });
            // res.status(201).json({ message: ` has been created` });
        } catch (error) {
            console.log(error.name);
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body;
            console.log(req.body, "reqbody");
            if (!email || !password) throw { name: `InvalidInput` };

            const user = await User.findOne({
                where: { email },
            });
            if (!user) throw { name: `InvalidUser` };
            // console.log(user);
            const comparePass = comparePassword(password, user.password);
            if (!comparePass) throw { name: `InvalidUser` };
            // console.log(comparePass);

            let token = createToken({ id: user.id });

            res.status(200).json({
                // message: `Login berhasil`,
                access_token: token,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async googleLogin(req, res, next) {
        try {
            const { google_token } = req.headers;
            // console.log(google_token, "google token server");
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID,
                // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();

            //? flow : cek data user sudah ada di db atau belum, kalau belum , maka create user ,  kalau sudah generate token
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    email: payload.email,
                    password: String(Math.random() * 100),
                },
            });
            // let password = String(Math.random() * 100);
            // console.log(password, "pass");

            // console.log(created, "user");

            // ?kalau sudah terdaftar, maka lanjut login (get access_token jwt)
            const token = createToken({ id: user.id });

            res.status(200).json({
                // message: `Login berhasil`,
                access_token: token,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async patchImageUrl(req, res, next) {
        try {
            console.log(req.file, "req file");
            const { buffer, originalname } = req.file;

            const result = await imageKit(buffer, originalname);

            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) throw { name: "NotFound" };
            await User.update(
                { imageUrl: result.data.url },
                {
                    where: { id },
                }
            );

            res.status(200).json({
                message: `Image ${user.email} has been updated `,
            });
        } catch (error) {
            // console.log(error);
            next(error);
            //     res.status(500).json({ message: `Internal Server Error` });
        }
    }

    static async getUserId(req, res, next) {
        try {
            console.log(req.user.id, "req");

            // const { userId } = req.params;
            let user = await User.findByPk(req.user.id, {
                attributes: ["id", "email", "imageUrl"],
            });
            if (!user) throw { name: "NotFound" };
            // console.log(user);

            res.status(201).json(user);
        } catch (error) {
            console.log(error.name);
            next(error);
        }
    }

    // static async patchImgUrl(req, res, next) {
    //     try {
    //         // console.log(req.body, "<<body");
    //         // console.log(req.file, "<<file");

    //         const base64String = req.file.buffer.toString("base64");

    //         const dataUrl = `data:${req.file.mimetype};base64,${base64String}`;
    //         // console.log(dataUrl);
    //         // if (req.file.mimetype !== `image/*`)

    //         const result = await cloudinary.uploader.upload(dataUrl, {
    //             public_id: req.file.originalname,
    //             folder: "My-Room",
    //         });
    //         // console.log(result, "<<result ni boss");

    //         const { id } = req.params;
    //         const room = await Lodging.findByPk(id);
    //         if (!room) throw { name: "NotFound" };
    //         await Lodging.update(
    //             { imgUrl: result.secure_url },
    //             {
    //                 where: { id },
    //             }
    //         );

    //         res.status(200).json({
    //             message: `Image ${room.name} has been updated `,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         next(error);

    //     }
    // }
}

module.exports = UserController;
