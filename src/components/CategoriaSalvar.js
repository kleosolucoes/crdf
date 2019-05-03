import React from 'react'
import {
	Row,
	FormGroup,
	Label,
	Input,
	Alert,
	Button
} from 'reactstrap'
import { 
	STRING_DEBITO, 
	STRING_CREDITO,
} from '../helpers/constantes'

import { connect } from 'react-redux'
import { salvarCategoriaNaApi } from '../actions'
import {Cabecalho} from './Cabecalho'

class CategoriaSalvar extends React.Component {

	state = {
		nome: '',
		credito_debito: 0,
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
			nome,
			credito_debito,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		const {
			usuarioLogado,
		} = this.props
		camposComErro = []

		mostrarMensagemDeErro = false
		if(nome === ''){
			mostrarMensagemDeErro = true
			camposComErro.push('nome')
		}

		if(parseInt(credito_debito) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('credito_debito')
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
			elemento.credito_debito = credito_debito
			elemento.nome = nome
			this.props.salvarCategoriaNaApi(elemento, usuarioLogado.token)
			this.props.alternarMostrarAdicionar()
			alert('Categoria Salva com sucesso!')
		}
	}

	render() {
		const {
			nome,
			credito_debito,
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		return (
			<div>
				<Cabecalho 
					nomePagina="Adicionar Categoria"
				/>
				<FormGroup>
					<Label for="valor">Nome</Label>
					<Input 
						type="text" 
						name="nome" 
						id="nome" 
						value={nome} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('nome') ? true : null}
					>
					</Input>
				{camposComErro.includes('nome') && <Alert color='danger'>Preencha o nome</Alert>}
			</FormGroup>
			<FormGroup>
				<Label for="credito_debito">{STRING_CREDITO}/{STRING_DEBITO}</Label>
				<Input 
					type="select" 
					name="credito_debito" 
					id="credito_debito" 
					value={credito_debito} 
					onChange={this.ajudadorDeCampo}
					invalid={camposComErro.includes('credito_debito') ? true : null}
				>
					<option value='0'>Selecione</option>
					<option value='C'>{STRING_CREDITO}</option>
					<option value='D'>{STRING_DEBITO}</option>
				</Input>
			{camposComErro.includes('credito_debito') && <Alert color='danger'>Selecione se é Receita ou Despesa</Alert>}
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
				style={{marginLeft: 5}} 
				onClick={this.props.alternarMostrarAdicionar}
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

function mapStateToProps({usuarioLogado,}){
	return {
		usuarioLogado,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarCategoriaNaApi: (elemento, token) => dispatch(salvarCategoriaNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaSalvar)
