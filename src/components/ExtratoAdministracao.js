import React from 'react'
import {
	Row,
	Col,
	Alert,
	Card,
} from 'reactstrap'
import { connect } from 'react-redux'
import {
	DARKGREEN,
	LIGHTGRAY,
	EMPRESA_ADMINISTRACAO_ID,
	CATEGORIA_DINHEIRO,
	CATEGORIA_CARTAO_CREDITO,
	CATEGORIA_CARTAO_DEBITO,
	CATEGORIA_CHEQUE,
} from '../helpers/constantes'
import './aux.css';
// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoneyBillWave, faCreditCard, faWallet } from '@fortawesome/free-solid-svg-icons'
import CabecalhoExtrato from './Cabecalho'
library.add(faCreditCard)
library.add(faMoneyBillWave)
library.add(faWallet)


class ExtratoAdministracao extends React.Component {

	state = {
		carregando: false,
	}

	componentDidMount() {
		this.atualizar()
		this.props.askForPermissioToReceiveNotifications()
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

	render() {
		const {
			saldo,
			listaDeNaoRecebidoPorCategoria,
		} = this.props
		const {
			carregando,
		} = this.state
		return (
			<div style={{ marginTop: 80 }}>
				<div style={{ background: LIGHTGRAY }}>
					{
						carregando &&
						<Alert color='info' className='text-center'>
							Carregando ...
						</Alert>
					}
					{
						!carregando &&
						<CabecalhoExtrato
							onClick={() => this.atualizar()}
							saldo={saldo}
						/>
					}
				</div>
				<div style={{ marginTop: 15, backgroundColor: 'transparent' }}>
					<Row style={{ margin: 0, borderBottom: '1px solid #ccc', marginBottom: 8, }}>
						<Col style={{ textAlign: 'left', backgroundColor: 'transparent', color: '#aaa',
						fontWeight: "bold" 
					}}>
							NÃO RECEBIDOS
						</Col>
					</Row>
					{
						carregando &&
						<Alert color='info' className='text-center'>
							Carregando ...
							</Alert>
					}
					<div style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-around' }}>
						{!carregando &&
							listaDeNaoRecebidoPorCategoria &&
							listaDeNaoRecebidoPorCategoria.map(categoria => {
								if (categoria.dizimo === 0) {
									categoria.dizimo = '0.00'
								}
								if (categoria.oferta === 0) {
									categoria.oferta = '0.00'
								}
								return (
									<Col lg="6" md="6" sm="6" xs="12" key={`categoriaNaoRecebido${categoria._id}`}>

										<Card
											onClick={() => this.props.alterarTela('lancamentos', categoria._id)}
											style={{
												flexDirection: "row", height: 100, 
												borderWidth: 0, marginTop: 5, backgroundColor: LIGHTGRAY,
												boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)', 
											}}
										>
											<div style={{
												display: 'flex', flexDirection: "column", justifyContent: 'center',
												flex: 1, alignItems: 'center',
											}}>
												{categoria._id === CATEGORIA_DINHEIRO &&
													<FontAwesomeIcon icon="money-bill-wave" size="lg" color={DARKGREEN} />
												}
												{categoria._id === CATEGORIA_CARTAO_CREDITO &&
													<FontAwesomeIcon icon="credit-card" size="lg" color={DARKGREEN} />
												}
												{categoria._id === CATEGORIA_CARTAO_DEBITO &&
													<FontAwesomeIcon icon="credit-card" size="lg" color={DARKGREEN} />
												}
												{categoria._id === CATEGORIA_CHEQUE &&
													<FontAwesomeIcon icon="money-bill-wave" size="lg" color={DARKGREEN} />
												}
											</div>
											<div style={{
												display: 'flex', flexDirection: "column", flex: 1,
												alignItems: 'center', justifyContent: 'center', paddingRight: 5,
											}}>
												<span style={{fontSize: 16}}>R$ {Number(categoria.soma).toFixed(2)}</span>
												<span style={{fontWeight: '300', fontSize: 12}}>{categoria.nome}</span>
											</div>
										</Card>

									</Col>
								)
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ usuarioLogado, lancamentos, categorias }) => {
	let token = null
	if (usuarioLogado) {
		token = usuarioLogado.token
	}
	let saldo = 0.00
	let listaDeNaoRecebidoPorCategoria = []
	if (
		categorias
		&& lancamentos
	) {
		listaDeNaoRecebidoPorCategoria = 
			categorias
			.filter(categoria => 
				categoria._id === CATEGORIA_DINHEIRO ||
				categoria._id === CATEGORIA_CARTAO_CREDITO ||
				categoria._id === CATEGORIA_CARTAO_DEBITO ||
				categoria._id === CATEGORIA_CHEQUE)
			.map(categoria => {
			categoria.soma = 0.00
			return categoria
		})
		let lancamentosFiltrados = lancamentos
		if (usuarioLogado.empresa_id !== EMPRESA_ADMINISTRACAO_ID) {
			lancamentosFiltrados = lancamentos && usuarioLogado &&
				lancamentos.filter(lancamento => lancamento.empresa_id === usuarioLogado.empresa_id)
		}
		lancamentosFiltrados
			.filter(lancamento => lancamento.data_inativacao === null)
			.forEach(lancamento => {
				const categoriaAtiva = categorias
					.find(categoria => lancamento.categoria_id === categoria._id.toString())

				if (categoriaAtiva) {
					if (lancamento.recebido) {
						let valorFormatado = parseFloat(lancamento.recebido.toFixed(2))
						if (categoriaAtiva.credito_debito === 'C') {
							saldo += valorFormatado
						} else {
							saldo -= valorFormatado
						}
						saldo = parseFloat(saldo.toFixed(2))
					}
					if (!lancamento.recebido) {
						listaDeNaoRecebidoPorCategoria =
							listaDeNaoRecebidoPorCategoria
								.map(categoria => {
									if (categoria._id === categoriaAtiva._id) {
										if (lancamento.dizimo) {
											let valorFormatado = parseFloat(lancamento.dizimo.toFixed(2))
											categoria.soma += valorFormatado
											categoria.soma = parseFloat(categoria.soma.toFixed(2))
										}
										if (lancamento.oferta) {
											let valorFormatado = parseFloat(lancamento.oferta.toFixed(2))
											categoria.soma += valorFormatado
											categoria.soma = parseFloat(categoria.soma.toFixed(2))
										}
									}
									return categoria
								})
					}
				}
			})
	}

	return {
		saldo,
		listaDeNaoRecebidoPorCategoria,
		categorias,
		lancamentos,
		token,
	}
}

export default connect(mapStateToProps, null)(ExtratoAdministracao)
