import express from 'express';
import { fetchManga, fetchMangaChapters } from '../controllers/manga';

const mangaRoutes = express.Router();

mangaRoutes.get("/", fetchManga);
mangaRoutes.get("/details/:id", fetchMangaChapters);

export default mangaRoutes;