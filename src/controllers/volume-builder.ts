import { Request, Response } from "express";
import fs from 'fs';
import { Volume } from "../interfaces";
import { VolumeModel } from "../models/volumes";
import { Subject } from "rxjs";
import { Downloader } from "../utils/chapter-download";

export const createVolume = (req: Request, res: Response) => {
  const { mangaId, chapters, totalPages, shouldBypass } = req.body as Volume;
  console.log(chapters);
  if (totalPages > 200 && !shouldBypass) return res.status(500).send("Volume has exceeded the maximum pages allowed");
  if (!mangaId || mangaId === "") return res.status(500).send('No manga provided');
  if (chapters.length === 0) return res.status(500).send('No chapter selected');

  const volume = new VolumeModel({
    mangaId,
    chapters,
    totalPages,
    shouldBypass,
    hasDownloaded: false
  });
  return volume.save().then((value) => res.status(201).send(value.toObject()));
}

export const getVolumes = (req: Request, res: Response) => {
  return VolumeModel.find().then((result) => res.status(200).send(result));
}

export const downloadFiles = async (req: Request, res: Response) => {
  const { volumeId } = req.params;
  if (!volumeId) return res.status(500).send("please provide an volume id");
  const volume = await VolumeModel.findById(volumeId);
  console.log('volume', volume);
  if (!volume) return res.status(404).send("Volume not found");
  const retusrn: string[] = [];
  const downloader = new Downloader();
  for (const chapter of volume.chapters) {
    const chapterData = await fetch(`https://api.mangadex.org/at-home/server/${chapter}`);
    downloader.chSubject.next(await chapterData.json());
  }
  downloader.download();
  res.status(200).send(retusrn);
}