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
	DARKGREEN,
	LIGHTGREEN,
	LIGHTGRAY,
	EMPRESA_ADMINISTRACAO_ID,
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
			listaDeNaoRecebidoPorCategoria,
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
						/>
					}
				</div>	
				<div style={{marginTop: 15, backgroundColor: LIGHTGRAY}}>
					<Row style={{margin: 0}}>
						<Col style={{textAlign: 'center', backgroundColor: DARKGREEN, padding: 5, color: '#fff'}}>
							Não Recebidos
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
								<th>Categoria</th>
								<th style={{paddingRight: 30, paddingLeft: 30, verticalAlign: 'middle'}}>Soma</th>
							</tr>
						</thead>
						{
							!carregando && 
							listaDeNaoRecebidoPorCategoria&&
								listaDeNaoRecebidoPorCategoria.map(categoria => {
									if(categoria.dizimo === 0){
										categoria.dizimo = '0.00'
									}
									if(categoria.oferta === 0){
										categoria.oferta = '0.00'
									}
									return (
										<tbody key={`categoriaNaoRecebido${categoria._id}`}>
											<tr>
												<td>
													<Button className="botaoTipoCategoria"
														onClick={() => this.props.alterarTela('lancamentos', categoria._id)}
														style={{textAlign: 'left'}}
													>
														{categoria.nome}
													</Button>
												</td>
												<td>
													R$ {Number(categoria.soma).toFixed(2)}
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

const mapStateToProps = ({usuarioLogado, lancamentos, categorias}) => {
	let token = null
	if(usuarioLogado){
		token = usuarioLogado.token
	}
	let saldo = 0.00
	let listaDeNaoRecebidoPorCategoria = []
		if(
			categorias 
			&& lancamentos
		){
			listaDeNaoRecebidoPorCategoria = categorias.map(categoria=> {
				categoria.soma = 0.00
				return categoria
			})
			let lancamentosFiltrados = lancamentos
			if(usuarioLogado.empresa_id !== EMPRESA_ADMINISTRACAO_ID){
				lancamentosFiltrados = lancamentos && usuarioLogado && 
					lancamentos.filter(lancamento => lancamento.empresa_id === usuarioLogado.empresa_id)
			}
			lancamentosFiltrados
				.filter(lancamento => lancamento.data_inativacao === null)
				.forEach(lancamento => {
					const categoriaAtiva = categorias
						.find(categoria => lancamento.categoria_id === categoria._id.toString())

					if(categoriaAtiva){
						if(lancamento.recebido){
							let valorFormatado = parseFloat(lancamento.recebido.toFixed(2))
							if(categoriaAtiva.credito_debito === 'C'){
								saldo += valorFormatado
							}else{
								saldo -= valorFormatado
							}
							saldo = parseFloat(saldo.toFixed(2))
						}
						if(!lancamento.recebido){
							listaDeNaoRecebidoPorCategoria = 
								listaDeNaoRecebidoPorCategoria
								.map(categoria => {
									if(categoria._id === categoriaAtiva._id){
										if(lancamento.dizimo){
											let valorFormatado = parseFloat(lancamento.dizimo.toFixed(2))
											categoria.soma += valorFormatado
											categoria.soma = parseFloat(categoria.soma.toFixed(2))
										}
										if(lancamento.oferta){
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
