import { v1 as uuidv1 } from "uuid";
import patientsData, { GENDERS, Gender, Patient } from "../data/patients";
import { isObject } from "../utils/helpers";

export function getPublicPatients(): Omit<Patient, "ssn">[] {
  return patientsData.map(({ ssn, ...returnedData }) => returnedData);
}

export function addPatient(inputPatientData: unknown): Patient {
  const p = parsePatient(inputPatientData);
  patientsData.push(p);
  return p;
}

function parsePatient(data: unknown): Patient {
  if (!isObject(data)) throw new Error("Incorrect or missing patient data.");

  const makeErrorMsg = (key: string) => `Patient has no or invalid ${key}.`;
  if (!("name" in data) || typeof data.name !== "string")
    throw new Error(makeErrorMsg("name"));
  if (!("dateOfBirth" in data) || typeof data.dateOfBirth !== "string")
    throw new Error(makeErrorMsg("dateOfBirth"));
  if (!("ssn" in data) || typeof data.ssn !== "string")
    throw new Error(makeErrorMsg("SSN"));
  if (!hasGender(data)) throw new Error(makeErrorMsg("gender"));
  if (!("occupation" in data) || typeof data.occupation !== "string")
    throw new Error(makeErrorMsg("gender"));

  return {
    id: uuidv1(),
    name: data.name,
    dateOfBirth: data.dateOfBirth,
    ssn: data.ssn,
    gender: data.gender,
    occupation: data.occupation,
  };
}

function hasGender<T extends object>(
  obj: T
): obj is T & Record<"gender", Gender> {
  if (!("gender" in obj) || typeof obj.gender !== "string") return false;

  return isGender(obj.gender);
}

function isGender(val: string): val is Gender {
  for (const gen in GENDERS) if (val == gen) return true;
  return false;
}
