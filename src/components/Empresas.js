import React from 'react'
import { connect } from 'react-redux'
import Empresa from './Empresa'
import EmpresaSalvar from './EmpresaSalvar'
import {
	Table
} from 'reactstrap'
import { CabecalhoBotao } from './Cabecalho';
import { LIGHTGREEN, LIGHTGRAY } from '../helpers/constantes';

class Empresas extends React.Component {

	state = { 
		mostrarSalvarEmpresa: false,
	}

	alternarMostrarSalvarEmpresa = () => this.setState({mostrarSalvarEmpresa:
		!this.state.mostrarSalvarEmpresa})

	render() { 
		const { 
			empresas, 
		} = this.props

		return ( 
			<div style={{marginTop: 70, marginBottom: 20}}> 
				{
					this.state.mostrarSalvarEmpresa && 
						<EmpresaSalvar
							alternarMostrarSalvarEmpresa={this.alternarMostrarSalvarEmpresa} /> 
				}
				{
					!this.state.mostrarSalvarEmpresa && 
						<div> 
							<CabecalhoBotao 
								nomePagina = "Empresas"
								acaoOnClick = {this.alternarMostrarSalvarEmpresa}
							/>

							<Table>
								<thead style={{background: LIGHTGREEN, color: '#fff'}}>
									<tr>
										<td> Nome </td>
										<td> Tipo </td> 
									</tr>
								</thead>
							{
								empresas.map(empresa => (
									<tbody key={empresa._id} style={{backgroundColor: LIGHTGRAY, marginTop: 10}}>
										<Empresa 
											key={empresa._id}
											empresa_id={empresa._id}
										/>
									
									
									 </tbody>
								))
							}
							</Table>

						</div>
				}
			</div>
		)
	}
}

const mapStateToProps = ({empresas}) => {
	return {
		empresas, 
	}
}

export default connect(mapStateToProps, null)(Empresas)
