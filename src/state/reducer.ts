import { Dispatch } from "react";
import { State } from "./state";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = async (dispatch: Dispatch<Action>) => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  dispatch({ type: "SET_PATIENT_LIST", payload: data });
};

export const createNewPatient = async (
  dispatch: Dispatch<Action>,
  newObject: Omit<Patient, "id">,
  errorSetter: (e: string) => void,
  closeModal: () => void
) => {
  try {
    const { data } = await axios.post<Patient>(
      `${apiBaseUrl}/patients`,
      newObject
    );
    dispatch({ type: "ADD_PATIENT", payload: data });
    closeModal();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      errorSetter(error.message);
    }
  }
};
