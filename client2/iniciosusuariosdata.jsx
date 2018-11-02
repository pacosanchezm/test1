/* eslint-disable react/react-in-jsx-scope */

/* ----------  External Libraries  ---------- */
//var window = this;

import React from "react";
import "whatwg-fetch";
import WebviewControls from "../messenger-api-helpers/webview-controls";

import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import * as cssfibo from "../css/fibo1";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css2";

import Dropbox from "react-select";
// import 'react-select/dist/react-select.css';

import axios from "axios";

import moment from "moment";

let MiInput = glamorous.input();

let MiInput2 = cssx.input2();

let MiTextArea = glamorous.textarea();

let theme = theme1;

import WeUI from "react-weui";
const { Button } = WeUI;
const { ButtonArea } = WeUI;

// ------------------------------------------------------------

const Title = glamorous.h1({ fontSize: "20px" }, (props, theme) => ({
  color: props.theme.texto.campo.color
}));

const Title2 = glamorous.h1(({ theme }) => ({
  color: theme.color,
  fontSize: theme.size
}));

const Basic = ({ theme }) => (
  <ThemeProvider theme={theme}>
    <Title>Hello Basic!</Title>
  </ThemeProvider>
);

const Encabezado = props => {
  try {
    const { children } = props;

    const Columnas = () => {
      return (
        <div>
          <cssfibo.MyFlex1 css={{ backgroundColor: "LightGray" }}>
            <cssfibo.Box css={{}}>
              <cssfibo.h1
                text="Registra tus Datos Generales"
                size="15"
                color="SlateGrey"
                weight="Normal"
                style="Normal"
              />
            </cssfibo.Box>
          </cssfibo.MyFlex1>
        </div>
      );
    };

    return children({
      secretToLife: 42,
      Columnas: Columnas()
    });
  } catch (e) {
    console.error(e);
  }
};

//--------------------------------------------------------------

export default class Usuario extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: "777",
      orden: "Id",
      statusfiltro: "Status",
      ciudadfiltro: "Ciudad",
      atiendefiltro: "Atiende",

      botonguardar: "Grey",
      status: [{ value: "", label: "" }],

      seguimiento: "",
      atiendeid: "",
      asisthumano: "",

      Nombre: "",
      Apellidos: "",
      Telefono: "",
      Email: "",
      Ciudad: "",
      Estado: "",
      obv: "",

      usuario: [
        {
          Id: 1,
          Page: 1,
          FbId: 1,
          Nombre: "...",
          Apellidos: " ",
          Telefono: "...",
          Email: "...",
          Ciudad: "...",
          Colonia: "...",
          Direccion: "...",
          Estado: "...",
          Cp: "...",
          Pais: "...",

          Status: "...",
          Seguimiento: "...",
          AsistHumano: "...",
          Profile_pic: "...",

          IdInterno: "...",
          IdExterno: "...",
          Valor1: "...",
          Valor2: "...",
          Obv: "...",
          Atiende: "...",
          AtiendeId: "...",
          Nacimiento: "..."
        }
      ],

      DropStatus: [
        { value: "Contactar", label: "Contactar" },
        { value: "Contactado", label: "Contactado" },
        { value: "Entregado", label: "Entregado" },
        { value: "Activo", label: "Activo" },
        { value: "Otros", label: "Otros" }
      ],

      DropAtiende: [
        { value: "1", label: "Paco" },
        { value: "2", label: "Heriberto" },
        { value: "3", label: "Valeria" },
        { value: "4", label: "Cristina" }
      ]
    };

    // this.NombreChanged = this.NombreChanged.bind(this);
  } // ------------------------- Constructor

  componentWillMount() {
    this.getdatos();
  }

  async getdatos() {
    var axdata = await axios({
      url: "https://smxai.net/graphql2",
      method: "post",
      data: {
        query: `
            query usuarioidmz($MiId: Int) {
              usuarioidmz(MiId: $MiId) {
                Id
                Page
                FbId
                Nombre
                Apellidos
                Email
                Telefono
                Direccion
                Colonia
                Ciudad
                Estado
                Cp
                Status
                AsistHumano
                Profile_pic
                Valor1
                Valor2
                Obv
                Atiende
                AtiendeId
                Nacimiento
              }
        }

          `,

        variables: {
          MiId: this.props.id
        }
      }
    });

    let data = axdata.data.data.usuarioidmz[0];

    this.setState({ usuario: axdata.data.data.usuarioidmz });

    this.setState({ Nombre: data.Nombre });
    this.setState({ Apellidos: data.Apellidos });
    this.setState({ Email: data.Email });
    this.setState({ Telefono: data.Telefono });
    this.setState({ Ciudad: data.Ciudad });
    this.setState({ Estado: data.Estado });
    this.setState({ obv: data.Obv });

    this.setState({ seguimiento: data.Seguimiento });
    this.setState({ asisthumano: data.AsistHumano });
    this.setState({ atiendeid: data.AtiendeId });
    this.setState({ status: data.Status });
  }

  MiAtiende = (id, opciones) => {
    let MiFiltro = opciones.filter(ops => ops.value == id);
    if (MiFiltro.length != 0) {
      return MiFiltro[0].label;
    } else {
      return "--";
    }
  };

  async pushdatos() {
    var axdata = await axios({
      url: "/graphql2",
      method: "post",
      data: {
        query: `
            mutation usuarioUmz($usuario: usuariomzInput) {
              usuarioUmz(usuario: $usuario)
            }
          `,
        variables: {
          usuario: {
            Id: this.props.id,
            Nombre: this.state.Nombre,
            Apellidos: this.state.Apellidos,
            Email: this.state.Email,
            Telefono: this.state.Telefono,
            Ciudad: this.state.Ciudad,
            Estado: this.state.Estado,

            Obv: this.state.obv,
            Status: this.state.status,
            Seguimiento: this.state.seguimiento,
            AsistHumano: this.state.asisthumano,
            AtiendeId: this.state.atiendeid
          }
        }
      }
    });

    WebviewControls.close();
  }

  cerrar() {
    WebviewControls.close();
  }

  logChangeStatus(val) {
    this.setState({ status: val });
    this.setState({ botonguardar: "Gray" });
  }

  logChangeAtiende(val) {
    this.setState({ atiendeid: val });
    this.setState({ botonguardar: "Gray" });
  }

  logChangeSeguimiento(val) {
    this.setState({ Seguimiento: val.value });
    this.setState({ botonguardar: "Gray" });
  }

  ObvChanged(event) {
    this.setState({ obv: event.target.value });
    // this.setState({botonguardar: 'Gray'})
  }

  NombreChanged(event) {
    this.setState({ Nombre: event.target.value });
  }

  ApellidosChanged(event) {
    this.setState({ Apellidos: event.target.value });
  }

  EmailChanged(event) {
    this.setState({ Email: event.target.value });
  }

  TelefonoChanged(event) {
    this.setState({ Telefono: event.target.value });
  }

  CiudadChanged(event) {
    this.setState({ Ciudad: event.target.value });
  }

  EstadoChanged(event) {
    this.setState({ Estado: event.target.value });
  }

  // --------------------------------------------------------------------------

  render() {
    return (
      // <cssfibo.MyGridRouter1>
      <div>
        <cssfibo.MyFlex3
          css={{
            gridArea: "header",
            backgroundColor: "LightGray"
          }}
        >
          <Encabezado
            Encabezado={theme.encabezado}
            Box={theme.box.campo}
            Texto={theme.texto.columna}
          >
            {({ secretToLife, Columnas }) => <div>{Columnas}</div>}
          </Encabezado>
        </cssfibo.MyFlex3>

        <cssfibo.MyFlex3 css={{ gridArea: "contenido" }}>
          <ThemeProvider theme={theme3.forma}>
            <div>
              <cssfibo.MyFlexR1>
                <cssx.box3label>
                  <cssx.h3>Nombre</cssx.h3>
                </cssx.box3label>

                <cssx.box3input>
                  <cssx.input3
                    theme={theme3.forma}
                    name="Nombre"
                    value={this.state.Nombre}
                    onChange={this.NombreChanged.bind(this)}
                    key="N1"
                  />
                </cssx.box3input>
              </cssfibo.MyFlexR1>

              <cssfibo.MyFlexR1>
                <cssx.box3label>
                  <cssx.h3>Apellidos</cssx.h3>
                </cssx.box3label>

                <cssx.box3input>
                  <cssx.input3
                    theme={theme3.forma}
                    name="Apellidos"
                    value={this.state.Apellidos}
                    onChange={this.ApellidosChanged.bind(this)}
                    key="A1"
                  />
                </cssx.box3input>
              </cssfibo.MyFlexR1>

              <cssfibo.MyFlexR1>
                <cssx.box3label>
                  <cssx.h3>Email</cssx.h3>
                </cssx.box3label>

                <cssx.box3input>
                  <cssx.input3
                    theme={theme3.forma}
                    name="Email"
                    value={this.state.Email}
                    onChange={this.EmailChanged.bind(this)}
                    key="e1"
                  />
                </cssx.box3input>
              </cssfibo.MyFlexR1>

              <cssfibo.MyFlexR1>
                <cssx.box3label>
                  <cssx.h3>TelÃ©fono</cssx.h3>
                </cssx.box3label>

                <cssx.box3input>
                  <cssx.input3
                    theme={theme3.forma}
                    name="Telefono"
                    value={this.state.Telefono}
                    onChange={this.TelefonoChanged.bind(this)}
                    key="t1"
                  />
                </cssx.box3input>
              </cssfibo.MyFlexR1>

              <cssfibo.MyFlexR1>
                <cssx.box3label>
                  <cssx.h3>Ciudad</cssx.h3>
                </cssx.box3label>

                <cssx.box3input>
                  <cssx.input3
                    theme={theme3.forma}
                    name="Telefono"
                    value={this.state.Ciudad}
                    onChange={this.CiudadChanged.bind(this)}
                    key="c1"
                  />
                </cssx.box3input>
              </cssfibo.MyFlexR1>

              <cssfibo.MyFlexR1>
                <cssx.box3label>
                  <cssx.h3>Estado</cssx.h3>
                </cssx.box3label>

                <cssx.box3input>
                  <cssx.input3
                    theme={theme3.forma}
                    name="Telefono"
                    value={this.state.Estado}
                    onChange={this.EstadoChanged.bind(this)}
                    key="t1"
                  />
                </cssx.box3input>
              </cssfibo.MyFlexR1>
            </div>
          </ThemeProvider>
        </cssfibo.MyFlex3>

        <cssfibo.MyFlexR1 css={{}}>
          <cssx.field1
            Box={theme.box.label}
            Texto={theme.texto.formalabel}
            text={"Comentarios:"}
          />

          <cssfibo.BoxField
            css={{
              width: "76px"
            }}
          >
            <MiTextArea
              css={{
                width: "400px",
                height: "144px",
                align: "top",
                padding: "5px",
                fontFamily: "Arial",
                fontSize: 12,
                lineHeight: 1,
                color: "SlateGrey",
                fontWeight: "Normal",
                fontStyle: "Normal",
                rows: 4,
                cols: 50
              }}
              type="text"
              key="editor1"
              value={this.state.obv}
              onChange={this.ObvChanged.bind(this)}
            />
          </cssfibo.BoxField>
        </cssfibo.MyFlexR1>

        {/*

        <cssfibo.MyFlexR1 css={{}}>

          <cssfibo.Boton1
            class="noatiende"
            color={this.state.botonguardar}
            onClick={() => {
              this.pushdatos()
            }}
          >

            Guardar

          </cssfibo.Boton1>


        </cssfibo.MyFlexR1>
 */}

        <section>
          <ButtonArea className="see-options">
            <Button onClick={() => this.pushdatos()}>Guardar</Button>
          </ButtonArea>
        </section>
      </div>

      // </cssfibo.MyGridRouter1>
    );
  }
}
