import React from 'react'
import {
	Button,
	Badge,
} from 'reactstrap'
import { connect } from 'react-redux'
import {
	EMPRESA_ADMINISTRACAO_ID,
} from '../helpers/constantes'
import { removerLancamentoNaApi } from '../actions'
import Responsive from 'react-responsive';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
library.add(faExpandArrowsAlt)
library.add(faEdit)

class Lancamento extends React.Component {

	componentDidMount() {
		this.setState({
			valor: this.props.lancamento.valor,
		})
	}

	removerLancamento = (lancamento_situacao_id) => {
		if (window.confirm('Realmente deseja remover esse lançamento?')) {
			const {
				lancamento_id,
				usuarioLogado,
				removerLancamentoNaApi
			} = this.props

			let elemento = {}
			elemento.lancamento_id = lancamento_id
			elemento.lancamento_situacao_id = lancamento_situacao_id

			removerLancamentoNaApi(elemento, usuarioLogado.token)
		}
	}

	render() {
		const Desktop = props => <Responsive {...props} minWidth={992} />;
		const {
			lancamento,
			categoria,
			empresa,
			usuarioLogado,
		} = this.props

		let corLinha = 'secondary'
		if (lancamento && lancamento.recebido) {
			if (categoria.credito_debito === 'C') {
				corLinha = 'success'
			} else {
				corLinha = 'danger'
			}
		}
		const soma = lancamento.dizimo + lancamento.oferta
		let diferenca = null
		if (lancamento.recebido) {
			diferenca = lancamento.recebido - soma
		}
		return (
			<tr className='text-center'>
				<td> {lancamento.data} </td>
				{usuarioLogado.empresa_id === EMPRESA_ADMINISTRACAO_ID &&
					<td> {empresa.nome} </td>
				}
				<td> {categoria.nome} </td>
				<Desktop>
					<td className='text-center'>
						{lancamento.dizimo ? Number(lancamento.dizimo).toFixed(2) : '0.00'}
					</td>
					<td className='text-center'>
						{lancamento.oferta ? Number(lancamento.oferta).toFixed(2) : '0.00'}
					</td>
				</Desktop>
				<td className='text-center'>
					{soma ? Number(soma).toFixed(2) : '0.00'}
				</td>
				<td className='text-center'>
					<Badge style={{ padding: 5, }} color={corLinha}>
						{
							lancamento.recebido ? Number(lancamento.recebido).toFixed(2) : 'Não Recebido'
						}
					</Badge>
				</td>
				<td className='text-center'>
					{
						diferenca ? Number(diferenca).toFixed(2) : ''
					}
				</td>
				<td>
					{
						!lancamento.recebido &&
						usuarioLogado.empresa_id === EMPRESA_ADMINISTRACAO_ID &&
						<Button
							className="botao-lancar"
							style={{ width: '100%' }}
							onClick={() => this.props.alternarMostrarAlterarLancamento(lancamento._id)}
						>
							<FontAwesomeIcon icon="edit" size="sm" />
						</Button>
					}
				</td>
			</tr>
		)
	}
}

const mapStateToProps = ({ lancamentos, empresas, categorias, usuarioLogado, usuarios }, { lancamento_id }) => {
	const lancamentoSelecionado = lancamentos && lancamentos.find(lancamento => lancamento._id === lancamento_id)
	const empresa = empresas && empresas.find(empresa => empresa._id === lancamentoSelecionado.empresa_id)
	const categoria = categorias && categorias.find(categoria => categoria._id === lancamentoSelecionado.categoria_id)
	const usuario = usuarios && usuarios.find(usuario => usuario._id === lancamentoSelecionado.usuario_id)

	return {
		lancamento: lancamentoSelecionado,
		categoria,
		empresa,
		usuarioLogado,
		usuario,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		removerLancamentoNaApi: (elemento, token) => dispatch(removerLancamentoNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Lancamento)
