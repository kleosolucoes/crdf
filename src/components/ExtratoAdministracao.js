import React from 'react'
import {
	Row,
	Col,
	Button,
	Table,
	Alert,
} from 'reactstrap'
import { connect } from 'react-redux'
import { 
	SITUACAO_RECEBIDO, 
	SITUACAO_NAO_RECEBIDO,
	DARKGREEN,
	LIGHTGREEN,
	LIGHTGRAY,
} from '../helpers/constantes'
import './aux.css';
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faFileAlt, faPowerOff, faQuestionCircle, faBriefcase, faList, faFileInvoiceDollar, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import CabecalhoExtrato from './Cabecalho'
library.add(faUser)
library.add(faBriefcase)
library.add(faFileInvoiceDollar)
library.add(faFileAlt)
library.add(faPowerOff)
library.add(faQuestionCircle)
library.add(faList)
library.add(faSyncAlt)

class ExtratoAdministracao extends React.Component {

	state = {
		carregando: false,
	}

	componentDidMount(){
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
			naoRecebidoCredito,
			naoRecebidoDebito,
			listaDeNaoRecebidoPorCategoriaTipo,
		} = this.props
		const {
			carregando,
		} = this.state
		return (
			<div style={{marginTop: 80}}>
				<div style={{background: LIGHTGRAY}}>
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
							saldo= {saldo}
							naoRecebidoCredito={naoRecebidoCredito}
							naoRecebidoDebito={naoRecebidoDebito}
						/>
					}
				</div>	
				<div style={{marginTop: 15, backgroundColor: LIGHTGRAY}}>
					<Row style={{margin: 0}}>
						<Col style={{textAlign: 'center', backgroundColor: DARKGREEN, padding: 5, color: '#fff'}}>
							Não Aceitos
						</Col>
					</Row>
					{
						carregando &&
							<Alert color='info' className='text-center'>
								Carregando ...
							</Alert>
					}
					<Table>
						<thead style={{background: LIGHTGREEN, color: '#fff'}}>
							<tr>
								<th>Grupo</th>
								<th style={{paddingRight: 30, paddingLeft: 30, verticalAlign: 'middle'}}>Valor</th>
							</tr>
						</thead>
						{
							!carregando && 
							listaDeNaoRecebidoPorCategoriaTipo &&
								listaDeNaoRecebidoPorCategoriaTipo.map(categoriaTipo => {
									if(categoriaTipo.valor === 0){
										categoriaTipo.valor = '0.00'
									}
									return (
										<tbody key={`categoriaNaoRecebido${categoriaTipo._id}`}>
											<tr>
												<td>
													<Button className="botaoTipoCategoria"
														onClick={() => this.props.alterarTela('lancamentos', categoriaTipo._id)}
														style={{textAlign: 'left'}}
													>
														{categoriaTipo.nome}
													</Button>
												</td>
												<td>
													R$ {Number(categoriaTipo.valor).toFixed(2)}
												</td>
											</tr>
										</tbody>
									)
								})
						}
					</Table>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	let token = null
	if(state.usuarioLogado){
		token = state.usuarioLogado.token
	}
	let saldo = 0.00
	let naoRecebidoCredito = 0.00
	let naoRecebidoDebito = 0.00
	let listaDeNaoRecebidoPorCategoriaTipo = []
	if(
		state.categorias 
		&& state.lancamentoSituacao
		&& state.lancamentos
		&& state.situacoes
		&& state.categoriaTipo
	){
		listaDeNaoRecebidoPorCategoriaTipo = state.categoriaTipo.map(categoriaTipo => {
			categoriaTipo.valor = 0.00
			return categoriaTipo
		})
		state.lancamentos
			.filter(lancamento => lancamento.data_inativacao === null)
			.forEach(lancamento => {
				const lancamentoSituacaoAtiva = state.lancamentoSituacao
					.find(lancamentoSituacao => lancamento._id.toString() === lancamentoSituacao.lancamento_id 
						&& lancamentoSituacao.data_inativacao === null)

				if(lancamentoSituacaoAtiva){
					const situacaoAtiva = state.situacoes
						.find(situacao => lancamentoSituacaoAtiva.situacao_id === situacao._id.toString())

					const categoriaAtiva = state.categorias
						.find(categoria => lancamento.categoria_id === categoria._id.toString())

					let valorFormatado = parseFloat(lancamento.valor.toFixed(2))
					if(situacaoAtiva._id === SITUACAO_RECEBIDO){
						if(categoriaAtiva.credito_debito === 'C'){
							saldo += valorFormatado
						}else{
							saldo -= valorFormatado
						}
						saldo = parseFloat(saldo.toFixed(2))
					}
					if(situacaoAtiva._id === SITUACAO_NAO_RECEBIDO){
						if(categoriaAtiva.credito_debito === 'C'){
							naoRecebidoCredito += valorFormatado
						}else{
							naoRecebidoDebito += valorFormatado
						}
						naoRecebidoCredito = parseFloat(naoRecebidoCredito.toFixed(2))
						naoRecebidoDebito = parseFloat(naoRecebidoDebito.toFixed(2))

						if(categoriaAtiva.categoria_tipo_id){
							listaDeNaoRecebidoPorCategoriaTipo = 
								listaDeNaoRecebidoPorCategoriaTipo
								.map(categoriaTipo => {
									if(categoriaTipo._id === categoriaAtiva.categoria_tipo_id){
										categoriaTipo.valor += valorFormatado
										categoriaTipo.valor = parseFloat(categoriaTipo.valor.toFixed(2))
									}
									return categoriaTipo
								})
						}
					}
				}
			})
	}

	return {
		saldo,
		naoRecebidoCredito,
		naoRecebidoDebito,
		listaDeNaoRecebidoPorCategoriaTipo,
		categorias: state.categorias,
		lancamentos: state.lancamentos,
		token,
	}
}

export default connect(mapStateToProps, null)(ExtratoAdministracao)
