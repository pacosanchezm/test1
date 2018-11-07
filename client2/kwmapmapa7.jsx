/* ----------  External Libraries  ---------- */

import React from "react";
var ReactDOM = require("react-dom");
import axios from "axios";

var d3 = require("d3");
import Objetos from "../svg/objetos";

// import witai from '../db/witai'

import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import * as cssfibo from "../css/fibo1";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css2";

let MiInput = glamorous.input();
let MiInput2 = cssx.input2();

let MiTextArea = glamorous.textarea();
let theme = theme1;

//--------------- Variables Globales-------------------------------

const Encabezado = props => {
  try {
    const { children } = props;

    const Seccion1 = () => {
      return (
        <div>
          <ThemeProvider theme={props.Theme}>
            <div>
              <cssfibo.MyFlex1
                css={{ backgroundColor: props.Theme.backgroundcolor }}
              >
                <cssfibo.Box1
                  css={{
                    width: 233,
                    backgroundColor: props.Theme.backgroundcolor
                  }}
                >
                  <cssx.box3input>
                    <cssx.input3
                      theme={theme3.forma}
                      name="Nombre"
                      value={this.state.textoquery}
                      onChange={this.NombreChanged.bind(this)}
                      key="N1"
                    />
                  </cssx.box3input>

                  <cssx.field1
                    Box={theme.box.forma}
                    Texto={theme.texto.formacampo}
                    text={props.this.state.textoquery}
                    css={{ textColor: "White" }}
                  />
                </cssfibo.Box1>
              </cssfibo.MyFlex1>
            </div>
          </ThemeProvider>
        </div>
      );
    };

    const Chart1 = () => {
      return (
        <cssfibo.MyFlex1>
          <cssfibo.BoxField
            css={{
              width: "610px"
              // height: '377px',
            }}
          />
        </cssfibo.MyFlex1>
      );
    };

    return children({
      Seccion1: Seccion1(),
      Chart1: Chart1()
    });
  } catch (e) {
    console.error(e);
  }
};

const DrawtreeR = props => {
  try {
    let treearmado;

    if (props.treedata.length > 0) {
      treearmado = props.treedata.map((c, index) => (
        <g>
          <Objetos.Diagonal1
            sourcex={props.plumax}
            sourcey={props.plumay}
            targetx={props.treedata[index].x}
            targety={props.treedata[index].y}
            stroke={2}
            color={props.treedata[index].linecolor}
          />

          <Objetos.Vineta1
            key={c.nodo}
            x={props.treedata[index].x}
            y={props.treedata[index].y}
            size={11}
            ccolor={"DarkSlateGrey"}
            tcolor={props.treedata[index].color}
            texto={c.entidad + " - " + c.valor}
            nodo={c.nodo}
            // href={"https://www.w3.org/TR/SVG/"}
          />

          <DrawtreeR
            treedata={props.treedata[index].children}
            this={props.this}
            treeindex={index}
            plumax={c.x}
            plumay={c.y}
          />
        </g>
      ));
    }

    return <g>{treearmado}</g>;
  } catch (e) {
    console.error(e);
  }
};

export default class Line extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tree: [
        {
          Vineta: 1,
          x: 150,
          y: 300,
          children: [
            {
              Vineta: 2,
              x: 400,
              y: 100,
              children: [
                { Vineta: 3, x: 400, y: 100 },
                { Vineta: 4, x: 400, y: 115 },
                { Vineta: 5, x: 400, y: 130 }
              ]
            }
          ]
        }
      ],

      KwModelo: [],

      treemapa: [],

      treedata: [{ children: [] }],

      pluma: { x: 150, y: 600 },

      canvas: 2000,

      hasCapture: false,
      circleLeft: 180,
      circleTop: 80,

      isDragging: false,
      previousLeft: 0,
      previousTop: 0,

      textoquery: "quiero informacion",
      botonquery: "Gray",

      Respuesta: ""
    };
  } // ------------------------- Constructor

  componentWillMount() {
    this.getdatosmap(1);
  }

  onDown = event => {
    this.setState({ isDragging: true });

    //event.OffsetX(event.mouseId);

    this.extractPositionDelta(event);
  };

  onUp = () => {
    this.setState({ isDragging: false });
  };

  onMove = () => {
    if (!this.state.isDragging) {
      return;
    }
    const { left, top } = this.extractPositionDelta(event);

    this.setState(({ circleLeft, circleTop }) => ({
      circleLeft: circleLeft + left,
      circleTop: circleTop + top
    }));
  };

  extractPositionDelta = event => {
    const left = event.pageX;
    const top = event.pageY;
    const delta = {
      left: left - this.state.previousLeft,
      top: top - this.state.previousTop
    };

    this.setState({ previousLeft: left });

    this.setState({ previousTop: top });

    return delta;
  };

  maketree = (kwdata, parent, indent, canvas, plumax, plumay) => {
    const ponerpluma = (micanvas, plumay, ramas) => {
      let intervalo = micanvas / ramas;
      let mitad = ramas / 2;
      let nuevaplumay = plumay - intervalo * mitad;

      return nuevaplumay;
    };

    const miintervalo = (miindex, miindent, micanvas, ramas) => {
      if (miindent == 1) {
        return miindex * (micanvas / (ramas - miindex));
      }

      if (miindent == 2) {
        return miindex * (micanvas / ramas);
      }

      if (miindent == 3) {
        return 30 * miindex;
      }
    };

    let mipluma = 0;

    let intervalo = 30;

    let filtro = kwdata.filter(c => c.Parent === parent);

    let miplumay = 0;

    if (indent == 1) {
      miplumay = ponerpluma(500, plumay, filtro.length);
    }

    if (indent == 2) {
      miplumay = ponerpluma(300, plumay, filtro.length);
    }

    if (indent == 3) {
      miplumay = ponerpluma(300, plumay, filtro.length);
    }

    return filtro.map((c, index) => {
      return {
        id: c.Id,
        nodo: c.Nodo,
        entidad: c.Entidad,
        valor: c.Valor,
        x: plumax + 300,
        y: miplumay + miintervalo(index, indent, canvas, filtro.length),
        // y: plumay - mipluma + (index * intervalo),
        color: "DarkSlateGrey",
        linecolor: "grey",
        parent: c.Parent,

        children: this.maketree(
          kwdata,
          c.Nodo,
          indent + 1,
          300,
          plumax + 200,
          miplumay +
            miintervalo(index, indent, canvas, filtro.length) *
              (filtro.length / 2)
        )
      };
    });
  };

  maketree2 = (kwdata, parent, indent, canvas, plumax, plumay) => {
    try {
      const ponerpluma = (micanvas, plumay, ramas, indent) => {
        if (indent == 1) {
          let intervalo = micanvas / ramas;
          let mitad = ramas / 2;
          let nuevaplumay = plumay - intervalo * mitad;
          return nuevaplumay;
        }

        if (indent == 2) {
          let intervalo = micanvas / ramas;
          let mitad = ramas / 2;
          let nuevaplumay = plumay - intervalo * mitad;
          return nuevaplumay;
        }

        if (indent == 3) {
          let intervalo = micanvas / ramas;
          let mitad = ramas / 2;
          let nuevaplumay = plumay;
          return nuevaplumay;
        }
      };

      const miintervalo = (miindex, miindent, micanvas, ramas) => {
        if (miindent == 1) {
          return miindex * (micanvas / (ramas - miindex));
        }

        if (miindent == 2) {
          return miindex * (15 + micanvas / ramas);
        }

        if (miindent == 3) {
          return 25 * miindex;
          // return miindex * (micanvas / ramas);
        }
      };

      let mipluma = 0;

      let intervalo = 30;

      let filtro = kwdata.filter(c => c.Parent === parent);

      let miplumay = 0;

      if (indent == 1) {
        miplumay = ponerpluma(650, plumay, filtro.length, indent);
      }

      if (indent == 2) {
        miplumay = ponerpluma(300, plumay, filtro.length, indent);
      }

      if (indent == 3) {
        miplumay = ponerpluma(250, plumay, filtro.length, indent);
      }

      return filtro.map((c, index) => {
        let Mishijos = [];

        Mishijos = this.maketree2(
          kwdata,
          c.Nodo,
          indent + 1,
          500,
          plumax + 200,
          miplumay + miintervalo(index, indent, canvas, filtro.length) - 40
        );

        return {
          id: c.Id,
          nodo: c.Nodo,
          entidad: c.Entidad,
          valor: c.Valor,
          x: plumax + 300,
          y: miplumay + miintervalo(index, indent, canvas, filtro.length),
          // y: plumay - mipluma + (index * intervalo),
          color: "DarkSlateGrey",
          linecolor: "grey",
          parent: c.Parent,

          children: Mishijos
        };
      });
    } catch (e) {
      console.error(e);
    }
  };

  getdatosmap = async Modelo => {
    var axdata = await axios({
      url: "https://smxai.net/graphql2",
      method: "post",
      data: {
        query: `
            query KwModelo($Modelo: Int) {
              KwModelo(Modelo: $Modelo) {
                Id
                Modelo
                Nodo
                Parent
                Status
                Entidad
                Valor
                Obv
              }
            }
          `,

        variables: {
          Modelo: Modelo
        }
      }
    });

    this.setState({
      treedata: await this.maketree2(
        axdata.data.data.KwModelo,
        0,
        1,
        600,
        this.state.pluma.x,
        this.state.pluma.y
      )
    });
    this.setState({ KwModelo: axdata.data.data.KwModelo });
  };

  async getrespuesta(Modelo, Perfil, Nodo) {
    var axdata = await axios({
      url: "https://smxai.net/graphql2/graphql2",
      method: "post",
      data: {
        query: `
            query kwRespuesta($Modelo: Int, $Perfil: Int, $Nodo: Int) {
              KwRespuesta(Modelo: $Modelo, Perfil: $Perfil, Nodo: $Nodo) {
                IdInfo
                IdModelo
                perfil
                nodo
                data
                accion
                accionparam
                obv
              }
            }
          `,

        variables: {
          Modelo: Modelo,
          Perfil: Perfil,
          Nodo: Nodo
        }
      }
    });

    console.log(axdata.data.data.KwRespuesta);
    if (axdata.data.data.KwRespuesta.length > 0) {
      this.setState({ Respuesta: axdata.data.data.KwRespuesta[0].data });
      return axdata.data.data.KwRespuesta[0].data;
    } else {
      this.setState({ Respuesta: "Sin Respuesta" });

      return 0;
    }
  }

  QueryChanged(event) {
    this.setState({ textoquery: event.target.value });
    this.setState({ botonquery: "Gray" });
  }

  // ------------------------------------------------------ witai

  token = async MiPage => {
    let WIT_TOKEN;
    let Modelo;
    let Perfil;
    let Calificacion;

    try {
      switch (MiPage) {
        case "1620194274934376": // aac
          WIT_TOKEN = "YOPJGN6YX7C47PQUX3XUBWVSNIEYZ5Q6";
          Modelo = 6;
          Perfil = 2;
          Calificacion = 0.8;
          break;

        case "2185581258130500": // somoscasas
          WIT_TOKEN = "MR23QNA7RUQJR47HIHMXSSRSNMVCNGF7";
          Modelo = 7;
          Perfil = 1;
          Calificacion = 0.8;
          break;

        case "1670865973219070": //Nelli
          WIT_TOKEN = "WI24OIJ53CSCIG2OZNIYSPTPC2A4LH3E";
          Modelo = 9;
          Perfil = 1;
          Calificacion = 0.8;
          break;

        default:
          break;
      }

      return {
        Token: WIT_TOKEN,
        Modelo: Modelo,
        Perfil: Perfil,
        Calificacion: Calificacion
      };
    } catch (e) {
      console.error(e);
    }
  };

  EntidadesE = async (witoken, text) => {
    try {
      let axapi = await axios({
        headers: { Authorization: "Bearer " + witoken.Token },
        url: "/message",
        baseURL: "https://api.wit.ai/",
        params: {
          v: "20170307",
          q: text
        }
      });

      axapi.data.Calificacion = await this.Calificar(axapi.data.entities);

      return axapi.data;
    } catch (e) {
      console.error(e);
    }
  };

  Calificar = Entidades => {
    try {
      let MiCalif = 0;
      let NumVals = 0;

      let MiMapa = Object.entries(Entidades).map(([row, vals]) => {
        vals.forEach((val, index) => {
          MiCalif = MiCalif + val.confidence;
          NumVals = NumVals + 1;

          return MiCalif;
        });
      });

      return MiCalif / NumVals;
    } catch (e) {
      console.error(e);
    }
  };

  EntiMap = Entidades => {
    try {
      let MiMapa = Object.entries(Entidades).map(([row, vals]) => {
        return {
          Entidad: row,
          Valores: vals,
          Validado: 0
        };
      });

      return MiMapa;
    } catch (e) {
      console.error(e);
    }
  };

  Ramas = async (Nodo, kwdata) => {
    try {
      return kwdata.filter(c => c.Parent === Nodo);
    } catch (e) {
      console.error(e);
    }
  };

  RamasMatch = async (Ramas, EntiMap) => {
    try {
      let filtrado = await Promise.all(
        EntiMap.map(async Entidad => {
          let MiEntidad = Entidad.Entidad;
          let MiValor = Entidad.Valores[0].value;
          let MiValidado = Entidad.Validado;

          let MiFiltro = await Ramas.filter(
            rama =>
              rama.Entidad == MiEntidad &&
              rama.Valor == MiValor &&
              MiValidado == 0
          );

          return MiFiltro;
        })
      );

      let MiFiltroNull = await filtrado.filter(rama => rama.length > 0);

      return MiFiltroNull;
    } catch (e) {
      console.error(e);
    }
  };

  EntiMapCheck = (RamasMatch, EntiMap) => {
    try {
      let EntiMapV = EntiMap;
      EntiMapV.forEach((Entidad, index) => {
        if (RamasMatch[0][0].Entidad === Entidad.Entidad) {
          Entidad.Validado = 1;
        }
      });

      return EntiMapV;
    } catch (e) {
      console.error(e);
    }
  };

  Nodos = async (witEntidades, kwdata) => {
    try {
      let MiNodo = 0;
      let EntiMap = await this.EntiMap(witEntidades.entities);

      let EntiMapCheck = EntiMap;

      for (var i = 0; i < EntiMap.length; i++) {
        let Ramas = await this.Ramas(MiNodo, kwdata);

        let RamasMatch = await this.RamasMatch(Ramas, EntiMap);

        let EntiMapCheck = await this.EntiMapCheck(RamasMatch, EntiMap);

        MiNodo = RamasMatch[0][0].Nodo;
      }

      return MiNodo;
    } catch (e) {
      console.error(e);
    }
  };

  Pintar = async (Nodo, Tree, Color) => {
    try {
      // console.log('tree: ' + JSON.stringify(tree))
      let pintados = await Promise.all(
        Tree.map(async (Reg, Index) => {
          if (Reg.nodo === Nodo) {
            const Mitreedata = Tree;

            Mitreedata[Index].color = Color;
            Mitreedata[Index].linecolor = Color;
            this.setState({ Mitreedata });
            this.Pintar(Reg.parent, this.state.treedata, Color);
          }

          this.Pintar(Nodo, Tree[Index].children, Color);
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  DesPintar = async tree => {
    try {
      this.setState({ Respuesta: "" });

      let pintados = await Promise.all(
        tree.map(async (Reg, index) => {
          const mitreedata = tree;
          mitreedata[index].color = "grey";
          mitreedata[index].linecolor = "grey";
          this.setState({ mitreedata });

          this.DesPintar(tree[index].children);
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  witquery = async (MiPage, MiTexto) => {
    try {
      this.DesPintar(this.state.treedata);

      //console.log('texto: ' + MiTexto)

      let witoken = await this.token(MiPage);

      //console.log('token: ' + JSON.stringify(witoken))

      let witEntidades = await this.EntidadesE(witoken, MiTexto);

      //console.log('entidades: ' + JSON.stringify(witEntidades))

      let witNodo = await this.Nodos(witEntidades, this.state.KwModelo);

      //console.log("witnodo: " + JSON.stringify(witNodo));

      let Respuesta = await this.getrespuesta(1, 1, witNodo);

      console.log("respuesta: " + Respuesta);

      if (Respuesta != 0) {
        this.Pintar(witNodo, this.state.treedata, "Lime");
      } else {
        this.Pintar(witNodo, this.state.treedata, "Orange");
      }

      //  return qI
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <div>
        <div>
          <cssfibo.MyFlex3 css={{ gridArea: "contenido" }}>
            <ThemeProvider theme={theme3.forma}>
              <div>
                <cssfibo.MyFlexR1>
                  <cssx.box3input>
                    <cssx.input3
                      theme={theme3.forma}
                      name="Nombre"
                      value={this.state.textoquery}
                      onChange={this.QueryChanged.bind(this)}
                      key="N1"
                    />
                  </cssx.box3input>

                  <cssfibo.Boton1
                    class="noatiende"
                    color={this.state.botonquery}
                    onClick={() => {
                      this.witquery("1670865973219070", this.state.textoquery);
                    }}
                  >
                    Enviar
                  </cssfibo.Boton1>
                </cssfibo.MyFlexR1>

                <cssfibo.MyFlex3 css={{ gridArea: "contenido2" }}>
                  <ThemeProvider theme={theme3.forma}>
                    <div>
                      <cssfibo.MyFlexR1>
                        <cssx.field1
                          Box={theme.box.forma}
                          Texto={theme.texto.formacampo}
                          text={this.state.Respuesta}
                        />
                      </cssfibo.MyFlexR1>
                    </div>
                  </ThemeProvider>
                </cssfibo.MyFlex3>
              </div>
            </ThemeProvider>
          </cssfibo.MyFlex3>
        </div>

        <div>
          <svg width={1440} height={1300}>
            {/*
              <circle
              cx={this.state.circleLeft}
              cy={this.state.circleTop}
              r={10}
              fill="red"
              onMouseDown={this.onDown}
              onMouseMove={this.onMove}
              onMouseUp={this.onUp}
              onMouseUp={this.onUp}
            />
          */}

            <Objetos.Vineta1
              key={1}
              x={this.state.pluma.x}
              y={this.state.pluma.y}
              size={15}
              ccolor={"DarkSlateGrey"}
              tcolor={"black"}
              texto={"Temas"}
              lado={"Izq"}
            />

            <DrawtreeR
              treedata={this.state.treedata}
              this={this}
              plumax={this.state.pluma.x}
              plumay={this.state.pluma.y}
            />
          </svg>
        </div>
      </div>
    );
  }
}

// ------------------------------------
