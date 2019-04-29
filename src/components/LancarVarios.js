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
import {
	CATEGORIA_DIZIMO_DINHEIRO,
	CATEGORIA_DIZIMO_DEBITO,
	CATEGORIA_DIZIMO_CREDITO,
	CATEGORIA_DIZIMO_MOEDA,
	CATEGORIA_DIZIMO_CHEQUE,
	CATEGORIA_OFERTA_DINHEIRO,
	CATEGORIA_OFERTA_DEBITO,
	CATEGORIA_OFERTA_CREDITO,
	CATEGORIA_OFERTA_MOEDA,
	CATEGORIA_OFERTA_CHEQUE,
	CATEGORIA_OFERTA_ESPECIAL_DINHEIRO,
	CATEGORIA_OFERTA_ESPECIAL_DEBITO,
	CATEGORIA_OFERTA_ESPECIAL_CREDITO,
	CATEGORIA_OFERTA_ESPECIAL_MOEDA,
	CATEGORIA_OFERTA_ESPECIAL_CHEQUE,
	CATEGORIA_OFERTA_DINHEIRO_INSTITUTO_DE_VENCEDORES,
	CATEGORIA_OFERTA_DEBITO_INSTITUTO_DE_VENCEDORES,
	CATEGORIA_OFERTA_CREDITO_INSTITUTO_DE_VENCEDORES,
	CATEGORIA_OFERTA_MOEDA_INSTITUTO_DE_VENCEDORES,
	CATEGORIA_OFERTA_CHEQUE_INSTITUTO_DE_VENCEDORES,
} from '../helpers/constantes'
import { Cabecalho } from './Cabecalho';

class LancarVarios extends React.Component {

	state = {
		dia: new Date().getDate(),
		mes: (new Date().getMonth() + 1),
		ano: new Date().getFullYear(),
		dizimoDinheiro: '0.00',
		dizimoDebito: '0.00',
		dizimoCredito: '0.00',
		dizimoMoeda: '0.00',
		dizimoCheque: '0.00',
		ofertaDinheiro: '0.00',
		ofertaDebito: '0.00',
		ofertaCredito: '0.00',
		ofertaMoeda: '0.00',
		ofertaCheque: '0.00',
		ofertaEspecialDinheiro: '0.00',
		ofertaEspecialDebito: '0.00',
		ofertaEspecialCredito: '0.00',
		ofertaEspecialMoeda: '0.00',
		ofertaEspecialCheque: '0.00',
		ofertaDinheiroInstitutoDeVencedores: '0.00',
		ofertaDebitoInstitutoDeVencedores: '0.00',
		ofertaCreditoInstitutoDeVencedores: '0.00',
		ofertaMoedaInstitutoDeVencedores: '0.00',
		ofertaChequeInstitutoDeVencedores: '0.00',
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
			dizimoDinheiro,
			dizimoDebito,
			dizimoCredito,
			dizimoMoeda,
			dizimoCheque,
			ofertaDinheiro,
			ofertaDebito,
			ofertaCredito,
			ofertaMoeda,
			ofertaCheque,
			ofertaEspecialDinheiro,
			ofertaEspecialDebito,
			ofertaEspecialCredito,
			ofertaEspecialMoeda,
			ofertaEspecialCheque,
			ofertaDinheiroInstitutoDeVencedores,
			ofertaDebitoInstitutoDeVencedores,
			ofertaCreditoInstitutoDeVencedores,
			ofertaMoedaInstitutoDeVencedores,
			ofertaChequeInstitutoDeVencedores,
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
			for(let indiceDeValores = 1; indiceDeValores <= 20; indiceDeValores++){
				const elemento = {}
				switch(indiceDeValores){
					case 1: 
						elemento.valor = dizimoDinheiro
						elemento.categoria_id = CATEGORIA_DIZIMO_DINHEIRO
						break;
					case 2: 
						elemento.valor = dizimoDebito
						elemento.categoria_id = CATEGORIA_DIZIMO_DEBITO
						break;
					case 3: 
						elemento.valor = dizimoCredito
						elemento.categoria_id = CATEGORIA_DIZIMO_CREDITO
						break;
					case 4: 
						elemento.valor = dizimoMoeda
						elemento.categoria_id = CATEGORIA_DIZIMO_MOEDA
						break;
					case 5: 
						elemento.valor = ofertaDinheiro
						elemento.categoria_id = CATEGORIA_OFERTA_DINHEIRO
						break;
					case 6: 
						elemento.valor = ofertaDebito
						elemento.categoria_id = CATEGORIA_OFERTA_DEBITO
						break;
					case 7: 
						elemento.valor = ofertaCredito
						elemento.categoria_id = CATEGORIA_OFERTA_CREDITO
						break;
					case 8: 
						elemento.valor = ofertaMoeda
						elemento.categoria_id = CATEGORIA_OFERTA_MOEDA
						break;
					case 9: 
						elemento.valor = ofertaEspecialDinheiro
						elemento.categoria_id = CATEGORIA_OFERTA_ESPECIAL_DINHEIRO
						break;
					case 10: 
						elemento.valor = ofertaEspecialDebito
						elemento.categoria_id = CATEGORIA_OFERTA_ESPECIAL_DEBITO
						break;
					case 11: 
						elemento.valor = ofertaEspecialCredito
						elemento.categoria_id = CATEGORIA_OFERTA_ESPECIAL_CREDITO
						break;
					case 12: 
						elemento.valor = ofertaEspecialMoeda
						elemento.categoria_id = CATEGORIA_OFERTA_ESPECIAL_MOEDA
						break;
					case 13: 
						elemento.valor = ofertaDinheiroInstitutoDeVencedores
						elemento.categoria_id = CATEGORIA_OFERTA_DINHEIRO_INSTITUTO_DE_VENCEDORES
						break;
					case 14: 
						elemento.valor = ofertaDebitoInstitutoDeVencedores
						elemento.categoria_id = CATEGORIA_OFERTA_DEBITO_INSTITUTO_DE_VENCEDORES
						break;
					case 15: 
						elemento.valor = ofertaCreditoInstitutoDeVencedores
						elemento.categoria_id = CATEGORIA_OFERTA_CREDITO_INSTITUTO_DE_VENCEDORES
						break;
					case 16: 
						elemento.valor = ofertaMoedaInstitutoDeVencedores
						elemento.categoria_id = CATEGORIA_OFERTA_MOEDA_INSTITUTO_DE_VENCEDORES
						break;
					case 17: 
						elemento.valor = dizimoCheque
						elemento.categoria_id = CATEGORIA_DIZIMO_CHEQUE
						break;
					case 18: 
						elemento.valor = ofertaCheque
						elemento.categoria_id = CATEGORIA_OFERTA_CHEQUE
						break;
					case 19: 
						elemento.valor = ofertaEspecialCheque
						elemento.categoria_id = CATEGORIA_OFERTA_ESPECIAL_CHEQUE
						break;
					case 20: 
						elemento.valor = ofertaChequeInstitutoDeVencedores
						elemento.categoria_id = CATEGORIA_OFERTA_CHEQUE_INSTITUTO_DE_VENCEDORES
						break;
					default:
						break;
				}
				if(!isNaN(elemento.valor) && elemento.valor !== '0.00'){
					elemento.taxa = '0.00'
					elemento.descricao = ''
					elemento.dia = dia
					elemento.mes = mes
					elemento.ano = ano
					elemento.usuario_id = usuarioLogado.usuario_id
					elemento.empresa_id = usuarioLogado.empresa_id
					elementos.push(elemento)
				}
			}
			lancarVariosNaApi(elementos, usuarioLogado.token)
			alert('Lancamento(s) Salvo(s) com sucesso!')
			this.props.alterarTela('extratoEmpresa')
		}
	}

	render() {
		const {
			dizimoDinheiro,
			dizimoDebito,
			dizimoCredito,
			dizimoMoeda,
			dizimoCheque,
			ofertaDinheiro,
			ofertaDebito,
			ofertaCredito,
			ofertaMoeda,
			ofertaCheque,
			ofertaEspecialDinheiro,
			ofertaEspecialDebito,
			ofertaEspecialCredito,
			ofertaEspecialMoeda,
			ofertaEspecialCheque,
			ofertaDinheiroInstitutoDeVencedores,
			ofertaDebitoInstitutoDeVencedores,
			ofertaCreditoInstitutoDeVencedores,
			ofertaMoedaInstitutoDeVencedores,
			ofertaChequeInstitutoDeVencedores,
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
				getMoney(dizimoDinheiro) +
				getMoney(dizimoDebito) +
				getMoney(dizimoCredito) +
				getMoney(dizimoMoeda) +
				getMoney(dizimoCheque) +

				getMoney(ofertaDinheiro) +
				getMoney(ofertaDebito) +
				getMoney(ofertaCredito) +
				getMoney(ofertaMoeda) +
				getMoney(ofertaCheque) +

				getMoney(ofertaEspecialDinheiro) +
				getMoney(ofertaEspecialDebito) +
				getMoney(ofertaEspecialCredito) +
				getMoney(ofertaEspecialMoeda) +
				getMoney(ofertaEspecialCheque) +

				getMoney(ofertaDinheiroInstitutoDeVencedores) +
				getMoney(ofertaDebitoInstitutoDeVencedores) +
				getMoney(ofertaCreditoInstitutoDeVencedores) +
				getMoney(ofertaMoedaInstitutoDeVencedores) +
				getMoney(ofertaChequeInstitutoDeVencedores)
			)
			.toString()
			.padStart(3, '0')
		)
		let totalDizimo = formatReal(
			(
				getMoney(dizimoCredito) +
				getMoney(dizimoDebito) +
				getMoney(dizimoDinheiro) +
				getMoney(dizimoMoeda) +
				getMoney(dizimoCheque)
			).toString()
			.padStart(3, '0')
		)
		let totalOferta = formatReal(
			(
				getMoney(ofertaCredito) +
				getMoney(ofertaDebito) +
				getMoney(ofertaDinheiro) +
				getMoney(ofertaMoeda) +
				getMoney(ofertaCheque)
			).toString()
			.padStart(3, '0')
		)
		let totalOfertaEspecial = formatReal(
			(
				getMoney(ofertaEspecialCredito) +
				getMoney(ofertaEspecialDebito) +
				getMoney(ofertaEspecialDinheiro) +
				getMoney(ofertaEspecialMoeda) +
				getMoney(ofertaEspecialCheque)
			).toString()
			.padStart(3, '0')
		)
		let totalOfertaInstitutoDeVencedores = formatReal(
			(
				getMoney(ofertaDinheiroInstitutoDeVencedores) +
				getMoney(ofertaDebitoInstitutoDeVencedores) +
				getMoney(ofertaCreditoInstitutoDeVencedores) +
				getMoney(ofertaMoedaInstitutoDeVencedores) +
				getMoney(ofertaChequeInstitutoDeVencedores)
			).toString()
			.padStart(3, '0')
		)

		if(isNaN(total)){
			total = 'Valore(s) Inválido(s)'
		}
		if(isNaN(totalDizimo)){
			totalDizimo = 'Valore(s) Inválido(s)'
		}
		if(isNaN(totalOferta)){
			totalOferta = 'Valore(s) Inválido(s)'
		}
		if(isNaN(totalOfertaEspecial)){
			totalOfertaEspecial = 'Valore(s) Inválido(s)'
		}
		if(isNaN(totalOfertaInstitutoDeVencedores)){
			totalOfertaInstitutoDeVencedores = 'Valore(s) Inválido(s)'
		}

		const tiposDeLancamentos = [
			{
				label: 'Dízimo',				
				campos: [
					{
						label: 'Dinheiro',
						name: 'dizimoDinheiro',
						valor: dizimoDinheiro,
					},
					{
						label: 'Débito',
						name: 'dizimoDebito',
						valor: dizimoDebito,
					},
					{
						label: 'Crédito',
						name: 'dizimoCredito',
						valor: dizimoCredito,
					},
					{
						label: 'Moeda',
						name: 'dizimoMoeda',
						valor: dizimoMoeda,
					},
					{
						label: 'Cheque',
						name: 'dizimoCheque',
						valor: dizimoCheque,
					},
	
				],
				total: totalDizimo,
				labelTotal: 'DÍZIMO',
			},
			{
				label: 'Oferta',				
				campos: [
					{
						label: 'Dinheiro',
						name: 'ofertaDinheiro',
						valor: ofertaDinheiro,
					},
					{
						label: 'Débito',
						name: 'ofertaDebito',
						valor: ofertaDebito,
					},
					{
						label: 'Crédito',
						name: 'ofertaCredito',
						valor: ofertaCredito,
					},
					{
						label: 'Moeda',
						name: 'ofertaMoeda',
						valor: ofertaMoeda,
					},
					{
						label: 'Cheque',
						name: 'ofertaCheque',
						valor: ofertaCheque,
					},
				],
				total: totalOferta,
				labelTotal: 'OFERTA',
			},
			{
				label: 'Oferta Especial',				
				campos: [
					{
						label: 'Dinheiro',
						name: 'ofertaEspecialDinheiro',
						valor: ofertaEspecialDinheiro,
					},
					{
						label: 'Débito',
						name: 'ofertaEspecialDebito',
						valor: ofertaEspecialDebito,
					},
					{
						label: 'Crédito',
						name: 'ofertaEspecialCredito',
						valor: ofertaEspecialCredito,
					},
					{
						label: 'Moeda',
						name: 'ofertaEspecialMoeda',
						valor: ofertaEspecialMoeda,
					},
					{
						label: 'Cheque',
						name: 'ofertaEspecialCheque',
						valor: ofertaEspecialCheque,
					},
				],
				total: totalOfertaEspecial,
				labelTotal: 'OFERTA ESPECIAL',
			},
			{
				label: 'Oferta Instituto de Vencedores',				
				campos: [
					{
						label: 'Dinheiro',
						name: 'ofertaDinheiroInstitutoDeVencedores',
						valor: ofertaDinheiroInstitutoDeVencedores,
					},
					{
						label: 'Débito',
						name: 'ofertaDebitoInstitutoDeVencedores',
						valor: ofertaDebitoInstitutoDeVencedores,
					},
					{
						label: 'Crédito',
						name: 'ofertaCreditoInstitutoDeVencedores',
						valor: ofertaCreditoInstitutoDeVencedores,
					},
					{
						label: 'Moeda',
						name: 'ofertaMoedaInstitutoDeVencedores',
						valor: ofertaMoedaInstitutoDeVencedores,
					},
					{
						label: 'Cheque',
						name: 'ofertaChequeInstitutoDeVencedores',
						valor: ofertaChequeInstitutoDeVencedores,
					},
				],
				total: totalOfertaInstitutoDeVencedores,
				labelTotal: 'OFERTA INSTITUTO DE VENCEDORES',
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
				{
					tiposDeLancamentos.map(tipoDeLancamento => (
						<div className="container-item" key={tipoDeLancamento.label}>
							<div style={{padding:10}}>
								<Row style={{justifyContent: 'center', paddingBottom: 10, paddingTop: 5}}>
									<h6><b>{tipoDeLancamento.label}</b></h6>
								</Row>
									{
										tipoDeLancamento.campos.map(campo => (
											<Row key={campo.name}>
												<Col>
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
								<Row>
									<Col style={{paddingRight: 0, paddingLeft: 0}}> <b>TOTAL {tipoDeLancamento.labelTotal}</b> </Col>
									<Col> <b>{tipoDeLancamento.total}</b> </Col>
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
						<Col> <b>{total}</b> </Col>
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
