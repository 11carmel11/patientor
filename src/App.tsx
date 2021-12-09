import React from "react";
// import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

// import { apiBaseUrl } from "./constants";
import { setPatientList, useStateValue } from "./state";
// import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientC from "./components/Patient";

const App = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    void setPatientList(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route exact path="/">
              <PatientListPage />
            </Route>
            <Route path="/patients/:id">
              <PatientC />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
