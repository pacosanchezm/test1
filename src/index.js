import React from "react";
import ReactDOM from "react-dom";

import Reloj from "./reloj.jsx";

import FormDatos from "../client2/iniciosusuariosdata";

import Kwmap7 from "../client2/kwmapmapa7";


import Fotos from "../client2/participafotos";



const rootElement = document.getElementById("root");

let torender = 3;

let usr = 1;
let page = 1387817898201761;
let id = 188912;
let opt = 2;

if (torender == 1) {
  ReactDOM.render(
    <FormDatos usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender == 2) {
  ReactDOM.render(<Kwmap7 usr={usr} opt={opt} />, rootElement);
}



if (torender == 3) {
  ReactDOM.render(<Fotos usr={usr} opt={opt} />, rootElement);
}
