import React from 'react'
import {
	Row,
	Col,
	Label,
	FormGroup,
	Input,
	Alert,
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { formatReal, getMoney, } from '../helpers/funcoes'
import { lancarVariosNaApi } from '../actions'
import { Cabecalho } from './Cabecalho'
import {
	CATEGORIA_DINHEIRO,
	CATEGORIA_CARTAO_DEBITO,
	CATEGORIA_CARTAO_CREDITO,
	CATEGORIA_CHEQUE,
} from '../helpers/constantes'

class LancarVarios extends React.Component {

	state = {
		dia: new Date().getDate(),
		mes: (new Date().getMonth() + 1),
		ano: new Date().getFullYear(),
		dinheiroDizimo: '0.00',
		dinheiroOferta: '0.00',
		debitoDizimo: '0.00',
		debitoOferta: '0.00',
		creditoDizimo: '0.00',
		creditoOferta: '0.00',
		chequeDizimo: '0.00',
		chequeOferta: '0.00',
		mostrarMensagemDeErro: false,
		camposComErro: [],
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name

		const valorLimpo = getMoney(valor)
		if(name !== 'dia' && name !== 'mes' && name !== 'ano'){
			valor = formatReal(valorLimpo.toString().padStart(3, '0'))
		}

		this.setState({
			[name]: valor,
		})
	}

	ajudadorDeSubmissao = () => {
		const {
			dinheiroDizimo,
			dinheiroOferta,
			debitoDizimo,
			debitoOferta,
			creditoDizimo,
			creditoOferta,
			chequeDizimo,
			chequeOferta,
			dia,
			mes,
			ano,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		const {
			usuarioLogado,
			lancarVariosNaApi,
		} = this.props
		camposComErro = []

		mostrarMensagemDeErro = false
		if(parseInt(dia) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('dia')
		}
		if(parseInt(mes) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('mes')
		}
		if(parseInt(ano) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('ano')
		}
		if(mostrarMensagemDeErro){
			this.setState({
				mostrarMensagemDeErro,
				camposComErro,
			})
		}else{
			this.setState({
				mostrarMensagemDeErro: false,
				camposComErro: [],
			})

			let elementos = []
			for(let indiceLancamento = 1; indiceLancamento <= 4; indiceLancamento++){
				const elemento = {}
				elemento.descricao = ''
				elemento.dia = dia
				elemento.mes = mes
				elemento.ano = ano
				elemento.usuario_id = usuarioLogado.usuario_id
				elemento.empresa_id = usuarioLogado.empresa_id

				if(indiceLancamento === 1){
					if(parseInt(dinheiroDizimo) !== 0 || parseInt(dinheiroOferta) !== 0){
						elemento.categoria_id = CATEGORIA_DINHEIRO
						elemento.dizimo = dinheiroDizimo
						elemento.oferta = dinheiroOferta
						elementos.push(elemento)
					}
				}
				if(indiceLancamento === 2){
					if(parseInt(debitoDizimo) !== 0 || parseInt(debitoOferta) !== 0){
						elemento.categoria_id = CATEGORIA_CARTAO_DEBITO
						elemento.dizimo = debitoDizimo
						elemento.oferta = debitoOferta
						elementos.push(elemento)
					}
				}
				if(indiceLancamento === 3){
					if(parseInt(creditoDizimo) !== 0 || parseInt(creditoOferta) !== 0){
						elemento.categoria_id = CATEGORIA_CARTAO_CREDITO
						elemento.dizimo = creditoDizimo
						elemento.oferta = creditoOferta
						elementos.push(elemento)
					}
				}
				if(indiceLancamento === 4){
					if(parseInt(chequeDizimo) !== 0 || parseInt(chequeOferta) !== 0){
						elemento.categoria_id = CATEGORIA_CHEQUE
						elemento.dizimo = chequeDizimo
						elemento.oferta = chequeOferta
						elementos.push(elemento)
					}
				}
			}
			lancarVariosNaApi(elementos, usuarioLogado.token)
			alert('Lancamento(s) Salvo(s) com sucesso!')
			this.props.alterarTela('extratoEmpresa')
		}
	}

	render() {
		const {
			dinheiroDizimo,
			dinheiroOferta,
			debitoDizimo,
			debitoOferta,
			creditoDizimo,
			creditoOferta,
			chequeDizimo,
			chequeOferta,
			dia,
			mes,
			ano,
			mostrarMensagemDeErro,
			camposComErro
		} = this.state
		let arrayDias = []
		for(let indiceDia = 1; indiceDia <= 31; indiceDia++){
			arrayDias.push(<option key={indiceDia} value={indiceDia}>{indiceDia}</option>)
		}
		let arrayMes = []
		for(let indiceMes = 1; indiceMes <= 12; indiceMes++){
			arrayMes.push(<option key={indiceMes} value={indiceMes}>{indiceMes}</option>)
		}
		let arrayAnos = []
		const anoAtual = new Date().getFullYear()
		for(let indiceAno = 2019; indiceAno <= anoAtual; indiceAno++){
			arrayAnos.push(<option key={indiceAno} value={indiceAno}>{indiceAno}</option>)
		}

		let total = formatReal( 
			(
				getMoney(dinheiroDizimo) +
				getMoney(dinheiroOferta) +

				getMoney(debitoDizimo) +
				getMoney(debitoOferta) +

				getMoney(creditoDizimo) +
				getMoney(creditoOferta) +

				getMoney(chequeDizimo) +
				getMoney(chequeOferta)
			)
			.toString()
			.padStart(3, '0')
		)
		let totalDinheiro = formatReal(
			(
				getMoney(dinheiroDizimo) +
				getMoney(dinheiroOferta)
			).toString()
			.padStart(3, '0')
		)
		let totalDebito = formatReal(
			(
				getMoney(debitoDizimo) +
				getMoney(debitoOferta) 
			).toString()
			.padStart(3, '0')
		)
		let totalCredito = formatReal(
			(
				getMoney(creditoDizimo) +
				getMoney(creditoOferta)
			).toString()
			.padStart(3, '0')
		)
		let totalCheque = formatReal(
			(
				getMoney(chequeDizimo) +
				getMoney(chequeOferta)
			).toString()
			.padStart(3, '0')
		)

		if(isNaN(total)){
			total = 'Valore(s) Inválido(s)'
		}
		if(isNaN(totalDinheiro)){
			totalDinheiro = 'Valore(s) Inválido(s)'
		}
		if(isNaN(totalDebito)){
			totalDebito = 'Valore(s) Inválido(s)'
		}
		if(isNaN(totalCredito)){
			totalCredito = 'Valore(s) Inválido(s)'
		}
		if(isNaN(totalCheque)){
			totalCheque = 'Valore(s) Inválido(s)'
		}

		const tiposDeLancamentos = [
			{
				label: 'Dinheiro Cédulas/Moeda',				
				campos: [
					{
						label: 'Dizimo',
						name: 'dinheiroDizimo',
						valor: dinheiroDizimo,
					},
					{
						label: 'Oferta',
						name: 'dinheiroOferta',
						valor: dinheiroOferta,
					},
				],
				total: totalDinheiro,
				labelTotal: 'DINHEIRO CÉDULAS/MOEDAS',
			},
			{
				label: 'Cartão Débito',				
				campos: [
					{
						label: 'Dízimo',
						name: 'debitoDizimo',
						valor: debitoDizimo,
					},
					{
						label: 'Oferta',
						name: 'debitoOferta',
						valor: debitoOferta,
					},
				],
				total: totalDebito,
				labelTotal: 'CARTÃO DÉBITO',
			},
			{
				label: 'Cartão Crédito',				
				campos: [
					{
						label: 'Dízimo',
						name: 'creditoDizimo',
						valor: creditoDizimo,
					},
					{
						label: 'Oferta',
						name: 'creditoOferta',
						valor: creditoOferta,
					},
				],
				total: totalCredito,
				labelTotal: 'CARTÃO CRÉDITO',
			},
			{
				label: 'Cheque',				
				campos: [
					{
						label: 'Dízimo',
						name: 'chequeDizimo',
						valor: chequeDizimo,
					},
					{
						label: 'Oferta',
						name: 'chequeOferta',
						valor: chequeOferta,
					},
				],
				total: totalCheque,
				labelTotal: 'CHEQUE',
			},
		]
		return (
			<div style={{marginTop: 70, marginBottom: 20}}> 
				<Cabecalho 
					nomePagina="Lançar Entradas"
				/>
				<Label style={{fontWeight: 400}} for="data">DATA DE LANÇAMENTO</Label>
				<Row>
					<Col> 
						<FormGroup>
							<Label for="dia">* Dia:</Label>
							<Input 
								type="select" 
								name="dia" 
								id="dia" 
								value={dia} 
								onChange={this.ajudadorDeCampo}
								invalid={camposComErro.includes('dia') ? true : null}
							>
								<option value='0'>Selecione</option>
								{
									arrayDias.map(dia => dia)
								}
							</Input>
						{camposComErro.includes('dia') && <Alert color='danger'>Selecione o Dia</Alert>}
					</FormGroup>
				</Col>

				<Col>
					<FormGroup>
						<Label for="mes">* Mês:</Label>
						<Input 
							type="select" 
							name="mes" 
							id="mes" 
							value={mes} 
							onChange={this.ajudadorDeCampo}
							invalid={camposComErro.includes('mes') ? true : null}
						>
							<option value='0'>Selecione</option>
							{
								arrayMes.map(mes => mes)
							}
						</Input>
					{camposComErro.includes('mes') && <Alert color='danger'>Selecione o Mês</Alert>}
				</FormGroup>
			</Col>

			<Col>
				<FormGroup>
					<Label for="ano">* Ano:</Label>
					<Input 
						type="select" 
						name="ano" 
						id="ano" 
						value={ano} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('ano') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							arrayAnos.map(ano => ano)
						}
					</Input>
				{camposComErro.includes('ano') && <Alert color='danger'>Selecione o Ano</Alert>}
			</FormGroup>
		</Col>
	</Row>
		<p style={{color: '#aaa'}}>* Necessário apenas lançar valores, não necessita inserir pontuações (, .).</p>
	{
		tiposDeLancamentos.map(tipoDeLancamento => (
			<div className="container-item" key={tipoDeLancamento.label}>
				<div>
					<Row className="header-categoria">
						<h6 style={{margin: 0}}><b>{tipoDeLancamento.label}</b></h6>
					</Row>
					{
						tipoDeLancamento.campos.map(campo => (
							<Row style={{padding:'0px 10px'}} key={campo.name}>
								<Col style={{display: 'flex', alignItems: 'center'}}>
									{campo.label}
								</Col>
								<Col>
									<Input
										type='number'
										name={campo.name}
										value={campo.valor}
										onChange={this.ajudadorDeCampo}
									/>
								</Col>
							</Row>
						))
					}
				</div>
				<div className="total-categoria-lancado">
					<Row style={{margin: 0}}>
						<Col style={{paddingRight: 0, paddingLeft: 0}}> TOTAL {tipoDeLancamento.labelTotal} </Col>
						<Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> <b> R$ {tipoDeLancamento.total}</b> </Col>
					</Row>
				</div>
			</div>
		))
	}
	{
		mostrarMensagemDeErro &&
			<div style={{padding: 10}}>
				<Alert color='warning'>
					Campos inválidos
				</Alert>
			</div>
	}
	<div style={{padding: 10, marginTop: 5, marginBottom: 5}}>
		<Row className="total-lancado">
			<Col> <b>TOTAL</b> </Col>
			<Col> <b>R$ {total}</b> </Col>
			<Col>
				<Button 
					type='button' 
					className="botao-lancar"
					onClick={this.ajudadorDeSubmissao}>
					<b>Salvar</b>
				</Button>
			</Col>
		</Row>
	</div>
			</div>
		)
	}
}

function mapStateToProps({usuarioLogado, categorias}){
	return {
		usuarioLogado,
		categorias,
	}
}

function mapDispatchToProps(dispatch){
	return {
		lancarVariosNaApi: (elementos, token) => dispatch(lancarVariosNaApi(elementos, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LancarVarios)
