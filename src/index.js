import React from "react";
import ReactDOM from "react-dom";
import { PouchDB } from "react-pouchdb";
import App from "./App";
import ReteProvider from "./contexts/Rete";
import PubSubProvider from "./contexts/PubSub";
import ThothProvider from "./contexts/Thoth";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <PouchDB name="thoth">
      <PubSubProvider>
        <ReteProvider>
          <ThothProvider>
            <App />
          </ThothProvider>
        </ReteProvider>
      </PubSubProvider>
    </PouchDB>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
