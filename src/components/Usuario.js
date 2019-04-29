import React from 'react'
import {
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import Responsive from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserMinus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { removerUsuarioNaApi, } from '../actions'
import { EMPRESA_ADMINISTRACAO_ID, DARKGREEN } from  '../helpers/constantes'
library.add(faUserMinus)
library.add(faTrash)


class Usuario extends React.Component {

	removerUsuario = () => {
		if(window.confirm('Realmente deseja remover esse usuário?')){
			const { 
				usuario,
				usuarioLogado,
				removerUsuarioNaApi,
			} = this.props

			const elemento = {}
			elemento.usuario_id = usuario._id
			elemento.quem_id = usuarioLogado.usuario_id
			removerUsuarioNaApi(elemento, usuarioLogado.token)
			alert('Usuário Removido com sucesso!')
		}
	}

	render() {
		const Desktop = props => <Responsive {...props} minWidth={992} />;
		const { 
			usuario, 
			usuarioTipo,
			usuarioLogado,
			empresa,
		} = this.props
		return (
			<tbody>
				<tr>
					<td style={{color: DARKGREEN, verticalAlign: 'middle'}}>{usuario.nome.split(' ')[0]}</td>
					<Desktop><td style={{verticalAlign: 'middle'}}>{usuario.data_criacao}</td></Desktop>
					<Desktop><td>{usuarioTipo.nome}</td></Desktop>
					{
						usuarioLogado.empresa_id === EMPRESA_ADMINISTRACAO_ID &&
							<td style={{verticalAlign: 'middle'}}>{empresa && empresa.nome}</td>
					}
					<Desktop><td style={{verticalAlign: 'middle'}}>{usuario.email}</td></Desktop>
					{
						usuario._id !== usuarioLogado.usuario_id &&
							<td style={{verticalAlign: 'middle'}}>
								<Button 
									type='button' 
									className="botao-remover"
									style={{width: '100%', borderRadius: 0}}
									onClick={this.removerUsuario}
								>
									<FontAwesomeIcon icon="trash" size="sm" style={{marginRight: 5}} />
								</Button>
							</td>
					}
				</tr>
			</tbody>
		)
	}
}

const mapStateToProps = ({usuarios, usuarioTipo, usuarioLogado, empresas}, {usuario_id}) => {
	const usuarioSelecionado = usuarios && usuarios.find(usuario => usuario._id === usuario_id)
	const usuarioTipoSelecionado = usuarioTipo && usuarioTipo.find(usuarioTipo => usuarioTipo._id === usuarioSelecionado.usuario_tipo_id)
	const empresa = empresas && empresas.find(empresa => empresa._id === usuarioSelecionado.empresa_id)
	return {
		usuario: usuarioSelecionado,
		usuarioTipo: usuarioTipoSelecionado,
		usuarioLogado,
		empresa,
	}
}

function mapDispatchToProps(dispatch){
	return {
		removerUsuarioNaApi: (elemento, token) => dispatch(removerUsuarioNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Usuario)
