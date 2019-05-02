import React from 'react'
import {
	Row,
	Col,
	Alert,
	Label,
	FormGroup,
	Input,
	Button,
	Badge,
} from 'reactstrap'
import { connect } from 'react-redux'
import { 
	STRING_DEBITO,
	STRING_CREDITO,
	DARKGREEN
} from '../helpers/constantes'
import { formatReal, getMoney, pegarDataEHoraAtual } from '../helpers/funcoes'
import { 
	lancarUmNaApi,
	alterarLancamentoNaApi,
} from '../actions'
import { Cabecalho } from './Cabecalho';

class LancarUm extends React.Component {

	state = {
		dia: new Date().getDate(),
		mes: (new Date().getMonth() + 1),
		ano: new Date().getFullYear(),
		descricao: '',
		categoria_id: 0,
		empresa_id: 0,
		recebido: '0.00',
		mostrarMensagemDeErro: false,
		camposComErro: [],
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name

		if(name === 'recebido'){
			const valorInteiro = getMoney(valor) + ''
			const valorComZerosAEsquerda = valorInteiro.padStart(3, '0')
			valor = formatReal(valorComZerosAEsquerda)
		}
		this.setState({[name]: valor})
	}

	ajudadorDeSubmissao = () => {
		const {
			categoria_id,
			empresa_id,
			recebido,
			dia,
			mes,
			ano,
			descricao,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		let {
			lancamento,
		} = this.props
		camposComErro = []

		mostrarMensagemDeErro = false

		if(!lancamento){
			if(parseInt(categoria_id) === 0){
				mostrarMensagemDeErro = true
				camposComErro.push('categoria_id')
			}
			if(parseInt(empresa_id) === 0){
				mostrarMensagemDeErro = true
				camposComErro.push('empresa_id')
			}
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
		}

		if(isNaN(recebido) || recebido === '' || recebido === '0.00'){
			mostrarMensagemDeErro = true
			camposComErro.push('recebido')
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

			let elemento = {}
			elemento.quem_recebeu_id = this.props.usuario_id
			elemento.recebido = recebido
			if(lancamento){
				elemento.lancamento_id = lancamento._id
				this.props.alterarLancamentoNaApi(elemento, this.props.token)
				this.props.alternarMostrarAlterarLancamento(null)
			}
			if(lancamento === null){
				elemento.data_criacao = pegarDataEHoraAtual()[0]
				elemento.hora_criacao = pegarDataEHoraAtual()[1]
				elemento.data_inativacao = null
				elemento.hora_inativacao =  null
				elemento.categoria_id = categoria_id
				elemento.descricao = descricao
				elemento.dia = dia
				elemento.mes = mes
				elemento.ano = ano
				elemento.empresa_id = empresa_id
				this.props.lancarUmNaApi(elemento, this.props.token)
				this.props.alterarTela('extratoAdministracao')
			}
			alert('Lançamento Salvo com sucesso!')
		}
	}

	render() {
		const {
			categorias,
			empresas,
			lancamento,
			categoria,
			empresa,
		} = this.props
		const {
			mostrarMensagemDeErro,
			camposComErro,
			dia,
			mes,
			ano,
			descricao,
			recebido,
			categoria_id,
			empresa_id,
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

		return (
			<div style={{marginTop: 70}}>
			 	<Cabecalho 
					nomePagina="Lançar entrada"
				/>
				<div className="container-lancar-um">
					<Row>
						<Col>
							<FormGroup>
								<Label for="empresa_id">Empresa</Label>
								{
									!lancamento &&
										<div>
											<Input 
												type="select" 
												name="empresa_id" 
												id="empresa_id" 
												value={empresa_id} 
												onChange={this.ajudadorDeCampo}
												invalid={camposComErro.includes('empresa_id') ? true : null}
											>
												<option value='0'>Selecione</option>
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
											{camposComErro.includes('empresa_id') && <Alert color='danger'>Selecione a Empresa</Alert>}
										</div>
								}
								{
									lancamento && 
									empresa &&
										<p>
											<Badge style={{padding: 5, background: DARKGREEN}}>
												{empresa.nome}
											</Badge>
										</p>
								}
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label for="categoria_id">Categoria</Label>
								{
									!lancamento &&
										<div>
											<Input 
												type="select" 
												name="categoria_id" 
												id="categoria_id" 
												value={categoria_id} 
												onChange={this.ajudadorDeCampo}
												invalid={camposComErro.includes('categoria_id') ? true : null}
											>
												<option value='0'>Selecione</option>
												{
													categorias &&
														categorias.map(categoria => {
															// const cat = _.orderBy(categorias, ["nome"]);
									 						// console.log(cat)		
															return (
																<option 
																	key={categoria._id}
																	value={categoria._id}
																>
																	{categoria && categoria.credito_debito === 'C' ? STRING_CREDITO : STRING_DEBITO} - {categoria.nome}
																</option>
															)
														})
												}
											</Input>
											{camposComErro.includes('categoria_id') && <Alert color='danger'>Selecione a Categoria</Alert>}
										</div>
								}
								{
									lancamento && 
										categoria &&
											<p>
												<Badge style={{padding: 5, background: DARKGREEN}}>
													{categoria.nome}
												</Badge>
											</p>
								}
							</FormGroup>
						</Col>
					</Row>
					{
						lancamento &&
							<Row>
								<Col>
									<FormGroup>
										<Label for="valor">Dízimo</Label>
										<p>
											<Badge style={{padding: 5, background: DARKGREEN}}>
												{
													lancamento.dizimo ? Number(lancamento.dizimo).toFixed(2) : 0.00
												}
											</Badge>
										</p>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup>
										<Label for="valor">Oferta</Label>
										<p>
											<Badge style={{padding: 5, background: DARKGREEN}}>
												{
													lancamento.oferta ? `${Number(lancamento.oferta).toFixed(2)}` : `R$ ${0.00}`
												}
											</Badge>
										</p>
									</FormGroup>
								</Col>
							</Row>
					}
					<Row>
						<Col>
							<FormGroup>
								<Label for="recebido">Recebido</Label>
								<Input 
									type="number" 
									name="recebido" 
									id="recebido" 
									value={recebido} 
									onChange={this.ajudadorDeCampo}
									invalid={camposComErro.includes('recebido') ? true : null}
								>
								</Input>
								{camposComErro.includes('recebido') && <Alert color='danger'>Preencha o Valor Recebido</Alert>}
							</FormGroup>
						</Col>
					</Row>
				</div>
				<div className="container-lancar-um" style={{marginTop: 10}}>
					{
						!lancamento &&
							<div>
								<Label for="data">DATA DE LANÇAMENTO</Label>
								<Row>
									<Col style={{paddingRight: 5}}>
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
									<Col style={{padding: 0}}>
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
									<Col style={{paddingLeft: 5}}>
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
							</div>
					}
					{
						!lancamento &&
							<FormGroup>
								<Label for="descricao">Descrição</Label>
								<Input 
									type="textarea" 
									name="descricao" 
									id="descricao" 
									value={descricao} 
									onChange={this.ajudadorDeCampo}
								>
								</Input>
							</FormGroup>
					}
					{
						mostrarMensagemDeErro &&
							<div style={{padding: 10}}>
								<Alert color='warning'>
									Campos inválidos
								</Alert>
							</div>
					}
				</div>
				<div style={{padding: 10}}>
					<Row style={{justifyContent: 'flex-end'}}>
						{
							lancamento &&
							<Button
								type='button' 
								className="botao-lancar"
								onClick={() => this.props.alternarMostrarAlterarLancamento(null)}
							>
								<b>Voltar</b>
							</Button>
						}
							<Button
								type='button' 
								className="botao-lancar"
								style={{marginLeft: 5}}
								onClick={this.ajudadorDeSubmissao}
							>
								<b>Salvar</b>
							</Button>
					</Row>
				</div>
			</div>

		)
	}
}

const mapStateToProps = ({categorias, empresas, usuarioLogado, lancamentos,}, {lancamento_id}) => {
	let lancamentoSelecionado = null
	let categoriaSelecionada = null
	let empresaSelecionada = null
	if(lancamento_id){
		lancamentoSelecionado = lancamentos && 
			lancamentos.find(lancamento => lancamento._id === lancamento_id)
		categoriaSelecionada = categorias && 
			categorias.find(categoria => categoria._id === lancamentoSelecionado.categoria_id)
		empresaSelecionada = empresas && 
			empresas.find(empresa => empresa._id === lancamentoSelecionado.empresa_id)
	}
	return {
		categorias: categorias,
		empresas: empresas,
		usuario_id: usuarioLogado.usuario_id,
		token: usuarioLogado.token,
		lancamento: lancamentoSelecionado,
		categoria: categoriaSelecionada,
		empresa: empresaSelecionada,
	}
}

function mapDispatchToProps(dispatch){
	return {
		lancarUmNaApi: (elemento, token) => dispatch(lancarUmNaApi(elemento, token)),
		alterarLancamentoNaApi: (elemento, token) => dispatch(alterarLancamentoNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LancarUm)
