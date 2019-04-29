import React from 'react'
import {
	Table
} from 'reactstrap'
import { connect } from 'react-redux'
import { salvarCategoria } from '../actions'
import CategoriaSalvar from './CategoriaSalvar'
import { STRING_DEBITO, STRING_CREDITO, LIGHTGREEN, } from '../helpers/constantes'
import Responsive from 'react-responsive';
import { CabecalhoBotao } from './Cabecalho';


class Categorias extends React.Component {

	state = {
		mostrarAdicionar: false,
	}

	alternarMostrarAdicionar = () => this.setState({
		mostrarAdicionar: !this.state.mostrarAdicionar,
	})

	render() {
		const { 
			categorias, 
		} = this.props
		const {
			mostrarAdicionar,
		} = this.state
		const Desktop = props => <Responsive {...props} minWidth={992} />;
		return (
			<div style={{marginTop: 70, marginBottom: 20}}> 
			
				{
					mostrarAdicionar &&
						<CategoriaSalvar
							alternarMostrarAdicionar={this.alternarMostrarAdicionar}
						/>
				}
				{
					!mostrarAdicionar && 
					<div>
						<CabecalhoBotao 
							nomePagina="Categorias"
							acaoOnClick={this.alternarMostrarAdicionar}
						/>
						<Table style={{textAlign: 'center'}}>
							<thead style={{background: LIGHTGREEN, color: '#fff'}}>
								<tr>
									<Desktop><th>Data Criação</th></Desktop>
									<th>Nome</th>
									<th>Tipo</th>
								</tr>
							</thead>
						{
							categorias.map(categoria => {
								
								return (
									<tbody key={categoria._id}>
										<tr>
											<Desktop><th>{categoria.data_criacao}</th></Desktop>
											<td>{categoria.nome}</td>
											<td>{categoria.credito_debito === 'C' ? STRING_CREDITO : STRING_DEBITO}</td>
										</tr>
									</tbody>
								)
							})
						}
						</Table>

					</div>
				}
			</div>
		)
	}

}

const mapStateToProps = state => {
	return {
		categorias: state.categorias,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarCategoria: (elemento, novo) => dispatch(salvarCategoria(elemento, novo)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Categorias)
