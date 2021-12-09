import React, { useEffect, useState } from "react";
import axios from "axios";
import EntryModal from "../addEntryModal/EntryModal";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

export default function PatientC() {
  const [patient, setPatient] = useState({} as Patient);
  const [openModal, setOpenModal] = useState<boolean>(false);
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
      <p>
        <b>Date of birth:</b> <i>{patient.dateOfBirth}</i>
      </p>
      {patient.entries ? (
        <p>
          <b>Entries:</b>{" "}
          <div>
            {patient.entries.length
              ? patient.entries.map((entry) => {
                  return (
                    <blockquote
                      style={{ border: "3px solid black" }}
                      key={patient.id}
                    >
                      <strong>type:</strong> {entry.type} entry
                      <br />
                      <strong>date:</strong> {entry.date}
                      <br />
                      {entry.type === "HealthCheck" ? (
                        <p>
                          <strong>description:</strong> {entry.description}
                        </p>
                      ) : (
                        <p>
                          <strong>Diagnose codes:</strong>
                          <ul>
                            {entry.diagnosisCodes?.map((DC) => {
                              return <li key={patient.id}>{DC}</li>;
                            })}
                          </ul>
                        </p>
                      )}
                      <br />
                    </blockquote>
                  );
                })
              : "None"}
          </div>
        </p>
      ) : null}
      <EntryModal
        open={openModal}
        closeHandler={() => {
          setOpenModal(false);
        }}
        id={patient.id}
      />
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        add new entry
      </Button>
    </div>
  );
}
