/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig } from "axios";
import React, { useRef } from "react";
import { Modal } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Entry } from "../types";

const options = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
];

export default function EntryModal({
  open,
  closeHandler,
  id,
}: {
  id: string;
  open: boolean;
  closeHandler: () => void;
}) {
  const typeRef = useRef(null);
  const idRef = useRef(null);
  const dateRef = useRef(null);
  const describeRef = useRef(null);
  const specialistRef = useRef(null);

  const submitEntry = async (entry) => {
    const { data } = await axios.get<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      entry
    );
    return data;
  };

  return (
    <Modal open={open} onClose={closeHandler} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        <div>
          <label htmlFor="type">TYPE:</label>
          <select ref={typeRef} name="type" id="type">
            <option value="Hospital">Hospital</option>
            <option value="HealthCheck">HealthCheck</option>
            <option value="OccupationalHealthcare">
              OccupationalHealthcare
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="id">ID:</label>
          <input id="id" placeholder="ID" type="text" ref={idRef} />
        </div>
        <div>
          <label htmlFor="date">DATE:</label>
          <input id="date" placeholder="date" type="text" ref={dateRef} />
        </div>
        <div>
          <label htmlFor="describe">DESCRIBE:</label>
          <input
            id="describe"
            placeholder="describe"
            type="text"
            ref={describeRef}
          />
        </div>
        <div>
          <label htmlFor="specialist">SPECIALIST:</label>
          <input
            id="specialist"
            placeholder="specialist"
            type="text"
            ref={specialistRef}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            void submitEntry({ id: typeRef.current.value });
          }}
        >
          SUBMIT
        </button>
      </Modal.Content>
    </Modal>
  );
}
