import React from 'react'
import {
	Alert,
} from 'reactstrap'
import { connect } from 'react-redux'
import { LIGHTGRAY } from '../helpers/constantes'
import './aux.css';
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faFileInvoiceDollar, faFileAlt, faPowerOff, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import  CabecalhoExtrato  from './Cabecalho';
library.add(faUser)
library.add(faFileInvoiceDollar)
library.add(faFileAlt)
library.add(faPowerOff)
library.add(faQuestionCircle)

class ExtratoEmpresa extends React.Component {

	state = {
		carregando: false,
	}

	componentDidMount(){
		this.setState({
			carregando: true,
		})
		this.props.puxarTodosDados()
			.then(() => {
				this.setState({
					carregando: false,
				})
			})
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
			</div>
		)
	}
}

const mapStateToProps = ({situacoes, usuarioLogado, lancamentos, categorias}) => {
	let saldo = 0.00
	let naoRecebidoCredito = 0.00
	let naoRecebidoDebito = 0.00

	const lancamentosFiltrados = lancamentos && usuarioLogado && 
		lancamentos.filter(lancamento => lancamento.empresa_id === usuarioLogado.empresa_id)

	lancamentosFiltrados
		.filter(lancamento => lancamento.data_inativacao === null)
		.forEach(lancamento => {
			const categoriaAtiva = categorias
				.find(categoria => lancamento.categoria_id === categoria._id.toString())

			if(lancamento.recebido && categoriaAtiva){
				let valorFormatado = parseFloat(lancamento.recebido.toFixed(2))
				if(categoriaAtiva.credito_debito === 'C'){
					saldo += valorFormatado
				}else{
					saldo -= valorFormatado
				}
				saldo = parseFloat(saldo.toFixed(2))
			}
		})
	return {
		saldo,
		naoRecebidoCredito,
		naoRecebidoDebito,
		usuarioLogado,
	}
}

export default connect(mapStateToProps, null)(ExtratoEmpresa)
