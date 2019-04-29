let api = 'https://glacial-harbor-83832.herokuapp.com'
api = 'http://localhost:8080'

const headers = {
	'Content-Type': 'application/json'
}

export const teste = () => 
	fetch(`${api}/usuario/teste`)
		.then(resultado => resultado.json())
		.then(json => json)

export const login = (dados) =>
	fetch(
		`${api}/usuario/login`,
		{
			headers,
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const usuarios = (token) =>
	fetch(
		`${api}/usuario/todos`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const usuarioTipo = (token) =>
	fetch(
		`${api}/usuario/usuarioTipo`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const situacao = (token) =>
	fetch(
		`${api}/situacao/todos`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const categoria = (token) =>
	fetch(
		`${api}/categoria/todos`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const categoriaTipo = (token) =>
	fetch(
		`${api}/categoria/categoriaTipo`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const usuarioSituacao = (token) =>
	fetch(
		`${api}/usuario/usuarioSituacao`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const empresas = (token) =>
	fetch(
		`${api}/empresa/todos`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const empresaTipo = (token) =>
	fetch(
		`${api}/empresa/empresaTipo`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const contaFixa = (token) =>
	fetch(
		`${api}/empresa/contaFixa`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const lancamento = (token) =>
	fetch(
		`${api}/empresa/lancamento`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const lancamentoSituacao = (token) =>
	fetch(
		`${api}/empresa/lancamentoSituacao`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const lancarUm = (dados, token) =>
	fetch(
		`${api}/empresa/lancarUm`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const alterarLancamento = (dados, token) =>
	fetch(
		`${api}/empresa/alterarLancamento`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const salvarCategoria = (dados, token) =>
	fetch(
		`${api}/categoria/salvar`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const salvarEmpresa = (dados, token) =>
	fetch(
		`${api}/empresa/salvar`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const salvarUsuario = (dados, token) =>
	fetch(
		`${api}/usuario/salvar`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const removerUsuario = (dados, token) =>
	fetch(
		`${api}/usuario/remover`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const salvarContaFixa = (dados, token) =>
	fetch(
		`${api}/empresa/salvarContaFixa`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const removerContaFixa = (dados, token) =>
	fetch(
		`${api}/empresa/removerContaFixa`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const lancarVarios = (dados, token) =>
	fetch(
		`${api}/empresa/lancarVarios`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const removerLancamento = (dados, token) =>
	fetch(
		`${api}/empresa/removerLancamento`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

