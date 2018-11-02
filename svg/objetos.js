


// ---------------------------------------------------------------

  import React from 'react';

  import axios from 'axios';

  import glamorous, { ThemeProvider } from "glamorous";
  import { css } from "glamor";
  import * as cssfibo from '../css/fibo1';

  import * as cssx from '../css/css2';


  var d3 = require("d3");


// ---------------------------------------------------------------



exports.Circulo1 = (props) => {
  try {

    const { children } = props

    const MiCirculo = () => {

      return (

        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">

          <a href={props.href} target="_blank">

            <circle
              id="circle"
              fill={props.color}
              cx={props.x}
              cy={props.y}
              r={props.r}
            >
            </circle>

          </a>

        </g>



      )

    }

    return MiCirculo();

  } catch (e) {
    console.error(e);
  }

}






exports.Texto1 = (props) => {
  try {

    const { children } = props

    const MiTexto = () => {


      let margenx = props.margenx + 5

      let margeny = 4


      let alinear = "start"

      if (props.lado === "Izq"){
        alinear="end"
        margenx = (props.margenx * -2) + 5
      }







      return (

        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">

          <a href={props.href} target="_blank">

            <text
              x={props.x + margenx}
              y={props.y + margeny}
              fill={props.color}
              fontSize={props.size}
              fontFamily={"sans-serif"}
              textAnchor={alinear}
            >
              {props.texto}
            </text>

          </a>

        </g>



      )

    }

    return MiTexto();

  } catch (e) {
    console.error(e);
  }

}











exports.Vineta1 = (props) => {
  try {

    const { children } = props

    const MiVineta = () => {


      return (



        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">



          <a href={props.href} target="_blank">

            <exports.Circulo1
              color={props.ccolor}
              x={props.x}
              y={props.y}
              r={props.size/2}

            />


            <exports.Texto1
              texto={props.texto}
              x={props.x}
              y={props.y}
              lado={props.lado}
              size={props.size}
              color={props.tcolor}
              margenx={((props.size / 2) * 2)}
              margeny={0}
            />

          </a>

        </g>






      )

    }

    return MiVineta();

  } catch (e) {
    console.error(e);
  }

}









exports.Diagonal1 = (props) => {
  try {

    const { children } = props

    const MiDiagonal = () => {

    var dataD = {
      source: {
        x: props.sourcex,
        y: props.sourcey
      },
      target: {
        x: props.targetx,
        y: props.targety
      },
    };

      var diagonal = d3.linkHorizontal()
          .x(function(d) {return d.x;})
          .y(function(d) {return d.y;});





      return (

        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">

           <path

             d={diagonal(dataD)}
             fill={"none"}
             stroke={props.color}
             strokeWidth={props.stroke}

           />

        </g>



      )

    }

    return MiDiagonal();

  } catch (e) {
    console.error(e);
  }

}






































































exports.Barras1 = (props) => {
  try {

    const { children } = props

    const Barras = () => {


    const data = [12, 5, 6, 6, 9, 10];

    const svg = d3.select("body")
    .append("svg")
    .attr("width", 600)
    .attr("height", 300)
    .style("margin-left", 100);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => 300 - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")



      return (

         <div id={"#" + this.props.id}></div>



      )

    }

    return Barras();

  } catch (e) {
    console.error(e);
  }

}
