import express from "express";
import { addPatient, getPublicPatients } from "../services/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.json(getPublicPatients());
});

router.post("/", (req, res) => {
  const p = addPatient(req.body);
  return res.json(p);
});

export default router;
