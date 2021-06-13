Backend do projeto de banco de dados

<br>
<h1>/register</h1>
  Post
  Espera do body Nome, Email e Senha e retorna string "Usuário já cadastrado" ou "Email já cadastrado"
<br>
<h1>/user</h1>
  Post
  Espera do body Email e Senha. Pode retornar o token de autenticação ou "Email/Senha incorretos"

<h1>/user/profile</h1>
  Get
  Espera só o token de autenticação e retorna o Nome e Email do usuário autenticado
  
<br>
<h1>/partidas/cadastrar</h1>
  Post
  Espera token e nome do arquivo pgn. Pode retornar "Partida Salva em caso de sucesso" e "Partida já registrada no banco de dados"
  
<h1>/partidas/favoritar</h1> 
  Post
  Espera o token e o id da partida que se quer favoritar. Retorna "Partida adicionada aos favoritos", "Partida inválida" ou "Partida já adicionada as favoritas"
  
<h1>/partidas/favoritar</h1>
  Get
  Espera apenas o token do usuário. Retorna array com todas as partidas favoritadas
  OBS: Não retorna movimentos das partidas, apenas seus ids

<h1>/partidas/movimentos</h1>
  Get
  Espera token e id da partida. Retorna array com todos os movimentos da partida
