import express from "express";
import patientsData from "../data/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  const returnedPatients = patientsData.map(
    ({ ssn, ...returnedData }) => returnedData
  );

  return res.json(returnedPatients);
});

export default router;
