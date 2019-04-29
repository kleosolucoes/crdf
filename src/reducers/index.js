import { combineReducers } from 'redux'
import {
	PEGAR_SITUACOES, 
	PEGAR_LANCAMENTOS, 
	SALVAR_LANCAMENTO,
	PEGAR_LANCAMENTO_SITUACAO,
	SALVAR_LANCAMENTO_SITUACAO,
	PEGAR_USUARIOS,
	SALVAR_USUARIO,
	PEGAR_USUARIO_TIPO,
	PEGAR_CATEGORIAS,
	PEGAR_CATEGORIA_TIPO,
	SALVAR_CATEGORIA,
	PEGAR_EMPRESAS,
	SALVAR_EMPRESA,
	PEGAR_EMPRESA_TIPO,
	PEGAR_CONTA_FIXA,
	SALVAR_CONTA_FIXA,
	PEGAR_USUARIO_LOGADO,
	SALVAR_USUARIO_LOGADO,
} from '../actions'

const stateUsuarioLogado = {
	usuario_id: null,
	empresa_id: null,
	token: null,
}

function empresaTipo(state = [], action){
	switch(action.type){
		case PEGAR_EMPRESA_TIPO:
			return [...action.elementos]
		default:
			return state
	}
}

function empresas(state = [], action){
	switch(action.type){
		case PEGAR_EMPRESAS:
			return [...action.elementos]
		case SALVAR_EMPRESA:
			if(action.novo){
				return [...state, action.elemento]
			}else{
				const estadoAtualizado = state.map(elemento => {
					if(elemento._id === action.elemento._id){
						return action.elemento
					}else{
						return elemento
					}
				})
				return [...estadoAtualizado]
			}
		default:
			return state
	}
}

function contaFixa(state = [], action){
	switch(action.type){
		case PEGAR_CONTA_FIXA:
			return [...action.elementos]
		case SALVAR_CONTA_FIXA:
			if(action.novo){
				return [...state, action.elemento]
			}else{
				const estadoAtualizado = state.map(elemento => {
					if(elemento._id === action.elemento._id){
						return action.elemento
					}else{
						return elemento
					}
				})
				return [...estadoAtualizado]
			}
		default:
			return state
	}
}

function categorias(state = [], action){
	switch(action.type){
		case PEGAR_CATEGORIAS:
			return [...action.elementos]
		case SALVAR_CATEGORIA:
			if(action.novo){
				return [...state, action.elemento]
			}else{
				const estadoAtualizado = state.map(elemento => {
					if(elemento._id === action.elemento._id){
						return action.elemento
					}else{
						return elemento
					}
				})
				return [...estadoAtualizado]
			}
		default:
			return state
	}
}

function categoriaTipo(state = [], action){
	switch(action.type){
		case PEGAR_CATEGORIA_TIPO:
			return [...action.elementos]
		default:
			return state
	}
}

function lancamentos(state = [], action){
	switch(action.type){
		case PEGAR_LANCAMENTOS:
			return [...action.elementos]
		case SALVAR_LANCAMENTO:
			if(action.novo){
				return [...state, action.elemento]
			}else{
				const estadoAtualizado = state.map(elemento => {
					if(elemento._id === action.elemento._id){
						return action.elemento
					}else{
						return elemento
					}
				})
				return [...estadoAtualizado]
			}
		default:
			return state
	}
}

function usuarioTipo(state = [], action){
	switch(action.type){
		case PEGAR_USUARIO_TIPO:
			return [...action.elementos]
		default:
			return state
	}
}

function usuarios(state = [], action){
	switch(action.type){
		case PEGAR_USUARIOS:
			return [...action.elementos]
		case SALVAR_USUARIO:
			if(action.novo){
				return [...state, action.elemento]
			}else{
				const estadoAtualizado = state.map(elemento => {
					if(elemento._id === action.elemento._id){
						return action.elemento
					}else{
						return elemento
					}
				})
				return [...estadoAtualizado]
			}
		default:
			return state
	}
}

function situacoes(state = [], action){
	switch(action.type){
		case PEGAR_SITUACOES:
			return [...action.elementos]
		default:
			return state
	}
}

function lancamentoSituacao(state = [], action){
	switch(action.type){
		case PEGAR_LANCAMENTO_SITUACAO:
			return [...action.elementos]
		case SALVAR_LANCAMENTO_SITUACAO:
			if(action.novo === true){
				return [...state, action.elemento]
			}else{
				const estadoAtualizado = state.map(elemento => {
					if(elemento._id === action.elemento._id){
						return action.elemento
					}else{
						return elemento
					}
				})
				return [...estadoAtualizado]
			}
		default:
			return state
	}
}

function usuarioLogado(state = stateUsuarioLogado, action){
	switch(action.type){
		case PEGAR_USUARIO_LOGADO:
			return {...state}
		case SALVAR_USUARIO_LOGADO:
			return {...state, ...action.elemento}
		default:
			return state
	}
}

export default combineReducers({
	empresaTipo,
	empresas,
	categorias,
	categoriaTipo,
	lancamentos,
	usuarios,
	situacoes,
	lancamentoSituacao,
	contaFixa,
	usuarioTipo,
	usuarioLogado
})
