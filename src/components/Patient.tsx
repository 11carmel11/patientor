import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";

export default function PatientC() {
  const [patient, setPatient] = useState({} as Patient);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const getPat = async () => {
      const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      setPatient(data);
    };
    void getPat();
  }, []);

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "female" ? (
          <Icon name="venus" />
        ) : patient.gender === "male" ? (
          <Icon name="mars" />
        ) : (
          <Icon name="genderless" />
        )}
      </h2>
      <p>
        <b>SSN:</b> <i>{patient.ssn}</i>
      </p>
      <p>
        <b>Occupation:</b> <i>{patient.occupation}</i>
      </p>
      <strong>{patient.dateOfBirth}</strong> <br />
    </div>
  );
}
