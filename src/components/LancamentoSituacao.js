import React from 'react'
import { connect } from 'react-redux'
import {
	Card,
	CardBody,
	CardTitle,
} from 'reactstrap'


class LancamentoSituacao extends React.Component {

	render() {
		const {
			lancamentoSituacao,
			situacao,
			usuario,
		} = this.props
		let corCard = 'text-muted'
		return (
			<Card className={corCard} style={{marginTop: 10}}>
				<CardBody>
					<CardTitle style={{marginBottom: 0}}>
						{lancamentoSituacao.data_criacao} - {lancamentoSituacao.hora_criacao}
					</CardTitle>
					<CardTitle style={{marginBottom: 0}}>
						Usuário: {usuario && usuario.nome.split(' ')[0]} - {situacao && situacao.nome}		
					</CardTitle>
				</CardBody>
			</Card>
		)
	}
}

const mapStateToProps = ({lancamentoSituacao, usuarios, situacoes}, {lancamento_situacao_id}) => {
	const lancamentoSituacaoSelecionado = 
		lancamentoSituacao && lancamentoSituacao.find(lancamentoSituacao => lancamentoSituacao._id === lancamento_situacao_id)
	const usuario = usuarios && usuarios.find(usuario => usuario._id === lancamentoSituacaoSelecionado.usuario_id)
	const situacao = situacoes && situacoes.find(situacao => situacao._id === lancamentoSituacaoSelecionado.situacao_id)
	return {
		lancamentoSituacao: lancamentoSituacaoSelecionado,
		usuario,
		situacao,
	}
}

export default connect(mapStateToProps, null)(LancamentoSituacao)
