const { Favorite, User } = require("../models");
const axios = require("axios");
class MangaController {
    static async getMangas(req, res, next) {
        try {
            const options = {
                method: "GET",
                url: "https://myanimelist.p.rapidapi.com/manga/top/manhwa",
                headers: {
                    "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
                    "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
                },
            };
            const { data } = await axios.request(options);
            // console.log(data, "data from api myanimelist");
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
            //     res.status(500).json({ message: `Internal Server Error` });
        }
    }

    static async getMangaById(req, res, next) {
        try {
            const { id } = req.params;
            const options = {
                method: "GET",
                url: "https://myanimelist.p.rapidapi.com/manga/" + id,
                headers: {
                    "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
                    "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
                },
            };
            const { data } = await axios.request(options);
            // const { title_ov, picture_url } = data;
            // let score = data.statistics.score;

            // console.log(title_ov, picture_url, score, "data title ov");
            if (!data) throw { name: "NotFound" };

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getFavoriteManga(req, res, next) {
        try {
            const favorites = await Favorite.findAll();
            res.status(200).json(favorites);
        } catch (error) {
            console.log(error);
            next(error);
            //     res.status(500).json({ message: `Internal Server Error` });
        }
    }

    static async postFavoriteManga(req, res, next) {
        try {
            const { mangaId } = req.params;
            const findManga = await Favorite.findOne({
                where: { myMangaId: mangaId },
            });
            console.log(findManga, "manga found");
            if (findManga) throw { name: "Duplicate" };
            // {

            // res.status(200).json({
            //     message: `this manga have added`,
            // });
            // return;
            // }

            const options = {
                method: "GET",
                url: "https://myanimelist.p.rapidapi.com/manga/" + mangaId,
                headers: {
                    "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
                    "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
                },
            };
            const { data } = await axios.request(options);
            const { title_ov, picture_url, myanimelist_id } = data;
            let score = data.statistics.score;
            console.log(mangaId, "my anime list id");

            // let UserId = req.user.id;
            // console.log(UserId, "user ID");
            if (!data) throw { name: "NotFound" };
            // console.log(req.body);

            const fav = await Favorite.create({
                myMangaId: mangaId,
                title: title_ov,
                pictUrl: picture_url,
                score,
                UserId: req.user.id,
            });
            res.status(201).json({
                message: `manga ${fav.title} added to favorite`,
                fav,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async deleteFavoriteManga(req, res, next) {
        try {
            const { favId } = req.params;
            console.log(favId, "id favorite");
            const fav = await Favorite.findByPk(favId);
            if (!fav) throw { name: "NotFound" };
            await Favorite.destroy({
                where: { id: favId },
            });

            res.status(200).json({
                message: `${fav.title} has been deleted `,
            });
        } catch (error) {
            console.log(error);
            next(error);
            // if (error.name === "NotFound") {
            //     res.status(404).json({ massage: `type doesn't exists` });
            // } else {
            //     console.log(error.name);
            //     res.status(500).json({ message: `Internal Server Error` });
            // }
        }
    }
}

module.exports = MangaController;
