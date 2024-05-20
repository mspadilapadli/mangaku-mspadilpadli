const express = require("express");
const MangaController = require("../controllers/MangaController");
const authentication = require("../middlewares/authenticate");
const router = express.Router();

// router.get("/", (req, res) => {
//     res.send(`hello types`);
// });
router.get("/", MangaController.getMangas);
router.use(authentication);

router.get("/favorite", MangaController.getFavoriteManga);
router.post("/favorite/:mangaId", MangaController.postFavoriteManga);
router.delete("/favorite/:favId", MangaController.deleteFavoriteManga);

router.get("/:id", MangaController.getMangaById);

// router.post("/favorite", MangaController.postFavManga);
// router.get("/favorite", MangaController.getFavManga);

// router.post("/", MangaContoller.postType);
// router.put("/:id", TypeController.putType);

// router.delete("/:id", MangaController.deleteType);

module.exports = router;
