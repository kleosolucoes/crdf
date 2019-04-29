import React from 'react'
import Menu from './components/Menu'
import Lancamentos from './components/Lancamentos'
import Empresas from './components/Empresas'
import ExtratoAdministracao from './components/ExtratoAdministracao'
import Categorias from './components/Categorias'
import ExtratoEmpresa from './components/ExtratoEmpresa'
import LancarVarios from './components/LancarVarios'
import LancarUm from './components/LancarUm'
import Usuarios from './components/Usuarios'
import Login from './components/Login'
import ContasFixas from './components/ContasFixas'
import {
	Container,
} from 'reactstrap'
import { connect } from 'react-redux'
import { 
	salvarUsuarioLogado, 
} from './actions'
import {
	TELA_EXTRATO_ADMINISTRACAO,
	TELA_EXTRATO_EMPRESA,
} from './helpers/constantes'
import { 
	pegarUsuarioDaApi,
	pegarUsuarioTipoDaApi,
	pegarSituacaoDaApi,
	pegarCategoriaDaApi,
	pegarCategoriaTipoDaApi,
	pegarEmpresaDaApi,
	pegarEmpresaTipoDaApi,
	pegarContaFixaDaApi,
	pegarLancamentoDaApi,
	pegarLancamentoSituacaoDaApi,
} from './actions'
//import firebase from 'firebase'

class App extends React.Component {

	state = {
		tela: 'login',
		categoria_tipo_id: 0,
	}

	alterarTela = (tela, categoria_tipo_id = 0) => {
		this.setState({
			tela,
			categoria_tipo_id,
		})
	}

	sair = () => {
		this.props.salvarUsuarioLogado({
			usuario_id: null,
			empresa_id: null,
			token: null,
		})
		this.alterarTela('login')
	}

	puxarTodosDados = () => {
		this.props.pegarUsuarioDaApi(this.props.token)			
		this.props.pegarUsuarioTipoDaApi(this.props.token)
		this.props.pegarSituacaoDaApi(this.props.token)
		this.props.pegarCategoriaDaApi(this.props.token)
		this.props.pegarCategoriaTipoDaApi(this.props.token)
		this.props.pegarEmpresaDaApi(this.props.token)
		this.props.pegarEmpresaTipoDaApi(this.props.token)
		this.props.pegarContaFixaDaApi(this.props.token)
		this.props.pegarLancamentoDaApi(this.props.token)
		return	this.props.pegarLancamentoSituacaoDaApi(this.props.token)
	}

	askForPermissioToReceiveNotifications = async () => {
			//try {
			//const messaging = firebase.messaging();
			//await messaging.requestPermission();
			//const token = await messaging.getToken();
			//console.log('token do usuário:', token);

			//return token;
			//} catch (error) {
			//console.error(error);
			//}
	}

	render() {
		const { tela, categoria_tipo_id } = this.state
		const { empresa_id } = this.props
		return (
			<Container>
				{
					empresa_id &&
						<Menu 
							alterarTela={this.alterarTela} 
							nomeDaTela={tela} 
							sair={this.sair}
						/>
				}
				<div>
					{
						tela === 'login' &&
							<Login
								alterarTela={this.alterarTela}
							/>
					}
					{
						tela === TELA_EXTRATO_EMPRESA &&
							<ExtratoEmpresa 
								puxarTodosDados={this.puxarTodosDados}
								askForPermissioToReceiveNotifications={this.askForPermissioToReceiveNotifications}
							/>
					}
					{
						tela === 'lancarVarios' &&
							<LancarVarios
								alterarTela={this.alterarTela}
							/>
					}
					{
						tela === 'usuarios' &&
							<Usuarios 
								empresa_id={empresa_id}
							/>
					}
					{
						tela === TELA_EXTRATO_ADMINISTRACAO &&
							<ExtratoAdministracao 
								alterarTela={this.alterarTela}
								puxarTodosDados={this.puxarTodosDados}	
								askForPermissioToReceiveNotifications={this.askForPermissioToReceiveNotifications}
							/> 
					}
					{
						tela === 'lancarUm' &&
							<LancarUm
								alterarTela={this.alterarTela}
							/>
					}
					{
						tela === 'lancamentos' && 
							<Lancamentos 
								categoria_tipo_id={categoria_tipo_id}
								puxarTodosDados={this.puxarTodosDados}	
							/>
					}
					{
						tela === 'categorias' &&
							<Categorias />
					}
					{
						tela === 'empresas' &&
							<Empresas />
					}
					{
						tela === 'contasFixas' &&
							<ContasFixas />
					}
				</div>
			</Container>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		empresa_id: state.usuarioLogado.empresa_id,
		token: state.usuarioLogado.token,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarUsuarioLogado: (elemento) => dispatch(salvarUsuarioLogado(elemento)),
		pegarUsuarioDaApi: (elemento) => dispatch(pegarUsuarioDaApi(elemento)),
		pegarUsuarioTipoDaApi: (elemento) => dispatch(pegarUsuarioTipoDaApi(elemento)),
		pegarSituacaoDaApi: (elemento) => dispatch(pegarSituacaoDaApi(elemento)),
		pegarCategoriaDaApi: (elemento) => dispatch(pegarCategoriaDaApi(elemento)),
		pegarCategoriaTipoDaApi: (elemento) => dispatch(pegarCategoriaTipoDaApi(elemento)),
		pegarEmpresaDaApi: (elemento) => dispatch(pegarEmpresaDaApi(elemento)),
		pegarEmpresaTipoDaApi: (elemento) => dispatch(pegarEmpresaTipoDaApi(elemento)),
		pegarContaFixaDaApi: (elemento) => dispatch(pegarContaFixaDaApi(elemento)),
		pegarLancamentoDaApi: (elemento) => dispatch(pegarLancamentoDaApi(elemento)),
		pegarLancamentoSituacaoDaApi: (elemento) => dispatch(pegarLancamentoSituacaoDaApi(elemento)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
