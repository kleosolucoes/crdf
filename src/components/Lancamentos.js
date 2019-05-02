import React from 'react'
import { connect } from 'react-redux'
import Lancamento from './Lancamento'
import LancarUm from './LancarUm'
import {
	Label,
	FormGroup,
	Input,
	Row,
	Col,
	Alert,
	Button,
} from 'reactstrap'
import { EMPRESA_ADMINISTRACAO_ID, DARKGREEN, LIGHTGREEN, LIGHTGRAY } from '../helpers/constantes'
import { Cabecalho } from './Cabecalho';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Lancamentos extends React.Component {

	componentDidMount() {
		const data = new Date()
		const ultimoDia = new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate()
		this.setState({
			diaFinal: ultimoDia,
			categoria_id: this.props.categoria_id,
		})
	}

	state = {
		categoria_id: 0,
		empresa_id: 0,
		diaInicial: 1,
		mesInicial: (new Date().getMonth() + 1),
		anoInicial: new Date().getFullYear(),
		diaFinal: 0,
		mesFinal: (new Date().getMonth() + 1),
		anoFinal: new Date().getFullYear(),
		mostrarAlterarLancamento: false,
		lancamento_id: null,
		carregando: false,
	}

	atualizar = () => {
		this.setState({
			carregando: true,
		})
		this.props.puxarTodosDados()
			.then(() => {
				this.setState({
					carregando: false,
				})
			})
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name
		this.setState({ [name]: valor })
	}

	alternarMostrarAlterarLancamento = (lancamento_id) => this.setState({
		mostrarAlterarLancamento: !this.state.mostrarAlterarLancamento,
		lancamento_id,
	})

	render() {
		const {
			lancamentos,
			categorias,
			empresas,
			empresa_usuario_logado_id,
		} = this.props
		const {
			categoria_id,
			empresa_id,
			diaInicial,
			mesInicial,
			anoInicial,
			diaFinal,
			mesFinal,
			anoFinal,
			mostrarAlterarLancamento,
			lancamento_id,
			carregando,
		} = this.state
		let categoriasFiltradas = categorias
		let lancamentosFiltrados = lancamentos
		if (categoria_id && parseInt(categoria_id) !== 0) {
			lancamentosFiltrados = lancamentosFiltrados
				.filter(lancamento => lancamento.categoria_id === categoria_id)
		}
		if (empresa_id && parseInt(empresa_id) !== 0) {
			lancamentosFiltrados = lancamentosFiltrados
				.filter(lancamento => lancamento.empresa_id === empresa_id)
		}
		if (anoInicial && parseInt(anoInicial) !== 0) {
			lancamentosFiltrados = lancamentosFiltrados
				.filter(lancamento => parseInt(lancamento.data.split('/')[2]) >= parseInt(anoInicial))
			if (mesInicial && parseInt(mesInicial) !== 0) {
				lancamentosFiltrados = lancamentosFiltrados
					.filter(lancamento => parseInt(lancamento.data.split('/')[1]) >= parseInt(mesInicial))
				if (diaInicial && parseInt(diaInicial) !== 0) {
					lancamentosFiltrados = lancamentosFiltrados
						.filter(lancamento => parseInt(lancamento.data.split('/')[0]) >= parseInt(diaInicial))
				}
			}
		}
		if (anoFinal && parseInt(anoFinal) !== 0) {
			lancamentosFiltrados = lancamentosFiltrados
				.filter(lancamento => parseInt(lancamento.data.split('/')[2]) <= parseInt(anoFinal))
			if (mesFinal && parseInt(mesFinal) !== 0) {
				lancamentosFiltrados = lancamentosFiltrados
					.filter(lancamento => parseInt(lancamento.data.split('/')[1]) <= parseInt(mesFinal))
				if (diaFinal && parseInt(diaFinal) !== 0) {
					lancamentosFiltrados = lancamentosFiltrados
						.filter(lancamento => parseInt(lancamento.data.split('/')[0]) <= parseInt(diaFinal))
				}
			}
		}

		let arrayDias = []
		for (let indiceDias = 1; indiceDias <= 31; indiceDias++) {
			arrayDias.push(<option key={indiceDias} value={indiceDias}>{indiceDias}</option>)
		}
		let arrayMes = []
		for (let indiceMes = 1; indiceMes <= 12; indiceMes++) {
			arrayMes.push(<option key={indiceMes} value={indiceMes}>{indiceMes}</option>)
		}
		let arrayAnos = []
		const anoAtual = new Date().getFullYear()
		for (let indiceAno = 2019; indiceAno <= anoAtual; indiceAno++) {
			arrayAnos.push(<option key={indiceAno} value={indiceAno}>{indiceAno}</option>)
		}

		return (
			<div style={{ marginTop: 70, marginBottom: 20 }}>
				{
					mostrarAlterarLancamento &&
					<LancarUm
						lancamento_id={lancamento_id}
						alternarMostrarAlterarLancamento={this.alternarMostrarAlterarLancamento}
					/>
				}
				{
					!mostrarAlterarLancamento &&
					<div>
						<Row>
							<Col>
								<Cabecalho
									nomePagina="Lançamentos"
								/>
							</Col>
							<Button
								onClick={this.atualizar}
								style={{ height: 40, width: 40, background: 'transparent', color: DARKGREEN, margin: 5, border: 0 }}
							>
								<FontAwesomeIcon icon="sync-alt" size="sm" color={{DARKGREEN}} />
							</Button>
						</Row>
						<div className="container-lancamentos">
							<h5>Filtro</h5>
							{
								empresa_usuario_logado_id === EMPRESA_ADMINISTRACAO_ID &&
								<Row>
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
							}
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
												categoriasFiltradas &&
												categoriasFiltradas.map(categoria => {
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
							</Row>
							
							<Row>
								<Col sm="6">
									<Label><b>Período Inicial</b></Label>
									<Row>
										<Col>
											<FormGroup>
												<Label for="diaInicial">Dia</Label>
												<Input
													type="select"
													name="diaInicial"
													id="diaInicial"
													value={diaInicial}
													onChange={this.ajudadorDeCampo}
												>
													<option value='0'>Todos</option>
													{
														arrayDias.map(dia => dia)
													}
												</Input>
											</FormGroup>
										</Col>
										<Col style={{ paddingRight: 0, paddingLeft: 0 }}>
											<FormGroup>
												<Label for="mesInicial">Mês</Label>
												<Input
													type="select"
													name="mesInicial"
													id="mesInicial"
													value={mesInicial}
													onChange={this.ajudadorDeCampo}
												>
													<option value='0'>Todos</option>
													{
														arrayMes.map(mes => mes)
													}
												</Input>
											</FormGroup>
										</Col>
										<Col>
											<FormGroup>
												<Label for="anoInicial">Ano</Label>
												<Input
													type="select"
													name="anoInicial"
													id="anoInicial"
													value={anoInicial}
													onChange={this.ajudadorDeCampo}
												>
													<option value='0'>Todos</option>
													{
														arrayAnos.map(ano => ano)
													}
												</Input>
											</FormGroup>
										</Col>
									</Row>
								</Col>

								<Col sm="6">
									<Label><b>Período Final</b></Label>
									<Row>
										<Col>
											<FormGroup>
												<Label for="diaFinal">Dia</Label>
												<Input
													type="select"
													name="diaFinal"
													id="diaFinal"
													value={diaFinal}
													onChange={this.ajudadorDeCampo}
												>
													<option value='0'>Todos</option>
													{
														arrayDias.map(dia => dia)
													}
												</Input>
											</FormGroup>
										</Col>
										<Col style={{ paddingRight: 0, paddingLeft: 0 }}>
											<FormGroup>
												<Label for="mesFinal">Mês</Label>
												<Input
													type="select"
													name="mesFinal"
													id="mesFinal"
													value={mesFinal}
													onChange={this.ajudadorDeCampo}
												>
													<option value='0'>Todos</option>
													{
														arrayMes.map(mes => mes)
													}
												</Input>
											</FormGroup>
										</Col>
										<Col>
											<FormGroup>
												<Label for="anoFinal">Ano</Label>
												<Input
													type="select"
													name="anoFinal"
													id="anoFinal"
													value={anoFinal}
													onChange={this.ajudadorDeCampo}
												>
													<option value='0'>Todos</option>
													{
														arrayAnos.map(ano => ano)
													}
												</Input>
											</FormGroup>
										</Col>
									</Row>
								</Col>
							</Row>
						</div>
						{
							carregando &&
							<Alert color="info">
								Carregando ...
									</Alert>
						}
						{
							!carregando &&
							lancamentosFiltrados &&
							<table className="table table-condensed table-striped">
								<thead style={{background: LIGHTGREEN, color: LIGHTGRAY}}>
									<tr className='text-center'>
										<th> Dia </th>
										{ empresa_usuario_logado_id === EMPRESA_ADMINISTRACAO_ID &&
											<th> Empresa </th>
										}
										<th> Categoria </th>
										<th> Dízimos </th>
										<th> Oferta </th>
										<th> Soma </th>
										<th> Recebido </th>
										<th> Diferença </th>
										<th> Opções </th>
									</tr>
								</thead>
								<tbody>
									{
										lancamentosFiltrados.map(lancamento => {
											return (
												<Lancamento
													key={lancamento._id}
													lancamento_id={lancamento._id}
													alternarMostrarAlterarLancamento={this.alternarMostrarAlterarLancamento}
												/>
											)
										})
									}
								</tbody>
							</table>
						}
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = (state, { empresa_id }) => {
	const usuarioLogado = state.usuarios
		.find(usuario => usuario._id === state.usuarioLogado.usuario_id)

	let lancamentos = state.lancamentos
	/* Tela de extrato da empresa */
	if (usuarioLogado.empresa_id !== EMPRESA_ADMINISTRACAO_ID) {
		lancamentos = state.lancamentos.filter(lancamento => lancamento.empresa_id === usuarioLogado.empresa_id)
	}
	return {
		lancamentos: lancamentos && lancamentos.filter(lancamento => lancamento.data_inativacao === null),
		categorias: state.categorias,
		empresas: state.empresas,
		empresa_usuario_logado_id: usuarioLogado.empresa_id,
	}
}

export default connect(mapStateToProps, null)(Lancamentos)
