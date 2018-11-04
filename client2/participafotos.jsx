
/* ----------  External Libraries  ---------- */

  import React from 'react';
  //var ReactDOM = require('react-dom');
  import axios from 'axios';



  import glamorous, { ThemeProvider } from "glamorous";
  import { css } from "glamor";
  import * as cssfibo from '../css/fibo1';
  import { theme1, theme3 } from '../css/themes';
  import * as cssx from '../css/css2';


  let MiInput = glamorous.input()
  let MiInput2 = cssx.input2()

  let MiTextArea = glamorous.textarea()
  let theme = theme1;




//--------------- Variables Globales-------------------------------



  const Encabezado = (props) => {
    try {

      const { children } = props

      const Seccion1 = () => {

        return (

          <div>

            <ThemeProvider theme={props.Theme}>
              <div>

                <cssfibo.MyFlex1
                  css={{backgroundColor: props.Theme.backgroundcolor}}
                >

                  <cssfibo.Box1
                    css={{
                      width: 233,
                      backgroundColor: props.Theme.backgroundcolor,
                    }}>

                    hola


                  </cssfibo.Box1>



                </cssfibo.MyFlex1>

              </div>
            </ThemeProvider>

          </div>

        )
      }


      const Chart1 = () => {

        return (

          <cssfibo.MyFlex1>

            <cssfibo.BoxField css={{
              width: '610px',
              // height: '377px',
            }}>



            </cssfibo.BoxField>

          </cssfibo.MyFlex1>

        )
      }

      return children({
           Seccion1: Seccion1(),
           Chart1: Chart1(),
      });

    } catch (e) {
      console.error(e);
    }

  }





  const Marco1 = (props) => {
    try {
      console.log('hola')

    } catch (e) {
      console.error(e);
    }


  }





  const FilaFotos = (props) => {
    try {

      let armado

      if(props.data.length>0){

        armado = props.data.map((c, index) => (


          <div>

              <cssfibo.MyFlex3 css={{gridArea: 'contenido2'}}>

                <ThemeProvider theme={theme3.forma}>

                  <div>


                    {c.NombrePart}



                    <cssx.foto1 src={'http://smxai.net/participantes/' + c.Id + '.jpg'}/>



                    <cssfibo.Boton1
                      class="noatiende"
                      color={"grey"}
                      onClick={() => {
                        props.this.asignar(c.Id, props.this.props.usr)
                      }}
                    >

                      Asignar Foto

                    </cssfibo.Boton1>








                  </div>











                </ThemeProvider>

              </cssfibo.MyFlex3>




          </div>

        ))

      } else {

        return <div>No Hay Fotos disponibles</div>
      }


      return (

        <g>

          {armado}

        </g>

      )


    } catch (e) {
      console.error(e);
    }


  }










export default class Line extends React.Component {



  constructor(props) {
    super(props);

    this.state = {


      data: [],

      canvas: 1000,

      isDragging: false,
      previousLeft: 0,
      previousTop: 0,


      textoquery: "quiero informacion",
      botonquery: "Gray",


      Respuesta: "",



    }




  } // ------------------------- Constructor


  componentWillMount() {

   this.getdatos(this.props.usr);

  }




  getdatos = async (IdInterno) => {

    var axdata = await (
      axios({
        // url: 'https://smxai.net/graphql2',
        url: '/graphql2',

        method: 'post',
        data: {
          query: `
            query Participantes($IdInterno: String) {
              Participantes(IdInterno: $IdInterno) {
                Id
                FbId
                NombrePart
                IdInterno
                Origen
                Fecha
                Obv
                url
                urlpost
              }
            }
          `,

          variables: {
            "IdInterno": IdInterno,
          },
        }
      })
    )

    this.setState({data: axdata.data.data.Participantes})

  }




  asignar = async (Id, IdInterno) => {

    var axdata = await (
      axios({
        // url: 'https://smxai.net/graphql2',
        url: '/graphql2',

        method: 'post',
        data: {
          query: `
            mutation ParticipanteU($Id: Int, $IdInterno: String, $Obv: String) {
              ParticipanteU(Id: $Id, IdInterno: $IdInterno, Obv: $Obv)
            }
          `,

          variables: {
            "IdInterno": IdInterno,
            "Id": Id,
            "Obv": "",
          },
        }
      })
    )

   this.getdatos(this.props.usr);

  }











  //
  // QueryChanged(event) {
  //   this.setState({textoquery: event.target.value})
  //   this.setState({botonquery: 'Gray'})
  // }






    render() {


      return(


      <div>

        <div>


        <cssfibo.MyFlex3 css={{gridArea: 'header'}}>

          <ThemeProvider theme={theme3.forma}>

            <div>

              <cssfibo.MyFlexR1>





              </cssfibo.MyFlexR1>





              <cssfibo.MyFlex3 css={{gridArea: 'contenido2'}}>

                <ThemeProvider theme={theme3.forma}>

                  <div>



                    <FilaFotos
                      data={this.state.data}
                      this={this}
                    />



                  </div>

                </ThemeProvider>

              </cssfibo.MyFlex3>


                  </div>

                </ThemeProvider>

              </cssfibo.MyFlex3>


        </div>


    </div>

    );
    }
}
