import express from 'express';
import { createVolume, downloadFiles, getVolumes } from '../controllers/volume-builder';

const volumeBuilderRoutes = express.Router();

volumeBuilderRoutes.post("/", createVolume);
volumeBuilderRoutes.get("/", getVolumes);
volumeBuilderRoutes.get("/download/:volumeId", downloadFiles);

export default volumeBuilderRoutes;
