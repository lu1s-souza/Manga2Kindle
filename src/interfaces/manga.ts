export interface MangaResponse {
    result: string;
    response: string;
    data: MangaResponseEntry[];
}

export interface Manga {
    id: string;
    type: string;
    title: string;
    description: string;
    publicationDemographic: string;
    status: string;
    year: number;
}

export interface Chapter {
    chNumber: string;
    id: string;
    title: string;
    pageNumber: number;
}

interface MangaResponseEntry {
    id: string;
    type: string;
    attributes: MangaResponseEntryAttributes;
}

export type MangaFeedResponse = Pick<MangaResponse, 'response' | 'result'> & {
    data: MangaFeedResponseEntry[];
}

type MangaFeedResponseEntry = Pick<MangaResponseEntry, 'id' | 'type'> & {
    attributes: {
        title: string;
        chapter: string;
        pages: number;
    }
};

type MangaResponseEntryAttributes = {
    title: {
        en: string;
    };
    description: {
        en: string;
    },
} & Pick<Manga, 'type' | 'status' | 'year' | 'publicationDemographic'>;