import * as api from '../helpers/api'

export const PEGAR_SITUACOES = 'PEGAR_SITUACOES'

export const PEGAR_LANCAMENTOS = 'PEGAR_LANCAMENTOS'
export const SALVAR_LANCAMENTO = 'SALVAR_LANCAMENTO'
export const PEGAR_LANCAMENTO_SITUACAO = 'PEGAR_LANCAMENTO_SITUACAO'
export const SALVAR_LANCAMENTO_SITUACAO = 'SALVAR_LANCAMENTO_SITUACAO'

export const PEGAR_USUARIOS = 'PEGAR_USUARIOS'
export const SALVAR_USUARIO = 'SALVAR_USUARIO'
export const PEGAR_USUARIO_TIPO = 'PEGAR_USUARIO_TIPO'

export const PEGAR_CATEGORIAS = 'PEGAR_CATEGORIAS'
export const SALVAR_CATEGORIA = 'SALVAR_CATEGORIA'
export const PEGAR_CATEGORIA_TIPO = 'PEGAR_CATEGORIA_TIPO'

export const PEGAR_EMPRESAS = 'PEGAR_EMPRESAS'
export const SALVAR_EMPRESA = 'SALVAR_EMPRESA'
export const PEGAR_EMPRESA_TIPO = 'PEGAR_EMPRESA_TIPO'
export const PEGAR_CONTA_FIXA = 'PEGAR_CONTA_FIXA'
export const SALVAR_CONTA_FIXA = 'SALVAR_CONTA_FIXA'

export const PEGAR_USUARIO_LOGADO = 'PEGAR_USUARIO_LOGADO'
export const SALVAR_USUARIO_LOGADO = 'SALVAR_USUARIO_LOGADO'

export function pegarLancamentos(elementos){ 
	return {
		type: PEGAR_LANCAMENTOS,
		elementos,
	}
}

export function salvarLancamento(elemento, novo = false){ 
	return {
		type: SALVAR_LANCAMENTO,
		elemento,
		novo,
	}
}

export function pegarCategorias(elementos){ 
	return {
		type: PEGAR_CATEGORIAS,
		elementos,
	}
}

export function salvarCategoria(elemento, novo = false){ 
	return {
		type: SALVAR_CATEGORIA,
		elemento,
		novo,
	}
}

export function pegarCategoriaTipo(elementos){ 
	return {
		type: PEGAR_CATEGORIA_TIPO,
		elementos,
	}
}

export function pegarEmpresas(elementos){ 
	return {
		type: PEGAR_EMPRESAS,
		elementos,
	}
}

export function salvarEmpresa(elemento, novo = false){ 
	return {
		type: SALVAR_EMPRESA,
		elemento,
		novo,
	}
}

export function pegarUsuarios(elementos){ 
	return {
		type: PEGAR_USUARIOS,
		elementos,
	}
}

export function salvarUsuario(elemento, novo = false){ 
	return {
		type: SALVAR_USUARIO,
		elemento,
		novo,
	}
}

export function pegarLancamentoSituacao(elementos){ 
	return {
		type: PEGAR_LANCAMENTO_SITUACAO,
		elementos,
	}
}

export function salvarLancamentoSituacao(elemento, novo = false){ 
	return {
		type: SALVAR_LANCAMENTO_SITUACAO,
		elemento,
		novo,
	}
}

export function pegarSituacoes(elementos){ 
	return {
		type: PEGAR_SITUACOES,
		elementos,
	}
}

export function pegarUsuarioTipo(elementos){ 
	return {
		type: PEGAR_USUARIO_TIPO,
		elementos,
	}
}

export function pegarEmpresaTipo(elementos){ 
	return {
		type: PEGAR_EMPRESA_TIPO,
		elementos,
	}
}

export function pegarContaFixa(elementos){ 
	return {
		type: PEGAR_CONTA_FIXA,
		elementos,
	}
}

export function salvarContaFixa(elemento, novo = false){ 
	return {
		type: SALVAR_CONTA_FIXA,
		elemento,
		novo,
	}
}

export function pegarUsuarioLogado(){
	return {
		type: PEGAR_USUARIO_LOGADO,
	}
}

export function salvarUsuarioLogado(elemento){
	return {
		type: SALVAR_USUARIO_LOGADO,
		elemento,
	}
}

export const pegarUsuarioDaApi = (token) => dispatch => {
	api.usuarios(token)
		.then(dados => {
			return dispatch(pegarUsuarios(dados.resultado.elementos))
		})
}

export const pegarUsuarioTipoDaApi = (token) => dispatch => {
	api.usuarioTipo(token)
		.then(dados => {
			return dispatch(pegarUsuarioTipo(dados.resultado.elementos))
		})
}

export const pegarSituacaoDaApi = (token) => dispatch => {
	api.situacao(token)
		.then(dados => {
			return dispatch(pegarSituacoes(dados.resultado.elementos))
		})
}

export const pegarEmpresaDaApi = (token) => dispatch => {
	api.empresas(token)
		.then(dados => {
			return dispatch(pegarEmpresas(dados.resultado.elementos))
		})
}

export const pegarEmpresaTipoDaApi = (token) => dispatch => {
	api.empresaTipo(token)
		.then(dados => {
			return dispatch(pegarEmpresaTipo(dados.resultado.elementos))
		})
}

export const pegarCategoriaDaApi = (token) => dispatch => {
	api.categoria(token)
		.then(dados => {
			return dispatch(pegarCategorias(dados.resultado.elementos))
		})
}

export const pegarCategoriaTipoDaApi = (token) => dispatch => {
	api.categoriaTipo(token)
		.then(dados => {
			return dispatch(pegarCategoriaTipo(dados.resultado.elementos))
		})
}

export const pegarContaFixaDaApi = (token) => dispatch => {
	api.contaFixa(token)
		.then(dados => {
			return dispatch(pegarContaFixa(dados.resultado.elementos))
		})
}

export const pegarLancamentoDaApi = (token) => dispatch => {
	api.lancamento(token)
		.then(dados => {
			return dispatch(pegarLancamentos(dados.resultado.elementos))
		})
}

export const pegarLancamentoSituacaoDaApi = (token) => dispatch => {
	return api.lancamentoSituacao(token)
		.then(dados => {
			return dispatch(pegarLancamentoSituacao(dados.resultado.elementos))
		})
}

export const lancarUmNaApi = (dados, token) => dispatch => {
	api.lancarUm(dados, token)
		.then(dados => {
			const novoRegistro = true
			dispatch(salvarLancamento(dados.resultado.lancamento, novoRegistro))
			dispatch(salvarLancamentoSituacao(dados.resultado.lancamentoSituacao, novoRegistro))
		})
}

export const alterarLancamentoNaApi = (dados, token) => dispatch => {
	return	api.alterarLancamento(dados, token)
		.then(dados => {
			dispatch(salvarLancamento(dados.resultado.lancamento))
			dispatch(salvarLancamentoSituacao(dados.resultado.lancamentoSituacao))
			const novoRegistro = true
			dispatch(salvarLancamentoSituacao(dados.resultado.lancamentoSituacaoNovo, novoRegistro))

			return dados.resultado.lancamentoSituacaoNovo._id
		})
}

export const salvarCategoriaNaApi = (dados, token) => dispatch => {
	api.salvarCategoria(dados, token)
		.then(dados => {
			const novoRegistro = true
			dispatch(salvarCategoria(dados.resultado.categoria, novoRegistro))
		})
}

export const salvarEmpresaNaApi = (dados, token) => dispatch => {
	api.salvarEmpresa(dados, token)
		.then(dados => {
			const novoRegistro = true
			dispatch(salvarEmpresa(dados.resultado.empresa, novoRegistro))
		})
}

export const salvarUsuarioNaApi = (dados, token) => dispatch => {
	api.salvarUsuario(dados, token)
		.then(dados => {
			const novoRegistro = true
			dispatch(salvarUsuario(dados.resultado.usuario, novoRegistro))
		})
}

export const removerUsuarioNaApi = (dados, token) => dispatch => {
	api.removerUsuario(dados, token)
		.then(dados => {
			dispatch(salvarUsuario(dados.resultado.usuario))
		})
}

export const salvarContaFixaNaApi = (dados, token) => dispatch => {
	api.salvarContaFixa(dados, token)
		.then(dados => {
			const novoRegistro = true
			dispatch(salvarContaFixa(dados.resultado.contaFixa, novoRegistro))
		})
}

export const removerContaFixaNaApi = (dados, token) => dispatch => {
	api.removerContaFixa(dados, token)
		.then(dados => {
			dispatch(salvarContaFixa(dados.resultado.contaFixa))
		})
}

export const lancarVariosNaApi = (dados, token) => dispatch => {
	api.lancarVarios(dados, token)
		.then(dados => {
		})
}

export const removerLancamentoNaApi = (dados, token) => dispatch => {
	api.removerLancamento(dados, token)
		.then(dados => {
			dispatch(salvarLancamento(dados.resultado.lancamento))
			dispatch(salvarLancamentoSituacao(dados.resultado.lancamentoSituacao))
		})
}
