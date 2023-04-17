import { v1 as uuidv1 } from "uuid";
import patientsData, { Patient } from "../data/patients";

export function getPublicPatients(): Omit<Patient, "ssn">[] {
  return patientsData.map(({ ssn, ...returnedData }) => returnedData);
}

export function addPatient(inputPatientData: unknown): Patient {
  const p = parsePatient(inputPatientData);
  patientsData.push(p);
  return p;
}

function parsePatient(data: unknown): Patient {
  if (typeof data !== "object" || data == null)
    throw new Error("No patient data.");

  if (!("name" in data) || typeof data.name !== "string")
    throw new Error("Patient has no name.");
  if (!("dateOfBirth" in data) || typeof data.dateOfBirth !== "string")
    throw new Error("Patient has no DOB.");
  if (!("ssn" in data) || typeof data.ssn !== "string")
    throw new Error("Patient has no SSN.");
  if (!("gender" in data) || typeof data.gender !== "string")
    throw new Error("Patient has no gender.");
  if (!("occupation" in data) || typeof data.occupation !== "string")
    throw new Error("Patient has no occupation.");

  return {
    id: uuidv1(),
    name: data.name,
    dateOfBirth: data.dateOfBirth,
    ssn: data.ssn,
    gender: data.gender,
    occupation: data.occupation,
  };
}
