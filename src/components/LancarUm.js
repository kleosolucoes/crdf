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
		valor: '0.00',
		taxa: '0.00',
		mostrarMensagemDeErro: false,
		camposComErro: [],
		situacao_id: 0,
	}

	componentDidMount(){
		const {
			lancamento
		} = this.props
		if(lancamento){
			this.setState({
				descricao: lancamento.descricao,
				valor: lancamento.valor,
				taxa: lancamento.taxa,
			})
		}
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name

		if(name === 'valor' || name === 'taxa'){
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
			valor,
			taxa,
			dia,
			mes,
			ano,
			descricao,
			situacao_id,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		let {
			lancamento,
			lancamentoSituacaoAtual,
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

		if(lancamento){
			if(parseInt(situacao_id) === 0){
				mostrarMensagemDeErro = true
				camposComErro.push('situacao_id')
			}
		}

		if(isNaN(valor) || valor === '' || valor === '0.00'){
			mostrarMensagemDeErro = true
			camposComErro.push('valor')
		}
		if(isNaN(taxa) || taxa === ''){
			mostrarMensagemDeErro = true
			camposComErro.push('taxa')
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
			elemento.usuario_id = this.props.usuario_id
			if(lancamento){
				elemento.lancamento_id = lancamento._id
				elemento.valor = valor
				elemento.taxa = taxa
				elemento.situacao_id = situacao_id
				elemento.lancamento_situacao_id = lancamentoSituacaoAtual._id
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
				elemento.valor = valor
				elemento.taxa = taxa
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
			situacoes,
		} = this.props
		const {
			mostrarMensagemDeErro,
			camposComErro,
			dia,
			mes,
			ano,
			descricao,
			valor,
			taxa,
			categoria_id,
			empresa_id,
			situacao_id,
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
										<Label for="empresa_id">Situação</Label>
										<div>
											<Input 
												type="select" 
												name="situacao_id" 
												id="situacao_id" 
												value={situacao_id} 
												onChange={this.ajudadorDeCampo}
												invalid={camposComErro.includes('situacao_id') ? true : null}
											>
												<option value='0'>Selecione</option>
												{
													situacoes &&
														situacoes.map(situacao => {
															return (
																<option 
																	key={situacao._id}
																	value={situacao._id}
																>
																	{situacao.nome}
																</option>
															)
														})
												}
											</Input>
											{camposComErro.includes('situacao_id') && <Alert color='danger'>Selecione a Situação</Alert>}
										</div>
									</FormGroup>
								</Col>
							</Row>
					}
					<Row>
						<Col>
							<FormGroup>
								<Label for="valor">Valor</Label>
								<Input 
									type="number" 
									name="valor" 
									id="valor" 
									value={valor} 
									onChange={this.ajudadorDeCampo}
									invalid={camposComErro.includes('valor') ? true : null}
								>
								</Input>
								{camposComErro.includes('valor') && <Alert color='danger'>Preencha o Valor</Alert>}
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label for="taxa">Taxa</Label>
								<Input 
									type="number" 
									name="taxa" 
									id="taxa" 
									value={taxa} 
									onChange={this.ajudadorDeCampo}
									invalid={camposComErro.includes('taxa') ? true : null}
								>
								</Input>
								{camposComErro.includes('taxa') && <Alert color='danger'>Preencha a Taxa</Alert>}
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

const mapStateToProps = ({situacoes, categorias, empresas, usuarioLogado, lancamentos, lancamentoSituacao,}, {lancamento_id}) => {
	let lancamentoSelecionado = null
	let categoriaSelecionada = null
	let empresaSelecionada = null
	let lancamentoSituacaoAtual = null
	if(lancamento_id){
		lancamentoSelecionado = lancamentos && 
			lancamentos.find(lancamento => lancamento._id === lancamento_id)
		categoriaSelecionada = categorias && 
			categorias.find(categoria => categoria._id === lancamentoSelecionado.categoria_id)
		empresaSelecionada = empresas && 
			empresas.find(empresa => empresa._id === lancamentoSelecionado.empresa_id)
		lancamentoSituacaoAtual = lancamentoSituacao && 
			lancamentoSituacao
			.find(lancamentoSituacao => 
				lancamentoSituacao.lancamento_id === lancamentoSelecionado._id && 
				lancamentoSituacao.data_inativacao === null)
	}
	return {
		categorias: categorias,
		empresas: empresas,
		usuario_id: usuarioLogado.usuario_id,
		token: usuarioLogado.token,
		lancamento: lancamentoSelecionado,
		categoria: categoriaSelecionada,
		empresa: empresaSelecionada,
		lancamentoSituacaoAtual,
		situacoes,
	}
}

function mapDispatchToProps(dispatch){
	return {
		lancarUmNaApi: (elemento, token) => dispatch(lancarUmNaApi(elemento, token)),
		alterarLancamentoNaApi: (elemento, token) => dispatch(alterarLancamentoNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LancarUm)
