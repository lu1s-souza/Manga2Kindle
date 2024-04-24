import { Request, Response } from "express";
import { Chapter, Manga, MangaFeedResponse, MangaResponse } from "../interfaces";

export const fetchManga = async (req: Request, res: Response) => {
    const { title, offset } = req.query;
    if (title === undefined) return res.status(500).send('Title not provided');
    const searchResult = await fetch(`https://api.mangadex.org/manga?title=${title}&offset=${offset}`);
    const parsedResponse = await searchResult.json() as MangaResponse;
    const finalResponse: Manga[] = parsedResponse.data.map((values) => ({
        id: values.id,
        type: values.type,
        year: values.attributes.year,
        title: values.attributes.title.en,
        description: values.attributes.description.en,
        publicationDemographic: values.attributes.publicationDemographic,
        status: values.attributes.status
    }));
    return res.status(200).send(finalResponse);
}

export const fetchMangaChapters = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id === '') return res.status(500).send('Please dsds an id');
    const details = await fetch(`https://api.mangadex.org/manga/${id}/feed?limit=20&translatedLanguage%5B%5D=en&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc`);
    const parsedResponse = await details.json() as MangaFeedResponse;
    const result: Chapter[] = parsedResponse.data.map(entry => ({
        chNumber: entry.attributes.chapter,
        title: entry.attributes.title,
        id: entry.id,
        pageNumber: entry.attributes.pages
    }));
    return res.status(200).send(result);
}