import React from 'react'
import {
	Row,
	Table,
	Col,
	FormGroup,
	Label,
	Input,
} from 'reactstrap'
import { connect } from 'react-redux'
import Responsive from 'react-responsive';
import ContaFixa from './ContaFixa'
import ContaFixaSalvar from './ContaFixaSalvar'
import { CabecalhoBotao } from './Cabecalho';
import { LIGHTGREEN } from '../helpers/constantes';

class ContasFixas extends React.Component {

	state = {
		mostrarSalvarContaFixa: false,
		categoria_id: 0,
		empresa_id: 0,
	}

	alternarMostrarSalvarContaFixa = () => this.setState({mostrarSalvarContaFixa: !this.state.mostrarSalvarContaFixa})

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name
		this.setState({[name]: valor})
	}

	render() {
		const { 
			contasFixas,
			categorias,
			empresas,
		} = this.props
		const {
			empresa_id,
			categoria_id,
		} = this.state

		let contasFixasFiltradas = contasFixas
		if(empresa_id && parseInt(empresa_id) !== 0){
			contasFixasFiltradas = contasFixasFiltradas
				.filter(contaFixa => contaFixa.empresa_id === empresa_id)
		}
		if(categoria_id && parseInt(categoria_id) !== 0){
			contasFixasFiltradas = contasFixasFiltradas
				.filter(contaFixa => contaFixa.categoria_id === categoria_id)
		}

		const Desktop = props => <Responsive {...props} minWidth={992} />;

		return (
			<div style={{marginTop: 70, marginBottom: 20}}> 
				{
					this.state.mostrarSalvarContaFixa &&
						<ContaFixaSalvar
							empresa_id={this.props.empresa_id}
							alternarMostrarSalvarContaFixa={this.alternarMostrarSalvarContaFixa}
						/>
				}
				{
					!this.state.mostrarSalvarContaFixa &&
						<div>
							<CabecalhoBotao 
								nomePagina= "Contas Fixas"
								acaoOnClick={this.alternarMostrarSalvarContaFixa}
							/>
							<h5>Filtro</h5>
							<Row>
								<Col>
									<FormGroup>
										<Label for="categoria_id">Categoria</Label>
										<Input 
											type="select" 
											name="categoria_id" 
											id="categoria_id" 
											value={categoria_id} 
											onChange={this.ajudadorDeCampo}
										>
											<option value='0'>Todas</option>
											{
												categorias &&
													categorias.map(categoria => {
														return (
															<option 
																key={categoria._id}
																value={categoria._id}
															>
																{categoria.nome}
															</option>
														)
													})
											}
										</Input>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup>
										<Label for="empresa_id">Empresa</Label>
										<Input 
											type="select" 
											name="empresa_id" 
											id="empresa_id" 
											value={empresa_id} 
											onChange={this.ajudadorDeCampo}
										>
											<option value='0'>Todas</option>
											{
												empresas &&
													empresas.map(empresa => {
														return (
															<option 
																key={empresa._id}
																value={empresa._id}
															>
																{empresa.nome}
															</option>
														)
													})
											}
										</Input>
									</FormGroup>
								</Col>
							</Row>
							<Table style={{textAlign: 'center'}}>
								<thead style={{background: LIGHTGREEN, color: '#fff'}}>
									<tr>
										<Desktop><th>Data</th></Desktop>
										<th>Gerar dia</th>
										<Desktop><th>Notificar dia</th></Desktop>
										<th>Categoria</th>
										<th>Empresa</th>
										<Desktop><th>Credito/Debito</th></Desktop>
										<th>#</th>
									</tr>
								</thead>
							{
								contasFixasFiltradas &&
									contasFixasFiltradas
									.map(contaFixa => {
										return (
											<ContaFixa
												key={contaFixa._id}
												contaFixa_id={contaFixa._id}
											/>
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

const mapStateToProps = ({contaFixa, empresas, categorias}) => {
	const contasFixasSelecionadas = contaFixa && contaFixa.filter(contaFixa => contaFixa.data_inativacao === null)
	return {
		contasFixas: contasFixasSelecionadas,
		empresas,
		categorias,
	}
}

export default connect(mapStateToProps, null)(ContasFixas)
