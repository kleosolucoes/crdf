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
import { salvarUsuarioNaApi, } from '../actions'
import { 
	EMPRESA_ADMINISTRACAO_ID,
	USUARIO_TIPO_ADMINISTRACAO,
	USUARIO_TIPO_ACEITAR_LANCAMENTO,
} from '../helpers/constantes'
import { Cabecalho } from './Cabecalho';

class UsuarioSalvar extends React.Component {

	state = {
		usuario_tipo_id: 0,
		empresa_id: 0,
		nome: '',
		email: '',
		senha: '',
		mostrarMensagemDeErro: false,
		camposComErro: [],
	}

	componentDidMount(){
		if(this.props.empresa_id !== EMPRESA_ADMINISTRACAO_ID){
			this.setState({empresa_id: this.props.empresa_id})
		}
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name
		this.setState({[name]: valor})
	}

	ajudadorDeSubmissao = () => {
		const {
			usuario_tipo_id,
			empresa_id,
			nome,
			email,
			senha,
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
		if(parseInt(usuario_tipo_id) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('usuario_tipo_id')
		}
		if(parseInt(empresa_id) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('empresa_id')
		}
		if(nome === ''){
			mostrarMensagemDeErro = true
			camposComErro.push('nome')
		}
		if(email === ''){
			mostrarMensagemDeErro = true
			camposComErro.push('email')
		}else{
			if(this.props.usuarios.find(usuario => usuario.email === email)){
				mostrarMensagemDeErro = true
				camposComErro.push('emailJaUtilizado')
			}
		}
		if(senha === ''){
			mostrarMensagemDeErro = true
			camposComErro.push('senha')
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
			elemento.usuario_tipo_id = usuario_tipo_id
			elemento.nome = nome.toUpperCase()
			elemento.email = email.toLowerCase()
			elemento.senha = senha

			this.props.salvarUsuarioNaApi(elemento, usuarioLogado.token)
			this.props.alternarMostrarSalvarUsuario()
			alert('Usuário Salvo com sucesso!')
		}
	}

	render() {
		const {
			usuario_tipo_id,
			empresa_id,
			nome,
			email,
			senha,
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		const {
			usuarioTipo,
			empresas,
			usuarioLogado,
		} = this.props

		return (
			<div>
				<Cabecalho 
					nomePagina="Adicionar Usuário"
				/>
				{
					usuarioLogado.empresa_id === EMPRESA_ADMINISTRACAO_ID &&
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
				}
				<FormGroup>
					<Label for="usuario_tipo_id">Tipo</Label>
					<Input 
						type="select" 
						name="usuario_tipo_id" 
						id="usuario_tipo_id" 
						value={usuario_tipo_id} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('usuario_tipo_id') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							usuarioTipo &&
								usuarioTipo.map(usuarioTipo => {
									let mostrar = false
									if(this.props.empresa_id === EMPRESA_ADMINISTRACAO_ID
										&& (usuarioTipo._id === USUARIO_TIPO_ADMINISTRACAO || usuarioTipo._id === USUARIO_TIPO_ACEITAR_LANCAMENTO)){
										mostrar = true
									}
									if(this.props.empresa_id !== EMPRESA_ADMINISTRACAO_ID
										&& usuarioTipo._id !== USUARIO_TIPO_ADMINISTRACAO
										&& usuarioTipo._id !== USUARIO_TIPO_ACEITAR_LANCAMENTO){
										mostrar = true
									}
									if(mostrar){
										return (
											<option 
												key={usuarioTipo._id}
												value={usuarioTipo._id}
											>
												{usuarioTipo.nome}
											</option>
										)
									}
									return false
								})
						}
					</Input>
					{camposComErro.includes('usuario_tipo_id') && <Alert color='danger'>Selecione um Tipo</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="nome">Nome</Label>
					<Input 
						type="text" 
						name="nome" 
						id="nome" 
						value={nome} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('nome') ? true : null}
					>
					</Input>
					{camposComErro.includes('nome') && <Alert color='danger'>Preencha o Nome</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="email">Email</Label>
					<Input 
						type="email" 
						name="email" 
						id="email" 
						value={email} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('email') ? true : null}
					>
					</Input>
					{camposComErro.includes('email') && <Alert color='danger'>Preencha o Email</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="senha">Senha</Label>
					<Input 
						type="password" 
						name="senha" 
						id="senha" 
						value={senha} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('senha') ? true : null}
					>
					</Input>
					{camposComErro.includes('senha') && <Alert color='danger'>Preencha a Senha</Alert>}
				</FormGroup>
					{
						camposComErro.includes('emailJaUtilizado') &&
							<div style={{padding: 10}}>
								<Alert color='warning'>
									Email já utilizado
								</Alert>
							</div>
					}
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
							onClick={this.props.alternarMostrarSalvarUsuario}
						>
							Voltar
						</Button> 

						<Button 
							type='button' 
							style={{marginLeft: 5}} 
							className="botao-lancar"
							onClick={this.ajudadorDeSubmissao}
						>
							Adicionar
						</Button> 
				</Row>
			</div>
		)
	}
}

function mapStateToProps({empresas, usuarios, usuarioTipo, usuarioLogado}){
	return {
		usuarioTipo,
		usuarios,
		usuarioLogado,
		empresas,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarUsuarioNaApi: (elemento, token) => dispatch(salvarUsuarioNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioSalvar)
