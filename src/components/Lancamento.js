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
		if (lancamento.recebido && (lancamento.dizimo || lancamento.oferta)) {
			diferenca = lancamento.recebido - soma
		}

		let mostrarAlterar = false
		if (usuarioLogado.empresa_id === EMPRESA_ADMINISTRACAO_ID) {
			mostrarAlterar = true
		}
		if (usuarioLogado.empresa_id !== EMPRESA_ADMINISTRACAO_ID &&
			!lancamento.recebido) {
			mostrarAlterar = true
		}
		return (
			<tr className='text-center'>
				<td> {lancamento.data} </td>
				{
					usuarioLogado.empresa_id === EMPRESA_ADMINISTRACAO_ID &&
					<td> {empresa.nome} </td>
				}
				<td> {categoria.nome} </td>
				<td className='text-right'>
					{lancamento.dizimo ? `R$ ${Number(lancamento.dizimo).toFixed(2)}` : ''}
				</td>
				<td className='text-right'>
					{lancamento.oferta ? `R$ ${Number(lancamento.oferta).toFixed(2)}` : ''}
				</td>
				<td className='text-right'>
					{soma ? `R$ ${Number(soma).toFixed(2)}` : ''}
				</td>
				<td className='text-right'>
					<Badge style={{ padding: 5, }} color={corLinha}>
						{
							lancamento.recebido ? `R$ ${Number(lancamento.recebido).toFixed(2)}` : 'Não Recebido'
						}
					</Badge>
				</td>
				<td className='text-right'>
					{
						diferenca ? `R$ ${Number(diferenca).toFixed(2)}` : ''
					}
				</td>
				<td>
					{
						mostrarAlterar &&
						<Button
							className="botao-editar"
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
