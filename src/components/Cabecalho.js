import React from "react";
import { 
	Row,
	Col,
	Card,
	CardTitle,
	CardText,
	Button,
} from "reactstrap";
import { 
	STRING_DEBITO,
	STRING_CREDITO,
	DARKGREEN,
	LIGHTGRAY,
} from '../helpers/constantes'
import { connect } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus)

export const Cabecalho = ({ nomePagina }) => (
	<Row
		style={{justifyContent: "space-between", alignItems: "center", padding: 10, marginBottom: 5}}
	>
		<h5 style={{ margin: 0 }}>{nomePagina}</h5>
	</Row>
);

export const CabecalhoBotao = ({ nomePagina, acaoOnClick }) => (
	<Row 
		style={{justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: 5}}>
		<h5 style={{ margin: 0 }}>{nomePagina}</h5>
		<div>
			<Row style={{justifyContent: 'flex-end', padding: 10}}>
				<Button 
					type='button' 
					className="botao-lancar"
					onClick={acaoOnClick}
				>
					<FontAwesomeIcon icon="user-plus" size="sm" style={{marginRight: 5}} />
					Adicionar
				</Button>
			</Row>
		</div>
	</Row>
);

class CabecalhoExtrato extends React.Component {

	render() {
		const {
			usuario,
			onClick,
		} = this.props
		let {
			saldo,
			naoRecebidoDebito,
			naoRecebidoCredito,
		} = this.props
	
		let corSaldo = DARKGREEN
		if(saldo < 0){
			corSaldo = 'brown'
		}
		saldo = Number(saldo).toFixed(2)
		naoRecebidoDebito = Number(naoRecebidoDebito).toFixed(2)
		naoRecebidoCredito = Number(naoRecebidoCredito).toFixed(2)
		return (
			<div style={{background: LIGHTGRAY}}>
				<Row style={{justifyContent: 'center', margin: 0}}>
					<Col> 
						<h5 style={{padding: 10, fontWeight: '300', color: DARKGREEN}}>Olá, {usuario && usuario.nome.split(' ')[0]}!</h5>
					</Col>
					<Button 
						onClick={onClick}
						style={{height: 40, width: 40, background: 'transparent', color: DARKGREEN, margin: 5, border: 0}}
					>
						<FontAwesomeIcon icon="sync-alt" size="sm" />
					</Button>
				</Row>

				<Row style={{justifyContent: 'center', paddingBottom: 8, margin: 0}}>

					<Col sm="12" lg="4">
						<Card className="card-saldo">
							<CardTitle> 
								<span style={{color: corSaldo}}> R$ {saldo}</span>
							</CardTitle>
							<CardText style={{fontSize: 12}}>Saldo</CardText>
						</Card> 
					</Col>

					<Col sm="12" lg="4">
						<Card className="card-saldo">
							<CardTitle style={{color: 'gray'}}>R$ {naoRecebidoCredito}</CardTitle>
							<CardText style={{fontSize: 12}}>Não Aceitos - {STRING_CREDITO}</CardText>
						</Card>
					</Col>

					<Col sm="12" lg="4">
						<Card className="card-saldo">
							<CardTitle style={{color: 'brown'}}>R$ {naoRecebidoDebito}</CardTitle>
							<CardText style={{fontSize: 12}}>Não Aceitos - {STRING_DEBITO}</CardText>
						</Card>
					</Col>
				</Row>
			</div>	
		)
	}
}

function mapStateToProps({usuarioLogado, usuarios,}){
	const usuarioSelecionado = usuarios && usuarioLogado &&
		usuarios.find(usuario => usuario._id === usuarioLogado.usuario_id)

	return {
		usuario: usuarioSelecionado,
	}
}

export default connect(mapStateToProps, null)(CabecalhoExtrato)
