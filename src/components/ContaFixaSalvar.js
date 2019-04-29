import React from 'react'
import {
	Row,
	FormGroup,
	Label,
	Input,
	Alert,
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { salvarContaFixaNaApi } from '../actions'
import { Cabecalho } from './Cabecalho';

class ContaFixaSalvar extends React.Component {

	state = {
		categoria_id: 0,
		empresa_id: 0,
		dia_gerar: 0,
		dia_notificacao: 0,
		mostrarMensagemDeErro: false,
		camposComErro: [],
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name
		this.setState({[name]: valor})
	}

	ajudadorDeSubmissao = () => {
		const {
			categoria_id,
			empresa_id,
			dia_gerar,
			dia_notificacao,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		const {
			usuarioLogado,
			salvarContaFixaNaApi,
		} = this.props
		camposComErro = []

		mostrarMensagemDeErro = false
		if(parseInt(categoria_id) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('categoria_id')
		}
		if(parseInt(empresa_id) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('empresa_id')
		}
		if(parseInt(dia_gerar) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('dia_gerar')
		}
		if(parseInt(dia_notificacao) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('dia_notificacao')
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

			const elemento = {}
			elemento.empresa_id = empresa_id
			elemento.categoria_id = categoria_id
			elemento.dia_gerar = parseInt(dia_gerar)
			elemento.dia_notificacao = parseInt(dia_notificacao)
			elemento.usuario_id = usuarioLogado.usuario_id
			salvarContaFixaNaApi(elemento, usuarioLogado.token)
			this.props.alternarMostrarSalvarContaFixa()
			alert('Conta Fixa Salva com sucesso!')
		}
	}

	render() {
		const {
			categoria_id,
			empresa_id,
			dia_gerar,
			dia_notificacao,
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		const {
			categorias,
			empresas,
		} = this.props

		let arrayDias = []
		for(let indiceDia = 1; indiceDia <= 31; indiceDia++){
			arrayDias.push(<option key={indiceDia} value={indiceDia}>{indiceDia}</option>)
		}

		return (
			<div>
				<Cabecalho 
					nomePagina="Adicionar Conta Fixa"
				/>
				<FormGroup>
					<Label for="empresa_id">Empresa</Label>
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
				</FormGroup>
				<FormGroup>
					<Label for="categoria_id">Categoria</Label>
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
					{camposComErro.includes('categoria_id') && <Alert color='danger'>Selecione a Categoria</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="dia_gerar">Dia para Gerar</Label>
					<Input 
						type="select" 
						name="dia_gerar" 
						id="dia_gerar" 
						value={dia_gerar} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('dia_gerar') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							arrayDias.map(dia => dia)
						}
					</Input>
					{camposComErro.includes('dia_gerar') && <Alert color='danger'>Selecione o dia para gerar a conta</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="dia_notificacao">Dia para ser Notificado</Label>
					<Input 
						type="select" 
						name="dia_notificacao" 
						id="dia_notificacao" 
						value={dia_notificacao} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('dia_notificacao') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							arrayDias.map(dia => dia)
						}
					</Input>
					{camposComErro.includes('dia_notificacao') && <Alert color='danger'>Selecione o dia para ser notificado</Alert>}
				</FormGroup>

					{
						mostrarMensagemDeErro &&
							<div style={{padding: 10}}>
								<Alert color='warning'>
									Campos inválidos
								</Alert>
							</div>
					}
				<Row style={{padding: 5, justifyContent: 'flex-end'}}>

						<Button 
							type='button' 
							className="botao-lancar"
							onClick={this.props.alternarMostrarSalvarContaFixa}
						>
							Voltar
						</Button> 

						<Button 
							type='button' 
							className="botao-lancar"
							style={{marginLeft: 5}} 
							onClick={this.ajudadorDeSubmissao}
						>
							Adicionar
						</Button> 

				</Row>
			</div>
		)
	}

}

function mapStateToProps({empresas, categorias, usuarioLogado}){
	return {
		categorias,
		usuarioLogado,
		empresas,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarContaFixaNaApi: (elemento, token) => dispatch(salvarContaFixaNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContaFixaSalvar)
